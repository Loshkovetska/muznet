import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Keyboard, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
// Variables
import C from '@/res/colors'
import { S } from '@/res/strings'
// Components

import { getWindowDimension } from '@/components/helpers/getWindowDimension'

// Images
import IMAGES from '@/res/images'
const { GoBackIcon, FilterIcon } = IMAGES
// Styles
import { style } from './style'
const {
  // Search input
  SearchRemoveIcon,
  SearchRemoveIconBlock,
  OpacityBg,
  Container,
  // Item
  ChosenBlock,
  DropContainer,
  Item,
  ItemText,
  GoBackButton,
  FormInputContainer,
  FormInput,
} = style

// Store
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

import { useLocationAutocompleteApiStore } from '@/stores/LocationAutocompleteApi'
import { useMapSearchApiStore } from '@/stores/MapSearchApi'
import { isFilterSelected } from '@/components/SearchFilters/SearchFilters'

const MapSearchInput = observer(
  ({
    stackName,
    searchText,
    toWelcomeScreenHash,
    onChangeSearchText,
    isMinOne,
    initialFocusInput,
    getLocation,
  }) => {
    const navigation = useNavigation()
    const route = useRoute()
    const { windowHeight, windowWidth } = getWindowDimension()

    const { locationList, setLocationList } = useLocationAutocompleteApiStore()
    const jsLocationList = toJS(locationList)

    // Store for setting coords from search and open filters
    const { setCoordsFromSearch, setOpenFilters } = useMapSearchApiStore()
    // Local selected location
    const [selectedLocation, setSelectedLocation] = useState('')

    const [inputFocus1, setInputFocus1] = useState(C.lightGray)

    const [isOpenDropList, setOpenDropList] = useState(false)

    const [isShowOpacityBg, setShowOpacityBg] = useState(false)
    useEffect(() => {
      if (jsLocationList.length > 0) {
        setOpenDropList(true)
      } else {
        setOpenDropList(false)
      }
    }, [jsLocationList.length])

    useEffect(() => {
      if (searchText.length > 0 && searchText !== selectedLocation) {
        setLocationList({
          inputValue: searchText,
          type: 'full',
        })
      }

      if (selectedLocation.length) {
        getLocation(selectedLocation)
      }

      if (searchText.length === 0) {
        setLocationList({
          inputValue: [],
          type: '',
        })
        setInputFocus1(C.lightGray)
        getLocation('')
      } else {
        setInputFocus1(C.black)
      }
    }, [searchText.length, selectedLocation])

    const onPressEnter = () => {
      if (jsLocationList.length > 0) {
        setLocationList([])
        const item = jsLocationList[0]
        onChangeSearchText(item)
        setSelectedLocation(item)
        setCoordsFromSearch(item)
        setShowOpacityBg(false)
        Keyboard.dismiss()
      } else {
        onChangeSearchText('')
        Keyboard.dismiss()
      }
    }

    return (
      <>
        {isShowOpacityBg === true && (
          <OpacityBg
            onPress={() => {
              setShowOpacityBg(false)
              setOpenDropList(false)
              setLocationList([])
              setSelectedLocation('')
              onChangeSearchText('')
              setInputFocus1(C.lightGray)
              Keyboard.dismiss()
            }}
            style={{
              height: windowHeight,
              width: windowWidth,
            }}
          ></OpacityBg>
        )}
        <Container>
          {/* Search Input */}

          <FormInputContainer
            style={{
              backgroundColor: C.white,
              borderRadius: 6,
              elevation: 15,
            }}
          >
            <GoBackButton
              onPress={() => {
                navigation.navigate(stackName, {
                  screen: toWelcomeScreenHash,
                })
              }}
            >
              <GoBackIcon width={8} height={15} />
            </GoBackButton>

            {/* Filters button */}
            <SearchRemoveIconBlock
              onPress={() => {
                setOpenFilters(true)
                Keyboard.dismiss()
              }}
            >
              <SearchRemoveIcon>
                <FilterIcon width={15} height={15} />
                {isFilterSelected.isfilled && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                      backgroundColor: '#0C0C0E',
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      borderWidth: 2,
                      borderColor: '#F8F8F8',
                    }}
                  ></View>
                )}
              </SearchRemoveIcon>
            </SearchRemoveIconBlock>

            <FormInput
              onSubmitEditing={() => onPressEnter()}
              selectionColor={C.lightGray}
              placeholderTextColor={'#8E8E93'}
              placeholder={'Nearby'}
              cursorColor={C.inputCursor}
              onFocus={() => {
                onChangeSearchText('')
                setSelectedLocation('')
                setLocationList([])
                setInputFocus1(C.black)
                setShowOpacityBg(true)
              }}
              onBlur={() => {
                setInputFocus1(C.lightGray)
              }}
              onChangeText={onChangeSearchText}
              value={searchText}
              style={{
                borderColor: inputFocus1,
                borderWidth: 1,
                color: C.black,
                overflow: 'hidden',
                backgroundColor: C.white,
                borderBottomWidth: isOpenDropList === true ? 0 : 1,
                borderBottomLeftRadius: isOpenDropList === true ? 0 : 6,
                borderBottomRightRadius: isOpenDropList === true ? 0 : 6,
              }}
            />
          </FormInputContainer>

          {/* Choose block */}
          {isOpenDropList && (
            <DropContainer
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              style={{
                borderTopLeftRadius: isOpenDropList === true ? 0 : 6,
                borderTopRightRadius: isOpenDropList === true ? 0 : 6,
                elevation: 15,
              }}
            >
              <ChosenBlock>
                {jsLocationList.map((item, key) => {
                  const isFirst = key === 0
                  return (
                    item !== undefined && (
                      <Item
                        style={{
                          backgroundColor:
                            isFirst === true ? C.lightGray : C.white,
                        }}
                        zIndex={2000}
                        key={key}
                        onPress={() => {
                          onChangeSearchText(item)
                          setSelectedLocation(item)
                          setCoordsFromSearch(item)
                          setShowOpacityBg(false)
                          setLocationList([])
                          Keyboard.dismiss()
                        }}
                      >
                        <ItemText>{item}</ItemText>
                      </Item>
                    )
                  )
                })}
              </ChosenBlock>
            </DropContainer>
          )}
        </Container>
      </>
    )
  },
)

export default MapSearchInput
