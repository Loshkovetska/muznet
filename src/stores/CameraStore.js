import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { makeAutoObservable, action, runInAction, observable } from "mobx";
import { apiMocks } from "@/api/mock/apiMocks"

import { useChatAttachmentStore } from "@/stores/ChatAttachmentStore";
class NativeCamera {
    hasPermission = null
    isPreview = false
    cameraType = Camera.Constants.Type.back
    cameraImage = ""

    constructor() {
        makeAutoObservable(this, {
            hasPermission: observable,
            isPreview: observable,
            cameraType: observable,
            cameraImage: observable,

            getPermissionAsync: action.bound,
            handleCameraType: action.bound,
            takePicture: action.bound,
            cancelPreview: action.bound,
            pickImage: action.bound,
        })
    }
    getPermissionAsync = async () => {
        // Camera Permission
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }

        runInAction(() => {
            this.hasPermission = status === "granted"
        })
    }

    // это при нажатии на кнопку сменить камеру
    handleCameraType = () => {
        this.cameraType = this.cameraType === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
    }

    takePicture = async (cameraRef) => {
        if (cameraRef.current) {
            const options = { quality: 1 };
            const data = await cameraRef.current.takePictureAsync(options);

            const source = data.uri;
            if (source) {
                await cameraRef.current.pausePreview();

                runInAction(() => {
                    this.isPreview = true
                    this.cameraImage = ""
                    this.cameraImage = source
                })
            }
        }
    }

    cancelPreview = async (cameraRef) => {
        await cameraRef.current.resumePreview();
        runInAction(() => {
            this.isPreview = false
            this.cameraImage = ""
        })
    };

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        runInAction(() => {
            this.cameraImage = ""
            if (result.type === "video") {
                this.cameraImage = {
                    type: result.type,
                    uri: result.uri,
                    duration: result.duration !== undefined ? result.duration : null
                }
            } else {
                this.cameraImage = result.uri
            }
        })
    }
}

const CameraStore = new NativeCamera();

export const CameraStoreContext = React.createContext(CameraStore);
export const useCameraStore = () => React.useContext(CameraStoreContext)


