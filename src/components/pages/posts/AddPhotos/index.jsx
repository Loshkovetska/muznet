import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import styles from './style'
import * as MediaLibrary from 'expo-media-library'
import images from '@/pages/Community/images'
import MediaLibraries from '../MediaLibraries'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native'
import Carousel from '@/components/Carousel'
import { observable, runInAction } from 'mobx'
import PostCamera from '../PostCamera'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image as ImageLazy } from 'react-native-elements'
import { EditInfoData } from '../EditForm'

const {
  Container,
  ImgBlock,
  ImgList,
  FuncBlock,
  Select,
  SelectTop,
  SelectedText,
  ImageItem,
  RadioButton,
  RadioButtonDot,
  Duration,
  ImgRow,
  Space,
  Button,
  ButtonText,
  ImageBlur,
  InfoView,
  InfoViewText,
  FuncItem,
  FuncItemText,
} = styles

const { ArrowDown, AlertIcon, CameraIcon } = images

export const AddInfoState = observable({
  media: [],
})

const AddPhotos = ({ setTab }) => {
  const navigation = useNavigation()
  const camera = useRef(null)
  const [moreThan3, setMore] = useState(false)
  const [lauch, setLauch] = useState(false)
  const [photos, setPhotos] = useState([])
  const [userPhotos, setUserPhotos] = useState([])
  const [isGranted, setGranted] = MediaLibrary.usePermissions()

  const [albums, setAlbums] = useState([])
  const [album, setAlbum] = useState(null)
  const [startCamera, setStart] = useState(false)
  const { windowWidth, windowHeight } = getWindowDimension()
  const route = useRoute()

  useEffect(() => {
    if (isGranted && !isGranted.granted) {
      MediaLibrary.requestPermissionsAsync().then((resp) => {
        setGranted(resp)
      })
    }
    if (isGranted && isGranted.granted) {
      MediaLibrary.getAlbumsAsync().then((resp) => {
        const albums = resp.filter((r) => r.assetCount);
        setAlbums(albums)
        setAlbum(albums[0])
      })
    }
  }, [isGranted])

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setPhotos([])
      runInAction(() => {
        AddInfoState.media = []
        EditInfoData.dt = {
          title: '',
          description: '',
          tagsStr: '',
          tags: [],
          location: '',
          commentsOff: false,
          shareOff: false,
        }
      })
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (!album || !isGranted?.granted) return
    setPhotos([])
    MediaLibrary.getAssetsAsync({
      album: album,
      first: album?.assetCount,
      mediaType: ['photo', 'video'],
    }).then((res) => {
      setUserPhotos([...res.assets])
    })
  }, [album])

  const getRows = (userPhotos) => {
    return new Array(Math.ceil(userPhotos.length / 4)).fill('0')
  }

  const getDuration = (dur) => {
    let seconds = Math.floor(+dur % 1000),
      minutes = Math.floor((dur / 60) % 60),
      hours = Math.floor((dur / (60 * 60)) % 24)

    if (minutes > 0) {
      seconds = seconds - minutes * 60
    }

    return `${hours > 9 ? hours : `0${hours}`}:${
      minutes > 9 ? minutes : `0${minutes}`
    }:${seconds > 9 ? seconds : `0${seconds}`}`
  }

  useEffect(() => {
    if (!photos.length) return
    runInAction(() => {
      AddInfoState.media = photos.map((p) => ({
        uri: p.uri,
        size: 'cover',
        obj: p,
      }))
    })
  }, [photos])

  useEffect(() => {
    if (!photos.length) {
      const ar = []
      AddInfoState.media.forEach((m) => {
        ar.push(m)
      })
      setPhotos(ar)
    }
  }, [AddInfoState.media])

  useEffect(() => {
    return () => {
      setPhotos([])
    }
  }, [])

  if (lauch)
    return (
      <MediaLibraries
        albums={albums}
        setAlbum={setAlbum}
        setLauch={setLauch}
        isGrante={isGranted}
      />
    )

  let images = []

  if (!photos.length && userPhotos && userPhotos.length) {
    images = {
      uri: userPhotos[0].uri,
    }
  }

  if (startCamera) {
    return (
      <PostCamera
        startCamera={startCamera}
        setStart={setStart}
        setImage={(value) => {
          const ph = photos

          if (photos.length < 3) {
            ph.push(value)
            setPhotos([...ph])
          }
        }}
      />
    )
  }

  return (
    <>
      <Container>
        <ImgBlock width={windowWidth + 'px'}>
          {photos.length ? (
            <Carousel
              mode="add-imgs"
              cardImages={photos?.map((p) => ({
                uri: p.uri,
              }))}
            />
          ) : (
            <Image
              source={images}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          )}
        </ImgBlock>

        <FuncBlock>
          {album && (
            <Select>
              <SelectTop
                onPress={() => {
                  setLauch(true)
                }}
              >
                <SelectedText>{album?.title}</SelectedText>
                <ArrowDown
                  style={{
                    marginLeft: 4,
                  }}
                />
              </SelectTop>
            </Select>
          )}
          <FuncItem onPress={() => setStart(true)}>
            <CameraIcon
              style={{
                marginRight: 4,
              }}
            />
            <FuncItemText>Take a Photo / Video</FuncItemText>
          </FuncItem>
        </FuncBlock>
        <ImgList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {getRows(userPhotos)?.map((ro, id) => (
            <ImgRow key={id}>
              {userPhotos.slice(id * 4, id * 4 + 4).map((u, i) => (
                <ImageItem
                  key={i}
                  width={windowWidth / 4 + 'px'}
                  activeOpacity={1}
                  border={(i + 1) % 4 == 0 ? 0 : '1px'}
                  onPress={() => {
                    let ph = JSON.parse(JSON.stringify(photos))
                    const photo = ph.find((c) => c.uri == u.uri)
                    if (!photo && ph.length < 3) {
                      ph.push(u)
                    } else ph = ph.filter((p) => p.uri != u.uri)

                    if (ph.length == 3) {
                      setMore(true)
                    }

                    setPhotos([...ph])
                  }}
                >
                  <RadioButton isActive={photos.find((p) => p.uri == u.uri)}>
                    {photos.find((p) => p.uri == u.uri) && <RadioButtonDot />}
                  </RadioButton>
                  {photos.find((p) => p.uri == u.uri) && <ImageBlur />}
                  {u.mediaType == 'video' && (
                    <Duration>{getDuration(u.duration)}</Duration>
                  )}
                  <ImageLazy
                    source={{ uri: u.uri }}
                    PlaceholderContent={<ActivityIndicator />}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </ImageItem>
              ))}
            </ImgRow>
          ))}
          <Space />
        </ImgList>
        {moreThan3 && (
          <InfoView width={windowWidth - 32}>
            <AlertIcon
              style={{
                width: 24,
                height: 24,
                marginRight: 4,
              }}
            />
            <InfoViewText>
              You can’t select more than 3 media files
            </InfoViewText>
          </InfoView>
        )}
        {photos.length ? (
          <Button
            width={windowWidth - 32}
            onPress={() => {
              setTab()
            }}
          >
            <ButtonText>Next Step ({photos.length})</ButtonText>
          </Button>
        ) : (
          <></>
        )}
      </Container>
    </>
  )
}

export default observer(AddPhotos)
