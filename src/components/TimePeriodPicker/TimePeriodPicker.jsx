import React from "react"
import { Platform, StyleSheet } from "react-native"

import DateTimePicker from "@react-native-community/datetimepicker"
import { useNavigation } from "@react-navigation/native"

import { useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import C from "@/res/colors"
import { S } from "@/res/strings"

import { formatAMPM } from "@/components/helpers/formatAMPM"
// Styles
import { style } from "./style"
const {
  FormInputContainer,
  NumberInputsBlock,
  FormInput,
  TimePickerButton,
  TimePickerButtonLabel,
  TimePickerButtonText,
  SeparatorBlock,
  SeparatorDash,
  ErrorMessage,
} = style

const TimePeriodPicker = ({
  setTimeRange,
  isResetAll,
  existedStartTimePlaceholder,
  existedEndTimePlaceholder,
  existedDuration,
  isRequiredShowStartError,
  isRequiredShowEndError,
}) => {
  const navigation = useNavigation()

  const [isOpenStartTimePicker, setOpenStartTimePicker] = useState(false)
  const [isOpenEndTimePicker, setOpenEndTimePicker] = useState(false)

  const [startTime, setStartTime] = useState(new Date(Date.now()))
  const [endTime, setEndTime] = useState(new Date(Date.now()))

  const [startTimePlaceholder, setStartTimePlaceholder] = useState()
  const [endTimePlaceholder, setEndTimePlaceholder] = useState()

  const [
    isCanSetStartTimePlaceholder,
    setCanSetStartTimePlaceholder,
  ] = useState(false)
  const [isCanSetEndTimePlaceholder, setCanSetEndTimePlaceholder] = useState(
    false,
  )

  const [isExisted, setExisted] = useState(false)

  // Time picker
  const onStartTimeSelected = (event, value) => {
    setOpenStartTimePicker(false)
    if (event?.type === "dismissed") {
      setExisted(false)
      setStartTime(startTime)
      return
    }
    setExisted(false)
    setStartTime(value)
    setCanSetStartTimePlaceholder(true)
  }

  const onEndTimeSelected = (event, value) => {
    setOpenEndTimePicker(false)
    if (event?.type === "dismissed") {
      setExisted(false)
      setEndTime(endTime)
      return
    }
    setExisted(false)
    setEndTime(value)
    setCanSetEndTimePlaceholder(true)
  }

  const [startTimeMs, setStartTimeMs] = useState()
  const [endTimeMs, setEndTimeMs] = useState()
  //

  useEffect(() => {
    if (
      startTime &&
      isCanSetStartTimePlaceholder === true &&
      isExisted === false
    ) {
      const { timeInMsFrom, strTime } = formatAMPM(startTime)

      setStartTimePlaceholder(strTime)
      setStartTimeMs(timeInMsFrom)
    }
  }, [startTime, isCanSetStartTimePlaceholder])

  useEffect(() => {
    if (endTime && isCanSetEndTimePlaceholder === true && isExisted === false) {
      const { timeInMsFrom, strTime } = formatAMPM(endTime)
      setEndTimePlaceholder(strTime)
      setEndTimeMs(timeInMsFrom)
    }
  }, [endTime, isCanSetEndTimePlaceholder])

  const [offerDuration, setOfferDuration] = useState(0)
  // Set placeholder for offer edit
  useEffect(() => {
    if (
      existedStartTimePlaceholder !== undefined &&
      existedEndTimePlaceholder !== undefined &&
      existedDuration !== undefined
    ) {
      setExisted(true)
      setStartTimePlaceholder(existedStartTimePlaceholder.string)
      setEndTimePlaceholder(existedEndTimePlaceholder.string)
      setStartTimeMs(+existedStartTimePlaceholder.milliseconds)
      setEndTimeMs(+existedEndTimePlaceholder.milliseconds)
      setCanSetStartTimePlaceholder(true)
      setCanSetEndTimePlaceholder(true)
      setOfferDuration(existedDuration)
    }
  }, [existedStartTimePlaceholder, existedEndTimePlaceholder, existedDuration])

  const setToOfferTimeState = () => {
    return setTimeRange({
      startTime: {
        milliseconds: startTimeMs,
        string: startTimePlaceholder,
      },
      endTime: {
        milliseconds: endTimeMs,
        string: endTimePlaceholder,
      },
      duration: offerDuration,
    })
  }

  const [isShowError, setShowError] = useState(false)
  useEffect(() => {
    if (startTimeMs !== undefined && endTimeMs !== undefined) {
      // Get offer duration
      const isMoreThanHour = Math.abs(startTimeMs - endTimeMs) >= 3600000
      if (startTimeMs < endTimeMs && isMoreThanHour === true) {
        const hoursCount = (endTimeMs - startTimeMs) / 3600000
        setShowError(false)
        setOfferDuration(hoursCount)
        setToOfferTimeState()
      } else if (startTimeMs > endTimeMs && isMoreThanHour === true) {
        const hoursCount = (86400000 - startTimeMs + endTimeMs) / 3600000
        setShowError(false)
        setOfferDuration(hoursCount)
        setToOfferTimeState()
      } else if (!isResetAll) {
        setShowError(true)
      }
    }
  }, [startTimeMs, endTimeMs, offerDuration])

  useEffect(() => {
    if (
      isResetAll === true &&
      existedStartTimePlaceholder === undefined &&
      existedEndTimePlaceholder === undefined &&
      existedDuration === undefined
    ) {
      setOfferDuration(0)
      setOpenStartTimePicker(false)
      setOpenEndTimePicker(false)
      setStartTime("")
      setEndTime("")
      setStartTimePlaceholder()
      setEndTimePlaceholder()
      setCanSetStartTimePlaceholder(false)
      setCanSetEndTimePlaceholder(false)
      setStartTimeMs("")
      setEndTimeMs("")
    }

    if (
      isResetAll === true &&
      existedStartTimePlaceholder !== undefined &&
      existedEndTimePlaceholder !== undefined &&
      existedDuration !== undefined
    ) {
      setExisted(true)
      setStartTimePlaceholder(existedStartTimePlaceholder.string)
      setEndTimePlaceholder(existedEndTimePlaceholder.string)
      setStartTimeMs(existedStartTimePlaceholder.milliseconds)
      setEndTimeMs(existedEndTimePlaceholder.milliseconds)
      setCanSetStartTimePlaceholder(true)
      setCanSetEndTimePlaceholder(true)
      setOfferDuration(existedDuration)
    }
  }, [
    isResetAll,
    existedStartTimePlaceholder,
    existedEndTimePlaceholder,
    existedDuration,
  ])

  const isShiftStartTime = startTimePlaceholder !== undefined
  const isShiftEndTime = endTimePlaceholder !== undefined

  const isShowStartError =
    isRequiredShowStartError === true && startTimePlaceholder === undefined
  const isShowEndError = !isShowStartError && isRequiredShowEndError === true

  return (
    <NumberInputsBlock
      style={{
        position: "relative",
        paddingBottom:
          isShowError === true || isShowStartError || isShowEndError ? 24 : 0,
      }}
    >
      {/* Start time */}
      {isOpenStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode={"time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={onStartTimeSelected}
          style={styleSheet.datePicker}
          minuteInterval={30}
        />
      )}
      {!isOpenEndTimePicker && !isOpenStartTimePicker && (
        <TimePickerButton
          style={{
            borderColor: isShowStartError ? C.red : C.lightGray,
            borderWidth: isShowStartError ? 2 : 1,
          }}
          onPress={() => {
            setOpenStartTimePicker(true)
          }}
        >
          {isShiftStartTime && (
            <TimePickerButtonLabel inputLabel={isShiftStartTime}>
              Start time
            </TimePickerButtonLabel>
          )}
          <TimePickerButtonText
            style={{
              color: isShiftStartTime ? C.black : C.sBlack,
            }}
            isShiftPlaceholder={isShiftStartTime}
          >
            {isShiftStartTime ? startTimePlaceholder : "Start time"}
          </TimePickerButtonText>

          {isShowStartError && <ErrorMessage>{S.inputRequired}</ErrorMessage>}
        </TimePickerButton>
      )}
      {!isOpenEndTimePicker && !isOpenStartTimePicker && (
        <SeparatorBlock>
          <SeparatorDash></SeparatorDash>
        </SeparatorBlock>
      )}

      {/* End time */}
      {isOpenEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode={"time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={onEndTimeSelected}
          style={styleSheet.datePicker}
                  minuteInterval={30}
    
        />
      )}
      {!isOpenEndTimePicker && !isOpenStartTimePicker && (
        <TimePickerButton
          activeOpacity={isShiftStartTime ? 0.2 : 1}
          onPress={() => {
            isShiftStartTime && setOpenEndTimePicker(true)
          }}
          style={{
            borderColor: isShowEndError ? C.red : C.lightGray,
            borderWidth: isShowEndError ? 2 : 1,
            backgroundColor: isShiftStartTime ? C.white : C.backGray,
          }}
        >
          {isShiftEndTime && (
            <TimePickerButtonLabel inputLabel={isShiftEndTime}>
              End time
            </TimePickerButtonLabel>
          )}
          <TimePickerButtonText
            style={{
              color: !isShiftStartTime
                ? C.gray
                : isShiftEndTime
                ? C.black
                : C.sBlack,
            }}
            isShiftPlaceholder={isShiftEndTime}
          >
            {isShiftEndTime ? endTimePlaceholder : "End time"}
          </TimePickerButtonText>
          {isShowEndError && <ErrorMessage>{S.inputRequired}</ErrorMessage>}
        </TimePickerButton>
      )}
      {isShowError === true && (
        <ErrorMessage>Minimum time one hour</ErrorMessage>
      )}
    </NumberInputsBlock>
  )
}

export default TimePeriodPicker

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: 260,
    display: "flex",
  },
})
