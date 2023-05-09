import { observer } from "mobx-react-lite"
import { ResultTapeState } from "@/pages/ResultScreen"
import React from "react"
import { StatusBar, TouchableOpacity } from "react-native"
import images from "@/pages/Community/images"
import styles from "./style"
import { useNavigation } from "@react-navigation/native"
import PostsList from "@/components/pages/posts/PostsList"

const { BackArrow } = images
const { Container, ContainerTop, Text, Title, TitleView } = styles
const ResultTapeScreen = () => {
  const navigate = useNavigation()
  const { title, section, posts } = ResultTapeState

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}
      />
      <Container>
        <ContainerTop>
          <TouchableOpacity
            onPress={() => navigate.goBack()}
            style={{
              position: "absolute",
              bottom: 19,
              left: 16,
              zIndex: 20,
            }}
          >
            <BackArrow />
          </TouchableOpacity>
          <TitleView>
            <Text>
              {section} {!posts?.length || posts?.length > 1 ? "posts" : "post"}
            </Text>
            <Title>{title}</Title>
          </TitleView>
        </ContainerTop>
        <PostsList isUserMode={false} posts={posts} />
      </Container>
    </>
  )
}

export default observer(ResultTapeScreen)
