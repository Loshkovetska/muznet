import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Animated, Keyboard, View } from 'react-native'
// Components
import DropSelect from '@/components/Dropdowns/DropSelect'
import SearchInputDropSelect from '@/components/Dropdowns/SearchInputDropSelect'
import SearchLocationDropSelect from '@/components/Dropdowns/SearchLocationDropSelect'
import DropSelectCalendar from '@/components/Dropdowns/DropSelectCalendar'
import PriceRangeSlider from './PriceRangeSlider'
import CheckBoxWithText from '@/components/Buttons/CheckBoxWithText'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateBottomFilters } from './useAnimateBottomFilters'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
// Images
import IMAGES from '@/res/images'
const { CrossBlackIcon } = IMAGES
// Variables
import C from '@/res/colors'
import { S } from '@/res/strings'

// Styles
import { style } from './style'
const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  FilterBlock,
  CheckboxBlock,
  CheckboxBlockTitle,
  ContentBlock,
  ContentBlockRow,
  ContainerLink,
  ContainerLinkText,
  ButtonSubmit,
  ButtonSubmitText,
} = style

// Store
import { observer } from 'mobx-react-lite'
import { useSearchApiStore } from '@/stores/SearchApi'
import { useMapSearchApiStore } from '@/stores/MapSearchApi'
import { observable, runInAction } from 'mobx'

export const isFilterSelected = observable({
  isfilled: false,
})

const SearchFilters = observer(({ isContractor, isForMap }) => {
  const route = useRoute()
  const storeApi =
    isForMap === true ? useMapSearchApiStore() : useSearchApiStore()

  const { isOpenFilters, setOpenFilters } = storeApi
  const isKeyboardOpen = isKeyboardShown()

  const { windowHeight, windowWidth } = getWindowDimension()
  const { onPress, height } = useAnimateBottomFilters({ isOpenFilters })

  // Sort by
  const [isOpen, setIsOpen] = useState(false)
  const [sortType, setSortType] = useState(null)
  const toggling = (state) => setIsOpen(state)
  const onPositionSelect = (value) => () => {
    setSortType(value)
    setIsOpen(false)
  }

  // Genres Search
  const [chosenGenres, getChosenGenres] = useState([])
  // Instruments Search
  const [chosenInstrument, getChosenInstrument] = useState([])
  // Get location
  const [chosenLocation, getChosenLocation] = useState('')
  // Calendar
  const [isCalendarOpen, setCalendarOpen] = useState(false)
  const [chosenDate, getChosenDate] = useState('')

  const [priceRange, getPriceRange] = useState({
    minPrice: '',
    maxPrice: '',
  })

  // Checkbox state
  const [isWillingToTravel, setWillingToTravel] = useState(false)

  const [isSingByEar, setSingByEar] = useState(false)
  const [isPlayByEar, setPlayByEar] = useState(false)
  const [isReadSheetMusic, setReadSheetMusic] = useState(false)

  useEffect(() => {
    // console.log("🚀 ~ file: SearchFilters.jsx ~ line 58 ~ useEffect ~ chosenLocation", isCalendarOpen)
  }, [chosenDate, priceRange, isCalendarOpen])

  const [isResetAll, setResetAll] = useState(false)
  const clearAllFilters = () => {
    // For components set reset
    setResetAll(true)
    Keyboard.dismiss()
    // Components reset
    setIsOpen(false)
    setSortType(null)
    getChosenGenres(null)
    getChosenInstrument(null)
    getChosenLocation(null)
    getChosenDate(null)
    getPriceRange({
      minPrice: '',
      maxPrice: '',
    })
    // Checkboxes
    setWillingToTravel(false)
    setSingByEar(false)
    setPlayByEar(false)
    setReadSheetMusic(false)

    // Set reset to default
    setTimeout(() => {
      setResetAll(false)
      runInAction(() => {
        isFilterSelected.isfilled = false
      })
    }, 0)
  }
  const [isCloseAllDropdown, setCloseAllDropdown] = useState(false)
  useEffect(() => {
    if (isCloseAllDropdown === true) {
      toggling(false)
      // Set reset to default
      setTimeout(() => {
        setCloseAllDropdown(false)
      }, 0)
    }
  }, [isCloseAllDropdown])

  const filterSearch = () => {
    let skills = [
      isSingByEar ? 'singByEar' : '',
      isPlayByEar ? 'playByEar' : '',
      isReadSheetMusic ? 'readSheetMusic' : '',
    ].filter((f) => f.length)

    if (skills.length) {
      skills = skills.join(',')
    } else skills = ''
    storeApi.filter(
      {
        sortBy: sortType,
        genres: chosenGenres,
        musicianInstruments: chosenInstrument,
        location: chosenLocation,
        date: chosenDate,
        priceRange: priceRange,
        willingToTravel: isWillingToTravel ? isWillingToTravel.toString() : '',
        skills: skills,
      },
      route.name,
    )
    runInAction(() => {
      isFilterSelected.isfilled = true
    })
    setOpenFilters(false)
    onPress(false)
    setCloseAllDropdown(true)
  }

  return (
    <>
      {isOpenFilters && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        ></View>
      )}
      <Animated.View
        style={{
          zIndex: 1000,
          height,
          // maxHeight: windowHeight - 50,
          // height: "90%",
          width: windowWidth,
          justifyContent: 'center',
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <FilterContainer style={{ elevation: 100 }}>
          {/* Header */}
          <Header>
            <HeaderClose
              onPress={() => {
                setOpenFilters(false)
                onPress(false)
                setCloseAllDropdown(true)
              }}
            >
              <CrossBlackIcon width={16} height={16} />
            </HeaderClose>

            <HeaderTitle>Sort and filter</HeaderTitle>
          </Header>
          {/* Sort and filters */}
          <FilterBlock keyboardShouldPersistTaps={'handled'}>
            <DropSelect
              selectedValue={sortType}
              toggling={toggling}
              isOpen={isOpen}
              onSelect={onPositionSelect}
              dropHeader={S.SortByOptions.dropHeader}
              dropOptions={S.SortByOptions.dropOptions}
              isResetAll={isResetAll}
            />
            {/* Search music genre */}
            <SearchInputDropSelect
              dataForChoose={S.Genres}
              searchPlaceholder={'Choose music genres'}
              getChosenData={getChosenGenres}
              isResetAll={isResetAll}
              isCloseAllDropdown={isCloseAllDropdown}
            />
            {/* Search instruments */}
            <SearchInputDropSelect
              dataForChoose={S.Instruments}
              searchPlaceholder={'Choose instruments'}
              getChosenData={getChosenInstrument}
              isResetAll={isResetAll}
              isCloseAllDropdown={isCloseAllDropdown}
            />
            {/* Search location */}
            <SearchLocationDropSelect
              setFilterLocation={getChosenLocation}
              isResetAll={isResetAll}
              isCloseAllDropdown={isCloseAllDropdown}
              placeholderText={'Any location'}
            />

            {/* Willing checbox */}
            <CheckboxBlock isWilling={true}>
              <CheckBoxWithText
                checkboxState={isWillingToTravel}
                setCheckboxState={setWillingToTravel}
                checkboxTitle={'Willing to travel interstate for gigs'}
              />
            </CheckboxBlock>

            {/* Search music genre */}
            {!isContractor && (
              <DropSelectCalendar
                setFilterDate={getChosenDate}
                setCalendarOpen={setCalendarOpen}
                isResetAll={isResetAll}
                isCloseAllDropdown={isCloseAllDropdown}
                placeholderText={'Any date'}
              />
            )}
            {/* Price range slider */}
            <PriceRangeSlider
              getPriceRange={getPriceRange}
              isResetAll={isResetAll}
            />

            {/* Skills Checkbox */}
            <CheckboxBlock>
              <CheckboxBlockTitle>Skills:</CheckboxBlockTitle>

              {/* Sing by ear */}
              <CheckBoxWithText
                checkboxState={isSingByEar}
                setCheckboxState={setSingByEar}
                checkboxTitle={'Sing by ear'}
              />

              {/* Play By ear */}
              <CheckBoxWithText
                checkboxState={isPlayByEar}
                setCheckboxState={setPlayByEar}
                checkboxTitle={'Play By ear'}
              />

              {/* Read sheet music */}
              <CheckBoxWithText
                checkboxState={isReadSheetMusic}
                setCheckboxState={setReadSheetMusic}
                checkboxTitle={'Read sheet music'}
              />
            </CheckboxBlock>
          </FilterBlock>

          <ContentBlock isKeyboardOpen={isKeyboardOpen}>
            <ContentBlockRow>
              <ContainerLink
                onPress={() => {
                  clearAllFilters()
                }}
              >
                <ContainerLinkText>Clear all</ContainerLinkText>
              </ContainerLink>
              <ButtonSubmit onPress={filterSearch}>
                <ButtonSubmitText>
                  {isContractor ? 'Show Perfomers' : 'Show Ads'}
                </ButtonSubmitText>
              </ButtonSubmit>
            </ContentBlockRow>
          </ContentBlock>
        </FilterContainer>
      </Animated.View>
    </>
  )
})

export default SearchFilters
