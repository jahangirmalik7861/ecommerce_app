import { NavigationContainerProps, useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContent {
	children: ReactNode;
	showToolbar?: boolean;
	showBack?: boolean;
	showMenu?: boolean;
	showTitle?: boolean;
	hideMenu?: boolean;
	bgColor?: string;
	pointerEvents?: string;
}

export const ScreenContent = ({
	children,
	bgColor = 'white',
	pointerEvents = 'auto',
}: ScreenContent) => {
	const navigation = useNavigation<NavigationContainerProps>();

	
	return (
		<>
			<SafeAreaView
				edges={['right', 'top', 'left']}
				style={{
					flex: 1,
				}}
			>
				<StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
				<View flex={1} bg={bgColor} pointerEvents={pointerEvents}>
					{children}
				</View>
			</SafeAreaView>
		</>
	);
};
