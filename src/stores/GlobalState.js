import axios from 'axios'
import { observable, runInAction } from 'mobx'
import domain from '@/res/domain'

const GlobalState = observable({
  currentTab: '',
  locations: [],
  tags: [],
})

export default GlobalState

export const getLocations = async () => {
  axios.get(`${domain}locations`).then((res) => {
    if (res.data) {
      runInAction(() => {
        GlobalState.locations = res.data
      })
    }
  }).catch((c)=>console.log(c))
}

export const getTags = () => {
  axios.get(`${domain}tags`).then((r) => {
    runInAction(() => {
      GlobalState.tags = r.data
    })
  }).catch((c)=>console.log(c))
}

export const getLocationsByName = async () => {}

export const getTagsByName = async () => {}
