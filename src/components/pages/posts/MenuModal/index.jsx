import React, { useEffect, useRef, useState } from 'react'
import styles from './style'
import { observer } from 'mobx-react-lite'
import { runInAction } from 'mobx'
import ModalState from '@/stores/CommunityState'

import { getWindowDimension } from '@/components/helpers/getWindowDimension'
const {
  Container,
  SafeAreaView,
  ContainerTop,
  ContainerRow,
  ContainerFunc,
  ContainerFuncItem,
  ContainerFuncText,
} = styles

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { ShareModalState } from '../ShareModal'
import { toggleComments } from '@/stores/PostModel'

const MenuModal = () => {
  const sheetRef = useRef(null)
  const [previous, setPrevious] = useState(0)
  const [state, setState] = useState(ModalState.isopen2)
  const { windowHeight } = getWindowDimension()
  const navigate = useNavigation()

  const share = () => {
    runInAction(() => {
      ShareModalState.isopen = true
    })
    sheetRef.current && sheetRef.current.close()
  }
  const edit = () => {
    navigate.navigate('CommunityStack', {
      screen: `CommunityEditScreen`,
    })
    sheetRef.current && sheetRef.current.close()
  }
  const turnOff = () => {
    toggleComments(ModalState.idpost).then(() => {
      sheetRef.current && sheetRef.current.close()
    })
  }

  const del = () => {
    runInAction(() => {
      ModalState.delopen = true
    })
    sheetRef.current && sheetRef.current.close()
  }

  const tabs = [
    {
      title: 'Share',
      action: share,
      color: '#141517',
    },
    {
      title: 'Edit',
      action: edit,
      color: '#141517',
    },
    {
      title: `Turn on/off commenting`,
      action: turnOff,
      color: '#141517',
    },
    {
      title: 'Delete',
      action: del,
      color: '#FC4529',
    },
  ]

  useEffect(() => {
    if (!state) {
      runInAction(() => {
        ModalState.isopen2 = state
      })
      setPrevious(0)
    }
  }, [state])

  useEffect(() => {
    setState(ModalState.isopen2)
  }, [ModalState.isopen2])

  useEffect(() => {
    runInAction(() => {
      ModalState.ref2 = sheetRef.current
    })
  }, [])


  return (
    <SafeAreaView
      activeOpacity={1}
      active={state}
      height={windowHeight + 'px'}
      onPress={({ nativeEvent }) => {
        if (nativeEvent) {
          if (nativeEvent.locationY > previous) {
            if (state) {
              sheetRef.current && sheetRef.current.close()
            }
          } else {
            if (state) {
              setPrevious(nativeEvent.locationY)
            }
          }
        }
      }}
    >
      <BottomSheet
        ref={sheetRef}
        snapPoints={['33%', '15%', '33%']}
        enablePanDownToClose
        onClose={() => {
          if (state) {
            setState(false)
          }
        }}
      >
        <BottomSheetView>
          <Container>
            <ContainerRow>
              <ContainerFunc>
                {tabs.map((t, i) => (
                  <ContainerFuncItem
                    activeOpacity={0.6}
                    key={i}
                    onPress={t.action}
                    border={i + 1 == tabs.length ? '0px' : '1px'}
                  >
                    <ContainerFuncText color={t.color}>
                      {t.title}
                    </ContainerFuncText>
                  </ContainerFuncItem>
                ))}
              </ContainerFunc>
            </ContainerRow>
          </Container>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default observer(MenuModal)
