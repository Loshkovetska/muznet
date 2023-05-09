import { observer } from "mobx-react-lite"
import images from "@/pages/Community/images"
import styles from "./style"
import IMAGES from "@/res/images"
import { runInAction } from "mobx"
import { ReportStateModal } from "../ReportModal"
import ModalState from "@/stores/CommunityState"
import { Image } from "react-native"
import { HideState } from "../PostsList"
import { hidePost } from "@/stores/PostModel"
import UserModel from "@/stores/UserModel"
import { TouchableOpacity } from "react-native-gesture-handler"
const { CloseIcon, CheckIcon } = images

const {
  View,
  Container,
  Title,
  FuncItem,
  FuncItemText,
  ImageContainer,
  CloseView,
} = styles

const HidePost = () => {
  const hide = () => {
    hidePost(HideState.id, UserModel.user.id).then(() => {
      runInAction(() => {
        HideState.id = -1
      })
    })
  }

  const undo = () => {
    runInAction(() => {
      HideState.id = -1
    })
  }
  const report = () => {
    runInAction(() => {
      ReportStateModal.isopen = true
    })
  }

  return (
    <View>
      <CloseView>
        <TouchableOpacity
          onPress={hide}
          style={{
            width: 24,
            height: 24,
          }}
        >
          <CloseIcon
            style={{
              marginTop: -8,
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableOpacity>
      </CloseView>

      <Container>
        <ImageContainer>
          <CheckIcon
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </ImageContainer>

        <Title>
          This post has been hidden. You’ll see posts like this lower in your
          feed
        </Title>
        <FuncItem
          onPress={report}
          style={{
            marginBottom: 12,
          }}
        >
          <FuncItemText error>Report this post</FuncItemText>
        </FuncItem>
        <FuncItem onPress={undo}>
          <FuncItemText error={false}>Undo</FuncItemText>
        </FuncItem>
      </Container>
    </View>
  )
}

export default observer(HidePost)
