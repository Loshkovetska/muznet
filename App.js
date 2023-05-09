import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './navigation/Router'
// Fonts
import { useFonts } from 'expo-font' //'@use-expo/font'
import * as Linking from 'expo-linking'
import { StripeProvider } from '@stripe/stripe-react-native'

const customFonts = {
  MulishLight: require('./assets/fonts/Mulish-Light.otf'),
  MulishRegular: require('./assets/fonts/Mulish-Regular.otf'),
  MulishMedium: require('./assets/fonts/Mulish-Medium.otf'),
  MulishSemiBold: require('./assets/fonts/Mulish-SemiBold.otf'),
  MulishExtraBold: require('./assets/fonts/Mulish-ExtraBold.otf'),
  MulishBold: require('./assets/fonts/Mulish-Bold.otf'),
  MulishBlack: require('./assets/fonts/Mulish-Black.otf'),
}

const prefix = Linking.createURL('/')
export default function App() {
  const [isLoaded] = useFonts(customFonts)
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        OnBoardingScreen: '',
        LoginStack: {
          path: 'login',
          screens: {
            WelcomeBackScreen: {
              path: '',
            },
            LoginScreen: {
              path: 'login-by-phone',
            },
            ForgetPasswordScreen: {
              path: 'forget-password',
            },
            ResetPasswordScreen: {
              path: 'reset-password/:email',
            },
          },
        },
        SingUpScreen: {
          screens: {
            FirstSignUpScreen: {
              path: 'singup',
            },
            SignUpScreen: {
              path: 'singup2',
            },
            VerifyScreen: {
              path: 'verify',
            },
            AddProfileInfo: {
              path: 'add-info',
            },
          },
        },
        ContractorStack: {
          path: 'contractor',
          screens: {
            ContractorWelcomeScreen: '',
            ContractorListSearchScreen: 'search',
            ContractorMapSearchScreen: 'map',
            MusicianCardScreen: {
              path: 'musicians/:id',
            },
            ContractorCardScreen: {
              path: 'contractors/:id',
            },
            ContractorMessagesScreen: 'chat',
            ContractorChatScreen: {
              path: 'chat/:id',
            },
            ContractorAccountScreen: 'account',
            ContractorLeaveFeedbackScreen: 'feedback',
            ContractorPromoteAdScreen: 'promote',
            ContractorMyDealsScreen: 'deals',
            ContractorCalendarScreen: 'calendar',
            ContractorCommunityScreen: 'community',
          },
        },
        MusicianStack: {
          path: 'musician',
          screens: {
            MusicianWelcomeScreen: '',
            MusicianListSearchScreen: 'search',
            MusicianMapSearchScreen: 'map',

            MusicianMessagesScreen: 'chat',
            MusicianChatScreen: {
              path: 'chat/:id',
            },
            MusicianAccountScreen: 'account',
            ContractorAdsCardScreen: 'ads',
            MusicianPromoteAdScreen: 'promote',
            MusicianMyDealsScreen: 'deals',
            MusicianCalendarScreen: 'calendar',
            MusicianCommunityScreen: 'community',
          },
        },
        CommunityStack: {
          path: 'community',
          screens: {
            CommunityScreen: {
              path: '/:id?',
            },
          },
        },
      },
    },
  }

  if (!isLoaded) {
    return null
  }
  return (
    <NavigationContainer linking={linking}>
      <StripeProvider
        publishableKey="pk_live_4iNQQSZ2gyrPJ1brvDwOhU9A"
        urlScheme="muznet://"
        merchantIdentifier="merchant.com.muzNet"
      >
        <Router />
      </StripeProvider>
    </NavigationContainer>
  )
}
