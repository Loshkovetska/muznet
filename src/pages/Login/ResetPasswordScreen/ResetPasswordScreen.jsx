import React from "react"
import { StatusBar } from "react-native"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"

import C from "@/res/colors"
import { S } from "@/res/strings"

import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
import {
  useNavigation,
  useRoute,
  // , useRoute
} from "@react-navigation/native"
import AfterSubmitWindow from "@/components/AfterSubmitWindow"
import * as Linking from "expo-linking"
import { forgotPass } from "@/stores/AccountStore"
// Images
import IMAGES from "@/res/images"
const { ErrorIcon } = IMAGES
// Styles
import { style } from "../style"
const {
  Container,

  ContentTitle,
  Header,
  FormBlock,
  FormInputBlock,
  FormInputContainer,
  FormInputLabel,
  FormInput,
  ButtonSubmit,
  ShowPasswordIconButton,
  ButtonSubmitText,
  ErrorMessage,
} = style

const ResetPasswordScreen = () => {
  let url = Linking.useURL()
  const navigation = useNavigation()
  const router = useRoute()

  const {
    control,
    handleSubmit,
    setError,
    resetField,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: { password: "", passwordRepeat: "" },
  })


  const isKeyboardOpen = isKeyboardShown()

  const [inputFocus, setInputFocus] = useState(C.lightGray)
  const [inputPasswordLabel, setInputPasswordLabel] = useState(false)

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputPasswordRepeatLabel, setInputPasswordRepeatLabel] = useState(
    false,
  )

  const [isOpenAfterSubmitMessage, setOpenAfterSubmitMessage] = useState(false)

  useEffect(() => {
    if (dirtyFields.password === undefined) {
      setInputPasswordLabel(false)
    }
    if (dirtyFields.password === true) {
      setInputPasswordLabel(true)
    }
    if (dirtyFields.passwordRepeat === undefined) {
      setInputPasswordRepeatLabel(false)
    }
    if (dirtyFields.passwordRepeat === true) {
      setInputPasswordRepeatLabel(true)
    }
  }, [dirtyFields.password, dirtyFields.passwordRepeat])

  // Submit
  const onSubmit = (data) => {
    if (data.password !== data.passwordRepeat) {
      setError("passwordRepeat", {
        type: "value",
        message: "Passwords don\'t match",
      })
    } else {
      // Clear input valueш
      forgotPass({
        email: router.params.email,
        password: data.password,
      }).then(() => {
        if (res.data) {
          resetField("password")
          resetField("passwordRepeat")
          setOpenAfterSubmitMessage(true)
        }
      })
    }
  }

  const AfterSubmitButtonAction = () => {
    setOpenAfterSubmitMessage(false)
    navigation.navigate("LoginStack", { screen: "WelcomeBackScreen" })
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
          title={"New password confirmed succesful"}
          message={"You have succesfully confirm your new password"}
          windowImage={IMAGES.GifNewPassword}
          isOpen={isOpenAfterSubmitMessage}
          afterSubmitButton={AfterSubmitButtonAction}
          buttonText={"Great!"}
        />
        {/* Header */}
        <Header>
          <ContentTitle>Reset Password</ContentTitle>
        </Header>

        {/* Form */}
        <FormBlock>
          {/* New Password */}
          <Controller
            control={control}
            rules={{
              required: S.passwordNotValid,
              minLength: 8,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInputBlock
                style={{
                  marginBottom: errors.password ? 28 : 13,
                }}
              >
                <FormInputContainer>
                  <FormInput
                    isPassword={true}
                    inputLabel={inputPasswordLabel}
                    secureTextEntry={false}
                    selectionColor={C.lightGray}
                    placeholder={"Enter new password"}
                    cursorColor={C.inputCursor}
                    onFocus={() => setInputFocus(C.black)}
                    onBlur={() => {
                      onBlur
                      setInputFocus(C.lightGray)
                    }}
                    onChangeText={onChange}
                    value={value}
                    style={{
                      borderColor: errors.password ? C.red : inputFocus,
                      borderWidth: errors.password ? 2 : 1,
                      color: errors.password ? C.red : C.black,
                    }}
                  />
                  {errors.password && (
                    <ShowPasswordIconButton>
                      <ErrorIcon width={20} height={20} />
                    </ShowPasswordIconButton>
                  )}
                </FormInputContainer>

                <FormInputLabel
                  isError={errors.password}
                  inputLabel={inputPasswordLabel}
                >
                  Password
                </FormInputLabel>

                {errors.password && (
                  <ErrorMessage>{S.passwordMinimum}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="password"
          />

          {/* Repeat Password */}
          <Controller
            control={control}
            rules={{
              required: S.passwordNotValid,
              minLength: 8,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInputBlock>
                <FormInputContainer>
                  <FormInput
                    isPassword={true}
                    inputLabel={inputPasswordRepeatLabel}
                    secureTextEntry={false}
                    selectionColor={C.lightGray}
                    placeholder={"Repeat new password"}
                    cursorColor={C.inputCursor}
                    onFocus={() => setInputFocus1(C.black)}
                    onBlur={() => {
                      onBlur
                      setInputFocus1(C.lightGray)
                    }}
                    onChangeText={onChange}
                    value={value}
                    style={{
                      borderColor: errors.passwordRepeat ? C.red : inputFocus1,
                      borderWidth: errors.passwordRepeat ? 2 : 1,
                      color: errors.passwordRepeat ? C.red : C.black,
                    }}
                  />
                  {errors.passwordRepeat && (
                    <ShowPasswordIconButton>
                      <ErrorIcon width={20} height={20} />
                    </ShowPasswordIconButton>
                  )}
                </FormInputContainer>
                <FormInputLabel
                  isError={errors.passwordRepeat}
                  inputLabel={inputPasswordRepeatLabel}
                >
                  Repeat password
                </FormInputLabel>

                {errors.passwordRepeat &&
                  errors.passwordRepeat?.type !== "value" && (
                    <ErrorMessage>{S.passwordMinimum}</ErrorMessage>
                  )}
                {errors.passwordRepeat?.type === "value" && (
                  <ErrorMessage>{errors.passwordRepeat.message}</ErrorMessage>
                )}
              </FormInputBlock>
            )}
            name="passwordRepeat"
          />
        </FormBlock>

        <ButtonSubmit
          isKeyboardOpen={isKeyboardOpen}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonSubmitText>Save New Password</ButtonSubmitText>
        </ButtonSubmit>
      </Container>
    </>
  )
}

export default ResetPasswordScreen
