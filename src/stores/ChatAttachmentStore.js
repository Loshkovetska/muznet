import React from "react"
import { PermissionsAndroid, Platform } from "react-native"
import { makeAutoObservable, action, runInAction, observable } from "mobx"
import { apiMocks } from "@/api/mock/apiMocks"
import * as DocumentPicker from "expo-document-picker"
import * as ImagePicker from "expo-image-picker"

class ChatAttachment {
  cameraPhoto = ""
  video = ""
  file = null
  cameraRoll = []
  isSendAttached = false
  isOpenChatAttachment = false

  constructor() {
    makeAutoObservable(this, {
      cameraPhoto: observable,
      video: observable,
      file: observable,
      isOpenChatAttachment: observable,
      isSendAttached: observable,
      cameraRoll: observable,
      setOpenChatAttachment: action.bound,
      setSendAttached: action.bound,
      setCameraImage: action.bound,
      setAttachedFile: action.bound,
      setCameraRoll: action.bound,
    })
  }

  resetFile() {
    runInAction(() => {
      this.file = null
    })
  }

  setSendAttached(boolean) {
    this.isSendAttached = boolean
  }
  setOpenChatAttachment(boolean) {
    this.isOpenChatAttachment = boolean
  }
  setCameraImage = async (source) => {
    runInAction(() => {
      this.file = {
        fileName: "IMG",
        uri: source,
      }
    })
    this.setOpenChatAttachment(false)

    this.cameraPhoto = source
  }
  setAttachedFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf"],
    })

    runInAction(() => {
      if (result.type !== "cancel") {
        this.cameraPhoto = ""
        ;(this.file = {
          fileName: result.name,
          uri: result.uri,
        }),
          this.setSendAttached(true)
        this.setOpenChatAttachment(false)
      } else {
        this.setSendAttached(false)
        this.setOpenChatAttachment(false)
      }
    })
  }

  pickImageFromGalery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })
    runInAction(() => {
      if (!result.cancelled) {
        this.cameraPhoto = ""
        this.file = {
          fileName: result.fileName,
          uri: result.uri,
        }
        this.setOpenChatAttachment(false)
        this.setSendAttached(true)
      } else {
        this.setOpenChatAttachment(false)
        this.setSendAttached(false)
      }

      // if (result.type === "video") {
      //     // this.setCameraImage({
      //     //     type: result.type,
      //     //     uri: result.uri,
      //     //     duration: result.duration !== undefined ? result.duration : null
      //     // })
      //     this.setOpenChatAttachment(false)
      //     this.setSendAttached(true)
      // } else {
      //     this.setCameraImage(result.uri)
      //     this.setOpenChatAttachment(false)
      //     this.setSendAttached(true)
      // }
    })
  }

  setCameraRoll = async () => {
    // TODO для социалки начала забора последних снимков
    // const { granted } = await MediaLibrary.requestPermissionsAsync();
    // if (granted) {
    //     const results = await MediaLibrary.getAssetsAsync({
    //         sortBy: "creationTime",
    //         first: 5,
    //     });
    //     const cameraRoll = results.
    //     console.log("🚀 ~ file: ChatAttachmentStore.js ~ line 42 ~ ChatAttachment ~ setCameraRoll= ~ result", results)
    // }
  }
}

const ChatAttachmentStore = new ChatAttachment()

export const ChatAttachmentStoreContext = React.createContext(
  ChatAttachmentStore,
)
export const useChatAttachmentStore = () =>
  React.useContext(ChatAttachmentStoreContext)
