import images from '@/pages/Community/images'
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { SlideIndex } from '../PostsList'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import { runInAction } from 'mobx'
import React from 'react'
const { PlayIcon, SlidesIcon } = images
const { Gallery, GalleryPost, GalleryPostImage, GalleryPostIcon } = styles

const PostGallery = ({ data, mode, paddingTop = 0 }) => {
  const navigate = useNavigation()
  const { windowWidth } = getWindowDimension()

  if (!data || !data?.length) return <></>
  return (
    <Gallery
      style={{
        paddingTop,
      }}
    >
      {data?.map((p, i) => {
        return (
          <GalleryPost
            activeOpacity={0.8}
            key={i}
            width={(windowWidth - 32) / 3 + 'px'}
            border={(i + 1) % 3 == 0 ? 0 : '2px'}
            onPress={() => {
              runInAction(() => {
                SlideIndex.id = i
                SlideIndex.mode = mode
              })
              if (mode != 'result-post') {
                navigate.navigate('CommunityStack', {
                  screen: 'CommunityTapeScreen',
                })
              } else {
                navigate.navigate('CommunityStack', {
                  screen: 'CommunityResultTapeScreen',
                })
              }
            }}
          >
            {(p.media[0] == 'mp4' || p.media[0] == 'mov') && (
              <GalleryPostIcon>
                <PlayIcon width={20} height={20} />
              </GalleryPostIcon>
            )}
            {p.media.length > 1 && p.media[0] != 'mp4' && p.media[0] != 'mov' && (
              <GalleryPostIcon>
                <SlidesIcon width={20} height={20} />
              </GalleryPostIcon>
            )}
            {/* { } */}
            <GalleryPostImage
              source={{
                uri: p.media[0],
              }}
              resizeMode="cover"
              resizeMethod="resize"
            />
          </GalleryPost>
        )
      })}
    </Gallery>
  )
}

export default PostGallery
