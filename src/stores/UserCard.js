import axios from 'axios'
import { observable, runInAction } from 'mobx'
import domain from '@/res/domain'
import { getReviews, userInfo } from './AccountStore'

const UserCard = observable({
  user: null,
})

export default UserCard

export const getUser = async (id) => {
  const userC = await axios
    .post(`${domain}getuserbyid`, {
      id: id,
    })
    .then((r) => r.data)
    .catch((c) => alert(c))
  let reviews = await getReviews()
  if (userC) {
    userC.userReviews = reviews.filter((c) => +c.id_client == +id)
  }

  runInAction(() => {
    UserCard.user = userC
  })
}

export const getAds = async () => {
  let ads = await axios
    .get(`${domain}ads`)
    .then((r) => r.data)
    .catch((c) => alert(c))

  let reviews = await getReviews()
  if (ads) {
    ads = ads.map((a) => {
      a.adReview = reviews.filter((c) => {
        if (+c.id_ads == +a.id) return c
      })

      return a
    })
  }

  return ads || []
}

export const getAdsById = async (id) => {
  const ads = await getAds()
  const ad = ads?.find((d) => +d.id == +id)
  ad.adSkills = {
    singByEar: ad.adSkills_singByEar == 'true',
    playByEar: ad.adSkills_playByEar == 'true',
    readSheetMusic: ad.adSkills_readSheetMusic == 'true',
  }

  ad.coordinate = {
    latitude: ad.coordinate_latitude,
    longitude: ad.coordinate_longitude,
    latitudeDelta: ad.coordinate_latitudeDelta,
    longitudeDelta: ad.coordinate_longitudeDelta,
  }
  ad.adDate = {
    string: ad.adDate_string,
    milliseconds: ad.coordinate_milliseconds,
  }
  ad.eventStart = {
    string: ad.eventStart_string,
    milliseconds: ad.eventStart_milliseconds,
  }
  ad.eventEnd = {
    string: ad.eventEnd_string,
    milliseconds: ad.eventEnd_milliseconds,
  }

  runInAction(() => {
    UserCard.user = ad
  })
}
