import React from "react"
import { Platform, StatusBar } from "react-native"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import C from "@/res/colors"
import F from "@/res/fonts"

import { S } from "@/res/strings"

import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"

import GoBack from "@/components/Buttons/GoBack/GoBack"
import MaskInput from "react-native-mask-input"
import AfterSubmitWindow from "@/components/AfterSubmitWindow"

import {
  useNavigation,
  // , useRoute
} from "@react-navigation/native"
import * as Linking from "expo-linking"

// Images
import IMAGES from "@/res/images"
const { ErrorIcon } = IMAGES
// Styles

import { forgotPasswordStyle } from "./style"
import axios from "axios"
import { openInbox } from "react-native-email-link"
import * as MailComposer from "expo-mail-composer"
import { NativeModules } from "react-native"
import { setMessageToRestorePassword } from "@/stores/AccountStore"
const {
  // Buttons
  ButtonsBlock,
  Button,
  ButtonText,
} = forgotPasswordStyle
import { style } from "../style"
const {
  Container,
  ContentTitle,
  Header,
  FormInputContainer,
  FormBlock,
  FormInputBlock,
  FormText,
  FormInputLabel,
  FormInput,
  ShowPasswordIconButton,
  ButtonSubmit,
  ButtonSubmitText,
  ErrorMessage,
} = style
import { M } from "@/res/mixin"
const { FormInputContainerPhone } = M

const prefixes = {
  "apple-mail": "message://",
  gmail: "googlegmail://",
  inbox: "inbox-gmail://",
  spark: "readdle-spark://",
  airmail: "airmail://",
  outlook: "ms-outlook://",
  yahoo: "ymail://",
  superhuman: "superhuman://",
  yandex: "yandexmail://",
  fastmail: "fastmail://",
  protonmail: "protonmail://",
  seznamemail: "szn-email://",
}

export function isAppInstalled(app) {
  return new Promise((resolve) => {
    if (!(app in prefixes)) {
      return resolve(false)
    }

    Linking.canOpenURL(prefixes[app])
      .then((isSupported) => {
        resolve(isSupported)
      })
      .catch(() => resolve(false))
  })
}

const ForgetPasswordScreen = () => {
  const navigation = useNavigation()
  const prefix = Linking.createURL("/")
  const [isEmailTab, setEmailTab] = useState(true)

  const {
    control,
    handleSubmit,
    resetField,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: { resetEmail: "", resetPhone: "" },
  })

  const isKeyboardOpen = isKeyboardShown()

  const [phone, setPhone] = useState("")

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputEmailLabel, setInputEmailLabel] = useState(false)

  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputPhoneLabel, setInputPhoneLabel] = useState(false)

  const [isOpenAfterSubmitMessage, setOpenAfterSubmitMessage] = useState(false)

  useEffect(() => {
    if (dirtyFields.resetPhone === undefined) {
      setInputPhoneLabel(false)
    }
    if (dirtyFields.resetPhone === true) {
      setInputPhoneLabel(true)
    }
    if (dirtyFields.resetEmail === undefined) {
      setInputEmailLabel(false)
    }
    if (dirtyFields.resetEmail === true) {
      setInputEmailLabel(true)
    }
  }, [dirtyFields.resetEmail, dirtyFields.resetPhone])

  const onSubmit = (data) => {
    // Clear input value

    const isEmailField = isEmailTab === true ? data.resetEmail : data.resetPhone

    // setMessageToRestorePassword(
    //   isEmailTab
    //     ? {
    //         //prefix
    //         email: isEmailField,
    //         link: `${prefix}login/reset-password/${data.resetEmail}`,
    //       }
    //     : {
    //         phone: isEmailField,
    //       },
    // ).then((res) => {
    //   console.log(res.data)
    //   if (res.data != "") {
    //     if (isEmailTab === true) {
    //       setOpenAfterSubmitMessage(true)
    //     } else {
    //       navigation.navigate("SignUpStack", {
    //         screen: "VerifyScreen",
    //         params: {
    //           screenTitle: "Reset Password",
    //           screenAdvice: `Please enter the verification code we sent to ${data.resetPhone}`,
    //           whereToSendCode: data.userPhoneNumber,
    //           navigateToStackAfterSubmit: "LoginStack",
    //           navigateToScreenAfterSubmit: "ResetPasswordScreen",
    //         },
    //       })
    //       resetField("resetEmail")
    //       resetField("resetPhone")
    //       setPhone("")
    //     } //loshkovetskaya@gmail.com itm21.top@gmail.com
    //   } else {
    //     // navigation.navigate("SignUpStack", {
    //     //   screen: "FirstSignUpScreen",
    //     // })
    //     //muznet://reset-password/loshkovetskaya@gmail.com
    //   }
    // })

    return
  }

  const AfterSubmitButtonAction = async () => {
    if (Platform.OS == "ios") {
      Object.keys(prefixes).forEach(async (app) => {
        const res = await isAppInstalled(app)
        console.log(app, res)
        if (res) {
          openInbox({
            app: app,
          })

          return
        }
      })
    } else {
      if ("Email" in NativeModules) {
        await NativeModules.Email.open("", true)
      }
    }
    // setOpenAfterSubmitMessage(false)

    // navigation.navigate("LoginStack", { screen: "ResetPasswordScreen" })
  }

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <Container>
        <AfterSubmitWindow
          title={"Check your email"}
          message={"We have sent a password recovery instruction to your email"}
          windowImage={IMAGES.GifCheckEmail}
          buttonText={"Open Mail App"}
          setOpen={setOpenAfterSubmitMessage}
          isOpen={isOpenAfterSubmitMessage}
          afterSubmitButton={AfterSubmitButtonAction}
        />
        {/* Header */}
        <Header>
          <GoBack />

          <ContentTitle>Reset Password</ContentTitle>
        </Header>

        {/* Switch buttons */}
        <ButtonsBlock>
          <Button
            onPress={() => {
              setEmailTab(true)
            }}
            isActive={isEmailTab}
          >
            <ButtonText>Email</ButtonText>
          </Button>

          <Button
            onPress={() => {
              setEmailTab(false)
            }}
            isActive={!isEmailTab}
          >
            <ButtonText>Phone number</ButtonText>
          </Button>
        </ButtonsBlock>

        {/* Form */}
        {isEmailTab === true ? (
          <FormBlock>
            <FormText>
              Please, enter your email address and you will receive a link to
              create a new password
            </FormText>

            {/* Email or Name */}
            <Controller
              control={control}
              rules={{
                required: S.emailNotValid,
                pattern: S.emailValidationPattern,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock
                  style={{
                    marginBottom: errors.resetEmail ? 28 : 13,
                  }}
                >
                  <FormInputContainer>
                    <FormInput
                      inputLabel={inputEmailLabel}
                      selectionColor={C.lightGray}
                      placeholder={"Enter your email"}
                      cursorColor={C.inputCursor}
                      onFocus={() => {
                        setInputFocus2(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus2(C.lightGray)
                      }}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        borderColor: errors.resetEmail ? C.red : inputFocus2,
                        borderWidth: errors.resetEmail ? 2 : 1,
                        color: errors.resetEmail ? C.red : C.black,
                      }}
                    />
                    {errors.resetEmail && (
                      <ShowPasswordIconButton>
                        <ErrorIcon width={20} height={20} />
                      </ShowPasswordIconButton>
                    )}
                  </FormInputContainer>

                  <FormInputLabel
                    isError={errors.resetEmail}
                    inputLabel={inputEmailLabel}
                  >
                    Your email
                  </FormInputLabel>

                  {errors.resetEmail?.type === "minLength" && (
                    <ErrorMessage>{S.emailNotValid}</ErrorMessage>
                  )}
                  {errors.resetEmail?.type === "pattern" && (
                    <ErrorMessage>{S.emailNotValid}</ErrorMessage>
                  )}
                  {errors.resetEmail && (
                    <ErrorMessage>{errors.resetEmail.message}</ErrorMessage>
                  )}
                </FormInputBlock>
              )}
              name="resetEmail"
            />
          </FormBlock>
        ) : (
          <FormBlock>
            <FormText>
              Please enter your phone number and you will receive a confirmation
              code to change your password
            </FormText>

            {/* Phone number */}
            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 17,
              }}
              render={({ field: { onChange, onBlur } }) => (
                <FormInputBlock
                  style={{ marginBottom: errors.resetPhone ? 32 : 13 }}
                >
                  <FormInputContainerPhone>
                    <MaskInput
                      cursorColor={C.inputCursor}
                      onFocus={() => {
                        setInputFocus1(C.black)
                      }}
                      onBlur={() => {
                        onBlur
                        setInputFocus1(C.lightGray)
                      }}
                      keyboardType="phone-pad"
                      maxLength={17}
                      style={{
                        width: "100%",
                        flex: 1,
                        height: 48,
                        paddingLeft: 16,
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: inputFocus1,
                        fontSize: 17,
                        fontFamily: F.regular,
                        color: C.black,
                        paddingTop: inputPhoneLabel === true ? 17 : 0,
                        borderColor: errors.resetPhone ? C.red : inputFocus1,
                        borderWidth: errors.resetPhone ? 2 : 1,
                        color: errors.resetPhone ? C.red : C.black,
                      }}
                      value={phone}
                      onChangeText={(masked, unmasked) => {
                        onChange(masked)
                        setPhone(masked)
                      }}
                      placeholder={"Enter your phone number"}
                      mask={S.phoneMaskPattern}
                    />
                    {errors.resetPhone && (
                      <ShowPasswordIconButton>
                        <ErrorIcon width={20} height={20} />
                      </ShowPasswordIconButton>
                    )}
                  </FormInputContainerPhone>
                  <FormInputLabel
                    isError={errors.resetPhone}
                    inputLabel={inputPhoneLabel}
                  >
                    Phone number
                  </FormInputLabel>

                  {errors.resetPhone?.type === "required" && (
                    <ErrorMessage>{S.inputRequired}</ErrorMessage>
                  )}
                  {errors.resetPhone?.type === "minLength" && (
                    <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>
                  )}
                </FormInputBlock>
              )}
              name="resetPhone"
            />
          </FormBlock>
        )}
        <ButtonSubmit
          isKeyboardOpen={isKeyboardOpen}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonSubmitText>
            {isEmailTab === true ? "Send A Link" : "Send Code"}
          </ButtonSubmitText>
        </ButtonSubmit>
      </Container>
    </>
  )
}

export default ForgetPasswordScreen
