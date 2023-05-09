import React from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, View } from 'react-native'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import C from '@/res/colors'
import F from '@/res/fonts'

import { S } from '@/res/strings'
// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
// Images
import IMAGES from '@/res/images'
const { WarningGrayIcon, GoBackIcon, ErrorIcon } = IMAGES
// Styles
import { style } from './style'
import { useNavigation } from '@react-navigation/native'
import { sendMessage } from '../../../stores/MessangesStore'
import AccountStore from '../../../stores/AccountStore'
const {
  Container,
  ContentTitle,
  Header,
  HeaderClose,
  FormBlock,
  FormText,
  FormInputBlock,
  FormInputContainer,
  FormInput,
  ButtonSubmit,
  ButtonSubmitText,
  WarningBlock,
  WarningBlockText,
  ErrorMessage,
} = style

const CardSendMessage = ({
  receiverId,
  receiverName,
  isMusician,
  setOpenSendMessage,
}) => {
  const { windowHeight, windowWidth } = getWindowDimension()
  const navigate = useNavigation()
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: { userMessage: '' },
  })

  const [inputFocus1, setInputFocus1] = useState(C.lightGray)

  const onSubmit = (data) => {
    const now = new Date()
    const date = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now
      .getDate()
      .toString()
      .padStart(2, '0')} ${now
      .getHours()
      .toString()
      .padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

    sendMessage({
      from: AccountStore.account.id,
      to: receiverId,
      text: data.userMessage,
      isNew: true,
      datetime: date,
      files: [],
    }).then(() => {
      resetField('userMessage')
      Keyboard.dismiss()
      const screenName = isMusician
        ? 'MusicianChatScreen'
        : 'ContractorChatScreen'
      const stackName = `${isMusician ? 'Musician' : 'Contractor'}Stack`
      navigate.navigate(stackName, {
        screen: screenName,
        params: {
          chatUserId: receiverId,
        },
      })
    })
    return
  }

  const titleText = `Contact ${isMusician ? 'Musician' : 'Vendor'}`

  const vendorDescriptionText =
    'Introduce yourself and tell us why you are suitable for this performance.'
  const musicianDescriptionText = `Introduce yourself to ${receiverName} and let him know a little about your event.`
  const descriptionText = isMusician
    ? musicianDescriptionText
    : vendorDescriptionText

  return (
    <Container
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={{ flex: 1 }}>
          <Header>
            <HeaderClose
              onPress={() => {
                setOpenSendMessage(false)
              }}
            >
              <GoBackIcon width={9} height={16} />
            </HeaderClose>

            <ContentTitle>{titleText}</ContentTitle>
          </Header>
          <FormText>{descriptionText}</FormText>
          {/* Form */}
          <FormBlock>
            {/* User message */}
            <Controller
              control={control}
              rules={{
                required: S.emailNotValid,
                minLength: 10,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInputBlock
                  style={{
                    marginBottom: errors.userMessage ? 32 : 13,
                  }}
                >
                  <FormInputContainer>
                    <FormInput
                      selectionColor={C.lightGray}
                      multiline={true}
                      numberOfLines={5}
                      placeholder={'Write your message'}
                      placeholderTextColor={C.gray}
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
                        borderColor: errors.userMessage ? C.red : inputFocus1,
                        borderWidth: errors.userMessage ? 2 : 1,
                        color: errors.userMessage ? C.red : C.black,
                        textAlignVertical: 'top',
                      }}
                    />
                  </FormInputContainer>

                  {errors.userMessage?.type === 'minLength' && (
                    <ErrorMessage>
                      Minimal message length 10 characters
                    </ErrorMessage>
                  )}
                  {errors.userMessage?.type === 'required' && (
                    <ErrorMessage>Required field</ErrorMessage>
                  )}
                </FormInputBlock>
              )}
              name="userMessage"
            />
            <WarningBlock>
              <WarningGrayIcon width={27} height={27} />
              <WarningBlockText>
                For your payment and safety never transfer money or communicate
                outside of the MuzNet app
              </WarningBlockText>
            </WarningBlock>
          </FormBlock>
        </View>
        <ButtonSubmit onPress={handleSubmit(onSubmit)}>
          <ButtonSubmitText>Send A Message</ButtonSubmitText>
        </ButtonSubmit>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default CardSendMessage
