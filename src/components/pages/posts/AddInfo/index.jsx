import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import Carousel from '@/components/Carousel'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { AddInfoState } from '../AddPhotos'
import styles from './style'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import AddLocation, { LocationPop } from '../AddLocation'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import EditForm from '../EditForm'

const { Container, ImgBlock } = styles

const AddInfo = () => {
  const sheetRef = useRef(null)
  const { windowWidth } = getWindowDimension()

  if (!AddInfoState.media.length) return <></>

  const { media } = AddInfoState
  const images = media.map((p) => ({
    uri: p.obj.uri,
  }))
  return (
    <>
      <Container>
        <ImgBlock width={windowWidth + 'px'}>
          {AddInfoState.media.length ? (
            <Carousel mode="edit-imgs" cardImages={images} />
          ) : (
            <></>
          )}
        </ImgBlock>
        <BottomSheet
          ref={sheetRef}
          snapPoints={
            !isKeyboardShown()
              ? ['49%', '60%', '70%', '80%', '95%']
              : ['49%', '60%', '70%', '80%']
          }
        >
          <BottomSheetView>
            <EditForm />
          </BottomSheetView>
        </BottomSheet>
      </Container>
      {LocationPop.isshow && <AddLocation />}
    </>
  )
}

export default observer(AddInfo)
