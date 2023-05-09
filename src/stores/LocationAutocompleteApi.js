import React from 'react'
import { Platform } from 'react-native'
import { makeAutoObservable, action, observable, runInAction } from 'mobx'
import { apiMocks } from '@/api/mock/apiMocks'
import { apiKey } from '@/res/apiKey'
import axios from 'axios'

class LocationAutocompleteApi {
  locationList = []

  constructor() {
    makeAutoObservable(this, {
      locationList: observable,
      setLocationList: action.bound,
    })
  }

  setLocationList({ inputValue, type }) {
    const isFullAddress = '&types=address'
    const iosMapApiKey = 'AIzaSyDGhdmlq3VJzRbKTvQ9zvmvN1-nqA8Q1bU'
    const androidMapApiKey = apiKey.geocodingApiKey
    const GOOGLE_PACES_API_BASE_URL =
      'https://maps.googleapis.com/maps/api/place'

    const GOOGLE_API_KEY =
      Platform.OS === 'ios' ? iosMapApiKey : androidMapApiKey
    const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}${isFullAddress}&components=country:us|country:de|country:fr|country:gb|country:ca&input=${inputValue}`

    return axios
      .get(apiUrl)
      .then((json) => {
        const { predictions } = json.data
        const onlyDescription = predictions.map((item) => {
          return item.description
        })
        runInAction(() => {
          this.locationList = []
          this.locationList = onlyDescription
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

const LocationAutocompleteApiStore = new LocationAutocompleteApi()

export const LocationAutocompleteApiStoreStoreContext = React.createContext(
  LocationAutocompleteApiStore,
)
export const useLocationAutocompleteApiStore = () =>
  React.useContext(LocationAutocompleteApiStoreStoreContext)
