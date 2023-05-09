import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { observable, runInAction } from 'mobx'
import domain from '@/res/domain'
import { Platform } from 'react-native'
import { stripeApi } from '@/res/domain'

const AccountStore = observable({
  account: null,
})

export default AccountStore

export const getReviews = async () => {
  const reviews = await axios.get(`${domain}reviews`).then((r) => r.data)

  return reviews
}
const getPersonById = async (id) => {
  const userC = await axios
    .post(`${domain}getuserbyid`, {
      id: id,
    })
    .then((r) => r.data)
    .catch((r) => console.log(r))

  if (userC) {
    return userC
  }
  return {}
}

export const getUserById = async () => {
  let user = await AsyncStorage.getItem('@user')
  user = JSON.parse(user)
  let reviews = await getReviews()
  if (user) {
    const userC = await axios
      .post(`${domain}getuserbyid`, {
        id: user.id,
      })
      .then((r) => r.data)
      .catch((r) => console.log(r))

    if (userC) {
      userC.userReviews = reviews.filter((c) => +c.id_client == +user.id)
      return userC
    }
  }

  return {}
}

export const setAccount = async () => {
  const userCurrent = await getUserById()
  runInAction(() => {
    AccountStore.account = userCurrent
  })
}

export const getAccountInfo = async () => {
  const userCurrent = await getUserById()
  return {
    id: userCurrent.id,
    userType: userCurrent.userType,
    userAvatar: userCurrent.userAvatar,
    userSurName: userCurrent.userSurName,
    userName: userCurrent.userName,
    userNickName: userCurrent.userNickName,
    userDescription: userCurrent.userDescription,
    userPricePerHour: userCurrent.userPricePerHour,
    userEmail: userCurrent.userEmail,
    userPhoneNumber: userCurrent.userPhoneNumber,
    userLocation: userCurrent.userLocation,
    userGenres: userCurrent.userGenres,
    userMembers: userCurrent.userMembers,
    userMusicalInstrument: userCurrent.userMusicalInstrument,
    userPricePerHour: userCurrent.userPricePerHour,
    willingToTravel: userCurrent.willingToTravel,
    userSkills: {
      singByEar: userCurrent.userSkills?.includes('singByEar') || false,
      playByEar: userCurrent.userSkills?.includes('playByEar') || false,
      readSheetMusic:
        userCurrent.userSkills?.includes('readSheetMusic') || false,
    },
    userCurrencyType: userCurrent.userCurrencyType,
  }
}

export const getPayments = async () => {
  const userCurrent = await getUserById()

  return userCurrent.paymentsMethods
}

export const getPayouts = async () => {
  const userCurrent = await getUserById()

  return userCurrent.payoutMethods
}

export const getNotifications = async () => {
  const userCurrent = await getUserById()
  return userCurrent.userNotification
}

export const getMyDeals = async () => {
  const userCurrent = await getUserById()
  const deals = userCurrent?.userDeals
  for (let i = 0; i < deals.length; i++) {
    const item = deals[i]
    let person = {}
    if (userCurrent.userType == 'Contractor') {
      person = await getPersonById(item.idReceiver)
    } else {
      person = await getPersonById(item.idClient)
    }
    item.dealPerson = person
  }

  return deals
}
export const getMyAds = async () => {
  const userCurrent = await getUserById()
  return userCurrent.contractorAds
}

export const updateAccountInfo = async (data, files) => {
  const fd = new FormData()
  if (files) {
    files?.forEach((f, i) => {
      if (f.uri.includes('http')) {
        fd.append('file' + (i + 1), 'null')
      } else {
        const file = {
          name: f?.fileName ? f?.fileName : `photo${i + 1}.jpg`,
          type:
            f.uri.includes('.jpg') ||
            f.uri.includes('.png') ||
            f.uri.toLowerCase().includes('.jpeg')
              ? 'photo'
              : 'video',
          uri: Platform.OS === 'ios' ? f.uri.replace('file://', '') : f.uri,
        }
        fd.append('file' + (i + 1), file)
      }
    }) //
  }
  Object.keys(data).forEach((c) => {
    fd.append(c, data[c])
  })

  return await axios
    .post(`${domain}updateuserpersone`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((r) => r.data)
    .catch((e) => console.log('error on updateuserpersone', e))
}

export const updatePassword = async (data) => {
  return await axios.post(`${domain}updateuserpassword`, {
    ...data,
  })
}

export const updateNotification = async (data) => {
  return await axios
    .post(`${domain}updatenotification`, {
      ...data,
    })
    .catch((r) => console.log(r))
}

export const updateActiveCard = async (data) => {
  return await axios.post(`${domain}updateactivecard`, {
    ...data,
  })
}
export const updatePayoutMethod = async (data) => {
  return await axios.post(`${domain}updateactivecardpayout`, {
    ...data,
  })
}

export const updateCurrency = async (data) => {
  return await axios.post(`${domain}updatecurrency`, {
    ...data,
  })
}

export const addPayoutMethod = async (data) => {
  return await axios.post(`${domain}addpayoutcard`, {
    ...data,
  })
}

export const addPaymentCard = async (data) => {
  return await axios
    .post(`${domain}addpaymentcard`, {
      ...data,
    })
    .then((r) => r.data)
    .catch((r) => console.log(r))
}

export const deleteAccount = async (data) => {
  return await axios
    .post(`${domain}deleteuser`, {
      ...data,
    })
    .then(async (res) => {
      await AsyncStorage.removeItem('@user')
    })
}

export const signInByPhone = async (data) => {
  return await axios.post(`${domain}signinphone`, {
    ...data,
  })
}

export const loginByPhone = async (data) => {
  return await axios.post(`${domain}loginphone`, {
    ...data,
  })
}
export const setMessageToRestorePassword = async (data) => {
  return await axios.post(`${domain}forgote`, {
    ...data,
  })
}
export const forgotPass = async (data) => {
  return await axios.post(`${domain}restorepass`, {
    ...data,
  })
}

export const getCurrencies = async () => {
  return await axios.get(`${domain}currency`)
}

export const sendContact = async (data) => {
  return await axios.post(`${domain}contacts`, {
    ...data,
  })
}

export const addNewAd = async (data) => {
  return await axios.post(`${domain}addadscard`, {
    ...data,
  })
}

export const promoteAccount = async (data) => {
  return await axios
    .get(
      `${stripeApi}?email=${data.email}&name=${data.name}&amount=${data.amount}&product=${data.product0}&currency=${data.currency}`,
    )
    .then((r) => r.data)
}

export const promote = async (data) => {
  return await axios.post(`${domain}addnewad`, {
    ...data,
  })
}

export const updateAd = async (data) => {
  return await axios.post(`${domain}updateadscard`, {
    ...data,
  })
}

export const getDeals = async () => {
  return await axios.get(`${domain}deals`).then((r) => r.data)
}

export const addNewDeal = async (data, email, name, currency) => {
  return await axios
    .post(`${domain}adddealcard`, {
      ...data,
    })
    .then(async () => {
      const link = await axios
        .get(
          `${stripeApi}?email=${email}&name=${name}&amount=${
            data.totalPrice
          }&product=${'New Offer'}&currency=${currency}`,
        )
        .then((r) => r.data)

      return link
    })
}
