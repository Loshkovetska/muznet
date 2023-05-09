import React from 'react'
import { makeAutoObservable, action, observable, runInAction } from 'mobx'
import { apiMocks } from '@/api/mock/apiMocks'

import { rateAverageCount } from '@/components/helpers/rateAverageCount'
import axios from 'axios'
import domain from '@/res/domain'
import { userInfo } from './AccountStore'
class SearchApi {
  musicianList = []
  vendorList = []
  nothingWasFound = false
  isOpenFilters = false

  constructor() {
    makeAutoObservable(this, {
      musicianList: observable,
      vendorList: observable,
      nothingWasFound: observable,
      isOpenFilters: observable,
      resetState: action.bound,
      setList: action.bound,
      sortPopular: action.bound,
      searchInList: action.bound,
      setNothingWasFound: action.bound,
      setOpenFilters: action.bound,
    })
  }

  setOpenFilters(boolean) {
    this.isOpenFilters = boolean
  }
  setNothingWasFound() {
    this.nothingWasFound = false
  }
  resetState() {
    this.musicianList = []
    this.vendorList = []
  }
  sortPopular(data, isContractor) {
    const dataWithAverageRate = data.map((item) => {
      const reviewObject =
        isContractor === true ? item.userReview : item.adReview
      item.averageRate = rateAverageCount(reviewObject)
      return item
    })

    const sortedByAverageRate = dataWithAverageRate.sort((a, b) =>
      a.averageRate < b.averageRate ? 1 : -1,
    )
    return sortedByAverageRate
  }

  static async getReviews() {
    const reviews = await axios.get(`${domain}reviews`).then((r) => r.data)

    return reviews
  }

  async getMusicians() {
    const users = await axios
      .get(`${domain}getusersbyall`)
      .then((res) => res.data)
    let contractors = users.filter((f) => f.userType == 'Musician')
    let reviews = await SearchApi.getReviews()

    contractors = contractors.map((c) => {
      c.userReviews = reviews.filter((ci) => +ci.id_client == +c.id)
      return c
    })
    return contractors
  }

  async getVendors() {
    let ads = await axios.get(`${domain}ads`).then((res) => res.data)
    let reviews = await SearchApi.getReviews()
    ads = ads.map((c) => {
      c.adReview = reviews.filter((ci) => +ci.id_ads == +c.id)
      c.coordinate = {
        latitude: c.coordinate_latitude,
        latitudeDelta: c.coordinate_latitudeDelta,
        longitude: c.coordinate_longitude,
        longitudeDelta: c.coordinate_longitudeDelta,
      }
      return c
    })
    return ads
  }

  async setList(route, searchText) {
    if (route === 'ContractorWelcomeScreen') {
      const musicians = await this.getMusicians()
      runInAction(() => {
        this.musicianList = this.sortPopular(musicians || [], true)
      })

      return this.musicianList
    } else if (route === 'MusicianWelcomeScreen') {
      const vendors = await this.getVendors()

      runInAction(() => {
        this.vendorList = vendors || []
      })

      return this.vendorList
    } else if (
      route === 'ContractorListSearchScreen' ||
      route == 'ContractorMapSearchScreen'
    ) {
      const musicians = await this.getMusicians()

      let contractors = musicians || []
      if (searchText && searchText.length) {
        contractors = contractors.filter(
          (c) => c.userLocation.toLowerCase() == searchText.toLowerCase(),
        )
      }
      runInAction(() => {
        this.musicianList = contractors
      })

      return this.musicianList
    } else if (
      route === 'MusicianListSearchScreen' ||
      route == 'MusicianMapSearchScreen'
    ) {
      const vendors = await this.getVendors()

      let ads = vendors || []
      if (searchText && searchText.length) {
        ads = ads.filter(
          (c) => c.adLocation.toLowerCase() == searchText.toLowerCase(),
        )
      }
      runInAction(() => {
        this.vendorList = ads
      })

      return this.vendorList
    } else {
      return this.resetState()
    }
  }
  async searchInList(searchString, route) {
    if (route === 'ContractorListSearchScreen') {
      let users = await axios
        .post(`${domain}getusersbysearch`, {
          search: searchString,
        })
        .then((res) => res.data)
        .catch((e) => console.log(e))

      users = users?.filter((c) => c.userType == 'Musician')
      let reviews = await SearchApi.getReviews()
      users = users?.map((u) => {
        u.userReviews = reviews.filter((f) => +f.id_client == +u.id)
        return u
      })
      runInAction(() => {
        this.musicianList = users
        this.nothingWasFound = !users?.length
      })
    }
    if (route === 'MusicianListSearchScreen') {
      let ads = await axios
        .post(`${domain}getadsbysearch`, {
          search: searchString,
        })
        .then((res) => res.data)
        .catch((e) => console.log(e))

      let reviews = await SearchApi.getReviews()
      ads = ads.map((a) => {
        a.adReview = reviews.filter((f) => +a.id == f.id_ads)
        a.coordinate = {
          latitude: a.coordinate_latitude,
          latitudeDelta: a.coordinate_latitudeDelta,
          longitude: a.coordinate_longitude,
          longitudeDelta: a.coordinate_longitudeDelta,
        }
        return a
      })
      runInAction(() => {
        this.vendorList = ads
        this.nothingWasFound = !ads.length
      })
    }
  }
  duplicateValues(array) {
    const uniq = array
      .map((name) => {
        return {
          count: 1,
          name: name,
        }
      })
      .reduce((result, b) => {
        result[b.name] = (result[b.name] || 0) + b.count

        return result
      }, {})
    const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)

    return duplicates
  }
  async filter(params, route) {
    if (route == 'ContractorListSearchScreen') {
      let res = (await this.getMusicians()) || []

      if (params.genres.length && res.length) {
        res = res.filter((c) => {
          const genres = [...params.genres, ...c.userGenres]
          const duplicates = this.duplicateValues(genres)
          if (duplicates.length == params.genres.length) {
            return c
          }
        })
      }
      if (params.musicianInstruments.length && res.length) {
        res = res.filter((c) => {
          const instruments = [
            ...params.musicianInstruments,
            ...c.userMusicalInstrument,
          ]
          const duplicates = this.duplicateValues(instruments)
          if (duplicates.length == params.musicianInstruments.length) {
            return c
          }
        })
      }
      if (res.length && params.location.length) {
        res = res.filter(
          (c) =>
            c.userLocation.toLowerCase().trim() ==
            params.location.toLowerCase().trim(),
        )
      }
      if (res.length && params.willingToTravel.length) {
        res = res.filter(
          (c) => c.willingToTravel.toString() == params.willingToTravel,
        )
      }
      if (res.length && params.skills.length) {
        res = res.filter((c) => {
          let count = 0
          params.skills.split(',').forEach((ci) => {
            if (c.userSkills.includes(ci)) count++
          })

          if (count == params.skills.split(',').length) {
            return c
          }
        })
      }

      if (res.length) {
        res = res.filter(
          (r) =>
            +r.userPricePerHour >= params.priceRange.minPrice &&
            +r.userPricePerHour <= params.priceRange.maxPrice,
        )
      }

      if (res.length && params.sortBy) {
        switch (params.sortBy) {
          case 'Rating':
            res = res.sort((a, b) => {
              let reviewsA = 0,
                reviewsB = 0

              a.userReview.forEach((c) => {
                reviewsA += +c.reviewRate
              })
              reviewsA = reviewsA / a.userReview.length
              b.userReview.forEach((c) => {
                reviewsB += +c.reviewRate
              })
              reviewsB = reviewsB / a.reviewsB.length

              return reviewsB - reviewsA ? b : a
            })
            break
          default:
            break
        }
      }

      runInAction(() => {
        this.musicianList = res
        this.nothingWasFound = !res.length
      })
    } else {
      let res = (await this.getVendors()) || []
      if (params.date && params.date?.string.length && res.length) {
        res = res.filter((c) => {
          if (+c.adDate?.milliseconds == +params.date?.milliseconds) return c
        })
      }

      if (params.genres.length && res.length) {
        res = res.filter((c) => {
          const instr = c.adGenres.split(',')

          const genres = [...params.genres, ...instr]
          const duplicates = this.duplicateValues(genres)
          if (duplicates.length == params.genres.length) {
            return c
          }
        })
      }
      if (params.musicianInstruments.length && res.length) {
        res = res.filter((c) => {
          const instr = c.adMusicalInstrument.split(',')

          const instruments = [...params.musicianInstruments, ...instr]
          const duplicates = this.duplicateValues(instruments)
          if (duplicates.length == params.musicianInstruments.length) {
            return c
          }
        })
      }
      if (res.length && params.location.length) {
        res = res.filter(
          (c) =>
            c.adLocation.toLowerCase().trim() ==
            params.location.toLowerCase().trim(),
        )
      }
      if (res.length && params.willingToTravel.length) {
        res = res.filter((c) => c.willingToTravel == params.willingToTravel)
      }
      if (res.length && params.skills.length) {
        res = res.filter((c) => {
          let skills = [
            c.adSkills.singByEar == 'true' ? 'singByEar' : '',
            c.adSkills.playByEar == 'true' ? 'playByEar' : '',
            c.adSkills.readSheetMusic == 'true' ? 'readSheetMusic' : '',
          ].filter((ci) => ci.length)
          let count = 0
          params.skills.split(',').forEach((ci) => {
            if (skills.join(',').includes(ci)) count++
          })

          if (count == params.skills.split(',').length) {
            return c
          }
        })
      }
      if (res.length) {
        res = res.filter(
          (r) =>
            +r.userPricePerHour >= params.priceRange.minPrice &&
            +r.userPricePerHour <= params.priceRange.maxPrice,
        )
      }

      if (res.length && params.sortBy) {
        switch (params.sortBy) {
          case 'Rating':
            res = res.sort((a, b) => {
              let reviewsA = 0,
                reviewsB = 0

              a.adReview.forEach((c) => {
                reviewsA += +c.reviewRate
              })
              reviewsA = reviewsA / a.adReview.length
              b.adReview.forEach((c) => {
                reviewsB += +c.reviewRate
              })
              reviewsB = reviewsB / a.adReview.length
              return reviewsB - reviewsA ? b : a
            })
            break
          default:
            break
        }
      }

      runInAction(() => {
        this.vendorList = res
        this.nothingWasFound = !res.length
      })
    }
  }
}

const searchApiStore = new SearchApi()

export const SearchApiStoreStoreContext = React.createContext(searchApiStore)
export const useSearchApiStore = () =>
  React.useContext(SearchApiStoreStoreContext)
