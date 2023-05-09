import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native'
import { useState, useEffect, useRef } from 'react'
import {
  Agenda,
  Calendar,
  ExpandableCalendar,
  CalendarProvider,
  WeekCalendar,
  AgendaList,
} from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import F from '@/res/fonts'
import C from '@/res/colors'

import EventItem from '../EventItem'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { agendaDateConverter } from '@/components/helpers/agendaDateConverter'

// Images
import IMAGES from '@/res/images'
const { CalendarIcon, ErrorIcon } = IMAGES

// Styles
import { style } from './style'
const { Container, OptionText } = style

// Store
import { observer } from 'mobx-react-lite'
import { useAccountApiStore } from '@/stores/AccountApi'
import { M } from '@/res/mixin'
const {
  PlainText17,
  MediumText20,
  MediumText17,
  TitleBold20,
  TitleBold17,
  BlackBtn,
  BlackBtnText,
} = M
import CalendarArrow from './CalendarArrow/CalendarArrow'
import AccountStore from '@/stores/AccountStore'
import { getMyDeals } from '../../../stores/AccountStore'

const convertToAgentaDate = (date) => {
  const splitedDate = date.split('/')
  const correctDate = `${splitedDate[2]}-${
    splitedDate[1] > 10 ? splitedDate[1] : `0${splitedDate[1]}`
  }-${splitedDate[0] > 10 ? splitedDate[0] : `0${splitedDate[0]}`}`

  return correctDate
}

const CalendarBlock = observer(({ isContractor }) => {
  const navigation = useNavigation()
  const { windowHeight, windowWidth } = getWindowDimension()

  const [placeholder, setPlaceholder] = useState('')

  // Event from store
  const { setOpenTabs } = useAccountApiStore()

  // Is collapsed calendar
  const [isOpen, setIsOpen] = useState(false)
  // Current date
  const [currentDate, setCurrentDate] = useState('')
  // Month title
  const [monthTitle, setMonthTitle] = useState('')
  // If change month
  const onMonthChange = (date) => {
    const { monthFullName } = agendaDateConverter({ month: date.month - 1 })
    const headerTitle = `${monthFullName} ${date.year}`
    setMonthTitle(headerTitle)
  }

  // Is contractor data

  const [storedData, setData] = useState([])

  // Local items and mark state
  const [localItems, setLocalItems] = useState({})
  const [localMark, setLocalMark] = useState({})

  const setLocalData = () => {
    let correctItemData = {}
    let correctMarkData = {}

    storedData?.forEach((evData, id) => {
      const getDateFromMs = new Date(evData?.adDate?.milliseconds)

      const date = `${getDateFromMs.getDay()}/${
        getDateFromMs.getMonth() + 1
      }/${getDateFromMs.getFullYear()}`

      const correctDate = convertToAgentaDate(date)
      const correctEvent = `${correctDate}`
      const isExistDateKeys = Object.keys(correctItemData)
      const isAlreadyExist = isExistDateKeys.find((key) => key === correctEvent)

      if (isAlreadyExist !== undefined) {
        correctItemData[correctEvent] = [
          ...correctItemData[correctEvent],
          {
            dealUserName: evData.dealUserName,
            adDate: evData.adDate,
            eventStart: evData.eventStart,
            eventEnd: evData.eventEnd,
            adTitle: evData.adTitle,
            adLocation: evData.adLocation,
          },
        ]
      } else {
        correctItemData = {
          ...correctItemData,
          [correctEvent]: [
            {
              dealUserName: evData.dealUserName,
              adDate: evData.adDate,
              eventStart: evData.eventStart,
              eventEnd: evData.eventEnd,
              adTitle: evData.adTitle,
              adLocation: evData.adLocation,
            },
          ],
        }
      }

      correctMarkData = {
        ...correctMarkData,
        [correctEvent]: {
          marked: true,
        },
      }
    })

    setLocalItems(correctItemData)
    setLocalMark(correctMarkData)
  }

  // Initial set current month and date
  useEffect(() => {
    getMyDeals().then((c) => {
      const dealsData = c.filter((f) => f.isActive == 'true')
      const res = dealsData.map((c) => {
        return {
          adDate: {
            milliseconds: c.adDate_milliseconds,
            string: c.adDate_string,
          },
          eventStart: {
            milliseconds: c.eventStart_milliseconds,
            string: c.eventStart_string,
          },
          eventEnd: {
            milliseconds: c.eventEnd_milliseconds,
            string: C.eventEnd_string,
          },
          adTitle: c.adTitle,
          adLocation: c.adLocation,
          dealNumber: c.dealNumber,
          dealStatus: C.dealStatus == 'true',
          moreDetails: c.moreDetails,
          dealNumber: c.id,
          dealPhoneNumber: c.dealPhoneNumber,
          paymentMethod: c.paymentMethod,
          perfomanceCost: c.perfomanceCost,
          muznetFee: c.muznetFee,
          totalPrice: c.totalPrice,
          userCurrencyType: c.userCurrencyType,
          userPricePerHour: c.userPricePerHour,
        }
      })
      setData(res)
    })
  }, [])

  useEffect(() => {
    if (storedData?.length) {
      setLocalData()
    }
  }, [storedData])

  // Initial set current month and date
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const date = {
        month: currentMonth + 1,
        year: currentYear,
      }
      onMonthChange(date)

      const now = `${new Date().getDate()}/${currentMonth + 1}/${currentYear}`

      const correctDate = convertToAgentaDate(now)
      setCurrentDate(correctDate)
    })

    return unsubscribe
  }, [navigation])

  const containerHeight = '100%' //windowHeight - 300

  if (!currentDate) return <></>

  return (
    <Container
      style={{
        height: containerHeight,
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          marginBottom: 0,
          paddingLeft: 24,
        }}
      >
        <OptionText>{monthTitle}</OptionText>
      </View>
      <Agenda
        markingType={'custom'}
        showWeekNumbers={false}
        contentContainerStyle={{
          padding: 0,
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderRadius: 8,
        }}
        ListHeaderComponentStyle={{
          width: '100%',
          backgroundColor: '#ffffff',
        }}
        ListFooterComponentStyle={{
          backgroundColor: '#ffffff',
        }}
        calendarStyle={{
          padding: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          flex: 1,
        }}
        headerStyle={{
          padding: 0,
          width: '100%',
          backgroundColor: '#ffffff',
        }}
        style={{
          flexGrow: 1,
          padding: 0,
          height: containerHeight,
          width: '100%',
          backgroundColor: '#ffffff',
        }}
        theme={{
          dotColor: C.black,
          backgroundColor: '#ffffff',

          // backgroundColor: C.white,
          agendaDayTextColor: C.sBlack,
          agendaDayNumColor: C.sBlack,
          agendaTodayColor: C.black,
          todayBackgroundColor: C.black,
          todayTextColor: C.gray,
          selectedDayBackgroundColor: C.black,
          selectedDotColor: '#ffffff',
          agendaKnobColor: C.black,
          textMonthFontFamily: F.bold,
          textMonthFontWeight: 'bold',
          textMonthFontSize: Platform.OS == 'ios' ? 14:12,
          textDayFontFamily: F.bold,
          textDayFontWeight: 'bold',
          textDayFontSize: Platform.OS == 'ios' ? 14 : 12,
          textDayHeaderFontSize: Platform.OS == 'ios' ? 14 : 12,
          contentStyle: {
            backgroundColor: '#ffffff',
          },
          timelineContainer: {
            backgroundColor: '#ffffff',
          },
          calendarBackground: '#ffffff',
        }}
        scrollToNextEvent={false}
        avoidDateUpdates={true}
        enableSwipeMonths={true}
        staticHeader={false}
        items={localItems}
        markedDates={localMark}
        showSixWeeks={true}
        onCalendarToggled={(calendarOpened) => {
          setIsOpen(calendarOpened)
        }}
        onDayPress={(day) => {
          onMonthChange(day)
          setCurrentDate(day.dateString)
        }}
        onDayChange={(day) => {
          console.log('day changed')
        }}
        minDate={'2023-01-01'}
        maxDate={'2050-07-11'}
        pastScrollRange={50}
        futureScrollRange={50}
        renderList={(props) => {
          const items = localItems[currentDate]
          return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                backgroundColor: '#fff',
                flex: 1,
              }}
            >
              {items && items.length ? (
                items.map((item, id) => (
                  <EventItem eventData={item} key={id} id={id} />
                ))
              ) : (
                <MediumText20 style={{ marginTop: 24, textAlign: 'center' }}>
                  No events on this date
                </MediumText20>
              )}
              <View
                style={{
                  paddingBottom: 80,
                }}
              ></View>
            </ScrollView>
          )
        }}
        renderDay={(date) => {
          return (
            <View
              style={{
                backgroundColor: '#ffffff',
                // height: '100%',
              }}
            ></View>
          )
        }}
        renderEmptyData={() => {
          return (
            <View
              style={{
                backgroundColor: '#ffffff',
              }}
            >
              <MediumText20 style={{ marginTop: 24, textAlign: 'center' }}>
                No events on this date
              </MediumText20>
            </View>
          )
        }}
        renderKnob={() => {
          return (
            <View
              style={{
                width: 32,
                height: 5,
                borderRadius: 3,
                marginTop: 10,
                backgroundColor: C.black,
              }}
            />
          )
        }}
        showClosingKnob={true}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text
        }}
        hideArrows={true}
        refreshing={false}
      />
    </Container>
  )
})

export default CalendarBlock
