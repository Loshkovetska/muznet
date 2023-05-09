import images from "@/pages/Community/images"
import { useEffect, useRef, useState } from "react"
import { Video, AVPlaybackStatus } from "expo-av"
import styles from "./styles"
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import InView from "react-native-component-inview"
import React from "react"
const {
  VideoBlock,
  VideoBlockPlay,
  VideoContainer,
  VideoDuration,
  VideoVolume,
  VideoPlayContainer,
} = styles
const { VolumeIcon, PlayIcon, VolumeOff } = images
const VideoComponent = ({ video, poster }) => {
  const videoPlayer = useRef()
  const { windowWidth } = getWindowDimension()
  const [height, setHeight] = useState(0)
  const [isPlay, setPlay] = useState(false)
  const [isMuted, setMuted] = useState(true)
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!videoPlayer.current) return
    setTime(videoPlayer.current.positionMillis)
    if (isPlay) {
      videoPlayer.current.playAsync()
    } else {
      videoPlayer.current.pauseAsync()
    }
  }, [isPlay])

  const updatePlaybackCallback = (status) => {
    if (status.isLoaded) {
      setTime(status.durationMillis - status.positionMillis)
    }
  }

  const getVideoTime = (dif) => {
    let seconds = Math.floor((dif / 1000) % 60),
      minutes = Math.floor((dif / (1000 * 60)) % 60),
      hours = Math.floor((dif / (1000 * 60 * 60)) % 24)

    return `${hours > 9 ? hours : `0${hours}`}:${
      minutes > 9 ? minutes : `0${minutes}`
    }:${seconds > 9 ? seconds : `0${seconds}`}`
  }
  

  return (
    <InView
      onChange={(isVisible) => {
        if (!isVisible) {
          setPlay(false)
        }
      }}
    >
      <VideoBlock>
        <VideoDuration>{getVideoTime(time)}</VideoDuration>
        <VideoContainer onPress={() => setPlay(!isPlay)} activeOpacity={1}>
          {!isPlay && (
            <VideoBlockPlay
              leftPos={windowWidth / 2 - 24 + "px"}
              topPos={height / 2 - 24 + "px"}
            >
              <PlayIcon />
            </VideoBlockPlay>
          )}
          <Video
            onLayout={({ nativeEvent }) => {
              setHeight(nativeEvent.layout.height)
            }}
            style={{
              width: windowWidth,
              height: "100%",
            }}
            ref={videoPlayer}
            source={{
              uri: video,
            }}
            isMuted={isMuted}
            paused={isPlay}
            repeat={false}
            playIsInline
            resizeMode="contain"
            posterSource={poster}
            isLooping={isPlay}
            onEnd={() => {
              videoPlayer.current && videoPlayer.current.seek(0)
              setPlay(false)
            }}
            useNativeControls={false}
            onPlaybackStatusUpdate={updatePlaybackCallback}
          />
        </VideoContainer>
        <VideoVolume onPress={() => setMuted(!isMuted)} activeOpacity={1}>
          {!isMuted ? <VolumeIcon /> : <VolumeOff />}
        </VideoVolume>
      </VideoBlock>
    </InView>
  )
}

export default VideoComponent
