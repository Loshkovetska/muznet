import React from 'react'
import { useState, useEffect } from 'react'
import { View, BackHandler, Alert, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// Components
import ChoosePromoteType from './ChoosePromoteType'
import ChoosePromoteDuration from './ChoosePromoteDuration'
import ConfirmAndPay from './ConfirmAndPay'
import AfterSubmitWindow from '@/components/AfterSubmitWindow'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Images
import IMAGES from '@/res/images'
import DOMAIN from '@/res/domain'
import AccountStore, {
  promoteAccount,
} from '../../stores/AccountStore'
import * as Linking from 'expo-linking'
import Constants from 'expo-constants';
//import * as InAppPurchases from 'expo-in-app-purchases';


const PromoteAdScreen = ({ stackName, welcomeScreenName }) => {
  const navigation = useNavigation()
  const { windowHeight, windowWidth } = getWindowDimension()
  const [isOpenChoosePromoteDuration, setOpenChoosePromoteDuration] = useState(
    false,
  )

  const [
    isCloseChoosePromoteDuration,
    setCloseChoosePromoteDuration,
  ] = useState(false)

  const [isOpenConfirmAndPay, setOpenConfirmAndPay] = useState(false)
  const [isCloseConfirmAndPay, setCloseConfirmAndPay] = useState(false)

  const [selectedPromoteType, setSelectedPromoteType] = useState()
  const [selectedPromoteDuration, setSelectedPromoteDuration] = useState({
    promotePrice: 21,
    promoteDuration: 7,
  })

  const [isOpenAfterSubmitMessage, setOpenAfterSubmitMessage] = useState(false)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (
          !isOpenChoosePromoteDuration &&
          !isOpenConfirmAndPay &&
          !isOpenAfterSubmitMessage
        ) {
          navigation.goBack()
        }
        if (isOpenChoosePromoteDuration === true && !isOpenConfirmAndPay) {
          setCloseChoosePromoteDuration(true)
          setTimeout(() => {
            setCloseChoosePromoteDuration(false)
          }, 590)
        }
        if (
          isOpenChoosePromoteDuration === true &&
          isOpenConfirmAndPay === true
        ) {
          setCloseConfirmAndPay(true)
          setTimeout(() => {
            setCloseConfirmAndPay(false)
          }, 590)
        }
        if (isOpenAfterSubmitMessage === true) {
          navigation.navigate(stackName, { screen: welcomeScreenName })
        }
        return true
      },
    )
    return () => {
      backHandler.remove()
    }
  }, [
    isOpenChoosePromoteDuration,
    isOpenConfirmAndPay,
    isOpenAfterSubmitMessage,
  ])

  const onSubmitBySupportedFunc = async () => {   

    try {
      const item = selectedPromoteType=='VipPromotion'?'apple_0005daily':'apple_0003daily'
      await InAppPurchases?.connectAsync();
      await InAppPurchases?.getProductsAsync([item]);
      await InAppPurchases?.purchaseItemAsync(item);


      InAppPurchases.setPurchaseListener(async (result) => {
        const { IAPResponseCode } = InAppPurchases;

          switch (result.responseCode) {
            case IAPResponseCode.OK:
              await InAppPurchases.finishTransactionAsync(result.results[0], false);
              await InAppPurchases?.disconnectAsync();
                     Alert.alert('Successfully purchased');
            case IAPResponseCode.USER_CANCELED:
              await InAppPurchases?.disconnectAsync();
              Alert.alert('User canceled the transaction');
            case IAPResponseCode.DEFERRED:
               Alert.alert('User does not have permissions to buy but requested parental approval (iOS only)');
            case IAPResponseCode.ERROR:
              await InAppPurchases?.disconnectAsync();
              return Alert.alert('Error')
          }
        })

    } catch (e) {
      await InAppPurchases?.disconnectAsync();
       Alert.alert('error,',  e)
    }
  }

  const onSubmitPromoteAd = async () => {
    const newPromote = {
      promoteType: selectedPromoteType,
      promoteDuration: selectedPromoteDuration.promoteDuration,
      promotePrice: selectedPromoteDuration.promotePrice,
      id: AccountStore.account.id,
    }

    const link = await promoteAccount({
      product0: `${selectedPromoteType}: ${
        selectedPromoteDuration.promoteDuration + ' days'
      }`,
      email: AccountStore.account.userEmail,
      name:
        AccountStore.account.userName + ' ' + AccountStore.account.userSurName,
      amount: selectedPromoteDuration.promotePrice,
      currency: AccountStore.account.userCurrencyType
        .toLowerCase()
        .split('-')[0],
    })

    console.log(link)
    if (link && link.length) {
      Linking.openURL(link)
    }

    return
  }


  const AfterSubmitButtonAction = () => {
    setOpenAfterSubmitMessage(false)
    navigation.navigate(stackName, { screen: welcomeScreenName })
  }

  return (
    <View
      style={{
        zIndex: 1015,
        height: windowHeight + 50,
        width: windowWidth,
      }}
    >
      {/* Initial tab always show */}
      <ChoosePromoteType
        selectedPromoteType={selectedPromoteType}
        setSelectedOption={setSelectedPromoteType}
        setOpenNextTab={setOpenChoosePromoteDuration}
      />

      {isOpenChoosePromoteDuration === true && (
        <ChoosePromoteDuration
          selectedPromoteType={selectedPromoteType}
          setSelectedOption={setSelectedPromoteDuration}
          isOpenTab={isOpenChoosePromoteDuration}
          setOpenTab={setOpenChoosePromoteDuration}
          setOpenNextTab={setOpenConfirmAndPay}
          isCloseTab={isCloseChoosePromoteDuration}
        />
      )}

      {isOpenConfirmAndPay === true && (
        <ConfirmAndPay
          selectedPromoteDuration={selectedPromoteDuration}
          isOpenTab={isOpenConfirmAndPay}
          setOpenTab={setOpenConfirmAndPay}
          onSubmitPromoteAd={onSubmitPromoteAd}
          onSubmitBySupportedFunc={onSubmitBySupportedFunc}
          isCloseTab={isCloseConfirmAndPay}
        />
      )}

      <AfterSubmitWindow
        title={'Your ad was promoted'}
        message={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        windowImage={IMAGES.SuccessPayment}
        isPromoteBigImage={true}
        buttonText={'Home Screen'}
        setOpen={setOpenAfterSubmitMessage}
        isOpen={isOpenAfterSubmitMessage}
        afterSubmitButton={AfterSubmitButtonAction}
      />

      {/* If payment error */}
      {/* <AfterSubmitWindow
                title={"Something went wrong"}
                message={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                windowImage={IMAGES.ErrorPayment}
                isPromoteBigImage={true}
                buttonText={"Try again"}
                setOpen={setOpenAfterSubmitMessage}
                isOpen={isOpenAfterSubmitMessage}
                afterSubmitButton={AfterSubmitButtonAction}
            /> */}
    </View>
  )
}

export default PromoteAdScreen




  // const stripe = useStripe()
//const clientSecret = 'sk_live_CDzKWG946sl5wxGX9NSk2bH1'

  // const {
  //   isApplePaySupported,
  // } = useApplePay()

  // const { initGooglePay, presentGooglePay } = useGooglePay()

  // const onSubmitBySupportedFunc = async () => {
  //   if (isApplePaySupported) {
  //     if (Platform.OS == 'android') {
  //       return
  //     }

  //     const cart = {
  //       cartItems: [
  //         {
  //           label:
  //             selectedPromoteType +
  //             ', ' +
  //             selectedPromoteDuration.promoteDuration +
  //             ' days',
  //           amount: selectedPromoteDuration.promotePrice,
  //           paymentType: 'Immediate',
  //         },
  //       ],
  //       country: 'US',
  //       currency: 'USD',
  //     }
  //     // const { error, paymentMethod } = await presentApplePay()
  //     // if (!stripe) {
  //     //   console.log('stripe is upset')
  //     // }
  //     if (error) {
  //       Alert.alert(
  //         'Apple Pay Not Completed',
  //         "'MuzNet.inc' was not able to complete the payment.Please try again.",
  //       )
  //       return
  //     } else {
  //       console.log('ok')

  //       const { error: confirmApplePayError } = await confirmApplePayPayment(
  //         clientSecret,
  //       )

  //       if (confirmApplePayError) {
  //         Alert.alert(
  //         'Apple Pay Not Completed',
  //         "'MuzNet.inc' was not able to complete the payment.Please try again.",
  //       )
  //       }

  //       if (!confirmApplePayError) {
  //         // setOpenAfterSubmitMessage(true)
  //         // setOpenChoosePromoteDuration(false)
  //         // setOpenConfirmAndPay(false)
  //       }
  //     }
  //   } else {
  //     if (Platform.OS == 'ios') {
  //       return
  //     }

  //     const { error } = await initGooglePay({
  //       merchantName: 'MuzNet.inc',
  //       countryCode: 'US',
  //       billingAddressConfig: {
  //         format: 'FULL',
  //         isPhoneNumberRequired: true,
  //         isRequired: true,
  //       },
  //       isEmailRequired: true,
  //     })

  //     if (error) {
  //       console.log(error)

  //       Alert.alert(
  //         'Google Pay Not Completed',
  //         "'MuzNet.inc' was not able to complete the payment.Please try again.",
  //       )

  //       return
  //     }
  //     const { error: presentError } = await presentGooglePay({
  //       clientSecret,
  //       forSetupIntent: true,
  //       currencyCode: 'USD',
  //     })
  //     if (presentError) {
  //       console.log(presentError)

  //       Alert.alert(
  //         'Google Pay Not Completed',
  //         "'MuzNet.inc' was not able to complete the payment.Please try again.",
  //       )

  //       return
  //     }
  //   }
  // }