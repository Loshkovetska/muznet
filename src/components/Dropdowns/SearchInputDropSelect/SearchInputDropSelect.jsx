import React from 'react'
import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

// Images
import IMAGES from '@/res/images'
const { SearchBigIcon, CrossGrayIcon } = IMAGES

import C from '@/res/colors'

// Styles
import { style } from './style'
const {
  Container,
  SearchInputBlock,
  SearchInput,
  SearchIconBlock,
  // Item
  ChosenBlock,
  ChoosenScrollView,
  Item,
  ChosenItem,
  ItemText,
  RemoveChosenItem,
} = style

const SearchInputDropSelect = ({
  isResetAll,
  isCloseAllDropdown,
  dataForChoose,
  searchPlaceholder,
  getChosenData,
  alreadyChosenInstrument,
}) => {
  const window = Dimensions.get('window')
  const [dimensions, setDimensions] = useState({ window })

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window })
    })
    return () => subscription?.remove()
  })

  // Local state
  const [chosenBlock, setChoosenBlock] = useState([])
  const [localChooseData, setLocalChooseData] = useState([])

  const [init, setInit] = useState(0)

  useEffect(() => {
    if (init === 0) {
      setLocalChooseData(dataForChoose)
      setInit(1)
    }
  }, [init, dataForChoose])

  const [filteredChooseData, setFilteredChooseData] = useState([])

  const [searchText, onChangeSearchText] = useState('')
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)

  const isFilter = searchText.length > 0

  const compareLetterNumber = searchText.length
  useEffect(() => {
    if (init > 0) {
      if (isFilter) {
        const newLocalData = localChooseData.map((item) => {
          const slicedItem = item.slice(0, compareLetterNumber).toLowerCase()
          if (slicedItem.includes(searchText.toLowerCase())) {
            return item
          } else {
            return
          }
        })
        const removeAllUndefined = newLocalData.filter((el) => el !== undefined)
        setFilteredChooseData(removeAllUndefined)
        setOpen(true)
      }
    }
    if (searchText?.length === 0) {
      setFilteredChooseData([])
      setOpen(false)
    }
  }, [searchText, chosenBlock, init])

  // If resetAll
  useEffect(() => {
    if (isResetAll === true) {
      onChangeSearchText('')
      setInputFocus1(C.lightGray)
      setChoosenBlock([])
      setLocalChooseData([])
      setFilteredChooseData([])
      setInit(0)
      setOpen(false)
    }
  }, [isResetAll])

  useEffect(() => {
    if (isCloseAllDropdown === true) {
      onChangeSearchText('')
      setOpen(false)
    }
  }, [isCloseAllDropdown])

  const handler = ({ value, action }) => {
    switch (action) {
      // Add to chosen
      case 'add':
        setChoosenBlock([...chosenBlock, value])
        // Push to form
        getChosenData([...chosenBlock, value])
        // Find in not choose
        const newLocalData = localChooseData.filter((item) => item !== value)
        const newFilteredLocalData = filteredChooseData.filter(
          (item) => item !== value,
        )
        // Remove from not choose
        setLocalChooseData(newLocalData)
        setFilteredChooseData(newFilteredLocalData)
        break
      // Remove from chosen
      case 'remove':
        // Find in chosen
        const newChosenData = chosenBlock.filter((item) => item !== value)
        // Remove from chosen
        setChoosenBlock(newChosenData)
        // Push to form
        getChosenData(newChosenData)
        // Return to not chosen
        setLocalChooseData([value, ...localChooseData])
        setFilteredChooseData([value, ...filteredChooseData])
        break
    }
  }

  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (
      init === 1 &&
      alreadyChosenInstrument !== undefined &&
      alreadyChosenInstrument?.length > 0
    ) {
      const common = alreadyChosenInstrument.filter((x) =>
        dataForChoose.includes(x),
      )
      const notChosen = dataForChoose.filter((x) => !common.includes(x))
      setChoosenBlock(alreadyChosenInstrument)
      setLocalChooseData(notChosen)
      setInit(2)
    }
  }, [init, alreadyChosenInstrument, dataForChoose])

  const isShowDropdownList =
    filteredChooseData.length > 0 && searchText.length > 0

  const openDropStyle = isShowDropdownList
    ? {
        shadowColor: 'rgba(23, 24, 25, 1)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        borderRadius: 6,
      }
    : {}

  return (
    <Container
      style={{
        zIndex: isShowDropdownList ? 1111 : -1,
        ...openDropStyle,
      }}
    >
      {/* Search Input */}
      <SearchInputBlock
        style={{
          backgroundColor: isShowDropdownList ? C.white : 'transparent',
        }}
      >
        <SearchIconBlock
          style={{
            zIndex: isShowDropdownList ? 1111 : -1,
          }}
        >
          <SearchBigIcon width={18} height={18} />
        </SearchIconBlock>

        <SearchInput
          value={searchText}
          cursorColor={C.inputCursor}
          selectionColor={C.lightGray}
          onFocus={() => {
            setInputFocus1(C.black)
          }}
          onBlur={() => {
            setInputFocus1(C.lightGray)
          }}
          style={{
            borderColor: inputFocus1,
            borderWidth: 1,
            borderColor: isShowDropdownList ? C.lightGray : inputFocus1,
            borderBottomLeftRadius: isShowDropdownList ? 0 : 6,
            borderBottomRightRadius: isShowDropdownList ? 0 : 6,
          }}
          placeholderTextColor={C.sBlack}
          placeholder={searchPlaceholder}
          keyboardType="default"
          onChangeText={onChangeSearchText}
        />
      </SearchInputBlock>
      {chosenBlock.length > 0 && !isShowDropdownList && (
        <ChosenBlock
          style={{
            paddingLeft: 0,
            marginLeft: -5,
            zIndex: isShowDropdownList ? 1111 : 1,
          }}
        >
          {chosenBlock.map((item, key) => {
            return (
              item !== undefined && (
                <ChosenItem key={key} isChosen={true}>
                  <ItemText isChosen={true}>{item}</ItemText>
                  <RemoveChosenItem
                    onPress={() => {
                      handler({
                        value: item,
                        action: 'remove',
                      })
                    }}
                  >
                    <CrossGrayIcon width={7} height={7} />
                  </RemoveChosenItem>
                </ChosenItem>
              )
            )
          })}
        </ChosenBlock>
      )}
      {isShowDropdownList && (
        <ChoosenScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{
            elevation: 4,
            zIndex: isShowDropdownList ? 1111 : 1,
          }}
        >
          {chosenBlock.length > 0 && (
            <ChosenBlock>
              {chosenBlock.map((item, key) => {
                return (
                  item !== undefined && (
                    <ChosenItem key={key} isChosen={true}>
                      <ItemText isChosen={true}>{item}</ItemText>
                      <RemoveChosenItem
                        onPress={() => {
                          handler({
                            value: item,
                            action: 'remove',
                          })
                        }}
                      >
                        <CrossGrayIcon width={7} height={7} />
                      </RemoveChosenItem>
                    </ChosenItem>
                  )
                )
              })}
            </ChosenBlock>
          )}

          <ChosenBlock isSearchResult={true}>
            {filteredChooseData.map((item, key) => {
              return (
                item !== undefined && (
                  <Item
                    key={key}
                    onPress={() => {
                      onChangeSearchText('')
                      handler({
                        value: item,
                        action: 'add',
                      })
                    }}
                  >
                    <ItemText>{item}</ItemText>
                  </Item>
                )
              )
            })}
          </ChosenBlock>
        </ChoosenScrollView>
      )}
    </Container>
  )
}

export default SearchInputDropSelect
