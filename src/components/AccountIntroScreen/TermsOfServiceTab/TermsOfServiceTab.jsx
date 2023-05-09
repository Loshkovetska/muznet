import React from 'react'
import { useState, useEffect } from 'react'

import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Text,
  View,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
// Components
import AccountsTabHeader from '../AccountsTabHeader'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
import { backHandler } from '../backHandler'
// Variables
import C from '@/res/colors'
import F from '@/res/fonts'
import { S } from '@/res/strings'
import { M } from '@/res/mixin'
import styled from 'styled-components/native'
import Constants from 'expo-constants'

// Store
import { observer } from 'mobx-react-lite'
import { useAccountApiStore } from '@/stores/AccountApi'

const FilterContainer = styled.ScrollView`
  width: 100%;
  background-color: ${C.white};
  // padding-top: 68px;
  padding-bottom: 200px;

  display: flex;
  flex-direction: column;
`
const FilterContainerBlock = styled.View`
  width: 100%;
  overflow: hidden;
`
const TermsText = styled(M.PlainText14)`
  padding: 0px 16px;
  padding-bottom: 16px;
  color: ${C.cyanGray};
  font-size: 14px;
`

const TermsTextBold = styled(TermsText)`
  font-weight: 700;
  font-family: ${F.bold};
  color: ${C.black};
`

const TermsTitle = styled(M.PlainText14)`
  font-size: 24px;
  line-height: 32px;
  padding: 0px 16px;
  text-decoration: underline;
  margin-bottom: 24px;
`

const TermsSubTitle = styled(M.PlainText14)`
  font-size: 18px;
  line-height: 32px;
  padding: 0px 16px;
  margin-bottom: 16px;
`

const TermsTableRow = styled(View)`
  border: 1px solid #000;
  border-top-width: 0;
  border-bottom-width: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
`
const TermsTable = styled.View`
  width: 100%;
  padding: 0 16px;
`
const TermsTableCol = styled(View)`
  border: 1px solid #000;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: center;
  width: ${(props) => props.width};
  padding: 8px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`

const TermItem = ({ content }) => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 8,
          marginRight: 4,
          backgroundColor: `${C.black}`,
        }}
      ></View>
      <TermsText
        style={{
          padding: 0,
          lineHeight: 0,
          paddingBottom: 0,
        }}
      >
        {content}
      </TermsText>
    </View>
  )
}

export const ContentDoc = ({ title }) => {
  const formLink = (link, text) => {
    return <Text onPress={() => Linking.openURL(link)}>{text}</Text>
  }

  if (title == 'Privacy Policy') {
    return (
      <>
        <TermsText>Last updated March 29, 2023</TermsText>
        <TermsText>
          This privacy notice for MuzNet Inc ("Company," "we," "us," or "our"),
          describes how and why we might collect, store, use, and/or share
          ("process") your information when you use our services ("Services"),
          such as when you:
        </TermsText>
        <TermItem
          content={
            <>
              Download and use our mobile application (MuzNet ), or any other
              application of ours that links to this privacy notice
            </>
          }
        />
        <TermItem
          content={
            <>
              Engage with us in other related ways, including any sales,
              marketing, or events
            </>
          }
        />
        <TermsText>
          Questions or concerns? Reading this privacy notice will help you
          understand your privacy rights and choices. If you do not agree with
          our policies and practices, please do not use our Services. If you
          still have any questions or concerns, please contact us at
          Support@muznet.com.
        </TermsText>
        <TermsTitle>SUMMARY OF KEY POINTS</TermsTitle>
        <TermsText>
          <TermsTextBold>
            Company This summary provides key points from our privacy notice,
            but you can find out more details about any of these topics by
            clicking the link following each key point or by using our
            <Text
              onPress={() =>
                Linking.openURL(
                  'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#toc',
                )
              }
            >
               table of contents 
            </Text>
            below to find the section you are looking for.
          </TermsTextBold>
        </TermsText>
        <TermsText>
          <TermsTextBold>
            What personal information do we process?
          </TermsTextBold>
          When you visit, use, or navigate our Services, we may process personal
          information depending on how you interact with MuzNet Inc and the
          Services, the choices you make, and the products and features you use.
          Learn more about
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#personalinfo',
              )
            }
          >
             personal information you disclose to us.
          </Text>
        </TermsText>
        <TermsText>
          <TermsTextBold>
            Do we process any sensitive personal information?
          </TermsTextBold>
          We do not process sensitive personal information.
        </TermsText>
        <TermsText>
          <TermsTextBold>
            Do we receive any information from third parties?
          </TermsTextBold>
          We may receive information from public databases, marketing partners,
          social media platforms, and other outside sources. Learn more about
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#othersources',
              )
            }
          >
             information collected from other sources.
          </Text>
        </TermsText>
        <TermsText>
          <TermsTextBold>How do we process your information?</TermsTextBold> We
          process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with law. We may also process your information for other
          purposes with your consent. We process your information only when we
          have a valid legal reason to do so. Learn more about
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#infouse',
              )
            }
          >
            how we process your information.
          </Text>
        </TermsText>
        <TermsText>
          <TermsTextBold>
            In what situations and with which parties do we share personal
            information?
          </TermsTextBold>
          We may share information in specific situations and with specific
          third parties. Learn more about
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#whoshare',
              )
            }
          >
            when and with whom we share your personal information.
          </Text>
        </TermsText>
        <TermsText>
          <TermsTextBold>How do we keep your information safe? </TermsTextBold>
          We have organizational and technical processes and procedures in place
          to protect your personal information. However, no electronic
          transmission over the internet or information storage technology can
          be guaranteed to be 100% secure, so we cannot promise or guarantee
          that hackers, cybercriminals, or other unauthorized third parties will
          not be able to defeat our security and improperly collect, access,
          steal, or modify your information. Learn more about
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#infosafe',
              )
            }
          >
            how we keep your information safe.
          </Text>
        </TermsText>
        <TermsText>
          <TermsTextBold>What are your rights? </TermsTextBold> Depending on
          where you are located geographically, the applicable privacy law may
          mean you have certain rights regarding your personal information.
          Learn more about
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#privacyrights',
              )
            }
          >
            your privacy rights.
          </Text>
        </TermsText>
        <TermsText>
          <TermsTextBold>How do you exercise your rights? </TermsTextBold> The
          easiest way to exercise your rights is by submitting a
          <Text
            onPress={() =>
              Linking.openURL(
                'https://app.termly.io/notify/e2f35829-a30b-4fd7-b2b8-a5af4947d0fa',
              )
            }
          >
             data subject access request
          </Text>
          , or by contacting us. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </TermsText>
        <TermsText>
          Want to learn more about what MuzNet Inc does with any information we
          collect?
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#toc',
              )
            }
          >
            Review the privacy notice in full.
          </Text>
        </TermsText>
        <TermsTitle>TABLE OF CONTENTS</TermsTitle>
        <TermsText>
          1. WHAT INFORMATION DO WE COLLECT? 2. HOW DO WE PROCESS YOUR
          INFORMATION? 3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR
          PERSONAL INFORMATION?
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#whoshare',
              )
            }
          >
            4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?   
          </Text>
          5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES? 6. HOW DO WE
          HANDLE YOUR SOCIAL LOGINS? 7. HOW LONG DO WE KEEP YOUR INFORMATION? 8.
          HOW DO WE KEEP YOUR INFORMATION SAFE? 9. DO WE COLLECT INFORMATION
          FROM MINORS?
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#privacyrights',
              )
            }
          >
            10. WHAT ARE YOUR PRIVACY RIGHTS?
          </Text>
          11. CONTROLS FOR DO-NOT-TRACK FEATURES 12. DO CALIFORNIA RESIDENTS
          HAVE SPECIFIC PRIVACY RIGHTS?
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#virginia',
              )
            }
          >
            13. DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
          </Text>
          14. DO WE MAKE UPDATES TO THIS NOTICE? 15. HOW CAN YOU CONTACT US
          ABOUT THIS NOTICE? 16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA
          WE COLLECT FROM YOU?
        </TermsText>
        <TermsTitle>1. WHAT INFORMATION DO WE COLLECT?</TermsTitle>
        <TermsTextBold>Personal information you disclose to us</TermsTextBold>
        <TermsText>
          In Short: We collect personal information that you provide to us.
        </TermsText>
        <TermsText>
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </TermsText>
        <TermsText>
          <TermsTextBold>Personal Information Provided by You.</TermsTextBold>
          The personal information that we collect depends on the context of
          your interactions with us and the Services, the choices you make, and
          the products and features you use. The personal information we collect
          may include the following:
        </TermsText>
        <TermItem content={<>names</>} />
        <TermItem content={<>phone numbers</>} />
        <TermItem content={<>email addresses</>} />
        <TermItem content={<>usernames</>} />
        <TermItem content={<>passwords</>} />
        <TermItem content={<>debit/credit card numbers</>} />
        <TermItem content={<>contact or authentication data</>} />
        <TermItem content={<>job titles</>} />
        <TermItem content={<>contact preferences</>} />
        <TermsText>
          <TermsTextBold>Sensitive Information. </TermsTextBold> We do not
          process sensitive information.
        </TermsText>
        <TermsText>
          <TermsTextBold>Payment Data. </TermsTextBold> We may collect data
          necessary to process your payment if you make purchases, such as your
          payment instrument number, and the security code associated with your
          payment instrument. All payment data is stored by stripe, firebase,
          mixpanel and google analytics. You may find their privacy notice
          link(s) here:
          <Text onPress={() => Linking.openURL('https://stripe.com/privacy')}>
            https://stripe.com/privacy,
          </Text>
          <Text
            onPress={() =>
              Linking.openURL('https://firebase.google.com/support/privacy')
            }
          >
            https://firebase.google.com/support/privacy,
          </Text>
          <Text
            onPress={() =>
              Linking.openURL('https://mixpanel.com/legal/privacy-policy/')
            }
          >
            https://mixpanel.com/legal/privacy-policy/
          </Text>
          and
          <Text
            onPress={() =>
              Linking.openURL('https://policies.google.com/privacy?hl=en-US')
            }
          >
            https://policies.google.com/privacy?hl=en-US.
          </Text>
        </TermsText>
        <TermsText>
          <TermsTextBold>Social Media Login Data. </TermsTextBold> We may
          provide you with the option to register with us using your existing
          social media account details, like your Facebook, Twitter, or other
          social media account. If you choose to register in this way, we will
          collect the information described in the section called "
          <Text
            onPress={() =>
              Linking.openURL(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#sociallogins',
              )
            }
          >
            HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </Text>
          " below.
        </TermsText>
        <TermsText>
          <TermsTextBold>Application Data. </TermsTextBold> If you use our
          application(s), we also may collect the following information if you
          choose to provide us with access or permission:
        </TermsText>
        <TermItem
          content={
            <>
              Geolocation Information. We may request access or permission to
              track location-based information from your mobile device, either
              continuously or while you are using our mobile application(s), to
              provide certain location-based services. If you wish to change our
              access or permissions, you may do so in your device's settings.
            </>
          }
        />
        <TermItem
          content={
            <>
              Mobile Device Data. We automatically collect device information
              (such as your mobile device ID, model, and manufacturer),
              operating system, version information and system configuration
              information, device and application identification numbers,
              browser type and version, hardware model Internet service provider
              and/or mobile carrier, and Internet Protocol (IP) address (or
              proxy server). If you are using our application(s), we may also
              collect information about the phone network associated with your
              mobile device, your mobile device’s operating system or platform,
              the type of mobile device you use, your mobile device’s unique
              device ID, and information about the features of our
              application(s) you accessed.
            </>
          }
        />
        <TermItem
          content={
            <>
              Push Notifications. We may request to send you push notifications
              regarding your account or certain features of the application(s).
              If you wish to opt out from receiving these types of
              communications, you may turn them off in your device's settings.
            </>
          }
        />
        <TermsText>
          This information is primarily needed to maintain the security and
          operation of our application(s), for troubleshooting, and for our
          internal analytics and reporting purposes. All personal information
          that you provide to us must be true, complete, and accurate, and you
          must notify us of any changes to such personal information.
        </TermsText>
        <TermsTextBold>Information automatically collected</TermsTextBold>
        <TermsText>
          In Short: Some information — such as your Internet Protocol (IP)
          address and/or browser and device characteristics — is collected
          automatically when you visit our Services.
        </TermsText>
        <TermsText>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </TermsText>
        <TermsText>
          Like many businesses, we also collect information through cookies and
          similar technologies.
        </TermsText>
        <TermsText>The information we collect includes:</TermsText>
        <TermItem
          content={
            <>
              Log and Usage Data. Log and usage data is service-related,
              diagnostic, usage, and performance information our servers
              automatically collect when you access or use our Services and
              which we record in log files. Depending on how you interact with
              us, this log data may include your IP address, device information,
              browser type, and settings and information about your activity in
              the Services (such as the date/time stamps associated with your
              usage, pages and files viewed, searches, and other actions you
              take such as which features you use), device event information
              (such as system activity, error reports (sometimes called "crash
              dumps"), and hardware settings).
            </>
          }
        />
        <TermItem
          content={
            <>
              Device Data. We collect device data such as information about your
              computer, phone, tablet, or other device you use to access the
              Services. Depending on the device used, this device data may
              include information such as your IP address (or proxy server),
              device and application identification numbers, location, browser
              type, hardware model, Internet service provider and/or mobile
              carrier, operating system, and system configuration information.
            </>
          }
        />
        <TermItem
          content={
            <>
              Location Data. We collect location data such as information about
              your device's location, which can be either precise or imprecise.
              How much information we collect depends on the type and settings
              of the device you use to access the Services. For example, we may
              use GPS and other technologies to collect geolocation data that
              tells us your current location (based on your IP address). You can
              opt out of allowing us to collect this information either by
              refusing access to the information or by disabling your Location
              setting on your device. However, if you choose to opt out, you may
              not be able to use certain aspects of the Services.
            </>
          }
        />
        <TermsTextBold>Information collected from other sources</TermsTextBold>
        <TermsText>
          In Short: We may collect limited data from public databases, marketing
          partners, social media platforms, and other outside sources.
        </TermsText>
        <TermsText>
          In order to enhance our ability to provide relevant marketing, offers,
          and services to you and update our records, we may obtain information
          about you from other sources, such as public databases, joint
          marketing partners, affiliate programs, data providers, social media
          platforms, and from other third parties. This information includes
          mailing addresses, job titles, email addresses, phone numbers, intent
          data (or user behavior data), Internet Protocol (IP) addresses, social
          media profiles, social media URLs, and custom profiles, for purposes
          of targeted advertising and event promotion. If you interact with us
          on a social media platform using your social media account (e.g.,
          Facebook or Twitter), we receive personal information about you such
          as your name, email address, and gender. Any personal information that
          we collect from your social media account depends on your social media
          account's privacy settings.
        </TermsText>
        <TermsTitle>2. HOW DO WE PROCESS YOUR INFORMATION?</TermsTitle>
        <TermsText>
          In Short: We process your information to provide, improve, and
          administer our Services, communicate with you, for security and fraud
          prevention, and to comply with law. We may also process your
          information for other purposes with your consent.
        </TermsText>
        <TermsText>
          <TermsTextBold>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </TermsTextBold>
        </TermsText>
        <TermItem
          content={
            <>
              <TermsTextBold>
                To facilitate account creation and authentication and otherwise
                manage user accounts.
              </TermsTextBold>
               We may process your information so you can create and log in to
              your account, as well as keep your account in working order.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>
                To deliver and facilitate delivery of services to the user.
              </TermsTextBold>
               We may process your information to provide you with the requested
              service.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>
                To respond to user inquiries/offer support to users. 
              </TermsTextBold>
               We may process your information to respond to your inquiries and
              solve any potential issues you might have with the requested
              service.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>
                To send administrative information to you.
              </TermsTextBold>
               We may process your information to send you details about our
              products and services, changes to our terms and policies, and
              other similar information.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>To fulfill and manage your orders.</TermsTextBold>
              We may process your information to fulfill and manage your orders,
              payments, returns, and exchanges made through the Services.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>
                To enable user-to-user communications.
              </TermsTextBold>
              We may process your information if you choose to use any of our
              offerings that allow for communication with another user.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>To request feedback.</TermsTextBold>
              We may process your information when necessary to request feedback
              and to contact you about your use of our Services.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>To protect our Services. </TermsTextBold>
              We may process your information as part of our efforts to keep our
              Services safe and secure, including fraud monitoring and
              prevention.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>
                To save or protect an individual's vital interest.
              </TermsTextBold>
              We may process your information when necessary to save or protect
              an individual’s vital interest, such as to prevent harm.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>Profile Picture.</TermsTextBold>
              This appears in users online accounts. as a visible representation
              of users or venues appearance
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>Community Post.</TermsTextBold>
              Community posts allow users to interact with everyone across our
              platform through media like posts, text, images, and video in the
              Community tab on our app.
            </>
          }
        />
        <TermsTitle>
          3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
        </TermsTitle>
        <TermsText>
          In Short: We only process your personal information when we believe it
          is necessary and we have a valid legal reason (i.e., legal basis) to
          do so under applicable law, like with your consent, to comply with
          laws, to provide you with services to enter into or fulfill our
          contractual obligations, to protect your rights, or to fulfill our
          legitimate business interests.
        </TermsText>
        <TermsText>
          <TermsTextBold>
            If you are located in the EU or UK, this section applies to you.
          </TermsTextBold>
        </TermsText>
        <TermsText>
          The General Data Protection Regulation (GDPR) and UK GDPR require us
          to explain the valid legal bases we rely on in order to process your
          personal information. As such, we may rely on the following legal
          bases to process your personal information:
        </TermsText>
        <TermItem
          content={
            <>
              <TermsTextBold>Consent</TermsTextBold>
              We may process your information if you have given us permission
              (i.e., consent) to use your personal information for a specific
              purpose. You can withdraw your consent at any time. Learn more
              about 
              {formLink(
                'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#withdrawconsent',
                ' withdrawing your consent.',
              )}
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>Performance of a Contract.</TermsTextBold>
              We may process your personal information when we believe it is
              necessary to fulfill our contractual obligations to you, including
              providing our Services or at your request prior to entering into a
              contract with you.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>Legitimate Interests.</TermsTextBold>
              We may process your information when we believe it is reasonably
              necessary to achieve our legitimate business interests and those
              interests do not outweigh your interests and fundamental rights
              and freedoms. For example, we may process your personal
              information for some of the purposes described in order to:
            </>
          }
        />
        <View
          style={{
            paddingLeft: 48,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>Diagnose problems and/or prevent fraudulent activities</>
            }
          />
          <TermItem
            content={
              <>
                Understand how our users use our products and services so we can
                improve user experience
              </>
            }
          />
        </View>
        <TermItem
          content={
            <>
              <TermsTextBold>Legal Obligations.</TermsTextBold>
              We may process your information where we believe it is necessary
              for compliance with our legal obligations, such as to cooperate
              with a law enforcement body or regulatory agency, exercise or
              defend our legal rights, or disclose your information as evidence
              in litigation in which we are involved.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>Vital Interests.</TermsTextBold>
              We may process your information where we believe it is necessary
              to protect your vital interests or the vital interests of a third
              party, such as situations involving potential threats to the
              safety of any person.
            </>
          }
        />
        <TermsText>
          <TermsTextBold>
            If you are located in Canada, this section applies to you.
          </TermsTextBold>
        </TermsText>
        <TermsText>
          We may process your information if you have given us specific
          permission (i.e., express consent) to use your personal information
          for a specific purpose, or in situations where your permission can be
          inferred (i.e., implied consent). You can 
          {formLink(
            'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#withdrawconsent',
            'withdraw your consent',
          )}
           at any time.
        </TermsText>
        <TermsText>
          In some exceptional cases, we may be legally permitted under
          applicable law to process your information without your consent,
          including, for example:
        </TermsText>
        <TermItem
          content={
            <>
              If collection is clearly in the interests of an individual and
              consent cannot be obtained in a timely way
            </>
          }
        />
        <TermItem
          content={<>For investigations and fraud detection and prevention</>}
        />
        <TermItem
          content={
            <>For business transactions provided certain conditions are met</>
          }
        />
        <TermItem
          content={
            <>
              If it is contained in a witness statement and the collection is
              necessary to assess, process, or settle an insurance claim
            </>
          }
        />
        <TermItem
          content={
            <>
              For identifying injured, ill, or deceased persons and
              communicating with next of kin
            </>
          }
        />
        <TermItem
          content={
            <>
              If we have reasonable grounds to believe an individual has been,
              is, or may be victim of financial abuse
            </>
          }
        />
        <TermItem
          content={
            <>
              If it is reasonable to expect collection and use with consent
              would compromise the availability or the accuracy of the
              information and the collection is reasonable for purposes related
              to investigating a breach of an agreement or a contravention of
              the laws of Canada or a province
            </>
          }
        />
        <TermItem
          content={
            <>
              If disclosure is required to comply with a subpoena, warrant,
              court order, or rules of the court relating to the production of
              records
            </>
          }
        />
        <TermItem
          content={
            <>
              If it was produced by an individual in the course of their
              employment, business, or profession and the collection is
              consistent with the purposes for which the information was
              produced
            </>
          }
        />
        <TermItem
          content={
            <>
              If the collection is solely for journalistic, artistic, or
              literary purposes
            </>
          }
        />
        <TermItem
          content={
            <>
              If the information is publicly available and is specified by the
              regulations
            </>
          }
        />
        <TermsTitle>
          4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </TermsTitle>
        <TermsText>
          In Short: We may share information in specific situations described in
          this section and/or with the following third parties.
        </TermsText>
        <TermsText>
          We may need to share your personal information in the following
          situations:
        </TermsText>
        <TermItem
          content={
            <>
              <TermsTextBold>Business Transfers.</TermsTextBold>
              We may share or transfer your information in connection with, or
              during negotiations of, any merger, sale of company assets,
              financing, or acquisition of all or a portion of our business to
              another company.
            </>
          }
        />
        <TermItem
          content={
            <>
              <TermsTextBold>
                When we use Google Maps Platform APIs.
              </TermsTextBold>
              We may share your information with certain Google Maps Platform
              APIs (e.g., Google Maps API, Places API). We obtain and store on
              your device ("cache") your location. You may revoke your consent
              anytime by contacting us at the contact details provided at the
              end of this document.
            </>
          }
        />

        <TermsTitle>
          5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </TermsTitle>
        <TermsText>
          In Short: We may use cookies and other tracking technologies to
          collect and store your information.
        </TermsText>
        <TermsText>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information. Specific information about
          how we use such technologies and how you can refuse certain cookies is
          set out in our Cookie Notice.
        </TermsText>

        <TermsTitle>6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</TermsTitle>
        <TermsText>
          In Short: If you choose to register or log in to our Services using a
          social media account, we may have access to certain information about
          you.
        </TermsText>
        <TermsText>
          Our Services offer you the ability to register and log in using your
          third-party social media account details (like your Facebook or
          Twitter logins). Where you choose to do this, we will receive certain
          profile information about you from your social media provider. The
          profile information we receive may vary depending on the social media
          provider concerned, but will often include your name, email address,
          friends list, and profile picture, as well as other information you
          choose to make public on such a social media platform.
        </TermsText>
        <TermsText>
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant Services. Please note that we do not control, and
          are not responsible for, other uses of your personal information by
          your third-party social media provider. We recommend that you review
          their privacy notice to understand how they collect, use, and share
          your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </TermsText>

        <TermsTitle>7. HOW LONG DO WE KEEP YOUR INFORMATION?</TermsTitle>
        <TermsText>
          In Short: We keep your information for as long as necessary to fulfill
          the purposes outlined in this privacy notice unless otherwise required
          by law.
        </TermsText>
        <TermsText>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
        </TermsText>
        <TermsText>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </TermsText>
        <TermsTitle>8. HOW DO WE KEEP YOUR INFORMATION SAFE?</TermsTitle>
        <TermsText>
          In Short: We aim to protect your personal information through a system
          of organizational and technical security measures.
        </TermsText>
        <TermsText>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </TermsText>
        <TermsTitle>9. DO WE COLLECT INFORMATION FROM MINORS?</TermsTitle>
        <TermsText>
          In Short: We do not knowingly collect data from or market to children
          under 18 years of age.
        </TermsText>
        <TermsText>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent’s use of the Services. If we learn
          that personal information from users less than 18 years of age has
          been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at support@muznet.com.
        </TermsText>
        <TermsTitle>10. WHAT ARE YOUR PRIVACY RIGHTS?</TermsTitle>
        <TermsText>
          In Short: In some regions, such as the European Economic Area (EEA),
          United Kingdom (UK), and Canada, you have rights that allow you
          greater access to and control over your personal information. You may
          review, change, or terminate your account at any time.
        </TermsText>
        <TermsText>
          In some regions (like the EEA, UK, and Canada), you have certain
          rights under applicable data protection laws. These may include the
          right (i) to request access and obtain a copy of your personal
          information, (ii) to request rectification or erasure; (iii) to
          restrict the processing of your personal information; and (iv) if
          applicable, to data portability. In certain circumstances, you may
          also have the right to object to the processing of your personal
          information. You can make such a request by contacting us by using the
          contact details provided in the section "HOW CAN YOU CONTACT US ABOUT
          THIS NOTICE?" below.
        </TermsText>
        <TermsText>
          We will consider and act upon any request in accordance with
          applicable data protection laws.
        </TermsText>
        <TermsText>
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your
          {formLink(
            'https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm',
            'Member State data protection authority',
          )}
          or UK data protection authority.
        </TermsText>
        <TermsText>
          If you are located in Switzerland, you may contact the
          {formLink(
            'https://www.edoeb.admin.ch/edoeb/en/home.html',
            ' Federal Data Protection and Information Commissioner.',
          )}
        </TermsText>
        <TermsText>
          <TermsTextBold>Withdrawing your consent:</TermsTextBold> If we are
          relying on your consent to process your personal information, which
          may be express and/or implied consent depending on the applicable law,
          you have the right to withdraw your consent at any time. You can
          withdraw your consent at any time by contacting us by using the
          contact details provided in the section "HOW CAN YOU CONTACT US ABOUT
          THIS NOTICE?" below.
        </TermsText>
        <TermsText>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </TermsText>
        <TermsSubTitle>Account Information</TermsSubTitle>
        <TermsText>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
        </TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>Log in to your account settings and update your user account.</>
            }
          />
          <TermItem
            content={<>Contact us using the contact information provided.</>}
          />
        </View>
        <TermsText>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms and/or comply with applicable legal requirements.
        </TermsText>

        <TermsText>
          If you have questions or comments about your privacy rights, you may
          email us at support@muznet.com.
        </TermsText>
        <TermsTitle>11. CONTROLS FOR DO-NOT-TRACK FEATURES</TermsTitle>
        <TermsText>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track ("DNT") feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this privacy
          notice.
        </TermsText>
        <TermsTitle>
          12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </TermsTitle>
        <TermsText>
          In Short: Yes, if you are a resident of California, you are granted
          specific rights regarding access to your personal information.
        </TermsText>
        <TermsText>
          California Civil Code Section 1798.83, also known as the "Shine The
          Light" law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us using the contact information provided below.
        </TermsText>
        <TermsText>
          If you are under 18 years of age, reside in California, and have a
          registered account with Services, you have the right to request
          removal of unwanted data that you publicly post on the Services. To
          request removal of such data, please contact us using the contact
          information provided below and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on the Services, but
          please be aware that the data may not be completely or comprehensively
          removed from all our systems (e.g., backups, etc.).
        </TermsText>
        <TermsSubTitle>CCPA Privacy Notice</TermsSubTitle>
        <TermsText>
          The California Code of Regulations defines a "resident" as:
        </TermsText>
        <TermsText>
          (1) every individual who is in the State of California for other than
          a temporary or transitory purpose and
        </TermsText>
        <TermsText>
          (2) every individual who is domiciled in the State of California who
          is outside the State of California for a temporary or transitory
          purpose
        </TermsText>
        <TermsText>
          All other individuals are defined as "non-residents."
        </TermsText>
        <TermsText>
          If this definition of "resident" applies to you, we must adhere to
          certain rights and obligations regarding your personal information.
        </TermsText>
        <TermsText>
          <TermsTextBold>
            What categories of personal information do we collect?
          </TermsTextBold>
        </TermsText>
        <TermsText>
          We have collected the following categories of personal information in
          the past twelve (12) months:
        </TermsText>
        <TermsTable
          style={{
            marginBottom: 24,
          }}
        >
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <TermsTextBold>Category</TermsTextBold>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <TermsTextBold>Examples</TermsTextBold>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <TermsTextBold>Collected</TermsTextBold>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>A. Identifiers</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Contact details, such as real name, alias, postal address,
                telephone or mobile contact number, unique personal identifier,
                online identifier, Internet Protocol address, email address, and
                account name
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>
                B. Personal information categories listed in the California
                Customer Records statute
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Name, contact information, education, employment, employment
                history, and financial information
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>
                C. Protected classification characteristics under California or
                federal law
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>Gender and date of birth</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>D. Commercial information</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Transaction information, purchase history, financial details,
                and payment information
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>E. Biometric information</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>Fingerprints and voiceprints</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>
                F. Internet or other similar network activity
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Browsing history, search history, online behavior, interest
                data, and interactions with our and other websites,
                applications, systems, and advertisements
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>G. Geolocation data </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>Device location</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>
                H. Audio, electronic, visual, thermal, olfactory, or similar
                information
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Images and audio, video or call recordings created in connection
                with our business activities
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>
                I. Professional or employment-related information
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Business contact details in order to provide you our Services at
                a business level or job title, work history, and professional
                qualifications if you apply for a job with us
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>J. Education Information</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Student records and directory information
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow>
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>
                K. Inferences drawn from other personal information
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14>
                Inferences drawn from any of the collected personal information
                listed above to create a profile or summary about, for example,
                an individual’s preferences and characteristics
              </M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
          <TermsTableRow
            style={{
              borderBottomWidth: 1,
            }}
          >
            <TermsTableCol left={true} width={'30%'}>
              <M.PlainText14>L. Sensitive Personal Information</M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'40%'}>
              <M.PlainText14></M.PlainText14>
            </TermsTableCol>
            <TermsTableCol width={'30%'}>
              <M.PlainText14>NO</M.PlainText14>
            </TermsTableCol>
          </TermsTableRow>
        </TermsTable>
        <TermsText>
          We may also collect other personal information outside of these
          categories through instances where you interact with us in person,
          online, or by phone or mail in the context of:
        </TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={<>Receiving help through our customer support channels;</>}
          />
          <TermItem
            content={<>Participation in customer surveys or contests; and</>}
          />
          <TermItem
            content={
              <>
                Facilitation in the delivery of our Services and to respond to
                your inquiries.
              </>
            }
          />
        </View>
        <TermsSubTitle>
          How do we use and share your personal information?
        </TermsSubTitle>
        <TermsText>
          More information about our data collection and sharing practices can
          be found in this privacy notice.
        </TermsText>
        <TermsText>
          You may contact us by email at support@muznet.com, or by referring to
          the contact details at the bottom of this document.
        </TermsText>
        <TermsText>
          If you are using an authorized agent to exercise your right to opt out
          we may deny a request if the authorized agent does not submit proof
          that they have been validly authorized to act on your behalf.
        </TermsText>

        <TermsSubTitle>
          Will your information be shared with anyone else?
        </TermsSubTitle>
        <TermsText>
          We may disclose your personal information with our service providers
          pursuant to a written contract between us and each service provider.
          Each service provider is a for-profit entity that processes the
          information on our behalf, following the same strict privacy
          protection obligations mandated by the CCPA.
        </TermsText>
        <TermsText>
          We may use your personal information for our own business purposes,
          such as for undertaking internal research for technological
          development and demonstration. This is not considered to be "selling"
          of your personal information.
        </TermsText>
        <TermsText>
          MuzNet Inc has not disclosed, sold, or shared any personal information
          to third parties for a business or commercial purpose in the preceding
          twelve (12) months. MuzNet Inc will not sell or share personal
          information in the future belonging to website visitors, users, and
          other consumers.
        </TermsText>
        <TermsSubTitle>
          Your rights with respect to your personal data
        </TermsSubTitle>
        <TermsText>
          Right to request deletion of the data — Request to delete
        </TermsText>
        <TermsText>
          You can ask for the deletion of your personal information. If you ask
          us to delete your personal information, we will respect your request
          and delete your personal information, subject to certain exceptions
          provided by law, such as (but not limited to) the exercise by another
          consumer of his or her right to free speech, our compliance
          requirements resulting from a legal obligation, or any processing that
          may be required to protect against illegal activities.
        </TermsText>
        <TermsText>Right to be informed — Request to know</TermsText>
        <TermsText>
          Depending on the circumstances, you have a right to know:
        </TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={<>whether we collect and use your personal information;</>}
          />
          <TermItem
            content={
              <>the categories of personal information that we collect;</>
            }
          />
          <TermItem
            content={
              <>
                the purposes for which the collected personal information is
                used;
              </>
            }
          />
          <TermItem
            content={
              <>
                whether we sell or share personal information to third parties;
              </>
            }
          />
          <TermItem
            content={
              <>
                the categories of personal information that we sold, shared, or
                disclosed for a business purpose;
              </>
            }
          />
          <TermItem
            content={
              <>
                the categories of third parties to whom the personal information
                was sold, shared, or disclosed for a business purpose;
              </>
            }
          />
          <TermItem
            content={
              <>
                the business or commercial purpose for collecting, selling, or
                sharing personal information; and
              </>
            }
          />
          <TermItem
            content={
              <>
                the specific pieces of personal information we collected about
                you.
              </>
            }
          />
        </View>
        <TermsText>
          In accordance with applicable law, we are not obligated to provide or
          delete consumer information that is de-identified in response to a
          consumer request or to re-identify individual data to verify a
          consumer request.
        </TermsText>
        <TermsText>
          Right to Non-Discrimination for the Exercise of a Consumer’s Privacy
          Rights
        </TermsText>
        <TermsText>
          We will not discriminate against you if you exercise your privacy
          rights.
        </TermsText>
        <TermsText>
          Right to Limit Use and Disclosure of Sensitive Personal Information
        </TermsText>
        <TermsText>
          We do not process consumer's sensitive personal information.
        </TermsText>
        <TermsText>Verification process</TermsText>
        <TermsText>
          Upon receiving your request, we will need to verify your identity to
          determine you are the same person about whom we have the information
          in our system. These verification efforts require us to ask you to
          provide information so that we can match it with information you have
          previously provided us. For instance, depending on the type of request
          you submit, we may ask you to provide certain information so that we
          can match the information you provide with the information we already
          have on file, or we may contact you through a communication method
          (e.g., phone or email) that you have previously provided to us. We may
          also use other verification methods as the circumstances dictate.
        </TermsText>
        <TermsText>
          We will only use personal information provided in your request to
          verify your identity or authority to make the request. To the extent
          possible, we will avoid requesting additional information from you for
          the purposes of verification. However, if we cannot verify your
          identity from the information already maintained by us, we may request
          that you provide additional information for the purposes of verifying
          your identity and for security or fraud-prevention purposes. We will
          delete such additionally provided information as soon as we finish
          verifying you.
        </TermsText>
        <TermsText>Other privacy rights</TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>
                You may object to the processing of your personal information.
              </>
            }
          />
          <TermItem
            content={
              <>
                You may request correction of your personal data if it is
                incorrect or no longer relevant, or ask to restrict the
                processing of the information.
              </>
            }
          />
          <TermItem
            content={
              <>
                You can designate an authorized agent to make a request under
                the CCPA on your behalf. We may deny a request from an
                authorized agent that does not submit proof that they have been
                validly authorized to act on your behalf in accordance with the
                CCPA.
              </>
            }
          />
          <TermItem
            content={
              <>
                You may request to opt out from future selling or sharing of
                your personal information to third parties. Upon receiving an
                opt-out request, we will act upon the request as soon as
                feasibly possible, but no later than fifteen (15) days from the
                date of the request submission.
              </>
            }
          />
        </View>
        <TermsText>
          To exercise these rights, you can contact us by email at
          support@muznet.com, or by referring to the contact details at the
          bottom of this document. If you have a complaint about how we handle
          your data, we would like to hear from you.
        </TermsText>
        <TermsTitle>
          13. DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </TermsTitle>
        <TermsText>
          In Short: Yes, if you are a resident of Virginia, you may be granted
          specific rights regarding access to and use of your personal
          information.
        </TermsText>
        <TermsSubTitle>Virginia CDPA Privacy Notice</TermsSubTitle>
        <TermsText>
          Under the Virginia Consumer Data Protection Act (CDPA):
        </TermsText>
        <TermsText>
          "Consumer" means a natural person who is a resident of the
          Commonwealth acting only in an individual or household context. It
          does not include a natural person acting in a commercial or employment
          context.
        </TermsText>
        <TermsText>
          "Personal data" means any information that is linked or reasonably
          linkable to an identified or identifiable natural person. "Personal
          data" does not include de-identified data or publicly available
          information.
        </TermsText>
        <TermsText>
          "Sale of personal data" means the exchange of personal data for
          monetary consideration.
        </TermsText>
        <TermsText>
          If this definition "consumer" applies to you, we must adhere to
          certain rights and obligations regarding your personal data.
        </TermsText>
        <TermsText>
          The information we collect, use, and disclose about you will vary
          depending on how you interact with MuzNet Inc and our Services. To
          find out more, please visit the following links:
        </TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>
                {formLink(
                  'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#infocollect',
                  'Personal data we collect',
                )}
              </>
            }
          />
          <TermItem
            content={
              <>
                {formLink(
                  'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#infouse',
                  'How we use your personal data',
                )}
              </>
            }
          />
          <TermItem
            content={
              <>
                {formLink(
                  'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_66e8c1f90cf0eb265b282c682513f86e.html#whoshare',
                  'When and with whom we share your personal data',
                )}
              </>
            }
          />
        </View>
        <TermsText>Your rights with respect to your personal data</TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>
                Right to be informed whether or not we are processing your
                personal data
              </>
            }
          />
          <TermItem content={<>Right to access your personal data</>} />
          <TermItem
            content={<>Right to correct inaccuracies in your personal data</>}
          />
          <TermItem
            content={<>Right to request deletion of your personal data</>}
          />
          <TermItem
            content={
              <>
                Right to obtain a copy of the personal data you previously
                shared with us
              </>
            }
          />
          <TermItem
            content={
              <>
                Right to opt out of the processing of your personal data if it
                is used for targeted advertising, the sale of personal data, or
                profiling in furtherance of decisions that produce legal or
                similarly significant effects ("profiling")
              </>
            }
          />
        </View>
        <TermsText>
          MuzNet Inc has not sold any personal data to third parties for
          business or commercial purposes. MuzNet Inc will not sell personal
          data in the future belonging to website visitors, users, and other
          consumers.
        </TermsText>
        <TermsText>
          Exercise your rights provided under the Virginia CDPA
        </TermsText>
        <TermsText>
          More information about our data collection and sharing practices can
          be found in this privacy notice.
        </TermsText>
        <TermsText>
          You may contact us by email at support@muznet.com, by submitting a 
          {formLink(
            'https://app.termly.io/notify/e2f35829-a30b-4fd7-b2b8-a5af4947d0fa',
            'data subject access request',
          )}
          , or by referring to the contact details at the bottom of this
          document.
        </TermsText>
        <TermsText>
          If you are using an authorized agent to exercise your rights, we may
          deny a request if the authorized agent does not submit proof that they
          have been validly authorized to act on your behalf.
        </TermsText>
        <TermsText>Verification process</TermsText>
        <TermsText>
          We may request that you provide additional information reasonably
          necessary to verify you and your consumer's request. If you submit the
          request through an authorized agent, we may need to collect additional
          information to verify your identity before processing your request.
        </TermsText>
        <TermsText>
          Upon receiving your request, we will respond without undue delay, but
          in all cases, within forty-five (45) days of receipt. The response
          period may be extended once by forty-five (45) additional days when
          reasonably necessary. We will inform you of any such extension within
          the initial 45-day response period, together with the reason for the
          extension.
        </TermsText>
        <TermsText>Right to appeal</TermsText>
        <TermsText>
          If we decline to take action regarding your request, we will inform
          you of our decision and reasoning behind it. If you wish to appeal our
          decision, please email us at support@muznet.com. Within sixty (60)
          days of receipt of an appeal, we will inform you in writing of any
          action taken or not taken in response to the appeal, including a
          written explanation of the reasons for the decisions. If your appeal
          if denied, you may contact the 
          {formLink(
            'https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint',
            'Attorney General to submit a complaint.',
          )}
        </TermsText>
        <TermsTitle>14. DO WE MAKE UPDATES TO THIS NOTICE?</TermsTitle>
        <TermsText>
          In Short: Yes, we will update this notice as necessary to stay
          compliant with relevant laws.
        </TermsText>
        <TermsText>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated "Revised" date and the updated
          version will be effective as soon as it is accessible. If we make
          material changes to this privacy notice, we may notify you either by
          prominently posting a notice of such changes or by directly sending
          you a notification. We encourage you to review this privacy notice
          frequently to be informed of how we are protecting your information.
        </TermsText>
        <TermsTitle>15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</TermsTitle>
        <TermsText>
          If you have questions or comments about this notice, you may email us
          at support@muznet.com or by post to:
        </TermsText>
        <TermsText>MuzNet Inc</TermsText>
        <TermsText>Philadelphia, PA</TermsText>
        <TermsText>United States</TermsText>
        <TermsTitle>
          16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </TermsTitle>
        <TermsText>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it. To request to review, update,
          or delete your personal information, please fill out and submit a 
          {formLink(
            'https://app.termly.io/notify/e2f35829-a30b-4fd7-b2b8-a5af4947d0fa',
            'data subject access request.',
          )}
        </TermsText>
      </>
    )
  } else if (title == 'Terms of Services')
    return (
      <>
        <TermsText>Last updated March 31, 2023</TermsText>
        <TermsTitle>AGREEMENT TO OUR LEGAL TERMS</TermsTitle>
        <TermsText>
          We are MuzNet Inc ("Company," "we," "us," "our"), a company registered
          in Pennsylvania, United States at, Philadelphia, PA.
        </TermsText>
        <TermsText>
          We operate the mobile application MuzNet (the "App"), as well as any
          other related products and services that refer or link to these legal
          terms (the "Legal Terms") (collectively, the "Services").
        </TermsText>
        <TermsText>
          MuzNet is a digital booking social media platform for independent
          artists and venues. We help connect musicians, artists, bands, and
          venues of all genres, and sizes.
        </TermsText>
        <TermsText>
          You can contact us by phone at N/A, email at Support@muznet.com,
          Philadelphia, PA, United States.
        </TermsText>
        <TermsText>
          These Legal Terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity ("you"), and MuzNet
          Inc, concerning your access to and use of the Services. You agree that
          by accessing the Services, you have read, understood, and agreed to be
          bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF
          THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE
          SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
        </TermsText>
        <TermsText>
          We will provide you with prior notice of any scheduled changes to the
          Services you are using. The modified Legal Terms will become effective
          upon posting or notifying you by support@muznet.com, as stated in the
          email message. By continuing to use the Services after the effective
          date of any changes, you agree to be bound by the modified terms.
        </TermsText>
        <TermsText>
          The Services are intended for users who are at least 18 years old.
          Persons under the age of 18 are not permitted to use or register for
          the Services.
        </TermsText>
        <TermsText>
          We recommend that you print a copy of these Legal Terms for your
          records.
        </TermsText>
        <TermsTitle>TABLE OF CONTENTS</TermsTitle>
        <TermsText>1. OUR SERVICES</TermsText>
        <TermsText>2. INTELLECTUAL PROPERTY RIGHTS</TermsText>
        <TermsText>4. USER REGISTRATION </TermsText>
        <TermsText>5. PURCHASES AND PAYMENT</TermsText>
        <TermsText>6. POLICY</TermsText>
        <TermsText>7. PROHIBITED ACTIVITIES </TermsText>
        <TermsText>8. USER GENERATED CONTRIBUTIONS</TermsText>
        <TermsText>9. CONTRIBUTION LICENSE</TermsText>
        <TermsText>10. GUIDELINES FOR REVIEWS</TermsText>
        <TermsText>11. MOBILE APPLICATION LICENSE</TermsText>
        <TermsText>12. SOCIAL MEDIA</TermsText>
        <TermsText>13. SERVICES MANAGEMENT</TermsText>
        <TermsText>14. PRIVACY POLICY</TermsText>
        <TermsText>15. COPYRIGHT INFRINGEMENTS</TermsText>
        <TermsText>16. TERM AND TERMINATION</TermsText>
        <TermsText>17. MODIFICATIONS AND INTERRUPTIONS</TermsText>
        <TermsText>18. GOVERNING LAW</TermsText>
        <TermsText>19. DISPUTE RESOLUTION</TermsText>
        <TermsText>20. CORRECTIONS</TermsText>
        <TermsText>21. DISCLAIMER</TermsText>
        <TermsText>22. LIMITATIONS OF LIABILITY</TermsText>
        <TermsText>23. INDEMNIFICATION</TermsText>
        <TermsText>24. USER DATA</TermsText>
        <TermsText>
          25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
        </TermsText>
        <TermsText>26. CALIFORNIA USERS AND RESIDENTS</TermsText>
        <TermsText>27. MISCELLANEOUS</TermsText>
        <TermsText>28. CONTACT US</TermsText>
        <TermsTitle>1. OUR SERVICES</TermsTitle>
        <TermsText>
          The information provided when using the Services is not intended for
          distribution to or use by any person or entity in any jurisdiction or
          country where such distribution or use would be contrary to law or
          regulation or which would subject us to any registration requirement
          within such jurisdiction or country. Accordingly, those persons who
          choose to access the Services from other locations do so on their own
          initiative and are solely responsible for compliance with local laws,
          if and to the extent local laws are applicable.
        </TermsText>
        <TermsText>
          The Services are not tailored to comply with industry-specific
          regulations (Health Insurance Portability and Accountability Act
          (HIPAA), Federal Information Security Management Act (FISMA), etc.),
          so if your interactions would be subjected to such laws, you may not
          use the Services. You may not use the Services in a way that would
          violate the Gramm-Leach-Bliley Act (GLBA).
        </TermsText>
        <TermsTitle>2. INTELLECTUAL PROPERTY RIGHTS</TermsTitle>
        <TermsSubTitle>Our intellectual property</TermsSubTitle>
        <TermsText>
          We are the owner or the licensee of all intellectual property rights
          in our Services, including all source code, databases, functionality,
          software, website designs, audio, video, text, photographs, and
          graphics in the Services (collectively, the "Content"), as well as the
          trademarks, service marks, and logos contained therein (the "Marks").
        </TermsText>
        <TermsText>
          Our Content and Marks are protected by copyright and trademark laws
          (and various other intellectual property rights and unfair competition
          laws) and treaties in the United States and around the world.
        </TermsText>
        <TermsText>
          The Content and Marks are provided in or through the Services "AS IS"
          for your internal business purpose only.
        </TermsText>
        <TermsSubTitle>Your use of our Services</TermsSubTitle>
        <TermsText>
          Subject to your compliance with these Legal Terms, including the
          {formLink(
            'https://9a5ca103-6799-45ad-ac5f-1933acebdf1e.htmlcomponentservice.com/get_draft?id=9a5ca1_6efa3442eff5d999a91f69764eeb0275.html#prohibited',
            '"PROHIBITED ACTIVITIES"',
          )}
          section below, we grant you a non-exclusive, non-transferable,
          revocable license to:
        </TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem content={<>access the Services; and</>} />
          <TermItem
            content={
              <>
                download or print a copy of any portion of the Content to which
                you have properly gained access.
              </>
            }
          />
        </View>
        <TermsText>solely for your internal business purpose.</TermsText>
        <TermsText>
          Except as set out in this section or elsewhere in our Legal Terms, no
          part of the Services and no Content or Marks may be copied,
          reproduced, aggregated, republished, uploaded, posted, publicly
          displayed, encoded, translated, transmitted, distributed, sold,
          licensed, or otherwise exploited for any commercial purpose
          whatsoever, without our express prior written permission.
        </TermsText>
        <TermsText>
          If you wish to make any use of the Services, Content, or Marks other
          than as set out in this section or elsewhere in our Legal Terms,
          please address your request to: Support@muznet.com. If we ever grant
          you the permission to post, reproduce, or publicly display any part of
          our Services or Content, you must identify us as the owners or
          licensors of the Services, Content, or Marks and ensure that any
          copyright or proprietary notice appears or is visible on posting,
          reproducing, or displaying our Content.
        </TermsText>
        <TermsText>
          We reserve all rights not expressly granted to you in and to the
          Services, Content, and Marks.
        </TermsText>
        <TermsText>
          Any breach of these Intellectual Property Rights will constitute a
          material breach of our Legal Terms and your right to use our Services
          will terminate immediately.
        </TermsText>
        <TermsSubTitle>Your submissions and contributions</TermsSubTitle>
        <TermsText>
          Please review this section and the "PROHIBITED ACTIVITIES" section
          carefully prior to using our Services to understand the (a) rights you
          give us and (b) obligations you have when you post or upload any
          content through the Services.
        </TermsText>
        <TermsText>
          <TermsTextBold> Submissions:</TermsTextBold> By directly sending us
          any question, comment, suggestion, idea, feedback, or other
          information about the Services ("Submissions"), you agree to assign to
          us all intellectual property rights in such Submission. You agree that
          we shall own this Submission and be entitled to its unrestricted use
          and dissemination for any lawful purpose, commercial or otherwise,
          without acknowledgment or compensation to you.
        </TermsText>
        <TermsText>
          <TermsTextBold> Contributions:</TermsTextBold> The Services may invite
          you to chat, contribute to, or participate in blogs, message boards,
          online forums, and other functionality during which you may create,
          submit, post, display, transmit, publish, distribute, or broadcast
          content and materials to us or through the Services, including but not
          limited to text, writings, video, audio, photographs, music, graphics,
          comments, reviews, rating suggestions, personal information, or other
          material ("Contributions"). Any Submission that is publicly posted
          shall also be treated as a Contribution.
        </TermsText>
        <TermsText>
          You understand that Contributions may be viewable by other users of
          the Services.
        </TermsText>
        <TermsText>
          <TermsTextBold>
            When you post Contributions, you grant us a license (including use
            of your name, trademarks, and logos):
          </TermsTextBold>
          By posting any Contributions, you grant us an unrestricted, unlimited,
          irrevocable, perpetual, non-exclusive, transferable, royalty-free,
          fully-paid, worldwide right, and license to: use, copy, reproduce,
          distribute, sell, resell, publish, broadcast, retitle, store, publicly
          perform, publicly display, reformat, translate, excerpt (in whole or
          in part), and exploit your Contributions (including, without
          limitation, your image, name, and voice) for any purpose, commercial,
          advertising, or otherwise, to prepare derivative works of, or
          incorporate into other works, your Contributions, and to sublicense
          the licenses granted in this section. Our use and distribution may
          occur in any media formats and through any media channels.
        </TermsText>
        <TermsText>
          This license includes our use of your name, company name, and
          franchise name, as applicable, and any of the trademarks, service
          marks, trade names, logos, and personal and commercial images you
          provide.
        </TermsText>
        <TermsText>
          <TermsTextBold>
            You are responsible for what you post or upload:
          </TermsTextBold>
          By sending us Submissions and/or posting Contributions through any
          part of the Services or making Contributions accessible through the
          Services by linking your account through the Services to any of your
          social networking accounts, you:
        </TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>
                confirm that you have read and agree with our "PROHIBITED
                ACTIVITIES" and will not post, send, publish, upload, or
                transmit through the Services any Submission nor post any
                Contribution that is illegal, harassing, hateful, harmful,
                defamatory, obscene, bullying, abusive, discriminatory,
                threatening to any person or group, sexually explicit, false,
                inaccurate, deceitful, or misleading;
              </>
            }
          />
          <TermItem
            content={
              <>
                to the extent permissible by applicable law, waive any and all
                moral rights to any such Submission and/or Contribution;
              </>
            }
          />
          <TermItem
            content={
              <>
                warrant that any such Submission and/or Contributions are
                original to you or that you have the necessary rights and
                licenses to submit such Submissions and/or Contributions and
                that you have full authority to grant us the above-mentioned
                rights in relation to your Submissions and/or Contributions; and
              </>
            }
          />
          <TermItem
            content={
              <>
                warrant and represent that your Submissions and/or Contributions
                do not constitute confidential information.
              </>
            }
          />
        </View>
        <TermsText>
          You are solely responsible for your Submissions and/or Contributions
          and you expressly agree to reimburse us for any and all losses that we
          may suffer because of your breach of (a) this section, (b) any third
          party’s intellectual property rights, or (c) applicable law.
        </TermsText>
        <TermsText>
          <TermsTextBold>We may remove or edit your Content:</TermsTextBold>
          Although we have no obligation to monitor any Contributions, we shall
          have the right to remove or edit any Contributions at any time without
          notice if in our reasonable opinion we consider such Contributions
          harmful or in breach of these Legal Terms. If we remove or edit any
          such Contributions, we may also suspend or disable your account and
          report you to the authorities.
        </TermsText>
        <TermsSubTitle>Copyright infringement</TermsSubTitle>
        <TermsText>
          We respect the intellectual property rights of others. If you believe
          that any material available on or through the Services infringes upon
          any copyright you own or control, please immediately refer to the
          "COPYRIGHT INFRINGEMENTS" section below.
        </TermsText>
        <TermsTitle>3. USER REPRESENTATIONS</TermsTitle>
        <TermsText>
          By using the Services, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current,
          and complete; (2) you will maintain the accuracy of such information
          and promptly update such registration information as necessary; (3)
          you have the legal capacity and you agree to comply with these Legal
          Terms; (4) you are not a minor in the jurisdiction in which you
          reside; (5) you will not access the Services through automated or
          non-human means, whether through a bot, script or otherwise; (6) you
          will not use the Services for any illegal or unauthorized purpose; and
          (7) your use of the Services will not violate any applicable law or
          regulation.
        </TermsText>
        <TermsText>
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Services
          (or any portion thereof).
        </TermsText>
        <TermsTitle>4. USER REGISTRATION</TermsTitle>
        <TermsText>
          You may be required to register to use the Services. You agree to keep
          your password confidential and will be responsible for all use of your
          account and password. We reserve the right to remove, reclaim, or
          change a username you select if we determine, in our sole discretion,
          that such username is inappropriate, obscene, or otherwise
          objectionable.
        </TermsText>
        <TermsTitle>5. PURCHASES AND PAYMENT</TermsTitle>
        <TermsText>Visa</TermsText>
        <TermsText>-  Mastercard</TermsText>
        <TermsText>-  American Express</TermsText>
        <TermsText>-  Discover</TermsText>
        <TermsText>
          You agree to provide current, complete, and accurate purchase and
          account information for all purchases made via the Services. You
          further agree to promptly update account and payment information,
          including email address, payment method, and payment card expiration
          date, so that we can complete your transactions and contact you as
          needed. Sales tax will be added to the price of purchases as deemed
          required by us. We may change prices at any time. All payments shall
          be in Accepted Payment currency should be made in the country or state
          of operation.
        </TermsText>
        <TermsText>
          You agree to pay all charges at the prices then in effect for your
          purchases and any applicable shipping fees, and you authorize us to
          charge your chosen payment provider for any such amounts upon placing
          your order. We reserve the right to correct any errors or mistakes in
          pricing, even if we have already requested or received payment.
        </TermsText>
        <TermsText>
          We reserve the right to refuse any order placed through the Services.
          We may, in our sole discretion, limit or cancel quantities purchased
          per person, per household, or per order. These restrictions may
          include orders placed by or under the same customer account, the same
          payment method, and/or orders that use the same billing or shipping
          address. We reserve the right to limit or prohibit orders that, in our
          sole judgment, appear to be placed by dealers, resellers, or
          distributors.
        </TermsText>
        <TermsTitle>7. PROHIBITED ACTIVITIES</TermsTitle>
        <TermsText>
          You may not access or use the Services for any purpose other than that
          for which we make the Services available. The Services may not be used
          in connection with any commercial endeavors except those that are
          specifically endorsed or approved by us.
        </TermsText>
        <TermsText>As a user of the Services, you agree not to:</TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>
                Systematically retrieve data or other content from the Services
                to create or compile, directly or indirectly, a collection,
                compilation, database, or directory without written permission
                from us.
              </>
            }
          />
          <TermItem
            content={
              <>
                Trick, defraud, or mislead us and other users, especially in any
                attempt to learn sensitive account information such as user
                passwords.
              </>
            }
          />
          <TermItem
            content={
              <>
                Circumvent, disable, or otherwise interfere with
                security-related features of the Services, including features
                that prevent or restrict the use or copying of any Content or
                enforce limitations on the use of the Services and/or the
                Content contained therein.
              </>
            }
          />
          <TermItem
            content={
              <>
                Disparage, tarnish, or otherwise harm, in our opinion, us and/or
                the Services.
              </>
            }
          />
          <TermItem
            content={
              <>
                Use any information obtained from the Services in order to
                harass, abuse, or harm another person.
              </>
            }
          />
          <TermItem
            content={
              <>
                Make improper use of our support services or submit false
                reports of abuse or misconduct.
              </>
            }
          />
          <TermItem
            content={
              <>
                Use the Services in a manner inconsistent with any applicable
                laws or regulations.
              </>
            }
          />
          <TermItem
            content={
              <>Engage in unauthorized framing of or linking to the Services.</>
            }
          />
          <TermItem
            content={
              <>
                Upload or transmit (or attempt to upload or to transmit)
                viruses, Trojan horses, or other material, including excessive
                use of capital letters and spamming (continuous posting of
                repetitive text), that interferes with any party’s uninterrupted
                use and enjoyment of the Services or modifies, impairs,
                disrupts, alters, or interferes with the use, features,
                functions, operation, or maintenance of the Services.
              </>
            }
          />
          <TermItem
            content={
              <>
                Engage in any automated use of the system, such as using scripts
                to send comments or messages, or using any data mining, robots,
                or similar data gathering and extraction tools.
              </>
            }
          />
          <TermItem
            content={
              <>
                Delete the copyright or other proprietary rights notice from any
                Content.
              </>
            }
          />
          <TermItem
            content={
              <>
                Attempt to impersonate another user or person or use the
                username of another user.
              </>
            }
          />
          <TermItem
            content={
              <>
                Upload or transmit (or attempt to upload or to transmit) any
                material that acts as a passive or active information collection
                or transmission mechanism, including without limitation, clear
                graphics interchange formats ("gifs"), 1×1 pixels, web bugs,
                cookies, or other similar devices (sometimes referred to as
                "spyware" or "passive collection mechanisms" or "pcms").
              </>
            }
          />
          <TermItem
            content={
              <>
                Interfere with, disrupt, or create an undue burden on the
                Services or the networks or services connected to the Services.
              </>
            }
          />
          <TermItem
            content={
              <>
                Harass, annoy, intimidate, or threaten any of our employees or
                agents engaged in providing any portion of the Services to you.
              </>
            }
          />
          <TermItem
            content={
              <>
                Attempt to bypass any measures of the Services designed to
                prevent or restrict access to the Services, or any portion of
                the Services.
              </>
            }
          />
          <TermItem
            content={
              <>
                Copy or adapt the Services' software, including but not limited
                to Flash, PHP, HTML, JavaScript, or other code.
              </>
            }
          />
          <TermItem
            content={
              <>
                Except as permitted by applicable law, decipher, decompile,
                disassemble, or reverse engineer any of the software comprising
                or in any way making up a part of the Services.
              </>
            }
          />
          <TermItem
            content={
              <>
                Except as may be the result of standard search engine or
                Internet browser usage, use, launch, develop, or distribute any
                automated system, including without limitation, any spider,
                robot, cheat utility, scraper, or offline reader that accesses
                the Services, or use or launch any unauthorized script or other
                software.
              </>
            }
          />
          <TermItem
            content={
              <>
                Use a buying agent or purchasing agent to make purchases on the
                Services.
              </>
            }
          />
          <TermItem
            content={
              <>
                Make any unauthorized use of the Services, including collecting
                usernames and/or email addresses of users by electronic or other
                means for the purpose of sending unsolicited email, or creating
                user accounts by automated means or under false pretenses.
              </>
            }
          />
          <TermItem
            content={
              <>
                Use the Services as part of any effort to compete with us or
                otherwise use the Services and/or the Content for any
                revenue-generating endeavor or commercial enterprise.
              </>
            }
          />
          <TermItem content={<>Sell or otherwise transfer your profile.</>} />
          <TermItem
            content={
              <>
                use pictures of weapson firearms or dangerous ojbects in profile
                picture or community page
              </>
            }
          />
          <TermItem content={<>no illegal activies or drugs</>} />
          <TermItem
            content={
              <>no overtley sexual pornographic material and/or nudity</>
            }
          />
          <TermItem content={<>no false inflammatory religious comments</>} />
        </View>
        <TermsTitle>8. USER GENERATED CONTRIBUTIONS</TermsTitle>
        <TermsText>
          The Services may invite you to chat, contribute to, or participate in
          blogs, message boards, online forums, and other functionality, and may
          provide you with the opportunity to create, submit, post, display,
          transmit, perform, publish, distribute, or broadcast content and
          materials to us or on the Services, including but not limited to text,
          writings, video, audio, photographs, graphics, comments, suggestions,
          or personal information or other material (collectively,
          "Contributions"). Contributions may be viewable by other users of the
          Services and through third-party websites. As such, any Contributions
          you transmit may be treated as non-confidential and non-proprietary.
          When you create or make available any Contributions, you thereby
          represent and warrant that:
        </TermsText>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 16,
          }}
        >
          <TermItem
            content={
              <>
                The creation, distribution, transmission, public display, or
                performance, and the accessing, downloading, or copying of your
                Contributions do not and will not infringe the proprietary
                rights, including but not limited to the copyright, patent,
                trademark, trade secret, or moral rights of any third party.
              </>
            }
          />
          <TermItem
            content={
              <>
                You are the creator and owner of or have the necessary licenses,
                rights, consents, releases, and permissions to use and to
                authorize us, the Services, and other users of the Services to
                use your Contributions in any manner contemplated by the
                Services and these Legal Terms.
              </>
            }
          />
          <TermItem
            content={
              <>
                You have the written consent, release, and/or permission of each
                and every identifiable individual person in your Contributions
                to use the name or likeness of each and every such identifiable
                individual person to enable inclusion and use of your
                Contributions in any manner contemplated by the Services and
                these Legal Terms.
              </>
            }
          />
          <TermItem
            content={
              <>Your Contributions are not false, inaccurate, or misleading.</>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions are not unsolicited or unauthorized
                advertising, promotional materials, pyramid schemes, chain
                letters, spam, mass mailings, or other forms of solicitation.
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions are not obscene, lewd, lascivious, filthy,
                violent, harassing, libelous, slanderous, or otherwise
                objectionable (as determined by us).
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions do not ridicule, mock, disparage, intimidate,
                or abuse anyone.
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions are not used to harass or threaten (in the
                legal sense of those terms) any other person and to promote
                violence against a specific person or class of people.
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions do not violate any applicable law,
                regulation, or rule.
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions do not violate the privacy or publicity
                rights of any third party.
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions do not violate any applicable law concerning
                child pornography, or otherwise intended to protect the health
                or well-being of minors.
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions do not include any offensive comments that
                are connected to race, national origin, gender, sexual
                preference, or physical handicap.
              </>
            }
          />
          <TermItem
            content={
              <>
                Your Contributions do not otherwise violate, or link to material
                that violates, any provision of these Legal Terms, or any
                applicable law or regulation.
              </>
            }
          />
        </View>
        <TermsText>
          Any use of the Services in violation of the foregoing violates these
          Legal Terms and may result in, among other things, termination or
          suspension of your rights to use the Services.
        </TermsText>
        <TermsTitle>9. CONTRIBUTION LICENSE</TermsTitle>
        <TermsText>
          By posting your Contributions to any part of the Services or making
          Contributions accessible to the Services by linking your account from
          the Services to any of your social networking accounts, you
          automatically grant, and you represent and warrant that you have the
          right to grant, to us an unrestricted, unlimited, irrevocable,
          perpetual, non-exclusive, transferable, royalty-free, fully-paid,
          worldwide right, and license to host, use, copy, reproduce, disclose,
          sell, resell, publish, broadcast, retitle, archive, store, cache,
          publicly perform, publicly display, reformat, translate, transmit,
          excerpt (in whole or in part), and distribute such Contributions
          (including, without limitation, your image and voice) for any purpose,
          commercial, advertising, or otherwise, and to prepare derivative works
          of, or incorporate into other works, such Contributions, and grant and
          authorize sublicenses of the foregoing. The use and distribution may
          occur in any media formats and through any media channels.
        </TermsText>
        <TermsText>
          This license will apply to any form, media, or technology now known or
          hereafter developed, and includes our use of your name, company name,
          and franchise name, as applicable, and any of the trademarks, service
          marks, trade names, logos, and personal and commercial images you
          provide. You waive all moral rights in your Contributions, and you
          warrant that moral rights have not otherwise been asserted in your
          Contributions.
        </TermsText>
        <TermsText>
          We do not assert any ownership over your Contributions. You retain
          full ownership of all of your Contributions and any intellectual
          property rights or other proprietary rights associated with your
          Contributions. We are not liable for any statements or representations
          in your Contributions provided by you in any area on the Services. You
          are solely responsible for your Contributions to the Services and you
          expressly agree to exonerate us from any and all responsibility and to
          refrain from any legal action against us regarding your Contributions.
        </TermsText>
        <TermsText>
          We have the right, in our sole and absolute discretion, (1) to edit,
          redact, or otherwise change any Contributions; (2) to re-categorize
          any Contributions to place them in more appropriate locations on the
          Services; and (3) to pre-screen or delete any Contributions at any
          time and for any reason, without notice. We have no obligation to
          monitor your Contributions.
        </TermsText>
        <TermsTitle>10. GUIDELINES FOR REVIEWS</TermsTitle>
        <TermsText>
          We may provide you areas on the Services to leave reviews or ratings.
          When posting a review, you must comply with the following criteria:
          (1) you should have firsthand experience with the person/entity being
          reviewed; (2) your reviews should not contain offensive profanity, or
          abusive, racist, offensive, or hateful language; (3) your reviews
          should not contain discriminatory references based on religion, race,
          gender, national origin, age, marital status, sexual orientation, or
          disability; (4) your reviews should not contain references to illegal
          activity; (5) you should not be affiliated with competitors if posting
          negative reviews; (6) you should not make any conclusions as to the
          legality of conduct; (7) you may not post any false or misleading
          statements; and (8) you may not organize a campaign encouraging others
          to post reviews, whether positive or negative.
        </TermsText>
        <TermsText>
          We may accept, reject, or remove reviews in our sole discretion. We
          have absolutely no obligation to screen reviews or to delete reviews,
          even if anyone considers reviews objectionable or inaccurate. Reviews
          are not endorsed by us, and do not necessarily represent our opinions
          or the views of any of our affiliates or partners. We do not assume
          liability for any review or for any claims, liabilities, or losses
          resulting from any review. By posting a review, you hereby grant to us
          a perpetual, non-exclusive, worldwide, royalty-free, fully paid,
          assignable, and sublicensable right and license to reproduce, modify,
          translate, transmit by any means, display, perform, and/or distribute
          all content relating to review.
        </TermsText>
        <TermsTitle>11. MOBILE APPLICATION LICENSE</TermsTitle>
        <TermsSubTitle>Use License</TermsSubTitle>
        <TermsText>
          If you access the Services via the App, then we grant you a revocable,
          non-exclusive, non-transferable, limited right to install and use the
          App on wireless electronic devices owned or controlled by you, and to
          access and use the App on such devices strictly in accordance with the
          terms and conditions of this mobile application license contained in
          these Legal Terms. You shall not: (1) except as permitted by
          applicable law, decompile, reverse engineer, disassemble, attempt to
          derive the source code of, or decrypt the App; (2) make any
          modification, adaptation, improvement, enhancement, translation, or
          derivative work from the App; (3) violate any applicable laws, rules,
          or regulations in connection with your access or use of the App; (4)
          remove, alter, or obscure any proprietary notice (including any notice
          of copyright or trademark) posted by us or the licensors of the App;
          (5) use the App for any revenue-generating endeavor, commercial
          enterprise, or other purpose for which it is not designed or intended;
          (6) make the App available over a network or other environment
          permitting access or use by multiple devices or users at the same
          time; (7) use the App for creating a product, service, or software
          that is, directly or indirectly, competitive with or in any way a
          substitute for the App; (8) use the App to send automated queries to
          any website or to send any unsolicited commercial email; or (9) use
          any proprietary information or any of our interfaces or our other
          intellectual property in the design, development, manufacture,
          licensing, or distribution of any applications, accessories, or
          devices for use with the App.
        </TermsText>
        <TermsSubTitle>Apple and Android Devices</TermsSubTitle>
        <TermsText>
          The following terms apply when you use the App obtained from either
          the Apple Store or Google Play (each an "App Distributor") to access
          the Services: (1) the license granted to you for our App is limited to
          a non-transferable license to use the application on a device that
          utilizes the Apple iOS or Android operating systems, as applicable,
          and in accordance with the usage rules set forth in the applicable App
          Distributor’s terms of service; (2) we are responsible for providing
          any maintenance and support services with respect to the App as
          specified in the terms and conditions of this mobile application
          license contained in these Legal Terms or as otherwise required under
          applicable law, and you acknowledge that each App Distributor has no
          obligation whatsoever to furnish any maintenance and support services
          with respect to the App; (3) in the event of any failure of the App to
          conform to any applicable warranty, you may notify the applicable App
          Distributor, and the App Distributor, in accordance with its terms and
          policies, may refund the purchase price, if any, paid for the App, and
          to the maximum extent permitted by applicable law, the App Distributor
          will have no other warranty obligation whatsoever with respect to the
          App; (4) you represent and warrant that (i) you are not located in a
          country that is subject to a US government embargo, or that has been
          designated by the US government as a "terrorist supporting" country
          and (ii) you are not listed on any US government list of prohibited or
          restricted parties; (5) you must comply with applicable third-party
          terms of agreement when using the App, e.g., if you have a VoIP
          application, then you must not be in violation of their wireless data
          service agreement when using the App; and (6) you acknowledge and
          agree that the App Distributors are third-party beneficiaries of the
          terms and conditions in this mobile application license contained in
          these Legal Terms, and that each App Distributor will have the right
          (and will be deemed to have accepted the right) to enforce the terms
          and conditions in this mobile application license contained in these
          Legal Terms against you as a third-party beneficiary thereof.
        </TermsText>
        <TermsTitle>12. SOCIAL MEDIA</TermsTitle>
        <TermsText>
          As part of the functionality of the Services, you may link your
          account with online accounts you have with third-party service
          providers (each such account, a "Third-Party Account") by either: (1)
          providing your Third-Party Account login information through the
          Services; or (2) allowing us to access your Third-Party Account, as is
          permitted under the applicable terms and conditions that govern your
          use of each Third-Party Account. You represent and warrant that you
          are entitled to disclose your Third-Party Account login information to
          us and/or grant us access to your Third-Party Account, without breach
          by you of any of the terms and conditions that govern your use of the
          applicable Third-Party Account, and without obligating us to pay any
          fees or making us subject to any usage limitations imposed by the
          third-party service provider of the Third-Party Account. By granting
          us access to any Third-Party Accounts, you understand that (1) we may
          access, make available, and store (if applicable) any content that you
          have provided to and stored in your Third-Party Account (the "Social
          Network Content") so that it is available on and through the Services
          via your account, including without limitation any friend lists and
          (2) we may submit to and receive from your Third-Party Account
          additional information to the extent you are notified when you link
          your account with the Third-Party Account. Depending on the
          Third-Party Accounts you choose and subject to the privacy settings
          that you have set in such Third-Party Accounts, personally
          identifiable information that you post to your Third-Party Accounts
          may be available on and through your account on the Services. Please
          note that if a Third-Party Account or associated service becomes
          unavailable or our access to such Third-Party Account is terminated by
          the third-party service provider, then Social Network Content may no
          longer be available on and through the Services. You will have the
          ability to disable the connection between your account on the Services
          and your Third-Party Accounts at any time. PLEASE NOTE THAT YOUR
          RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH
          YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH
          SUCH THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any
          Social Network Content for any purpose, including but not limited to,
          for accuracy, legality, or non-infringement, and we are not
          responsible for any Social Network Content. You acknowledge and agree
          that we may access your email address book associated with a
          Third-Party Account and your contacts list stored on your mobile
          device or tablet computer solely for purposes of identifying and
          informing you of those contacts who have also registered to use the
          Services. You can deactivate the connection between the Services and
          your Third-Party Account by contacting us using the contact
          information below or through your account settings (if applicable). We
          will attempt to delete any information stored on our servers that was
          obtained through such Third-Party Account, except the username and
          profile picture that become associated with your account.
        </TermsText>
        <TermsTitle>13. SERVICES MANAGEMENT</TermsTitle>
        <TermsText>
          We reserve the right, but not the obligation, to: (1) monitor the
          Services for violations of these Legal Terms; (2) take appropriate
          legal action against anyone who, in our sole discretion, violates the
          law or these Legal Terms, including without limitation, reporting such
          user to law enforcement authorities; (3) in our sole discretion and
          without limitation, refuse, restrict access to, limit the availability
          of, or disable (to the extent technologically feasible) any of your
          Contributions or any portion thereof; (4) in our sole discretion and
          without limitation, notice, or liability, to remove from the Services
          or otherwise disable all files and content that are excessive in size
          or are in any way burdensome to our systems; and (5) otherwise manage
          the Services in a manner designed to protect our rights and property
          and to facilitate the proper functioning of the Services.
        </TermsText>
        <TermsTitle>14. PRIVACY POLICY</TermsTitle>
        <TermsText>
          We care about data privacy and security. Please review our Privacy
          Policy: 
          {formLink(
            'https://www.muznet.com/privacy-policy',
            'https://www.muznet.com/privacy-policy',
          )}
          . By using the Services, you agree to be bound by our Privacy Policy,
          which is incorporated into these Legal Terms. Please be advised the
          Services are hosted in the United States. If you access the Services
          from any other region of the world with laws or other requirements
          governing personal data collection, use, or disclosure that differ
          from applicable laws in the United States, then through your continued
          use of the Services, you are transferring your data to the United
          States, and you expressly consent to have your data transferred to and
          processed in the United States.
        </TermsText>
        <TermsTitle>15. COPYRIGHT INFRINGEMENTS</TermsTitle>
        <TermsText>
          We respect the intellectual property rights of others. If you believe
          that any material available on or through the Services infringes upon
          any copyright you own or control, please immediately notify us using
          the contact information provided below (a "Notification"). A copy of
          your Notification will be sent to the person who posted or stored the
          material addressed in the Notification. Please be advised that
          pursuant to applicable law you may be held liable for damages if you
          make material misrepresentations in a Notification. Thus, if you are
          not sure that material located on or linked to by the Services
          infringes your copyright, you should consider first contacting an
          attorney.
        </TermsText>
        <TermsTitle>16. TERM AND TERMINATION</TermsTitle>
        <TermsText>
          These Legal Terms shall remain in full force and effect while you use
          the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL
          TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
          NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING
          BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO
          REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
          WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
          APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
          PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT
          OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR
          SOLE DISCRETION.
        </TermsText>
        <TermsText>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your
          name, a fake or borrowed name, or the name of any third party, even if
          you may be acting on behalf of the third party. In addition to
          terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil,
          criminal, and injunctive redress.
        </TermsText>
        <TermsTitle>17. MODIFICATIONS AND INTERRUPTIONS</TermsTitle>
        <TermsText>
          We reserve the right to change, modify, or remove the contents of the
          Services at any time or for any reason at our sole discretion without
          notice. However, we have no obligation to update any information on
          our Services. We also reserve the right to modify or discontinue all
          or part of the Services without notice at any time. We will not be
          liable to you or any third party for any modification, price change,
          suspension, or discontinuance of the Services.
        </TermsText>
        <TermsText>
          We cannot guarantee the Services will be available at all times. We
          may experience hardware, software, or other problems or need to
          perform maintenance related to the Services, resulting in
          interruptions, delays, or errors. We reserve the right to change,
          revise, update, suspend, discontinue, or otherwise modify the Services
          at any time or for any reason without notice to you. You agree that we
          have no liability whatsoever for any loss, damage, or inconvenience
          caused by your inability to access or use the Services during any
          downtime or discontinuance of the Services. Nothing in these Legal
          Terms will be construed to obligate us to maintain and support the
          Services or to supply any corrections, updates, or releases in
          connection therewith.
        </TermsText>
        <TermsTitle>18. GOVERNING LAW</TermsTitle>
        <TermsText>
          These Legal Terms and your use of the Services are governed by and
          construed in accordance with the laws of the Commonwealth of
          Pennsylvania applicable to agreements made and to be entirely
          performed within the Commonwealth of Pennsylvania, without regard to
          its conflict of law principles.
        </TermsText>
        <TermsTitle>19. DISPUTE RESOLUTION</TermsTitle>
        <TermsText>
          Any legal action of whatever nature brought by either you or us
          (collectively, the "Parties" and individually, a "Party") shall be
          commenced or prosecuted in the state and federal courts located in
          Pennsylvania, and the Parties hereby consent to, and waive all
          defenses of lack of personal jurisdiction and forum non conveniens
          with respect to venue and jurisdiction in such state and federal
          courts. Application of the United Nations Convention on Contracts for
          the International Sale of Goods and the Uniform Computer Information
          Transaction Act (UCITA) are excluded from these Legal Terms. In no
          event shall any claim, action, or proceeding brought by either Party
          related in any way to the Services be commenced more than five (5)
          years after the cause of action arose.
        </TermsText>
        <TermsTitle>20. CORRECTIONS</TermsTitle>
        <TermsText>
          There may be information on the Services that contains typographical
          errors, inaccuracies, or omissions, including descriptions, pricing,
          availability, and various other information. We reserve the right to
          correct any errors, inaccuracies, or omissions and to change or update
          the information on the Services at any time, without prior notice.
        </TermsText>
        <TermsTitle>21. DISCLAIMER</TermsTitle>
        <TermsText>
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
          AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE
          FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
          OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF,
          INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
          ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF
          ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL
          ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR
          INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY
          DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND
          USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
          SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
          FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR
          CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS,
          VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR
          THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR
          OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF
          ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
          TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT
          WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT
          OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE
          SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE
          APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL
          NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
          TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
          SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY
          MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND
          EXERCISE CAUTION WHERE APPROPRIATE.
        </TermsText>
        <TermsTitle>22. LIMITATIONS OF LIABILITY</TermsTitle>
        <TermsText>
          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
          TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
          EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
          PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR
          USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
          OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED
          HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS
          OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER
          OF THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE six (6) MONTH
          PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR $1,000.00 USD. CERTAIN
          US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON
          IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES.
          IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR
          LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
        </TermsText>
        <TermsTitle>23. INDEMNIFICATION</TermsTitle>
        <TermsText>
          You agree to defend, indemnify, and hold us harmless, including our
          subsidiaries, affiliates, and all of our respective officers, agents,
          partners, and employees, from and against any loss, damage, liability,
          claim, or demand, including reasonable attorneys’ fees and expenses,
          made by any third party due to or arising out of: (1) your
          Contributions; (2) use of the Services; (3) breach of these Legal
          Terms; (4) any breach of your representations and warranties set forth
          in these Legal Terms; (5) your violation of the rights of a third
          party, including but not limited to intellectual property rights; or
          (6) any overt harmful act toward any other user of the Services with
          whom you connected via the Services. Notwithstanding the foregoing, we
          reserve the right, at your expense, to assume the exclusive defense
          and control of any matter for which you are required to indemnify us,
          and you agree to cooperate, at your expense, with our defense of such
          claims. We will use reasonable efforts to notify you of any such
          claim, action, or proceeding which is subject to this indemnification
          upon becoming aware of it.
        </TermsText>
        <TermsTitle>24. USER DATA</TermsTitle>
        <TermsText>
          We will maintain certain data that you transmit to the Services for
          the purpose of managing the performance of the Services, as well as
          data relating to your use of the Services. Although we perform regular
          routine backups of data, you are solely responsible for all data that
          you transmit or that relates to any activity you have undertaken using
          the Services. You agree that we shall have no liability to you for any
          loss or corruption of any such data, and you hereby waive any right of
          action against us arising from any such loss or corruption of such
          data.
        </TermsText>
        <TermsTitle>
          25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
        </TermsTitle>
        <TermsText>
          Visiting the Services, sending us emails, and completing online forms
          constitute electronic communications. You consent to receive
          electronic communications, and you agree that all agreements, notices,
          disclosures, and other communications we provide to you
          electronically, via email and on the Services, satisfy any legal
          requirement that such communication be in writing. YOU HEREBY AGREE TO
          THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER
          RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS
          OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You
          hereby waive any rights or requirements under any statutes,
          regulations, rules, ordinances, or other laws in any jurisdiction
          which require an original signature or delivery or retention of
          non-electronic records, or to payments or the granting of credits by
          any means other than electronic means.
        </TermsText>
        <TermsTitle>26. CALIFORNIA USERS AND RESIDENTS</TermsTitle>
        <TermsText>
          If any complaint with us is not satisfactorily resolved, you can
          contact the Complaint Assistance Unit of the Division of Consumer
          Services of the California Department of Consumer Affairs in writing
          at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834
          or by telephone at (800) 952-5210 or (916) 445-1254.
        </TermsText>
        <TermsTitle>27. MISCELLANEOUS</TermsTitle>
        <TermsText>
          These Legal Terms and any policies or operating rules posted by us on
          the Services or in respect to the Services constitute the entire
          agreement and understanding between you and us. Our failure to
          exercise or enforce any right or provision of these Legal Terms shall
          not operate as a waiver of such right or provision. These Legal Terms
          operate to the fullest extent permissible by law. We may assign any or
          all of our rights and obligations to others at any time. We shall not
          be responsible or liable for any loss, damage, delay, or failure to
          act caused by any cause beyond our reasonable control. If any
          provision or part of a provision of these Legal Terms is determined to
          be unlawful, void, or unenforceable, that provision or part of the
          provision is deemed severable from these Legal Terms and does not
          affect the validity and enforceability of any remaining provisions.
          There is no joint venture, partnership, employment or agency
          relationship created between you and us as a result of these Legal
          Terms or use of the Services. You agree that these Legal Terms will
          not be construed against us by virtue of having drafted them. You
          hereby waive any and all defenses you may have based on the electronic
          form of these Legal Terms and the lack of signing by the parties
          hereto to execute these Legal Terms.
        </TermsText>
        <TermsTitle>28. CONTACT US</TermsTitle>
        <TermsText>
          In order to resolve a complaint regarding the Services or to receive
          further information regarding use of the Services, please contact us
          at:
        </TermsText>
        <TermsText>MuzNet Inc</TermsText>
        <TermsText>Philadelphia PA</TermsText>
        <TermsText>United States</TermsText>
        <TermsText>Phone: N/A</TermsText>
        <TermsText>Fax: N/A</TermsText>
        <TermsText>
          {formLink('mailto:support@muznet.com', 'support@muznet.com')}
        </TermsText>
      </>
    )

  return (
    <>
      <TermsText>Last updated April 17, 2023</TermsText>
      <TermsText>
        Muznet is licensed to You (End-User) by Muznet LLC, located and
        registered at, Philadelphia, Pennsylvania, United States ("Licensor"),
        for use only under the terms of this License Agreement.
      </TermsText>
      <TermsText>
        By downloading the Licensed Application from Apple's software
        distribution platform ("App Store") and Google's software distribution
        platform ("Play Store"), and any update thereto (as permitted by this
        License Agreement), You indicate that You agree to be bound by all of
        the terms and conditions of this License Agreement, and that You accept
        this License Agreement. App Store and Play Store are referred to in this
        License Agreement as "Services."
      </TermsText>
      <TermsText>
        The parties of this License Agreement acknowledge that the Services are
        not a Party to this License Agreement and are not bound by any
        provisions or obligations with regard to the Licensed Application, such
        as warranty, liability, maintenance and support thereof. Muznet LLC, not
        the Services, is solely responsible for the Licensed Application and the
        content thereof.
      </TermsText>
      <TermsText>
        This License Agreement may not provide for usage rules for the Licensed
        Application that are in conflict with the latest Apple Media Services
        Terms and Conditions and Google Play Terms of Service ("Usage Rules").
        Muznet LLC acknowledges that it had the opportunity to review the Usage
        Rules and this License Agreement is not conflicting with them.
      </TermsText>
      <TermsText>
        Muznet when purchased or downloaded through the Services, is licensed to
        You for use only under the terms of this License Agreement. The Licensor
        reserves all rights not expressly granted to You. Muznet is to be used
        on devices that operate with Apple's operating systems ("iOS" and "Mac
        OS") or Google's operating system ("Android").
      </TermsText>
      <TermsTitle>TABLE OF CONTENTS</TermsTitle>
      <TermsText>1. THE APPLICATION</TermsText>
      <TermsText>2. SCOPE OF LICENSE</TermsText>
      <TermsText>3. TECHNICAL REQUIREMENTS</TermsText>
      <TermsText>4. MAINTENANCE AND SUPPORT</TermsText>
      <TermsText>5. USE OF DATA</TermsText>
      <TermsText>6. USER-GENERATED CONTRIBUTIONS</TermsText>
      <TermsText>7. CONTRIBUTION LICENSE</TermsText>
      <TermsText>8. LIABILITY</TermsText>
      <TermsText>9. WARRANTY</TermsText>
      <TermsText>10. PRODUCT CLAIMS</TermsText>
      <TermsText>11. LEGAL COMPLIANCE</TermsText>
      <TermsText>12. CONTACT INFORMATION</TermsText>
      <TermsText>13. TERMINATION</TermsText>
      <TermsText>14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY</TermsText>
      <TermsText>15. INTELLECTUAL PROPERTY RIGHTS</TermsText>
      <TermsText>16. APPLICABLE LAW</TermsText>
      <TermsText>17. MISCELLANEOUS</TermsText>
      <TermsTitle>1. THE APPLICATION</TermsTitle>
      <TermsText>
        Muznet ("Licensed Application") is a piece of software created to Muznet
        is created to facilitate the connection between musicians, bands, DJ's
        and live music venues for job opportunities — and customized for iOS and
        Android mobile devices ("Devices"). It is used to the app serves as a
        market place for musicians, bands, and live music venues to connect for
        job opportunities.
      </TermsText>
      <TermsText>
        The Licensed Application is not tailored to comply with
        industry-specific regulations (Health Insurance Portability and
        Accountability Act (HIPAA), Federal Information Security Management Act
        (FISMA), etc.), so if your interactions would be subjected to such laws,
        you may not use this Licensed Application. You may not use the Licensed
        Application in a way that would violate the Gramm-Leach-Bliley Act
        (GLBA).
      </TermsText>
      <TermsTitle>2. SCOPE OF LICENSE</TermsTitle>
      <TermsText>
        2.1  You are given a non-transferable, non-exclusive, non-sublicensable
        license to install and use the Licensed Application on any Devices that
        You (End-User) own or control and as permitted by the Usage Rules, with
        the exception that such Licensed Application may be accessed and used by
        other accounts associated with You (End-User, The Purchaser) via Family
        Sharing or volume purchasing.
      </TermsText>
      <TermsText>
        2.2  This license will also govern any updates of the Licensed
        Application provided by Licensor that replace, repair, and/or supplement
        the first Licensed Application, unless a separate license is provided
        for such update, in which case the terms of that new license will
        govern.
      </TermsText>
      <TermsText>
        2.3  You may not share or make the Licensed Application available to
        third parties (unless to the degree allowed by the Usage Rules, and with
        Muznet LLC's prior written consent), sell, rent, lend, lease or
        otherwise redistribute the Licensed Application.
      </TermsText>
      <TermsText>
        2.4  You may not reverse engineer, translate, disassemble, integrate,
        decompile, remove, modify, combine, create derivative works or updates
        of, adapt, or attempt to derive the source code of the Licensed
        Application, or any part thereof (except with Muznet LLC's prior written
        consent).
      </TermsText>
      <TermsText>
        2.5  You may not copy (excluding when expressly authorized by this
        license and the Usage Rules) or alter the Licensed Application or
        portions thereof. You may create and store copies only on devices that
        You own or control for backup keeping under the terms of this license,
        the Usage Rules, and any other terms and conditions that apply to the
        device or software used. You may not remove any intellectual property
        notices. You acknowledge that no unauthorized third parties may gain
        access to these copies at any time. If you sell your Devices to a third
        party, you must remove the Licensed Application from the Devices before
        doing so.
      </TermsText>
      <TermsText>
        2.6  Violations of the obligations mentioned above, as well as the
        attempt of such infringement, may be subject to prosecution and damages.
      </TermsText>
      <TermsText>
        2.7  Licensor reserves the right to modify the terms and conditions of
        licensing.
      </TermsText>
      <TermsText>
        2.8  Nothing in this license should be interpreted to restrict
        third-party terms. When using the Licensed Application, You must ensure
        that You comply with applicable third-party terms and conditions.
      </TermsText>
      <TermsTitle>3. TECHNICAL REQUIREMENTS</TermsTitle>
      <TermsText>
        3.1  Licensor attempts to keep the Licensed Application updated so that
        it complies with modified/new versions of the firmware and new hardware.
        You are not granted rights to claim such an update.
      </TermsText>
      <TermsText>
        3.2  Licensor reserves the right to modify the technical specifications
        as it sees appropriate at any time.
      </TermsText>
      <TermsTitle>4. MAINTENANCE AND SUPPORT</TermsTitle>
      <TermsText>
        4.1  The Licensor is solely responsible for providing any maintenance
        and support services for this Licensed Application. You can reach the
        Licensor at the email address listed in the App Store or Play Store
        Overview for this Licensed Application.
      </TermsText>
      <TermsText>
        4.2  Muznet LLC and the End-User acknowledge that the Services have no
        obligation whatsoever to furnish any maintenance and support services
        with respect to the Licensed Application.
      </TermsText>
      <TermsTitle>5. USE OF DATA</TermsTitle>
      <TermsText>
        You acknowledge that Licensor will be able to access and adjust Your
        downloaded Licensed Application content and Your personal information,
        and that Licensor's use of such material and information is subject to
        Your legal agreements with Licensor and Licensor's privacy policy.
      </TermsText>
      <TermsText>
        You acknowledge that the Licensor may periodically collect and use
        technical data and related information about your device, system, and
        application software, and peripherals, offer product support, facilitate
        the software updates, and for purposes of providing other services to
        you (if any) related to the Licensed Application. Licensor may also use
        this information to improve its products or to provide services or
        technologies to you, as long as it is in a form that does not personally
        identify you.
      </TermsText>
      <TermsTitle>6. USER-GENERATED CONTRIBUTIONS</TermsTitle>
      <TermsText>
        The Licensed Application may invite you to chat, contribute to, or
        participate in blogs, message boards, online forums, and other
        functionality, and may provide you with the opportunity to create,
        submit, post, display, transmit, perform, publish, distribute, or
        broadcast content and materials to us or in the Licensed Application,
        including but not limited to text, writings, video, audio, photographs,
        graphics, comments, suggestions, or personal information or other
        material (collectively, "Contributions"). Contributions may be viewable
        by other users of the Licensed Application and through third-party
        websites or applications. As such, any Contributions you transmit may be
        treated as non-confidential and non-proprietary. When you create or make
        available any Contributions, you thereby represent and warrant that:
      </TermsText>
      <TermsText>
        1. The creation, distribution, transmission, public display, or
        performance, and the accessing, downloading, or copying of your
        Contributions do not and will not infringe the proprietary rights,
        including but not limited to the copyright, patent, trademark, trade
        secret, or moral rights of any third party.
      </TermsText>
      <TermsText>
        2. You are the creator and owner of or have the necessary licenses,
        rights, consents, releases, and permissions to use and to authorize us,
        the Licensed Application, and other users of the Licensed Application to
        use your Contributions in any manner contemplated by the Licensed
        Application and this License Agreement.
      </TermsText>
      <TermsText>
        3. You have the written consent, release, and/or permission of each and
        every identifiable individual person in your Contributions to use the
        name or likeness or each and every such identifiable individual person
        to enable inclusion and use of your Contributions in any manner
        contemplated by the Licensed Application and this License Agreement.
      </TermsText>
      <TermsText>
        4. Your Contributions are not false, inaccurate, or misleading.
      </TermsText>
      <TermsText>
        5. Your Contributions are not unsolicited or unauthorized advertising,
        promotional materials, pyramid schemes, chain letters, spam, mass
        mailings, or other forms of solicitation.
      </TermsText>
      <TermsText>
        6. Your Contributions are not obscene, lewd, lascivious, filthy,
        violent, harassing, libelous, slanderous, or otherwise objectionable (as
        determined by us).
      </TermsText>
      <TermsText>
        7. Your Contributions do not ridicule, mock, disparage, intimidate, or
        abuse anyone.
      </TermsText>
      <TermsText>
        8. Your Contributions are not used to harass or threaten (in the legal
        sense of those terms) any other person and to promote violence against a
        specific person or class of people.
      </TermsText>
      <TermsText>
        9. Your Contributions do not violate any applicable law, regulation, or
        rule.
      </TermsText>
      <TermsText>
        10. Your Contributions do not violate the privacy or publicity rights of
        any third party.
      </TermsText>
      <TermsText>
        11. Your Contributions do not violate any applicable law concerning
        child pornography, or otherwise intended to protect the health or
        well-being of minors.
      </TermsText>
      <TermsText>
        12. Your Contributions do not include any offensive comments that are
        connected to race, national origin, gender, sexual preference, or
        physical handicap.
      </TermsText>
      <TermsText>
        13. Your Contributions do not otherwise violate, or link to material
        that violates, any provision of this License Agreement, or any
        applicable law or regulation.
      </TermsText>
      <TermsText>
        Any use of the Licensed Application in violation of the foregoing
        violates this License Agreement and may result in, among other things,
        termination or suspension of your rights to use the Licensed
        Application.
      </TermsText>
      <TermsTitle>7. CONTRIBUTION LICENSE</TermsTitle>
      <TermsText>
        By posting your Contributions to any part of the Licensed Application or
        making Contributions accessible to the Licensed Application by linking
        your account from the Licensed Application to any of your social
        networking accounts, you automatically grant, and you represent and
        warrant that you have the right to grant, to us an unrestricted,
        unlimited, irrevocable, perpetual, non-exclusive, transferable,
        royalty-free, fully-paid, worldwide right, and license to host, use
        copy, reproduce, disclose, sell, resell, publish, broad cast, retitle,
        archive, store, cache, publicly display, reformat, translate, transmit,
        excerpt (in whole or in part), and distribute such Contributions
        (including, without limitation, your image and voice) for any purpose,
        commercial advertising, or otherwise, and to prepare derivative works
        of, or incorporate in other works, such as Contributions, and grant and
        authorize sublicenses of the foregoing. The use and distribution may
        occur in any media formats and through any media channels.
      </TermsText>
      <TermsText>
        This license will apply to any form, media, or technology now known or
        hereafter developed, and includes our use of your name, company name,
        and franchise name, as applicable, and any of the trademarks, service
        marks, trade names, logos, and personal and commercial images you
        provide. You waive all moral rights in your Contributions, and you
        warrant that moral rights have not otherwise been asserted in your
        Contributions.
      </TermsText>
      <TermsText>
        We do not assert any ownership over your Contributions. You retain full
        ownership of all of your Contributions and any intellectual property
        rights or other proprietary rights associated with your Contributions.
        We are not liable for any statements or representations in your
        Contributions provided by you in any area in the Licensed Application.
        You are solely responsible for your Contributions to the Licensed
        Application and you expressly agree to exonerate us from any and all
        responsibility and to refrain from any legal action against us regarding
        your Contributions.
      </TermsText>
      <TermsText>
        We have the right, in our sole and absolute discretion, (1) to edit,
        redact, or otherwise change any Contributions; (2) to recategorize any
        Contributions to place them in more appropriate locations in the
        Licensed Application; and (3) to prescreen or delete any Contributions
        at any time and for any reason, without notice. We have no obligation to
        monitor your Contributions.
      </TermsText>
      <TermsTitle>8. LIABILITY</TermsTitle>
      <TermsText>
        8.1  Licensor's responsibility in the case of violation of obligations
        and tort shall be limited to intent and gross negligence. Only in case
        of a breach of essential contractual duties (cardinal obligations),
        Licensor shall also be liable in case of slight negligence. In any case,
        liability shall be limited to the foreseeable, contractually typical
        damages. The limitation mentioned above does not apply to injuries to
        life, limb, or health.
      </TermsText>
      <TermsTitle>9. WARRANTY</TermsTitle>
      <TermsText>
        9.1  Licensor warrants that the Licensed Application is free of spyware,
        trojan horses, viruses, or any other malware at the time of Your
        download. Licensor warrants that the Licensed Application works as
        described in the user documentation.
      </TermsText>
      <TermsText>
        9.2  No warranty is provided for the Licensed Application that is not
        executable on the device, that has been unauthorizedly modified, handled
        inappropriately or culpably, combined or installed with inappropriate
        hardware or software, used with inappropriate accessories, regardless if
        by Yourself or by third parties, or if there are any other reasons
        outside of Muznet LLC's sphere of influence that affect the
        executability of the Licensed Application.
      </TermsText>
      <TermsText>
        9.3  You are required to inspect the Licensed Application immediately
        after installing it and notify Muznet LLC about issues discovered
        without delay by email provided in Contact Information. The defect
        report will be taken into consideration and further investigated if it
        has been emailed within a period of 5 days after discovery.
      </TermsText>
      <TermsText>
        9.4  If we confirm that the Licensed Application is defective, Muznet
        LLC reserves a choice to remedy the situation either by means of solving
        the defect or substitute delivery.
      </TermsText>
      <TermsText>
        9.5  In the event of any failure of the Licensed Application to conform
        to any applicable warranty, You may notify the Services Store Operator,
        and Your Licensed Application purchase price will be refunded to You. To
        the maximum extent permitted by applicable law, the Services Store
        Operator will have no other warranty obligation whatsoever with respect
        to the Licensed Application, and any other losses, claims, damages,
        liabilities, expenses, and costs attributable to any negligence to
        adhere to any warranty.
      </TermsText>
      <TermsText>
        9.6  If the user is an entrepreneur, any claim based on faults expires
        after a statutory period of limitation amounting to twelve (12) months
        after the Licensed Application was made available to the user. The
        statutory periods of limitation given by law apply for users who are
        consumers.
      </TermsText>
      <TermsTitle>10. PRODUCT CLAIMS</TermsTitle>
      <TermsText>
        Muznet LLC and the End-User acknowledge that Muznet LLC, and not the
        Services, is responsible for addressing any claims of the End-User or
        any third party relating to the Licensed Application or the End-User’s
        possession and/or use of that Licensed Application, including, but not
        limited to:
      </TermsText>
      <TermsText>(i) product liability claims;</TermsText>
      <TermsText>
        (ii) any claim that the Licensed Application fails to conform to any
        applicable legal or regulatory requirement; and
      </TermsText>
      <TermsText>
        (iii) claims arising under consumer protection, privacy, or similar
        legislation, including in connection with Your Licensed Application’s
        use of the HealthKit and HomeKit.
      </TermsText>
      <TermsTitle>11. LEGAL COMPLIANCE</TermsTitle>
      <TermsText>
        You represent and warrant that You are not located in a country that is
        subject to a US Government embargo, or that has been designated by the
        US Government as a "terrorist supporting" country; and that You are not
        listed on any US Government list of prohibited or restricted parties.
      </TermsText>
      <TermsTitle>12. CONTACT INFORMATION</TermsTitle>
      <TermsText>
        For general inquiries, complaints, questions or claims concerning the
        Licensed Application, please contact:
      </TermsText>
      <TermsText>Muznet support</TermsText>
      <TermsText>Philadelphia,</TermsText>
      <TermsText>United States</TermsText>
      <TermsText>support@muznet.com</TermsText>
      <TermsTitle>13. TERMINATION</TermsTitle>
      <TermsText>
        The license is valid until terminated by Muznet LLC or by You. Your
        rights under this license will terminate automatically and without
        notice from Muznet LLC if You fail to adhere to any term(s) of this
        license. Upon License termination, You shall stop all use of the
        Licensed Application, and destroy all copies, full or partial, of the
        Licensed Application.
      </TermsText>
      <TermsTitle>
        14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY
      </TermsTitle>
      <TermsText>
        Muznet LLC represents and warrants that Muznet LLC will comply with
        applicable third-party terms of agreement when using Licensed
        Application.
      </TermsText>
      <TermsText>
        In Accordance with Section 9 of the "Instructions for Minimum Terms of
        Developer's End-User License Agreement," both Apple and Google and their
        subsidiaries shall be third-party beneficiaries of this End User License
        Agreement and — upon Your acceptance of the terms and conditions of this
        License Agreement, both Apple and Google will have the right (and will
        be deemed to have accepted the right) to enforce this End User License
        Agreement against You as a third-party beneficiary thereof.
      </TermsText>
      <TermsTitle>15. INTELLECTUAL PROPERTY RIGHTS</TermsTitle>
      <TermsText>
        Muznet LLC and the End-User acknowledge that, in the event of any
        third-party claim that the Licensed Application or the End-User's
        possession and use of that Licensed Application infringes on the third
        party's intellectual property rights, Muznet LLC, and not the Services,
        will be solely responsible for the investigation, defense, settlement,
        and discharge or any such intellectual property infringement claims.
      </TermsText>
      <TermsTitle>16. APPLICABLE LAW</TermsTitle>
      <TermsText>
        This License Agreement is governed by the laws of the Commonwealth of
        Pennsylvania excluding its conflicts of law rules.
      </TermsText>
      <TermsTitle>17. MISCELLANEOUS</TermsTitle>
      <TermsText>
        17.1  If any of the terms of this agreement should be or become invalid,
        the validity of the remaining provisions shall not be affected. Invalid
        terms will be replaced by valid ones formulated in a way that will
        achieve the primary purpose.
      </TermsText>
      <TermsText>
        17.2  Collateral agreements, changes and amendments are only valid if
        laid down in writing. The preceding clause can only be waived in
        writing.
      </TermsText>
    </>
  )
}

const TermsOfServiceTab = observer(({ isOpenTab, content }) => {
  const { windowHeight, windowWidth } = getWindowDimension()

  // Store
  const { setOpenTabs } = useAccountApiStore()

  // Animation
  const { onPress, width } = useAnimateOfferPreview()
  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])

  // Handler for native back button
  const tabNameToClose = content.title
  backHandler(onPress, setOpenTabs, tabNameToClose)

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight,
        // width: windowWidth,
        width,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <FilterContainerBlock
        style={{
          height: '100%',
          width: '100%',
          paddingBottom: 40,
          paddingTop: Constants.statusBarHeight + 16,
          backgroundColor: '#fff',
        }}
      >
        <AccountsTabHeader
          tabName={content.title}
          setOpenTabs={setOpenTabs}
          onPress={onPress}
        />
        <FilterContainer showsVerticalScrollIndicator={false}>
          {/* Header */}

          <ContentDoc title={content.title} />
          <View
            style={{
              paddingBottom: 200,
            }}
          ></View>
        </FilterContainer>
      </FilterContainerBlock>
    </Animated.View>
  )
})

export default TermsOfServiceTab
