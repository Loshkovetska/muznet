import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
// Components
import PersonalContractorInfoTab from './PersonalContractorInfoTab'
import PersonalMusicianInfoTab from './PersonalMusicianInfoTab'
import ChangePasswordTab from './ChangePasswordTab'
import PaymentAndPayoutTab from './PaymentAndPayoutTab'
import NotificationTab from './NotificationTab'
import TermsOfServiceTab from './TermsOfServiceTab'
import MyAdsTab from './MyAdsTab'
import LeaveFeedbackNotification from '@/components/LeaveFeedbackNotification/LeaveFeedbackNotification'
import FaqTab from './FaqTab'
import InviteFriendsPopup from './InviteFriendsPopup'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon } = IMAGES
// Styles
import { style } from './style'
import { S } from '@/res/strings'
const {
  Container,
  Content,
  Header,
  Welcome,
  HeaderImageBlock,
  HeaderImage,
  // Link list
  AccountLinkList,
  AccountLink,
  AccountLinkText,
  AccountLinkIcon,
  InviteFriendsButton,
  InviteFriendsButtonText,
  LogOutButton,
  LogOutButtonText,
} = style
// Mixins
import { M } from '@/res/mixin'
const { BlackBtn, BlackBtnText } = M
// Store
import { observer } from 'mobx-react-lite'
import { useAccountApiStore } from '@/stores/AccountApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AccountStore from '@/stores/AccountStore'
import { View } from 'react-native'
import { observable, runInAction } from 'mobx'

export const UserNameState = observable({
  name: '',
})

const AccountIntroScreen = observer(
  ({ stackName, myDealsScreenName, isContractor }) => {
    const navigation = useNavigation()
    const {
      isOpenPersonalInfoTab,
      setOpenTabs,
      setCloseAllTabs,
      isOpenNotificationTab,
      isOpenPaymentTab,
      isOpenChangePasswordTab,
      isOpenMyAdsTab,
      isOpenTermOfServiceTab,
      isOpenFaqTab,
      isOpenPrivacy,
      isOpenLicense,
    } = useAccountApiStore()
    const { windowHeight, windowWidth } = getWindowDimension()

    // Invite friends popup state
    const [isOpenInviteFriendsBlock, setOpenInviteFriendsBlock] = useState(
      false,
    )

    useEffect(() => {
      const unsubscribe = navigation.addListener('blur', () => {
        setCloseAllTabs()
      })
      return unsubscribe
    }, [navigation])

    useEffect(() => {
      if (!UserNameState.name?.length && AccountStore.account) {
        runInAction(() => {
          UserNameState.name = AccountStore.account?.userName
        })
      }
    }, [AccountStore.account])

    const tabsLink =
      isContractor === true
        ? S.AccountTabs.contractorTabs
        : S.AccountTabs.musicianTabs

    const stackForSwitch = isContractor ? 'MusicianStack' : 'ContractorStack'
    const screenForSwitch = isContractor
      ? 'MusicianAccountScreen'
      : 'ContractorAccountScreen'

    if (!AccountStore.account) return <></>
    const userImage =
      AccountStore.account.userAvatar && AccountStore.account.userAvatar?.length
        ? AccountStore.account.userAvatar[0]
        : IMAGES.Logo

    const userName = UserNameState.name
    return (
      <Container
        style={{
          width: windowWidth,
          height: windowHeight,
          paddingBottom: 0,
        }}
      >
        <Content showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Header>
            <Welcome>Hello, {userName}</Welcome>

            <HeaderImageBlock
              activeOpacity={1}
              // onPress={() => {
              //   navigation.navigate(stackForSwitch, {
              //     screen: screenForSwitch,
              //   })
              // }}
            >
              <HeaderImage
                source={{
                  uri: userImage,
                }}
                resizeMode={'cover'}
              />
            </HeaderImageBlock>
          </Header>

          {/* Link list */}
          <AccountLinkList>
            {tabsLink.map((tabName, id) => {
              if (tabName === 'My Ads' && !isContractor) return null

              return (
                <AccountLink
                  style={{
                    borderBottomWidth: 1,
                  }}
                  onPress={() => {
                    setOpenTabs({
                      tabName: tabName,
                      isOpen: true,
                    })
                  }}
                  key={id}
                >
                  <AccountLinkText>{tabName}</AccountLinkText>

                  <AccountLinkIcon>
                    <GoBackIcon width={9} height={16} />
                  </AccountLinkIcon>
                </AccountLink>
              )
            })}

            <AccountLink
              style={{
                borderBottomWidth: 0,
              }}
              onPress={() => {
                navigation.navigate(stackName, {
                  screen: myDealsScreenName,
                })
              }}
            >
              <AccountLinkText>My Deals</AccountLinkText>

              <AccountLinkIcon>
                <GoBackIcon width={9} height={16} />
              </AccountLinkIcon>
            </AccountLink>

            {/* Notification */}
            <LeaveFeedbackNotification />
          </AccountLinkList>

          {/* Promote my ads */}
          {!isContractor && (
            <BlackBtn
              onPress={() => {
                navigation.navigate('MusicianStack', {
                  screen: 'MusicianPromoteAdScreen',
                })
              }}
            >
              <BlackBtnText>Promote My Ad</BlackBtnText>
            </BlackBtn>
          )}
          {/* Invite friends popup */}
          <InviteFriendsButton
            style={{
              marginTop: isContractor === true ? 0 : 8,
            }}
            onPress={() => {
              setOpenInviteFriendsBlock(true)
            }}
          >
            <InviteFriendsButtonText>Invite Friends</InviteFriendsButtonText>
          </InviteFriendsButton>

          {/* Log out */}
          <LogOutButton
            onPress={async () => {
              await AsyncStorage.removeItem('@user')

              navigation.navigate('LoginStack', {
                screen: 'WelcomeBackScreen',
              })
            }}
          >
            <LogOutButtonText>Log Out</LogOutButtonText>
          </LogOutButton>
          <View
            style={{
              paddingBottom: 200,
            }}
          ></View>
        </Content>

        {/* Invite friends popup */}
        {isOpenInviteFriendsBlock && (
          <InviteFriendsPopup
            isOpenBottomPopup={isOpenInviteFriendsBlock}
            setOpenBottomPopup={setOpenInviteFriendsBlock}
          />
        )}

        {/* Personal info tab */}
        {isContractor ? (
          <PersonalContractorInfoTab isOpenTab={isOpenPersonalInfoTab} />
        ) : (
          <PersonalMusicianInfoTab isOpenTab={isOpenPersonalInfoTab} />
        )}

        {/* Change password tab */}
        <ChangePasswordTab isOpenTab={isOpenChangePasswordTab} />

        {/* Payment and payouts tab */}
        <PaymentAndPayoutTab
          isContractor={isContractor}
          isOpenTab={isOpenPaymentTab}
        />
        <NotificationTab
          isContractor={isContractor}
          isOpenTab={isOpenNotificationTab}
        />
        {/* Terms of service tab */}
        {isOpenTermOfServiceTab && (
          <TermsOfServiceTab
            isOpenTab={isOpenTermOfServiceTab}
            content={{
              title: 'Terms of Services',
            }}
          />
        )}
        {isOpenPrivacy && (
          <TermsOfServiceTab
            isOpenTab={isOpenPrivacy}
            content={{
              title: 'Privacy Policy',
            }}  
          />
        )}
        {isOpenLicense && (
          <TermsOfServiceTab
            isOpenTab={isOpenLicense}
            content={{
              title: 'End User License Agreement',
            }}
          />
        )}

        {/* My ads for contractor */}
        {isContractor === true && <MyAdsTab isOpenTab={isOpenMyAdsTab} />}

        {/* My ads for contractor */}
        {isOpenFaqTab === true && <FaqTab isOpenTab={isOpenFaqTab} />}
      </Container>
    )
  },
)

export default AccountIntroScreen
