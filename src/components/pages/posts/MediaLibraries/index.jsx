import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import React, { useEffect, useState } from 'react'
import styles from './style'
import * as MediaLibrary from 'expo-media-library'
import ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Image } from 'react-native'
import { StorageAccessFramework } from 'expo-file-system'
const {
  Container,
  ContainerTop,
  ContainerText,
  Title,
  ScrollBlock,
  ImageView,
  ImageText,
  ImageItem,
} = styles
const MediaLibraries = ({ albums, setAlbum, setLauch, isGranted }) => {
  const { windowHeight } = getWindowDimension()
  const [assets, setAssets] = useState(Array())

  useEffect(() => {
    if (albums) {
      albums.forEach((a, i) => {
        MediaLibrary.getAssetsAsync({
          album: a,
          mediaType: 'photo',
        }).then((res) => {
          const as = assets
          as[i] = res.assets[0]
          setAssets([...as])
        })
      })
    }
  }, [albums])

  return (
    <Container height={windowHeight + 'px'}>
      <ContainerTop>
        <ContainerText onPress={() => setLauch(false)}>Cancel</ContainerText>
        <Title>Choose an album</Title>
        <ContainerText></ContainerText>
      </ContainerTop>
      <ScrollBlock>
        {albums.map((al, i) => (
          <ImageItem
            key={i}
            onPress={() => {
              setAlbum(al)
              setLauch(false)
            }}
          >
            <ImageView>
              {assets[i] && (
                <Image
                  source={{
                    uri: assets[i].uri,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              )}
            </ImageView>
            <ImageText>{al.title}</ImageText>
          </ImageItem>
        ))}
      </ScrollBlock>
    </Container>
  )
}

export default MediaLibraries
