import React from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import { makeAutoObservable, action, runInAction, observable } from 'mobx'
import { apiMocks } from '@/api/mock/apiMocks'

import * as Location from 'expo-location'
import Geocoder from 'react-native-geocoding'
import { rateAverageCount } from '@/components/helpers/rateAverageCount'
import { apiKey } from '@/res/apiKey'
import axios from 'axios'
import domain from '@/res/domain'
import { userInfo } from './AccountStore'
class MapSearchApi {
  musicianMapData = []
  vendorMapData = []
  userCurrentCoords = {}
  userCoordsFromSearch = {}

  isOpenFilters = false

  constructor() {
    makeAutoObservable(this, {
      musicianMapData: observable,
      vendorMapData: observable,
      userCurrentCoords: observable,
      userCoordsFromSearch: observable,
      isGrantedLocationPermission: observable,
      isOpenFilters: observable,

      resetState: action.bound,
      setMapData: action.bound,
      setUserCurrentCoords: action.bound,
      setCoordsFromSearch: action.bound,
      searchInList: action.bound,
      setOpenFilters: action.bound,
    })
  }

  setOpenFilters(boolean) {
    this.isOpenFilters = boolean
  }

  resetState() {
    this.musicianMapData = []
    this.vendorMapData = []
  }

  setCoordsFromSearch(addressFropDropdown) {
    ;(async () => {
      const key = apiKey.geocodingApiKey
      Geocoder.init(key)
      // Search by address
      Geocoder.from(addressFropDropdown)
        .then((json) => {
          const result = json.results[0].geometry.location
          if (result !== undefined) {
            const userProfileRegion = {
              region: {
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.lng),
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
              },
            }
            runInAction(() => {
              this.userCoordsFromSearch = {}
              return (this.userCoordsFromSearch = userProfileRegion)
            })
          }
        })
        .catch((error) => console.warn(error))
    })()
  }

  setUserCurrentCoords() {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({})

        const oneDegreeOfLongitudeInMeters = 111.32 * 1000
        const circumference = (40075 / 360) * 1000

        const latDelta =
          location.coords.accuracy *
          (1 / (Math.cos(location.coords.latitude) * circumference))
        const lonDelta = location.coords.accuracy / oneDegreeOfLongitudeInMeters

        const userProfileRegion = {
          region: {
            latitude: parseFloat(location.coords.latitude||0),
            longitude: parseFloat(location.coords.longitude||0),
            latitudeDelta: parseFloat(latDelta||0),
            longitudeDelta: parseFloat(lonDelta||0),
          },
        }

        runInAction(() => {
          this.userCurrentCoords = userProfileRegion
        })
      }

      if (status === 'denied' || status === 'never_ask_again') {
        runInAction(() => {
          return (this.userCurrentCoords = {})
        })
      }
    })()
  }

  setMapData(route) {}
}

const MapSearchApiStore = new MapSearchApi()

export const MapSearchApiStoreStoreContext = React.createContext(
  MapSearchApiStore,
)
export const useMapSearchApiStore = () =>
  React.useContext(MapSearchApiStoreStoreContext)
