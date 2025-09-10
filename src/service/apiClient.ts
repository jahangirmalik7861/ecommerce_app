import { NavigationContainerProps } from '@react-navigation/native';
import { Dispatch } from '@reduxjs/toolkit';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { showToast } from '../../components/CustomToast';
import { BASE_URL } from '../service/AppConfig';
import { clear, setItem } from '../storage';
// import { updateAuthInfo } from '../redux/slices/authSlice';

export interface ErrorResponse extends AxiosRequestConfig {
	_retry?: boolean;
}

interface Token {
	ati: string;
	exp: number;
	id: string;
}
interface RequestConfig {
	method?: string;
	url?: string;
	headers?: Record<string, any>;
	data?: any;
	params?: any;
	baseURL?: string;
}

export const parseJWT = (token: string) => {
	try {
		const parts = token.split('.');
		if (parts.length !== 3) {
			throw new Error('Invalid token format');
		}
		const base64Url = parts[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join(''),
		);

		return JSON.parse(jsonPayload);
	} catch (e) {
		console.log('Error occurred while parsing token.', e);
		return null;
	}
};
export const isTokenExpired = (token: Token) => {
	if (!token?.exp) return true;
	const currentTimestamp = Math.floor(Date.now() / 1000);
	return token.exp < currentTimestamp;
};

class ApiClient {
	private client: AxiosInstance;
	private token: string | undefined;
	private refreshToken: string | undefined;
	private navigation: NavigationContainerProps | undefined;
	private readonly isDevMode: boolean = __DEV__;

	constructor(baseURL: string, headers?: {}) {
		this.client = axios.create({
			baseURL,
			headers: {
				'Content-Type': 'application/json',
				// 'api-key': 'apiKey',
				...headers,
			},
		});
		this.handleRequest = this.handleRequest.bind(this);
		this.handleRequestError = this.handleRequestError.bind(this);
		this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
		this.handleErrorResponse = this.handleErrorResponse.bind(this);
		this.refreshAccessToken = this.refreshAccessToken.bind(this);
		this.setDispatch = this.setDispatch.bind(this);

		this.client.interceptors.request.use(this.handleRequest, this.handleRequestError);
		this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
	}

	setNavigation(navigation: any) {
		this.navigation = navigation;
	}

	private handleRequest(config: any) {
		console.log(`🚀 $$$$$$$ Request Details of /${config?.url?.split('/').pop()}:`, {
			method: config.method,
			url: config.url,
			headers: config.headers,
			data: config.data,
			params: config.params,
			access_token: this.token,
			curl: this.generateCurlCommand(config),
		});
		if (this?.token) {
			// Set token in the Authorization header
			config.headers.Authorization = `Bearer ${this.token}`;
		}
		return config;
	}

	private generateCurlCommand(config: RequestConfig): string {
		const { method = 'GET', url = '', headers = {}, data, baseURL } = config;
		const fullUrl = url.startsWith('http') ? url : `${baseURL || ''}${url}`;

		const formattedHeaders = { 'Content-Type': 'application/json', ...headers };
		const headerString = Object.entries(formattedHeaders)
			.filter(([, value]) => value !== undefined && value !== null)
			.map(([key, value]) => `-H "${key}: ${String(value).replace(/"/g, '\\"')}"`)
			.join(' ');

		const dataString =
			data && Object.keys(data).length > 0 ? `--data '${JSON.stringify(data)}'` : '';

		return `curl -X ${method.toUpperCase()} "${fullUrl}" ${headerString} ${dataString}`.trim();
	}
	private handleRequestError(error: any) {
		console.error(`❌ $$$$$$ Request Error of /${error?.config?.url?.split('/').pop()}`, {
			message: error.message,
			config: error.config,
		});
		return Promise.reject(error);
	}

	private handleSuccessResponse(response: AxiosResponse) {
		// You can customize the success response handling here
		console.log(`✅ $$$$ Response Details of /${response.config?.url?.split('/').pop()}: `, {
			status: response.status,
			statusText: response.statusText,
			data: response.data,
			headers: response.headers,
		});
		return response;
	}

	async resetStorage(skipNavigation: boolean = false) {
		this.token = undefined;
		this.refreshToken = undefined;
		try {
			await clear();
			store.dispatch(resetAllReducers());
			!skipNavigation &&
				this.navigation?.reset({
					index: 0,
					routes: [{ name: 'landing' }],
				});
		} catch (error) {
			console.log('apiClient.ts - Error while resetting storage : ', error);
		}
	}

	// Set the token dynamically
	setTokens(token: string, refreshToken: string) {
		this.token = token;
		this.refreshToken = refreshToken;
	}

	getTokens() {
		return { accessToken: this.token, refreshToken: this.refreshToken };
	}

	private async handleErrorResponse(error: any) {
		console.error(`❌ $$$$ Response Error Details of ${error?.config?.url?.split('/').pop()}:`, {
			status: error.response.status,
			statusText: error.response.statusText,
			data: error.response.data,
			headers: error.response.headers,
		});
		if (error?.response) {
			const originalRequest: ErrorResponse = error.config;
			const { Authorization, authorization } = originalRequest.headers || {};
			const _resMessage = error?.response?.data?.errors[0]?.message || '';
			if (
				(Authorization || authorization) &&
				error.response.status === 401 &&
				_resMessage.includes('Invalid or expired token') &&
				!originalRequest._retry
			) {
				originalRequest._retry = true;
				const res: any = await this.refreshAccessToken();
				if (!res) {
					return Promise.reject(error);
				}
				this.client.defaults.headers.common['Authorization'] = 'Bearer ' + res?.accessToken;
				return this.client.request(originalRequest);
			}
			return Promise.reject(error);
		}
		// You can throw a custom error or handle it as needed
		throw error;
	}

	private async refreshAccessToken() {
		if (!this?.refreshToken) {
			throw new Error('Refresh token is required');
		}
		const parsedToken = parseJWT(this?.refreshToken);

		if (isTokenExpired(parsedToken)) {
			await this.resetStorage();
			showToast('Session expired, Please login again.', 'info');
			return;
		}
		try {
			const response: any = await this.client.post(`${BASE_URL}/auth/refresh-token`, {
				refreshToken: this.refreshToken,
			});
			const { accessToken, refreshToken } = response?.data?.data;
			// dispatching action to stop the refresh token call when user refreshes window and token is expired
			// now it will update the auth info in redux with updated tokens

			// this.dispatch && this.dispatch(updateAuthInfo(response));
			if (accessToken && refreshToken) {
				this.setTokens(accessToken, refreshToken);
			} else {
				console.error('Invalid Tokens returned.');
				await this.resetStorage();
				return null;
			}
			await setItem('token', response?.data?.data);
			return response?.data?.data;
		} catch (error: any) {
			console.error('Error refreshing token:', error?.message);
		}
	}
	setDispatch(dispatch: Dispatch) {
		this.dispatch = dispatch;
	}
	// Example GET request
	async get(endpoint: string, options?: any) {
		try {
			const response = await this.client.get(endpoint, options);
			return response;
		} catch (error) {
			// The error will be caught by the interceptor, so no need to handle it here
			throw error;
		}
	}

	// Example POST request
	async post<T>(endpoint: string, data?: any, headers?: {}): Promise<AxiosResponse<T>> {
		try {
			const response = await this.client.post(endpoint, data, { headers });
			return response;
		} catch (error) {
			// The error will be caught by the interceptor, so no need to handle it here
			throw error;
		}
	}

	// Add more methods for different HTTP methods as needed
	async delete(endpoint: string, data?: any) {
		try {
			return this.client.delete(endpoint, data);
		} catch (error) {
			throw error;
		}
	}

	async put(endpoint: string, data?: any, headers?: {}) {
		try {
			return this.client.put(endpoint, data, { headers });
		} catch (error) {
			throw error;
		}
	}

	async patch(endpoint: string, data?: any, headers?: {}) {
		try {
			return this.client.patch(endpoint, data, { headers });
		} catch (error) {
			throw error;
		}
	}
}
// Usage
const client = new ApiClient(BASE_URL);
// export const authClient = new ApiClient(authURL, {
//     'Content-Type': 'application/x-www-form-urlencoded',
// });

export default client;