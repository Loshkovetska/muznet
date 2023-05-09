import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import images from './images'
import styles from './style'
import { Image, TouchableOpacity } from 'react-native'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import VideoComponent from '@/components/VideoComponent'

const {
  Flash,
  FlashOff,
  Change,
  Nav,
  CloseIcon,
  NavVideo,
  NavPlayVideo,
} = images

const {
  CameraView,
  CameraTop,
  FuncItem,
  Preview,
  CameraBottom,
  Scroll,
  ScrollItem,
  ScrollItemText,
  FuncBottom,
  CircleFunc,
  Timer,
  TimerText,
} = styles
const PostCamera = ({ startCamera, setStart, setImage }) => {
  const [isPhoto, setPhoto] = useState(true)
  const [isRecord, setRecord] = useState(false)
  const camera = useRef(null)
  const [isGranted, setGranted] = Camera.useCameraPermissions()
  const [isFlash, setFlash] = useState(false)
  const [img, setImg] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [isRotate, setRotate] = useState(true)
  const { windowHeight, windowWidth } = getWindowDimension()
  const [time, setTimer] = useState(0)
  const [video, setVideo] = useState(null)
  const interval = useRef(null)
  const timeVal = useRef(0)

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then((res) => {
      if (res.granted) {
        setGranted(true)
      }
    })
  }, [startCamera])
  useEffect(() => {
    interval.current = null
    if (isRecord) {
      interval.current = setInterval(() => {
        let t = timeVal.current
        t += 1000
        timeVal.current = t
        setTimer(t)
      }, 1000)
    }
  }, [isRecord])

  const takePhoto = () => {
    if (!camera.current && !isGranted.granted) return
    camera.current.takePictureAsync().then((res) => {
      setImg(res)
      setPreviewVisible(true)
    })
  }

  const retakePhoto = () => {
    setImg(null)
    setVideo(null)
    setPreviewVisible(false)
  }

  const recordVideo = () => {
    if (!camera.current && !isGranted.granted) return

    camera.current
      .recordAsync({
        maxDuration: 120000,
      })
      .then((res) => {
        setVideo(res)
      })
    setRecord(true)
  }

  const stopRecordVideo = () => {
    if (!camera.current && !isGranted.granted) return
    camera.current.stopRecording()
    setRecord(false)
    setTimer(0)
    clearInterval(interval.current)
    setPreviewVisible(true)
    timeVal.current = 0
  }

  const getTime = (time) => {
    let seconds = Math.floor(+time / 1000),
      minutes = Math.floor((time / 1000 / 60) % 60)

    if (minutes > 0) {
      seconds = seconds - minutes * 60
    }

    return `00:${minutes > 9 ? minutes : `0${minutes}`}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`
  }

  if (previewVisible) {
    return (
      <Preview height={windowHeight + 'px'}>
        <CircleFunc
          style={{
            position: 'absolute',
            left: 16,
            top: 32,
          }}
          onPress={() => {
            setPhoto(true)
            retakePhoto()
          }}
        >
          <CloseIcon fill="#ffffff" />
        </CircleFunc>
        {isPhoto && (
          <Image
            source={{ uri: img.uri }}
            style={{
              width: '100%',
              height: 468,
            }}
            resizeMode="contain"
          />
        )}
        {!isPhoto && video && <VideoComponent poster={''} video={video.uri} />}
        {isPhoto && (
          <TouchableOpacity
            style={{
              width: windowWidth,
              position: 'relative',
              zIndex: 200,
              display: 'flex',
              borderRadius: 7,
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginTop: 32,
              borderColor: '#ffffff',
              borderWidth: 1,
            }}
            onPress={retakePhoto}
          >
            <ScrollItemText active={true}>Retake photo</ScrollItemText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            width: windowWidth,
            backgroundColor: '#ffffff',
            position: 'relative',
            zIndex: 200,
            display: 'flex',
            borderRadius: 7,
            paddingVertical: 16,
            paddingHorizontal: 24,
            marginTop: 16,
          }}
          onPress={() => {
            if (isPhoto) {
              setImage(img)
            } else {
              if (video) {
                setImage(video)
              }
            }
            setTimeout(() => {
              setStart(false)
            }, 1000)
          }}
        >
          <ScrollItemText active={false}>Next step</ScrollItemText>
        </TouchableOpacity>
      </Preview>
    )
  }

  const tabs = [
    {
      id: 1,
      title: 'Photo',
      action: () => {
        setVideo(null)
        setPhoto(true)
      },
    },
    {
      id: 2,
      title: 'Video',
      action: () => {
        setImg(null)
        setPhoto(false)
      },
    },
  ]
  return (
    <CameraView height={windowHeight + 'px'}>
      <CameraTop>
        <FuncItem isFlash={false} onPress={() => setFlash(!isFlash)}>
          {isFlash ? <Flash fill={'#ffffff'} /> : <FlashOff />}
        </FuncItem>
      </CameraTop>
      <Camera
        style={{ width: '100%', height: 468, position: 'relative' }}
        ref={camera}
        type={isRotate ? CameraType.back : CameraType.front}
        flashMode={isFlash ? 'on' : 'off'}
      >
        {!isPhoto && (
          <Timer
            style={{
              left: windowWidth / 2 - 88 / 2,
            }}
          >
            <TimerText>{getTime(time)}</TimerText>
          </Timer>
        )}
      </Camera>
      <CameraBottom>
        <Scroll
          style={{
            width: 97,
            marginHorizontal: windowWidth / 2 - 97 + (isPhoto ? 60 : 10),
            marginVertical: 0,
          }}
        >
          {tabs.map((t, index) => (
            <ScrollItem
              onPress={t.action}
              key={index}
              style={{
                marginRight: 10,
              }}
            >
              <ScrollItemText
                active={
                  t.title == 'Photo' && isPhoto
                    ? true
                    : t.title == 'Video' && !isPhoto
                    ? true
                    : false
                }
              >
                {t.title}
              </ScrollItemText>
            </ScrollItem>
          ))}
        </Scroll>
        <FuncBottom>
          <CircleFunc onPress={() => setStart(false)}>
            <CloseIcon fill="#ffffff" />
          </CircleFunc>
          {isPhoto ? (
            <TouchableOpacity onPress={takePhoto}>
              <Nav
                style={{
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPressIn={recordVideo}
              onPressOut={stopRecordVideo}
            >
              {!isRecord ? (
                <NavVideo
                  style={{
                    marginTop: 4,
                  }}
                />
              ) : (
                <NavPlayVideo
                  style={{
                    marginTop: 4,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          <CircleFunc onPress={() => setRotate(!isRotate)}>
            <Change />
          </CircleFunc>
        </FuncBottom>
      </CameraBottom>
    </CameraView>
  )
}

export default PostCamera
