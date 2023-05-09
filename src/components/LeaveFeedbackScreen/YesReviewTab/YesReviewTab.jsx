import React from "react"
import { useEffect, useState } from "react"
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native"
import StarRateButtons from "./StarRateButtons"
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"

// Components
import ModalWindow from "@/components/ModalWindow"

// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateOfferPreview } from "./useAnimateOfferPreview"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Images
import IMAGES from "@/res/images"
const { GoBackIcon } = IMAGES

// Styles
import { style } from "./style"
import C from "@/res/colors"
import F from "@/res/fonts"

import { S } from "@/res/strings"

const {
  FilterContainer,
  Header,
  HeaderClose,
  HeaderTitle,
  FilterBlock,
  OfferDetailsTitle,
  OfferPayment,
  FormBlock,
  FormText,
  FormInputBlock,
  FormInputContainer,
  FormInput,
  ButtonSubmit,
  ButtonSubmitText,
  FooterButton,
  ErrorMessage,
} = style

const YesReviewTab = ({ isOpen, setOpen, isClose }) => {
  const navigation = useNavigation()
  const isKeyboardOpen = isKeyboardShown()
  const { windowHeight, windowWidth } = getWindowDimension()

  // Animation
  const { onPress, width } = useAnimateOfferPreview()
  useEffect(() => {
    if (isOpen === true) {
      onPress(true)
    }
  }, [isOpen])
  // Close tab
  const closeTab = () => {
    onPress(false)
    setTimeout(() => {
      setOpen(false)
    }, 600)
  }

  useEffect(() => {
    if (isClose === true) {
      closeTab()
    }
  }, [isClose])
  // Form
  const {
    control,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { userFeedback: "" },
  })
  // Input focus
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const messageWatch = watch("userFeedback")
  // Rate state
  const [rateCount, setRentCount] = useState(0)

  // Is show active submit button
  const [isShowSubmitButton, setShowSubmitButton] = useState(false)
  useEffect(() => {
    if (messageWatch.length > 0 && rateCount !== 0) {
      setShowSubmitButton(true)
    } else {
      setShowSubmitButton(false)
    }
  }, [errors, rateCount])

  // Open modal window
  const [isModalOpen, setModalOpen] = useState(false)

  const AfterSubmitButtonAction = () => {
    setModalOpen(false)
    onPress(false)
    setTimeout(() => {
      setOpen(false)
    }, 600)
    return navigation.navigate("ContractorStack", {
      screen: "ContractorWelcomeScreen",
    })
  }

  const onSubmit = (data) => {
    if (!isShowSubmitButton) return
    const feedBack = {
      userFeedback: data.userFeedback,
      userRate: rateCount,
    }
    console.log(
      "🚀 ~ file: LoginPage.jsx ~ line 49 ~ onSubmit ~ data",
      feedBack,
    )
    resetField("userFeedback")
    setRentCount(0)
    Keyboard.dismiss()
    setModalOpen(true)
    return
  }

  return (
    <Animated.View
      style={{
        zIndex: 1000,
        height: windowHeight,
        // width: windowWidth,
        width,
        justifyContent: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {isModalOpen === true && (
        <ModalWindow
          title={"Thank you!"}
          advice={"Your feedback is very important"}
          setOpen={AfterSubmitButtonAction}
          btnText={"Home screen"}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <FilterContainer
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <FilterBlock keyboardShouldPersistTaps={"handled"}>
            {/* Header */}
            <Header>
              <HeaderClose
                onPress={() => {
                  closeTab()
                }}
              >
                <GoBackIcon width={12} height={21} />
              </HeaderClose>

              <HeaderTitle>Tell us about your impressions</HeaderTitle>
            </Header>

            <OfferPayment>
              <OfferDetailsTitle>
                How was Robert"s performance?
              </OfferDetailsTitle>

              {/* Star rate */}
              <StarRateButtons
                rateCount={rateCount}
                setRentCount={setRentCount}
              />
              <FormText>Share details of your experience</FormText>

              {/* Form */}
              <FormBlock>
                {/* User message */}
                <Controller
                  control={control}
                  rules={{
                    required: S.inputRequired,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInputBlock
                      style={{
                        marginBottom: errors.userFeedback ? 32 : 13,
                      }}
                    >
                      <FormInputContainer>
                        <FormInput
                          selectionColor={C.lightGray}
                          multiline={true}
                          //   numberOfLines={4}
                          placeholder={"Write your message"}
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
                            height: "100%",
                            maxHeight: 100,
                            borderColor: errors.userFeedback
                              ? C.red
                              : inputFocus1,
                            borderWidth: errors.userFeedback ? 2 : 1,
                            color: errors.userFeedback ? C.red : C.black,
                            textAlignVertical: "top",
                          }}
                        />
                      </FormInputContainer>

                      {errors.userFeedback?.type === "required" && (
                        <ErrorMessage>Required field</ErrorMessage>
                      )}
                    </FormInputBlock>
                  )}
                  name="userFeedback"
                />
              </FormBlock>
            </OfferPayment>
          </FilterBlock>

          <FooterButton
            style={{
              width: windowWidth - 32,
              left: 16,
              bottom: 60, //isKeyboardOpen === true ? 30 :
              paddingBottom: 30,
            }}
          >
            <TouchableOpacity
              activeOpacity={isShowSubmitButton ? 0.6 : 1}
              onPress={isShowSubmitButton ? handleSubmit(onSubmit) : () => {}}
              style={{
                width: windowWidth - 32,
                height: 56,
                backgroundColor: !isShowSubmitButton ? C.gray : C.black,
                borderRadius: 12,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                color: "#ffffff",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: F.medium,
                  color: "#ffffff",
                  lineHeight: 22,
                }}
              >
                Leave Feedback
              </Text>
            </TouchableOpacity>
          </FooterButton>
        </FilterContainer>
      </KeyboardAvoidingView>
    </Animated.View>
  )
}

export default YesReviewTab
