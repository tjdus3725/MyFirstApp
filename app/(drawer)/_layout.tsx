import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CustomDrawerContent(props: any) {
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
            {/* 메뉴창 헤더 (닫기 버튼 등) */}
            <View style={styles.drawerHeader}>
                {/* 왼쪽 상단 메뉴 아이콘 (누르면 닫힘) */}
                <TouchableOpacity
                    onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
                    style={styles.closeButton}
                >
                    <Ionicons name="menu" size={30} color="#1b285c" />
                </TouchableOpacity>

                {/* (선택사항) 사용자 프로필이나 로고 등을 여기에 추가 */}
                <Text style={styles.drawerTitle}>Menu</Text>
            </View>

            {/* 메뉴 리스트 (Home, Delivery 등) */}
            <View style={styles.drawerList}>
                <DrawerItemList {...props} />
            </View>

            {/* 하단 로그아웃 버튼 (예시) */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => router.replace('/')}
            >
                <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
                <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

// 2. 메인 드로어 레이아웃
export default function DrawerLayout() {
    const navigation = useNavigation();

    return (
        <Drawer
            // 드로어 위치: 오른쪽
            screenOptions={{
                headerShown: false, // 각 페이지의 헤더는 페이지 내부에서 직접 구현하거나 여기서 false 처리
                drawerPosition: 'right', // 메뉴가 오른쪽에서 나옴
                drawerType: 'front',     // 메뉴가 화면 위로 덮임
                drawerStyle: {
                    width: '80%',          // 메뉴 너비
                    backgroundColor: '#fff',
                },
                swipeEnabled: false,     // 손으로 밀어서 여는 것 방지 (버튼으로만 열기 원할 경우)
            }}
            // 위에서 만든 커스텀 디자인 적용
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            {/* 여기에 메뉴에 표시할 화면들을 등록합니다. */}

            <Drawer.Screen
                name="home" // 파일명: home.tsx
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
                }}
            />

            <Drawer.Screen
                name="delivery"
                options={{
                    drawerLabel: 'Oreder',
                    drawerIcon: ({ color }) => <Ionicons name="cart-outline" size={22} color={color} />
                }}
            />

            <Drawer.Screen
                name="qr_code"
                options={{
                    drawerLabel: 'QR Code',
                    drawerIcon: ({ color }) => <Ionicons name="qr-code-outline" size={22} color={color} />
                }}
            />

            <Drawer.Screen
                name="user_change"
                options={{
                    drawerLabel: '내 정보 변경',
                    drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />
                }}
            />

            {/* 메뉴에는 안 보이고 싶지만 기능상 필요한 화면들 */}
            <Drawer.Screen name="password-check" options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="user_info" options={{ drawerItemStyle: { display: 'none' } }} />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    drawerHeader: {
        height: 100, // 헤더 높이
        backgroundColor: '#F5F7FA',
        flexDirection: 'row',
        alignItems: 'center', // 세로 중앙 정렬 (수정됨)
        paddingTop: 40, // 상태바 영역 확보
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    closeButton: {
        padding: 5,
        marginRight: 15,
    },
    drawerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1b285c',
    },
    drawerList: {
        flex: 1,
        paddingTop: 10,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginBottom: 20,
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#FF6B6B',
        fontWeight: 'bold',
    },
});

