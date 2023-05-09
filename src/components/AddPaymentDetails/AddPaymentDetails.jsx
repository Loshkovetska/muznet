import React from "react";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Animated, Keyboard, View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";

// Helpers
import MaskInput from "react-native-mask-input";
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
// Images
import IMAGES from "@/res/images"
const {
    AmericanExpressBankIcon,
    PayPalBankIcon,
    VisaBankIcon,
    MasterCardBankIcon,
    WarningBlackIcon,
    ErrorIcon,
} = IMAGES;
// Variables
import C from "@/res/colors"
import F from "@/res/fonts"
import { S } from "@/res/strings"
// Styles
import { style } from "./style"
const {
    FilterContainer,
    FilterBlock,
    FilterBlockRow,
    BankIconsRow,
    BankIconsRowItem,
    ContentBlock,
    ContentBlockRow,
    ButtonSubmit,
    ButtonSubmitText,
    SecurePaymentMessage,
    SecurePaymentMessageText,
    SecurePaymentMessageReadMoreText,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    FormInput,
    ErrorMessage,
    FormInputBlock,
    FormInputLabel,
    FormInputContainer,
    FormInputContainerPhone,
} = M;

const AddPaymentDetails = ({ onSubmitPaymentDetails }) => {
    const navigation = useNavigation();

    // Form 
    const { control, handleSubmit, resetField, setError, watch, clearErrors,
        formState: { dirtyFields, errors } } = useForm({
            defaultValues: {
                nameOnCard: "",
                cardNumber: "",
                cardExpiryDate: "",
                cardCvvCode: "",
                cardZipCode: "",
            }
        });

    const route = useRoute();

    const isKeyboardOpen = isKeyboardShown()

    const { windowHeight, windowWidth } = getWindowDimension()

    // Name on card
    const watchNameOnCard = watch("nameOnCard");
    const [inputFocus1, setInputFocus1] = useState(C.lightGray);
    const [inputNameOnCardLabel, setInputFullNameLabel] = useState(false);
    // Card number
    const [inputCardNumber, setInputCardNumber] = useState("");
    const [inputFocus2, setInputFocus2] = useState(C.lightGray);
    const [inputCardNumberLabel, setInputCardNumberLabel] = useState(false);
    //Expiry date 
    const [inputExpiryDate, setInputExpiryDate] = useState("");
    const [inputFocus3, setInputFocus3] = useState(C.lightGray);
    const [inputExpiryDateLabel, setInputExpiryDateLabel] = useState(false);
    //Cvv
    const watchCvv = watch("cardCvvCode");
    const [inputFocus4, setInputFocus4] = useState(C.lightGray);
    const [inputCvvCodeLabel, setInputCvvCodeLabel] = useState(false);
    //Zip code
    const watchZipCode = watch("cardZipCode");
    const [inputFocus5, setInputFocus5] = useState(C.lightGray);
    const [inputZipCodeLabel, setInputZipCodeLabel] = useState(false);

    // Set shifting input label
    useEffect(() => {
        if (dirtyFields.nameOnCard === undefined) {
            setInputFullNameLabel(false)
        }
        if (dirtyFields.nameOnCard !== undefined) {
            setInputFullNameLabel(true)
        }
        if (dirtyFields.cardNumber === undefined) {
            setInputCardNumberLabel(false)
        }
        if (dirtyFields.cardNumber === true) {
            setInputCardNumberLabel(true)
        }
        if (dirtyFields.cardExpiryDate === undefined) {
            setInputExpiryDateLabel(false)
        }
        if (dirtyFields.cardExpiryDate === true) {
            setInputExpiryDateLabel(true)
        }
        if (dirtyFields.cardCvvCode === undefined) {
            setInputCvvCodeLabel(false)
        }
        if (dirtyFields.cardCvvCode === true) {
            setInputCvvCodeLabel(true)
        }
        if (dirtyFields.cardZipCode === undefined) {
            setInputZipCodeLabel(false)
        }
        if (dirtyFields.cardZipCode === true) {
            setInputZipCodeLabel(true)
        }
    }, [
        dirtyFields.nameOnCard,
        dirtyFields.cardNumber,
        dirtyFields.cardExpiryDate,
        dirtyFields.cardCvvCode,
        dirtyFields.cardZipCode,
    ]);

    // Is show submit button
    const [isShowSubmitButton, setShowSubmitButton] = useState(false);
    useEffect(() => {
        const isNameOnCard = watchNameOnCard.length > 0
        const isCardNumber = inputCardNumber.length === 19
        const isExpiryDate = inputExpiryDate.length === 5
        const isCvvCode = watchCvv.length === 3
        const isZipCode = watchZipCode.length === 5

        if (isNameOnCard && isCardNumber && isExpiryDate && isCvvCode && isZipCode) {
            setShowSubmitButton(true)
        } else {
            setShowSubmitButton(false)
        }
    }, [
        watchNameOnCard,
        inputCardNumber.length,
        inputExpiryDate.length,
        watchCvv.length,
        watchZipCode.length,
    ]);

    const onSubmit = (data) => {
        onSubmitPaymentDetails(data)
        setInputCardNumber("")
        setInputExpiryDate("")
        resetField("nameOnCard")
        resetField("cardNumber")
        resetField("cardExpiryDate")
        resetField("cardCvvCode")
        resetField("cardZipCode")
        Keyboard.dismiss()
        // navigation.navigate("ContractorStack", { screen: "OfferPreviewScreen" })
        return
    };

    const DefineBank = (inputCardNumber) => {
        const AmericanExpressBank = <AmericanExpressBankIcon width={24} height={16} />
        const PayPalBank = <PayPalBankIcon width={24} height={16} />
        const VisaBank = <VisaBankIcon width={24} height={16} />
        const MasterCardBank = <MasterCardBankIcon width={24} height={16} />

        // const cardNumberTwoDigit = inputCardNumber.slice(0,1)
        // const isMasterCard = cardNumberTwoDigit === 50||cardNumberTwoDigit === 51||cardNumberTwoDigit === 52||cardNumberTwoDigit === 53||cardNumberTwoDigit === 54||cardNumberTwoDigit === 55 

        const BankIconsBlock = <BankIconsRow>
            <BankIconsRowItem>
                {AmericanExpressBank}
            </BankIconsRowItem>
            <BankIconsRowItem>
                {PayPalBank}
            </BankIconsRowItem>
            <BankIconsRowItem>
                {VisaBank}
            </BankIconsRowItem>
            <BankIconsRowItem>
                {MasterCardBank}
            </BankIconsRowItem>
        </BankIconsRow>

        return BankIconsBlock
    }

    return (
        <FilterContainer>
            <FilterBlock keyboardShouldPersistTaps={"handled"}>

                {/* Name on card  */}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInputBlock
                            style={{
                                marginBottom: errors.nameOnCard?.type === "required" ? 35 : (errors.nameOnCard?.type === "pattern" ? 60 : 13),
                            }}
                        >
                            <FormInputContainer>
                                <FormInput
                                    inputLabel={inputNameOnCardLabel}
                                    selectionColor={C.lightGray}
                                    placeholder={"Name on card"}
                                    placeholderTextColor={C.placeholder}
                                    cursorColor={C.inputCursor}
                                    onFocus={() => { setInputFocus1(C.black) }}
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
                                {errors.nameOnCard && <ShowPasswordIconButton>
                                    <ErrorIcon width={20} height={20} />
                                </ShowPasswordIconButton>
                                }

                            </FormInputContainer>
                            <FormInputLabel isError={errors.nameOnCard} inputLabel={inputNameOnCardLabel}>Name on card</FormInputLabel>

                            {errors.nameOnCard?.type === "required" && <ErrorMessage>{S.inputRequired}</ErrorMessage>}

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
                            style={{ marginBottom: errors.cardNumber ? 32 : 13 }
                            }
                        >
                            <FormInputContainerPhone>
                                <MaskInput
                                    cursorColor={C.inputCursor}
                                    onFocus={() => { setInputFocus2(C.black) }}
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
                                        paddingRight: 132,
                                        borderWidth: 1,
                                        borderRadius: 6,
                                        borderColor: inputFocus2,
                                        fontSize: 17,
                                        fontFamily: F.regular,
                                        color: C.black,
                                        paddingTop: inputCardNumberLabel === true ? 13 : 0,
                                        borderColor: errors.cardNumber ? C.red : inputFocus2,
                                        borderWidth: errors.cardNumber ? 2 : 1,
                                        color: errors.cardNumber ? C.red : C.black,
                                    }}
                                    placeholder={"Card number"}
                                    placeholderTextColor={C.placeholder}
                                    value={inputCardNumber}
                                    onChangeText={(masked, unmasked) => {
                                        onChange(masked)
                                        setInputCardNumber(masked);
                                    }}
                                    mask={S.bankCardMaskPattern}
                                />

                                <DefineBank inputCardNumber={inputCardNumber} />


                            </FormInputContainerPhone>
                            <FormInputLabel
                                isError={errors.cardNumber} inputLabel={inputCardNumberLabel}>Card number</FormInputLabel>

                            {errors.cardNumber?.type === "required" && <ErrorMessage>{S.inputRequired}</ErrorMessage>}
                            {/* {errors.cardNumber?.type === "minLength" && <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>} */}
                        </FormInputBlock>
                    )}
                    name="cardNumber"
                />

                {/* Expiry date / Cvv */}
                <FilterBlockRow>
                    {/* Expiry date */}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur } }) => (
                            <FormInputBlock
                                style={{
                                    marginBottom: errors.cardExpiryDate ? 32 : 13,
                                    width: "48.5%",
                                }}
                            >
                                <FormInputContainerPhone>
                                    <MaskInput
                                        cursorColor={C.inputCursor}
                                        onFocus={() => { setInputFocus3(C.black) }}
                                        onBlur={() => {
                                            onBlur
                                            setInputFocus3(C.lightGray)
                                        }}
                                        keyboardType="numeric"
                                        maxLength={5}
                                        style={{
                                            width: "48.5%",
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
                                            paddingTop: inputExpiryDateLabel === true ? 13 : 0,
                                            borderColor: errors.cardExpiryDate ? C.red : inputFocus3,
                                            borderWidth: errors.cardExpiryDate ? 2 : 1,
                                            color: errors.cardExpiryDate ? C.red : C.black,
                                        }}
                                        placeholder={"MM/YY"}
                                        placeholderTextColor={C.placeholder}
                                        value={inputExpiryDate}
                                        onChangeText={(masked, unmasked) => {
                                            onChange(masked)
                                            setInputExpiryDate(masked);
                                        }}
                                        mask={S.bankCardExpiryDateMaskPattern}
                                    />
                                </FormInputContainerPhone>
                                <FormInputLabel
                                    isError={errors.cardExpiryDate} inputLabel={inputExpiryDateLabel}>MM/YY</FormInputLabel>

                                {errors.cardExpiryDate?.type === "required" && <ErrorMessage>{S.inputRequired}</ErrorMessage>}
                                {/* {errors.cardExpiryDate?.type === "minLength" && <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>} */}
                            </FormInputBlock>
                        )}
                        name="cardExpiryDate"
                    />
                    {/* Cvv */}
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormInputBlock
                                style={{
                                    width: "48.5%",
                                    marginBottom: errors.cardCvvCode ? 35 : 0,
                                }}
                            >
                                <FormInputContainer>
                                    <FormInput
                                        maxLength={3}
                                        inputLabel={inputCvvCodeLabel}
                                        selectionColor={C.lightGray}
                                        placeholder={"CVV"}
                                        placeholderTextColor={C.placeholder}
                                        cursorColor={C.inputCursor}
                                        keyboardType="numeric"
                                        onFocus={() => { setInputFocus4(C.black) }}
                                        onBlur={() => {
                                            onBlur
                                            setInputFocus4(C.lightGray)
                                        }}
                                        onChangeText={onChange}
                                        value={value}
                                        style={{
                                            borderColor: errors.cardCvvCode ? C.red : inputFocus4,
                                            borderWidth: errors.cardCvvCode ? 2 : 1,
                                            color: errors.cardCvvCode ? C.red : C.black,
                                        }}
                                    />
                                    {errors.cardCvvCode && <ShowPasswordIconButton>
                                        <ErrorIcon width={20} height={20} />
                                    </ShowPasswordIconButton>
                                    }

                                </FormInputContainer>
                                <FormInputLabel isError={errors.cardCvvCode} inputLabel={inputCvvCodeLabel}>CVV</FormInputLabel>

                                {errors.cardCvvCode?.type === "required" && <ErrorMessage>{S.inputRequired}</ErrorMessage>}

                            </FormInputBlock>
                        )}
                        name="cardCvvCode"
                    />
                </FilterBlockRow>

                {/* Zip code */}
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInputBlock
                            style={{
                                marginBottom: errors.cardZipCode ? 35 : 12,
                            }}
                        >
                            <FormInputContainer>
                                <FormInput
                                    maxLength={5}
                                    inputLabel={inputZipCodeLabel}
                                    selectionColor={C.lightGray}
                                    placeholder={"Zip code"}
                                    placeholderTextColor={C.placeholder}
                                    cursorColor={C.inputCursor}
                                    keyboardType="numeric"
                                    onFocus={() => { setInputFocus5(C.black) }}
                                    onBlur={() => {
                                        onBlur
                                        setInputFocus5(C.lightGray)
                                    }}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{
                                        borderColor: errors.cardZipCode ? C.red : inputFocus5,
                                        borderWidth: errors.cardZipCode ? 2 : 1,
                                        color: errors.cardZipCode ? C.red : C.black,
                                    }}
                                />
                                {errors.cardZipCode && <ShowPasswordIconButton>
                                    <ErrorIcon width={20} height={20} />
                                </ShowPasswordIconButton>
                                }

                            </FormInputContainer>
                            <FormInputLabel isError={errors.cardZipCode} inputLabel={inputZipCodeLabel}>Zip code</FormInputLabel>

                            {errors.cardZipCode?.type === "required" && <ErrorMessage>{S.inputRequired}</ErrorMessage>}

                        </FormInputBlock>
                    )}
                    name="cardZipCode"
                />
                {/* Secure message */}
                <SecurePaymentMessage>
                    <WarningBlackIcon width={22} height={27} />
                    <SecurePaymentMessageText>
                        By adding a new card, you agree to the credit/debit card terms <SecurePaymentMessageReadMoreText>Learn more</SecurePaymentMessageReadMoreText>
                    </SecurePaymentMessageText>
                </SecurePaymentMessage>

                {/* Empty block if open keyboard */}
                <View
                    style={{
                        marginBottom: isKeyboardOpen === true ? 200 : 0,
                    }}
                >
                </View>
            </FilterBlock>

            {/* Footer block */}
            <ContentBlock
                style={{
                    width: windowWidth,
                }}
                isKeyboardOpen={isKeyboardOpen}>
                <ContentBlockRow>
                    {isShowSubmitButton ? <ButtonSubmit
                        style={{
                            width: "100%",
                            backgroundColor: C.black,
                        }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <ButtonSubmitText style={{ color: C.white }}>
                            Add card
                        </ButtonSubmitText>
                    </ButtonSubmit>
                        :
                        <ButtonSubmit
                            activeOpacity={0.2}
                            style={{
                                width: "100%",
                                backgroundColor: C.gray,
                            }}
                        >
                            <ButtonSubmitText
                                style={{
                                    color: C.sBlack,
                                }}
                            >
                                Add card
                            </ButtonSubmitText>
                        </ButtonSubmit>
                    }
                </ContentBlockRow>
            </ContentBlock>
        </FilterContainer >
    )
}

export default AddPaymentDetails;

