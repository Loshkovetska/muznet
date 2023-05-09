import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
// Images
import IMAGES from "@/res/images"
const {
    GoBackIcon
} = IMAGES;
// Styles
import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const AccountLink = styled.TouchableOpacity`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
padding: 17px 0px;
border-top-color: ${C.lightGray};
border-top-width: 1px;
`;
const AccountLinkText = styled(M.PlainText17)`
margin-left: 4px;
`;
const AccountLinkIcon = styled.View`
transform: rotate(180deg);
width: 24px;
height: 24px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const LeaveFeedbackNotification = () => {
    const navigation = useNavigation();

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            if (response) {
                navigation.navigate("ContractorStack", {
                    screen: "ContractorLeaveFeedbackScreen",
                });
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <AccountLink
            onPress={async () => {
                await schedulePushNotification();
            }}>
            <AccountLinkText>Push Leave feedback</AccountLinkText>

            <AccountLinkIcon>
                <GoBackIcon width={9} height={16} />
            </AccountLinkIcon>
        </AccountLink>

    );
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Hi, how was your event?",
            body: "You had an event with Robert yesterday. If you liked the performance, plese, leave a feedback.",
        },
        trigger: { seconds: 1 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;

    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}

export default LeaveFeedbackNotification