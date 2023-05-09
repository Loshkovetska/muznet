import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  LogBox,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { useNavigation, useRoute } from '@react-navigation/native'
// Components
import ItemMusician from '@/components/AdsList/ItemMusician'
import ItemVendor from '@/components/AdsList/ItemVendor'
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
// Images
import IMAGES from '@/res/images'
const { MapUserLocationIcon } = IMAGES
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'

import { mapStandardStyle } from './mapData'

// Store
import { observer } from 'mobx-react-lite'
import { useMapSearchApiStore } from '@/stores/MapSearchApi'
import { useSearchApiStore } from '../../stores/SearchApi'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 105
const CARD_WIDTH = width * 0.85
const SPACING_FOR_CARD_INSET = width * 0.1 - 20

//////////////////////////////////////////////////////////////////////////////

const ExploreScreen = observer(() => {
  const _map = useRef(null)
  const _scrollView = useRef(null)
  LogBox.ignoreLogs(['Unhandled'])
  const navigation = useNavigation()
  const route = useRoute()
  const isForContractor = route.name === 'ContractorMapSearchScreen'
  const { windowHeight, windowWidth } = getWindowDimension()
  // Store
  const {
    userCurrentCoords,
    setUserCurrentCoords,
    userCoordsFromSearch,
  } = useMapSearchApiStore()
  const { musicianList, vendorList } = useSearchApiStore()
  const mapData = isForContractor ? musicianList : vendorList

  const defaultMapState = {
    region: {
      latitude:
        mapData && mapData.length
          ? parseFloat(mapData[0]?.coordinate?.latitude)
          : 33.66252098453488,
      longitude:
        mapData && mapData.length
          ? parseFloat(mapData[0]?.coordinate?.longitude)
          : -101.69318789741597,
      latitudeDelta: 1.02,
      longitudeDelta: 100.2,
    },
  }

  const [state, setState] = useState(defaultMapState)

  function isEmpty(obj) {
    return Object.keys(obj).length === 0
  }
  // Set list
  useEffect(() => {
    const isExistCurrentLocation =
      isEmpty(userCurrentCoords) === false ? userCurrentCoords : defaultMapState
    const { region } = isExistCurrentLocation
    if (!region) return
    const newCamera = {
      center: { ...region },
      pitch: 0,
      heading: 0,
      zoom: isEmpty(userCurrentCoords) === false ? 13 : 1,
    }

    if (region !== undefined) {
      _map.current.animateCamera(newCamera, { duration: 400 })
    }
  }, [userCurrentCoords])

  useEffect(() => {
    const { region } = userCoordsFromSearch
    if (!region) return

    const newCamera = {
      center: {
        ...region,
      },
      pitch: 0,
      heading: 0,
      zoom: 13,
    }

    if (region !== undefined) {
      _map.current.animateCamera(newCamera, { duration: 400 })
    }
  }, [userCoordsFromSearch])

  // Map animation
  let mapIndex = 0

  let mapAnimation = new Animated.Value(0)

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3) // animate 30% away from landing on the next item
      if (index >= mapData.length) {
        index = mapData.length - 1
      }
      if (index <= 0) {
        index = 0
      }
      clearTimeout(regionTimeout)
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index
          setTimeout(() => {
            setCurrentIndex(mapIndex)
            const { coordinate } = mapData[index]

            _map.current.animateToRegion(
              {
                latitude: parseFloat(coordinate.latitude) || 0,
                latitudeDelta: parseFloat(coordinate.latitudeDelta) || 0,
                longitude: parseFloat(coordinate.longitude) || 0,
                longitudeDelta: parseFloat(coordinate.longitudeDelta) || 0,
              },
              400,
            )
          }, 400)
        }
      }, 10)
    })
  })

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key

    let x = markerID * CARD_WIDTH + markerID * 20
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true })
  }

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
      }}
    >
      <MapView
        ref={_map}
        // initialRegion={state.region}
        // region={{
        //   latitude: 48.6304526,
        //   latitudeDelta: -0.004108305729096278,
        //   longitude: 22.2721646,
        //   longitudeDelta: 0.00026370823661757593,
        // }}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStandardStyle}
        isAccessibilityElement={false}
        showsUserLocation={true}
        toolbarEnabled={false}
        showsCompass={false}
        showsMyLocationButton={false}
        minZoomLevel={2.5}
      >
        {mapData?.map((marker, index) => {
          const isActive = index === currentIndex
          const isActiveMark = isActive ? styles.activeMark : styles.defaultMark
          const isActiveText = isActive
            ? styles.activeMarkerText
            : styles.markerText

          let coordinates = {
            latitude: parseFloat(0),
            longitude: parseFloat(0),
          }

          if (marker.coordinate) {
            coordinates = {
              latitude:
                parseFloat(marker.coordinate?.latitude) || parseFloat(0),
              longitude:
                parseFloat(marker.coordinate?.longitude) || parseFloat(0),
            }
          }

          return (
            <Marker
              zIndex={isActive ? 1000 : 0}
              key={index}
              coordinate={{
                ...coordinates,
              }}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View
                style={{
                  ...isActiveMark,
                }}
              >
                <Animated.Text
                  style={{
                    ...isActiveText,
                  }}
                >
                  {marker.userCurrencyType?.includes('-')
                    ? marker.userCurrencyType?.split('-')[1]
                    : marker.userCurrencyType}{' '}
                  {marker.userPricePerHour}
                </Animated.Text>
              </Animated.View>
            </Marker>
          )
        })}
      </MapView>
      <View style={styles.bottomCardViewContainer}>
        <TouchableOpacity
          onPress={() => {
            setUserCurrentCoords()
          }}
          style={styles.locationUserMap}
        >
          <MapUserLocationIcon width={20} height={20} />
        </TouchableOpacity>

        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.bottomCardView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
        >
          {mapData?.map((marker, id) => {
            return (
              <View style={styles.card} key={id}>
                {isForContractor === true ? (
                  <ItemMusician
                    data={marker}
                    key={id}
                    isDisableBottomMargin={true}
                  />
                ) : (
                  <ItemVendor
                    data={marker}
                    key={id}
                    isDisableBottomMargin={true}
                  />
                )}
              </View>
            )
          })}
        </Animated.ScrollView>
      </View>
    </View>
  )
})
export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    minHeight: 500,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomCardViewContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    width: '100%',
  },
  bottomCardView: {
    width: '100%',
  },
  card: {
    borderRadius: 6,
    marginHorizontal: 10,
    height: '100%',
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  activeMark: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    minWidth: 58,
    backgroundColor: C.black,
    elevation: 25,
    borderRadius: 50,
  },
  defaultMark: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C.white,
    height: 32,
    minWidth: 58,
    borderRadius: 50,
  },
  markerText: {
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 5,
    fontFamily: F.bold,
    fontSize: 15,

    color: C.black,
  },
  activeMarkerText: {
    color: C.white,
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 5,
    fontFamily: F.bold,
    fontSize: 15,
  },
  locationUserMap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: C.black,
    borderRadius: 24,
    position: 'absolute',
    top: -70,
    right: 16,
    zIndex: 900,
    paddingTop: 2,
    paddingRight: 2,
  },
})
