// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* 로그인/회원가입 화면들 */}
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="findID" />
            <Stack.Screen name="findPwd" />
            <Stack.Screen name="user_in" />
            <Stack.Screen name="user_info" />

            <Stack.Screen name="(drawer)" />
        </Stack>
    );
}
