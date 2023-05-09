import React from "react"
import { Keyboard } from "react-native"
import axios from "axios"

import { useNavigation, useRoute } from "@react-navigation/native"

import { useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import C from "@/res/colors"

// Styles
import { style } from "./style"
import domain from "@/res/domain"
const { FormInputContainer, NumberInputsBlock, FormInput } = style

const VerifyCodeInputs = ({ verifyCode, setVerifySuccess, setModalOpen }) => {
  const navigation = useNavigation()

  const { control, resetField, watch } = useForm({
    defaultValues: {
      num1: "",
      num2: "",
      num3: "",
      num4: "",
    },
  })

  const num1Ref = useRef()
  const num2Ref = useRef()
  const num3Ref = useRef()
  const num4Ref = useRef()

  const num1Watch = watch("num1")
  const num2Watch = watch("num2")
  const num3Watch = watch("num3")
  const num4Watch = watch("num4")

  const concatInputCode = `${num1Watch}${num2Watch}${num3Watch}${num4Watch}`

  // Onfocus screen set focus for first input
  const route = useRoute()

  const verifyPost = async () => {
    const obj = route.params.phone
      ? {
          phone: route.params.phone,
        }
      : {
          email: route.params.whereToSendCode.userEmail,
        }

    await axios
      .post(`${domain}veripass`, {
        code: `${num1Watch}${num2Watch}${num3Watch}${num4Watch}`,
        ...obj,
      })
      .then((res) => {
        if (res.data) {
          resetField("num1")
          resetField("num2")
          resetField("num3")
          resetField("num4")
          setVerifySuccess(true)
        } else {
          Keyboard.dismiss()
          setVerifySuccess(false)
          setModalOpen(true)
        }
      }).catch((e)=>console.log(e))
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      num1Ref.current.focus()
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    let fillNumbers = false
    if (num1Watch.length === 1 && num2Watch.length === 0) {
      num2Ref.current.focus()
    }
    if (num2Watch.length === 1 && num3Watch.length === 0) {
      num3Ref.current.focus()
    }
    if (num3Watch.length === 1 && num4Watch.length === 0) {
      num4Ref.current.focus()
    }

    if (num1Watch.length && num2Watch.length && num3Watch) {
      fillNumbers = true
    }

    if (num4Watch.length == 1 && fillNumbers) {
      verifyPost()
    }
  }, [
    num1Watch.length,
    num2Watch.length,
    num3Watch.length,
    num4Watch.length,
    concatInputCode,
  ])

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const [inputFocus2, setInputFocus2] = useState(C.lightGray)
  const [inputFocus3, setInputFocus3] = useState(C.lightGray)
  const [inputFocus4, setInputFocus4] = useState(C.lightGray)

  return (
    <NumberInputsBlock>
      {/* Num 1 */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputContainer>
            <FormInput
              maxLength={1}
              ref={num1Ref}
              keyboardType="number-pad"
              selectionColor={C.lightGray}
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
                borderColor: inputFocus1,
                borderWidth: 1,
                color: inputFocus1 === C.black ? C.black : C.sBlack,
              }}
            />
          </FormInputContainer>
        )}
        name="num1"
      />
      {/* Num 2 */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputContainer>
            <FormInput
              maxLength={1}
              ref={num2Ref}
              keyboardType="number-pad"
              selectionColor={C.lightGray}
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
                borderColor: inputFocus2,
                borderWidth: 1,
                color: inputFocus2 === C.black ? C.black : C.sBlack,
              }}
            />
          </FormInputContainer>
        )}
        name="num2"
      />
      {/* Num 3 */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputContainer>
            <FormInput
              maxLength={1}
              ref={num3Ref}
              keyboardType="number-pad"
              selectionColor={C.lightGray}
              cursorColor={C.inputCursor}
              onFocus={() => {
                setInputFocus3(C.black)
              }}
              onBlur={() => {
                onBlur
                setInputFocus3(C.lightGray)
              }}
              onChangeText={onChange}
              value={value}
              style={{
                borderColor: inputFocus3,
                borderWidth: 1,
                color: inputFocus3 === C.black ? C.black : C.sBlack,
              }}
            />
          </FormInputContainer>
        )}
        name="num3"
      />
      {/* Num 4 */}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInputContainer>
            <FormInput
              ref={num4Ref}
              maxLength={1}
              keyboardType="number-pad"
              selectionColor={C.lightGray}
              cursorColor={C.inputCursor}
              onFocus={() => {
                setInputFocus4(C.black)
              }}
              onBlur={() => {
                onBlur
                setInputFocus4(C.lightGray)
              }}
              onChangeText={onChange}
              value={value}
              style={{
                borderColor: inputFocus4,
                borderWidth: 1,
                color: inputFocus4 === C.black ? C.black : C.sBlack,
              }}
            />
          </FormInputContainer>
        )}
        name="num4"
      />
    </NumberInputsBlock>
  )
}

export default VerifyCodeInputs
