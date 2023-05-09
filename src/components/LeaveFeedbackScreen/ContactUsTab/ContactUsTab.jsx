import React from 'react'
import { useEffect, useState } from 'react'
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'

import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

// Components
import ModalWindow from '@/components/ModalWindow'

// Helpers
import { getWindowDimension } from '@/components/helpers/getWindowDimension'
import { useAnimateOfferPreview } from './useAnimateOfferPreview'
import { isKeyboardShown } from '@/components/helpers/isKeyboardShown'
// Images
import IMAGES from '@/res/images'
const { GoBackIcon, ErrorIcon } = IMAGES

// Styles
import { style } from './style'
import C from '@/res/colors'
import { S } from '@/res/strings'

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
} = style
// Mixins
import { M } from '@/res/mixin'
import AccountStore, { sendContact } from '../../../stores/AccountStore'
const { FormInputLabel, ShowPasswordIconButton, ErrorMessage } = M
const ContactUsTab = ({ isOpen, setOpen, isClose }) => {
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
    defaultValues: {
      userEmail: '',
      userFeedback: '',
    },
  })

  // Email
  const [inputEmailLabel, setInputEmailLabel] = useState(false)
  const userEmailWatch = watch('userEmail')
  const [inputFocus4, setInputFocus4] = useState(C.lightGray)

  // Input focus
  const [inputFocus1, setInputFocus1] = useState(C.lightGray)
  const messageWatch = watch('userFeedback')
  // Rate state
  const [rateCount, setRentCount] = useState(0)

  // Is show active submit button
  const [isShowSubmitButton, setShowSubmitButton] = useState(false)
  useEffect(() => {
    if (messageWatch.length > 0 && !errors.userEmail) {
      setShowSubmitButton(true)
    } else {
      setShowSubmitButton(false)
    }
  }, [errors, messageWatch.length])

  // Open modal window
  const [isModalOpen, setModalOpen] = useState(false)

  const AfterSubmitButtonAction = () => {
    setModalOpen(false)
    onPress(false)
    setTimeout(() => {
      setOpen(false)
    }, 600)
    return navigation.navigate('ContractorStack', {
      screen: 'ContractorWelcomeScreen',
    })
  }

  const onSubmit = (data) => {
    sendContact({
      email: data.userEmail,
      text: data.userFeedback,
    })
      
    resetField('userFeedback')
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
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      }}
    >
      {isModalOpen === true && (
        <ModalWindow
          title={'Thank you!'}
          advice={'Our manager will contact you shortly'}
          setOpen={AfterSubmitButtonAction}
          btnText={'Home screen'}
        />
      )}

      <FilterContainer
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
          }}
        >
          <FilterBlock keyboardShouldPersistTaps={'handled'}>
            {/* Header */}
            <Header>
              <HeaderClose
                onPress={() => {
                  closeTab()
                }}
              >
                <GoBackIcon width={12} height={21} />
              </HeaderClose>
            </Header>

            <OfferPayment>
              <HeaderTitle>Tell us about your issue</HeaderTitle>
              <OfferDetailsTitle>
                Can you describe your problem? The more details, the better
              </OfferDetailsTitle>

              {/* Form */}
              <FormBlock>
                {/* Email */}
                <Controller
                  control={control}
                  rules={{
                    required: S.emailNotValid,
                    pattern: S.emailValidationPattern,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormInputBlock
                      style={{
                        marginBottom: errors.userEmail ? 40 : 13,
                      }}
                    >
                      <FormInputContainer>
                        <FormInput
                          inputLabel={inputEmailLabel}
                          selectionColor={C.lightGray}
                          placeholder={'Write your email'}
                          placeholderTextColor={C.placeholder}
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
                            borderColor: errors.userEmail ? C.red : inputFocus4,
                            borderWidth: errors.userEmail ? 2 : 1,
                            color: errors.userEmail ? C.red : C.black,
                          }}
                        />
                        {errors.userEmail && (
                          <ShowPasswordIconButton>
                            <ErrorIcon width={20} height={20} />
                          </ShowPasswordIconButton>
                        )}
                      </FormInputContainer>
                      <FormInputLabel
                        isError={errors.userEmail}
                        inputLabel={inputEmailLabel}
                      >
                        Your email
                      </FormInputLabel>

                      {errors.userEmail?.type === 'pattern' && (
                        <ErrorMessage>{S.emailNotValid}</ErrorMessage>
                      )}
                      {errors.userEmail && (
                        <ErrorMessage>{errors.userEmail.message}</ErrorMessage>
                      )}
                    </FormInputBlock>
                  )}
                  name="userEmail"
                />

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
                          numberOfLines={4}
                          placeholder={'Write your message'}
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
                            borderColor: errors.userFeedback
                              ? C.red
                              : inputFocus1,
                            borderWidth: errors.userFeedback ? 2 : 1,
                            color: errors.userFeedback ? C.red : C.black,
                            textAlignVertical: 'top',
                          }}
                        />
                      </FormInputContainer>

                      {errors.userFeedback?.type === 'required' && (
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
              bottom: 80, //isKeyboardOpen === true ? 30 :
            }}
          >
            {isShowSubmitButton ? (
              <ButtonSubmit
                style={{
                  width: windowWidth - 32,
                  backgroundColor: C.black,
                }}
                onPress={handleSubmit(onSubmit)}
              >
                <ButtonSubmitText style={{ color: C.white }}>
                  Send A Message
                </ButtonSubmitText>
              </ButtonSubmit>
            ) : (
              <ButtonSubmit
                activeOpacity={1}
                style={{
                  width: windowWidth - 32,
                  backgroundColor: C.gray,
                }}
              >
                <ButtonSubmitText
                  style={{
                    color: C.sBlack,
                  }}
                >
                  Send A Message
                </ButtonSubmitText>
              </ButtonSubmit>
            )}
          </FooterButton>
        </KeyboardAvoidingView>
      </FilterContainer>
    </Animated.View>
  )
}

export default ContactUsTab
