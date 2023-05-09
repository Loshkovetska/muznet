import React from "react"
import { useState, useEffect } from "react"
import { Animated, Keyboard } from "react-native"
import { useForm, Controller } from "react-hook-form"

// Helpers
import MaskInput from "react-native-mask-input"
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateCreateOffer } from "./useAnimateCreateOffer"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Images
import IMAGES from "@/res/images"
const { GoBackIcon } = IMAGES
// Variables
import C from "@/res/colors"
import F from "@/res/fonts"
import { S } from "@/res/strings"
// Styles
import { style } from "./style"
const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  FilterBlock,
  ContentBlock,
} = style
// Mixins
import { M } from "@/res/mixin"
const {
  FormInput,
  ErrorMessage,
  FormInputBlock,
  FormInputLabel,
  FormInputContainer,
  FormInputContainerPhone,
  BlackBtn,
  BlackBtnText,
} = M

const AddAccountInfo = ({
  isOpenTab,
  setOpenTab,
  onSubmitPayoutDetails,
  isCloseTab,
}) => {
  const isKeyboardOpen = isKeyboardShown()

  // Form
  const {
    control,
    handleSubmit,
    resetField,
    setError,
    watch,
    clearErrors,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: {
      nameOnCard: "",
      routingNumber: "",
      accountNumber: "",
      confirmAccountNumber: "",
    },
  })

  const { windowHeight, windowWidth } = getWindowDimension()
  const { onPress, width } = useAnimateCreateOffer()
  useEffect(() => {
    if (isOpenTab === true) {
      onPress(true)
    }
  }, [isOpenTab])
  // Close tab
  const closeTab = () => {
    onPress(false)
    setTimeout(() => {
      setOpenTab(false)
    }, 600)
  }
  useEffect(() => {
    if (isCloseTab === true) {
      closeTab()
    }
  }, [isCloseTab])
  // Name on card
  const watchNameOnCard = watch("nameOnCard")
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputNameOnCardLabel, setInputFullNameLabel] = useState(false)
  // Card number
  const [inputCardNumber, setInputCardNumber] = useState("")
  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputCardNumberLabel, setInputCardNumberLabel] = useState(false)
  // Account number
  const [inputAccountNumber, setInputAccountNumber] = useState("")
  const [inputFocus3, setInputFocus3] = useState(C.lightGray)
  const [inputAccountNumberLabel, setInputAccountNumberLabel] = useState(false)
  // Account confirm number
  const [inputAccountConfirmNumber, setInputAccountConfirmNumber] = useState("")
  const [inputFocus4, setInputFocus4] = useState(C.lightGray)
  const [
    inputAccountConfirmNumberLabel,
    setInputAccountConfirmNumberLabel,
  ] = useState(false)

  // Set shifting input label
  useEffect(() => {
    if (dirtyFields.nameOnCard === undefined) {
      setInputFullNameLabel(false)
    }
    if (dirtyFields.nameOnCard !== undefined) {
      setInputFullNameLabel(true)
    }
    if (dirtyFields.routingNumber === undefined) {
      setInputCardNumberLabel(false)
    }
    if (dirtyFields.routingNumber === true) {
      setInputCardNumberLabel(true)
    }
    if (dirtyFields.accountNumber === undefined) {
      setInputAccountNumberLabel(false)
    }
    if (dirtyFields.accountNumber === true) {
      setInputAccountNumberLabel(true)
    }
    if (dirtyFields.confirmAccountNumber === undefined) {
      setInputAccountConfirmNumberLabel(false)
    }
    if (dirtyFields.confirmAccountNumber === true) {
      setInputAccountConfirmNumberLabel(true)
    }
  }, [
    dirtyFields.nameOnCard,
    dirtyFields.routingNumber,
    dirtyFields.accountNumber,
    dirtyFields.confirmAccountNumber,
  ])

  // Is show submit button
  const [isShowSubmitButton, setShowSubmitButton] = useState(false)
  useEffect(() => {
    const isNameOnCard = watchNameOnCard.length > 0
    const isCardNumber = inputCardNumber.length === 19
    const isInputAccountNumber = inputAccountNumber.length === 19
    const isInputAccountConfirmNumber = inputAccountConfirmNumber.length === 19

    if (
      isNameOnCard &&
      isCardNumber &&
      isInputAccountNumber &&
      isInputAccountConfirmNumber
    ) {
      setShowSubmitButton(true)
    } else {
      setShowSubmitButton(false)
    }
  }, [
    watchNameOnCard,
    inputCardNumber.length,
    inputAccountNumber.length,
    inputAccountConfirmNumber.length,
  ])

  const onSubmit = (data) => {
    console.log(
      "🚀 ~ file: AddAccountInfo.jsx ~ line 159 ~ onSubmit ~ data",
      data,
    )

    setInputCardNumber("")
    setInputAccountNumber("")
    setInputAccountConfirmNumber("")

    resetField("nameOnCard")
    resetField("routingNumber")
    resetField("accountNumber")
    resetField("confirmAccountNumber")

    Keyboard.dismiss()
    onSubmitPayoutDetails(data)

    return
  }

  return (
    <Animated.View
      style={{
        zIndex: 1100,
        height: windowHeight - 50,
        // width: windowWidth,
        width,
        backgroundColor: "white",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <FilterContainer
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {/* Header */}
        <Header>
          <HeaderClose
            onPress={() => {
              closeTab()
            }}
          >
            <GoBackIcon width={12} height={21} />
          </HeaderClose>

          <HeaderTitle>Add Account Info</HeaderTitle>
        </Header>

        <FilterBlock>
          {/* Name on card  */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInputBlock
                style={{
                  marginBottom:
                    errors.nameOnCard?.type === "required"
                      ? 35
                      : errors.nameOnCard?.type === "pattern"
                      ? 60
                      : 13,
                }}
              >
                <FormInputContainer>
                  <FormInput
                    inputLabel={inputNameOnCardLabel}
                    selectionColor={C.lightGray}
                    placeholder={"Card Holder Name"}
                    placeholderTextColor={C.placeholder}
                    cursorColor={C.inputCursor}
                    onFocus={() => {
                      setInputFocus1(C.black)
                    }}
                    onBlur={() => {
                      onBlur
                      setInputFocus1(C.lightGray)
                    }}
                    onChangeText={onChange}
                    value={value}
                    style={{
                      borderColor: errors.nameOnCard ? C.red : inputFocus1,
                      borderWidth: errors.nameOnCard ? 2 : 1,
                      color: errors.nameOnCard ? C.red : C.black,
                    }}
                  />
                  {errors.nameOnCard && (
                    <ShowPasswordIconButton>
                      <ErrorIcon width={20} height={20} />
                    </ShowPasswordIconButton>
                  )}
                </FormInputContainer>
                <FormInputLabel
                  isError={errors.nameOnCard}
                  inputLabel={inputNameOnCardLabel}
                >
                  Card Holder Name
                </FormInputLabel>

                {errors.nameOnCard?.type === "required" && (
                  <ErrorMessage>{S.inputRequired}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="nameOnCard"
          />

          {/* Card number */}
          <Controller
            control={control}
            rules={{
              required: true,
              // minLength: 19
            }}
            render={({ field: { onChange, onBlur } }) => (
              <FormInputBlock
                style={{ marginBottom: errors.routingNumber ? 32 : 13 }}
              >
                <FormInputContainerPhone>
                  <MaskInput
                    cursorColor={C.inputCursor}
                    onFocus={() => {
                      setInputFocus2(C.black)
                    }}
                    onBlur={() => {
                      onBlur
                      setInputFocus2(C.lightGray)
                    }}
                    keyboardType="numeric"
                    maxLength={19}
                    style={{
                      width: "100%",
                      flex: 1,
                      height: 48,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderWidth: 1,
                      borderRadius: 6,
                      borderColor: inputFocus2,
                      fontSize: 17,
                      fontFamily: F.regular,
                      color: C.black,
                      paddingTop: inputCardNumberLabel === true ? 13 : 0,
                      borderColor: errors.routingNumber ? C.red : inputFocus2,
                      borderWidth: errors.routingNumber ? 2 : 1,
                      color: errors.routingNumber ? C.red : C.black,
                    }}
                    placeholder={"Routing Number"}
                    placeholderTextColor={C.placeholder}
                    value={inputCardNumber}
                    onChangeText={(masked, unmasked) => {
                      onChange(masked)
                      setInputCardNumber(masked)
                    }}
                    mask={S.bankCardMaskPattern}
                  />
                </FormInputContainerPhone>
                <FormInputLabel
                  isError={errors.routingNumber}
                  inputLabel={inputCardNumberLabel}
                >
                  Routing Number
                </FormInputLabel>

                {errors.routingNumber?.type === "required" && (
                  <ErrorMessage>{S.inputRequired}</ErrorMessage>
                )}
                {/* {errors.routingNumber?.type === "minLength" && <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>} */}
              </FormInputBlock>
            )}
            name="routingNumber"
          />

          {/* Account number */}
          <Controller
            control={control}
            rules={{
              required: true,
              // minLength: 19
            }}
            render={({ field: { onChange, onBlur } }) => (
              <FormInputBlock
                style={{ marginBottom: errors.accountNumber ? 32 : 13 }}
              >
                <FormInputContainerPhone>
                  <MaskInput
                    cursorColor={C.inputCursor}
                    onFocus={() => {
                      setInputFocus3(C.black)
                    }}
                    onBlur={() => {
                      onBlur
                      setInputFocus3(C.lightGray)
                    }}
                    keyboardType="numeric"
                    maxLength={19}
                    style={{
                      width: "100%",
                      flex: 1,
                      height: 48,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderWidth: 1,
                      borderRadius: 6,
                      borderColor: inputFocus3,
                      fontSize: 17,
                      fontFamily: F.regular,
                      color: C.black,
                      paddingTop: inputAccountNumberLabel === true ? 13 : 0,
                      borderColor: errors.accountNumber ? C.red : inputFocus3,
                      borderWidth: errors.accountNumber ? 2 : 1,
                      color: errors.accountNumber ? C.red : C.black,
                    }}
                    placeholder={"Account Number"}
                    placeholderTextColor={C.placeholder}
                    value={inputAccountNumber}
                    onChangeText={(masked, unmasked) => {
                      onChange(masked)
                      setInputAccountNumber(masked)
                    }}
                    mask={S.bankCardMaskPattern}
                  />
                </FormInputContainerPhone>
                <FormInputLabel
                  isError={errors.accountNumber}
                  inputLabel={inputAccountNumberLabel}
                >
                  Account Number
                </FormInputLabel>

                {errors.accountNumber?.type === "required" && (
                  <ErrorMessage>{S.inputRequired}</ErrorMessage>
                )}
                {/* {errors.accountNumber?.type === "minLength" && <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>} */}
              </FormInputBlock>
            )}
            name="accountNumber"
          />

          {/* Comfirm Account number */}
          <Controller
            control={control}
            rules={{
              required: true,
              // minLength: 19
            }}
            render={({ field: { onChange, onBlur } }) => (
              <FormInputBlock
                style={{ marginBottom: errors.confirmAccountNumber ? 32 : 13 }}
              >
                <FormInputContainerPhone>
                  <MaskInput
                    cursorColor={C.inputCursor}
                    onFocus={() => {
                      setInputFocus4(C.black)
                    }}
                    onBlur={() => {
                      onBlur
                      setInputFocus4(C.lightGray)
                    }}
                    keyboardType="numeric"
                    maxLength={19}
                    style={{
                      width: "100%",
                      flex: 1,
                      height: 48,
                      paddingLeft: 16,
                      paddingRight: 16,
                      borderWidth: 1,
                      borderRadius: 6,
                      borderColor: inputFocus4,
                      fontSize: 17,
                      fontFamily: F.regular,
                      color: C.black,
                      paddingTop:
                        inputAccountConfirmNumberLabel === true ? 13 : 0,
                      borderColor: errors.confirmAccountNumber
                        ? C.red
                        : inputFocus4,
                      borderWidth: errors.confirmAccountNumber ? 2 : 1,
                      color: errors.confirmAccountNumber ? C.red : C.black,
                    }}
                    placeholder={"Confirm Account Number"}
                    placeholderTextColor={C.placeholder}
                    value={inputAccountConfirmNumber}
                    onChangeText={(masked, unmasked) => {
                      onChange(masked)
                      setInputAccountConfirmNumber(masked)
                    }}
                    mask={S.bankCardMaskPattern}
                  />
                </FormInputContainerPhone>
                <FormInputLabel
                  isError={errors.confirmAccountNumber}
                  inputLabel={inputAccountConfirmNumberLabel}
                >
                  Confirm Account Number
                </FormInputLabel>

                {errors.confirmAccountNumber?.type === "required" && (
                  <ErrorMessage>{S.inputRequired}</ErrorMessage>
                )}
                {/* {errors.confirmAccountNumber?.type === "minLength" && <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>} */}
              </FormInputBlock>
            )}
            name="confirmAccountNumber"
          />
        </FilterBlock>
        {/* Footer block */}
        <ContentBlock
          style={{
            width: windowWidth,
          }}
          isKeyboardOpen={isKeyboardOpen}
        >
          {isShowSubmitButton ? (
            <BlackBtn
              style={{
                width: "100%",
                backgroundColor: C.black,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <BlackBtnText style={{ color: C.white }}>
                Save Payout Method
              </BlackBtnText>
            </BlackBtn>
          ) : (
            <BlackBtn
              activeOpacity={0.2}
              style={{
                width: "100%",
                backgroundColor: C.gray,
              }}
            >
              <BlackBtnText
                style={{
                  color: C.sBlack,
                }}
              >
                Save Payout Method
              </BlackBtnText>
            </BlackBtn>
          )}
        </ContentBlock>
      </FilterContainer>
    </Animated.View>
  )
}

export default AddAccountInfo
