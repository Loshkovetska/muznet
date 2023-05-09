import React from 'react'
import { Keyboard } from 'react-native'
import { useEffect, useState } from 'react'

import C from '@/res/colors'
import { S } from '@/res/strings'
// Images
import IMAGES from '@/res/images'
const { ErrorIcon } = IMAGES
// Styles
import { style } from './style'
const {
  // Search input
  Container,
  // Item
  ChosenBlock,
  DropContainer,
  Item,
  ItemText,
} = style
// Mixin
import { M } from '@/res/mixin'
const {
  // Search input
  FormInputBlock,
  FormInputContainer,
  FormInput,
  ShowPasswordIconButton,
  ErrorMessage,
  FormInputLabel,
} = M

// Store
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { useLocationAutocompleteApiStore } from '@/stores/LocationAutocompleteApi'

const SearchLocationDropSelect = observer(
  ({
    isResetAll,
    setParentShowOpenDrop,
    isCloseAllDropdown,
    setFilterLocation,
    placeholderText,
    existedLocation,
    isRequiredShowError,
    isPersonalInfo = false,
  }) => {
    // Store
    const { locationList, setLocationList } = useLocationAutocompleteApiStore()
    const jsLocationList = toJS(locationList)

    // Search input
    const [searchText, onChangeSearchText] = useState('')
    // Local selected location
    const [selectedLocation, setSelectedLocation] = useState('')

    const [inputFocus1, setInputFocus1] = useState(C.lightGray)
    const [isShiftInputLocationLabel, setShiftInputLocationLabel] = useState(
      false,
    )

    useEffect(() => {
      if (existedLocation !== undefined) {
        setSelectedLocation(existedLocation)
        onChangeSearchText(existedLocation)
        setFilterLocation(existedLocation)
        setShiftInputLocationLabel(true)
      }
    }, [existedLocation])

    const [isOpenDropList, setOpenDropList] = useState(false)

    useEffect(() => {
      if (setParentShowOpenDrop !== undefined) {
        if (isOpenDropList === true) {
          setParentShowOpenDrop(true)
        } else {
          setParentShowOpenDrop(false)
        }
      }
    }, [isOpenDropList])

    useEffect(() => {
      if (jsLocationList?.length > 0) {
        setOpenDropList(true)
      } else {
        setOpenDropList(false)
      }
    }, [jsLocationList.length])

    useEffect(() => {
      if (searchText.length > 0 && searchText !== selectedLocation) {
        setLocationList({
          inputValue: searchText,
          type: 'city',
        })
      }
      if (searchText?.length > 0) {
        setShiftInputLocationLabel(true)
        setFilterLocation(searchText)
      }
      if (searchText?.length === 0) {
        setShiftInputLocationLabel(false)
        setFilterLocation(searchText)
        setLocationList({
          inputValue: [],
          type: '',
        })
      }
    }, [searchText, selectedLocation])

    // If resetAll
    useEffect(() => {
      if (isResetAll === true) {
        setLocationList({
          inputValue: [],
          type: '',
        })
        onChangeSearchText('')
        setSelectedLocation('')
        setFilterLocation('')
        setShiftInputLocationLabel(false)
        setOpenDropList(false)
      }
      if (isResetAll === true && existedLocation !== undefined) {
        setSelectedLocation(existedLocation)
        onChangeSearchText(existedLocation)
        setFilterLocation(existedLocation)
        setShiftInputLocationLabel(true)
      }
    }, [isResetAll, existedLocation])

    const onPressEnter = () => {
      if (jsLocationList.length > 0) {
        setLocationList([])
        const item = jsLocationList[0]
        onChangeSearchText(item)
        setSelectedLocation(item)
        setFilterLocation(item)
        Keyboard.dismiss()
      } else {
        onChangeSearchText('')
        Keyboard.dismiss()
      }
    }

    useEffect(() => {
      if (isCloseAllDropdown === true && jsLocationList.length > 0) {
        setLocationList([])
        const item = jsLocationList[0]
        onChangeSearchText(item)
        setSelectedLocation(item)
        setFilterLocation(item)
        Keyboard.dismiss()
      }
      if (isCloseAllDropdown === true && jsLocationList.length === 0) {
        setLocationList([])
        Keyboard.dismiss()
      }
    }, [isCloseAllDropdown, jsLocationList])

    const isShowError = isRequiredShowError === true

    return (
      <Container
        style={{
          zIndex: isOpenDropList ? 2000 : 0,
          width: '100%',
        }}
      >
        {/* Search Input */}
        <FormInputBlock
          style={{
            marginBottom: isShowError ? 35 : 13,
            width: '100%',
          }}
        >
          <FormInputContainer
            style={{
              marginLeft: isPersonalInfo ? 0 : 16,
              marginRight: isPersonalInfo ? 0 : 16,
              backgroundColor: C.white,
              borderRadius: 6,
              elevation:
                isOpenDropList === true ? 7 : inputFocus1 === C.black ? 7 : 0,
            }}
          >
            <FormInput
              onSubmitEditing={() => onPressEnter()}
              inputLabel={isShiftInputLocationLabel}
              selectionColor={C.lightGray}
              placeholderTextColor={C.sBlack}
              placeholder={placeholderText}
              cursorColor={C.inputCursor}
              onFocus={() => {
                setInputFocus1(C.black)
              }}
              onBlur={() => {
                setInputFocus1(C.lightGray)
              }}
              onChangeText={onChangeSearchText}
              value={searchText}
              style={{
                borderColor: isShowError ? C.red : inputFocus1,
                borderWidth: isShowError ? 2 : 1,
                color: C.black,
                overflow: 'hidden',
                backgroundColor: C.white,
                borderBottomWidth:
                  isOpenDropList === true ? 0 : isShowError ? 2 : 1,
                borderBottomLeftRadius: isOpenDropList === true ? 0 : 6,
                borderBottomRightRadius: isOpenDropList === true ? 0 : 6,
              }}
            />
            <FormInputLabel inputLabel={isShiftInputLocationLabel}>
              Location
            </FormInputLabel>
            {isShowError && (
              <ShowPasswordIconButton>
                <ErrorIcon width={20} height={20} />
              </ShowPasswordIconButton>
            )}
            {isShowError && <ErrorMessage>{S.inputRequired}</ErrorMessage>}
          </FormInputContainer>
        </FormInputBlock>

        {/* Choose block */}
        {isOpenDropList && (
          <DropContainer
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={{
              borderTopLeftRadius: isOpenDropList === true ? 0 : 6,
              borderTopRightRadius: isOpenDropList === true ? 0 : 6,
              elevation: 7,
              marginLeft: isPersonalInfo ? 0 : 16,
              marginRight: isPersonalInfo ? 0 : 16,
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
                      key={key}
                      onPress={() => {
                        onChangeSearchText(item)
                        setSelectedLocation(item)
                        setFilterLocation(item)
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
    )
  },
)

export default SearchLocationDropSelect
