import AsyncStorage from '@react-native-async-storage/async-storage';

export async function retrieve<T>(key: string): Promise<T | undefined> {
	if (key === null) {
		throw new Error('invalid-key');
	}

	try {
		let data = await AsyncStorage.getItem(key);
		if (!data) return;
		return JSON.parse(data!) as T;
	} catch (error) {
		throw new Error('There was an error on the native side');
	}
}
