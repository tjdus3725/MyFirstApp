import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default function Page() {
    // [중요] 상황에 맞는 주소로 바꾸세요!
    // 1. 에뮬레이터(가상머신) 사용 시: "http://10.0.2.2:8080"
    // 2. 실제 핸드폰 사용 시: "http://192.168.x.x:8080" (PC의 ipconfig 주소)
    // 현재 설정: 에뮬레이터용
    const SERVER_URL = "http://192.168.56.101";

    const sendOrder = async () => {
        try {
            console.log("주문 전송 시작..."); // 디버깅용 로그
            const response = await fetch(`${SERVER_URL}/app/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menu: "아이스 아메리카노",
                    count: 2,
                    user_id: "user_01"
                }),
            });

            const json = await response.json();

            if (response.ok) {
                Alert.alert("주문 성공", json.message || "주문이 완료되었습니다.");
            } else {
                Alert.alert("오류", "서버 응답이 이상합니다.");
            }

        } catch (error) {
            console.error("Fetch 에러:", error);
            Alert.alert("연결 실패", `서버와 연결할 수 없습니다.\nURL: ${SERVER_URL}\nPC 방화벽과 포트포워딩을 확인하세요.`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>무인 배달 로봇 주문</Text>
            <View style={styles.buttonContainer}>
                <Button title="☕ 커피 주문하기" onPress={sendOrder} color="#4A90E2" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#333'
    },
    buttonContainer: {
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden'
    }
});