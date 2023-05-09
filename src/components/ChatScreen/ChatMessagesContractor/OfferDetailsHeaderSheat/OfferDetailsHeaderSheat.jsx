import React from "react";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Animated, Keyboard, View, Pressable, KeyboardAvoidingView, BackHandler } from "react-native";
import { useForm, Controller } from "react-hook-form";
// Components
import DropSelectCalendar from "@/components/Dropdowns/DropSelectCalendar"
import TimePeriodPicker from "@/components/TimePeriodPicker"
import SearchLocationDropSelect from "@/components/Dropdowns/SearchLocationDropSelect"
import BottomConfirmPopup from "@/components/BottomConfirmPopup"

// Helpers
import MaskInput from "react-native-mask-input";
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
import { useAnimateOfferHeader } from "./useAnimateOfferHeader";
import { isKeyboardShown } from "@/components/helpers/isKeyboardShown"
import { addDotForNumber } from "@/components/helpers/addDotForNumber"
import { dateConverter } from "@/components/helpers/dateConverter"
// Images
import IMAGES from "@/res/images"
const {
    GoBackIcon,
    CrossBlackIcon,
    LockGrayIcon,
    ErrorIcon,
    OfferHeaderRoundedShapeBg,
} = IMAGES;
// Variables
import C from "@/res/colors"
import F from "@/res/fonts"
import { S } from "@/res/strings"
// Styles
import { style } from "./style"
const {
    HeaderMinimal,
    HeaderMinimalRow,
    HeaderMinimalKey,
    HeaderMinimalText,
    HeaderMinimalButton,
    HeaderMinimalIcon,
    HeaderRoundShape,
    FooterMinimalRow,
    FooterMinimalIcon,
    FilterContainer,
    Header,
    FilterBlock,
    ContentBlock,
    ContentBlockRow,
    ButtonSubmit,
    ButtonSubmitText,
    FormInputPricePerHourBlock,
    FormInputPricePerHourText,
    OpacityBg,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    ErrorMessage,
    FormInputBlock,
    FormInputLabel,
    ShowPasswordIconButton,
    FormInputContainerPhone,
} = M;
// Store
import { observer } from "mobx-react-lite";
import { useOfferToMusicianApiStore } from "@/stores/OfferToMusicianApi";
import { usePaymentAndPayoutApiStore } from "@/stores/PaymentAndPayoutApi";

const OfferDetailsHeaderSheat = observer(() => {

    // Form 
    const { control, handleSubmit, resetField, setError, watch, clearErrors, setValue,
        formState: { dirtyFields, errors } } = useForm({
            defaultValues: {
                offerDate: "",
                offerStartTime: "",
                offerEndTime: "",
                offerLocation: "",
                offerPricePerHour: "",
                offerPhoneNumber: "",
                offerAdditionalInfo: "",
            }
        });

    const navigation = useNavigation();

    const isKeyboardOpen = isKeyboardShown()
    const {
        isOpenPaymentDetails,
        setOpenPaymentDetails,
    } = usePaymentAndPayoutApiStore();

    const {
        offerDetails,
        isOpenPaySuccesfulModal,
        setOpenPaySuccesfulModal,
        isFirstCreatedOffer,
        isOpenOfferPreview,
        setOpenOfferPreview,
        setOfferDetails,
        isPaySuccesful,
        setPaySucessful,
    } = useOfferToMusicianApiStore();

    const {
        offerAdditionalInfo,
        offerDate,
        offerDuration,
        offerStartTime,
        offerEndTime,
        offerLocation,
        offerPricePerHour,
        offerPhoneNumber,
    } = offerDetails;

    const isDateString = offerDate.string !== undefined && offerDate.string

    const isTimeStartString = offerStartTime.string !== undefined && offerStartTime.string
    const isTimeEndString = offerEndTime.string !== undefined && offerEndTime.string
    const isDurationString = offerDuration !== undefined && offerDuration

    const isLocationString = offerLocation !== undefined && offerLocation

    const isPhoneNumberString = offerPhoneNumber !== undefined && offerPhoneNumber

    const [isShowAllDetails, setShowAllDetails] = useState(false);

    const { windowHeight, windowWidth } = getWindowDimension()
    // Reset state

    // Animation 
    const { onPress, height } = useAnimateOfferHeader()
    useEffect(() => {
        if (isShowAllDetails === true) {
            onPress(true)
        }
    }, [isShowAllDetails]);

    const [isHideAnimationTab, setHideAnimationTab] = useState(false);

    useEffect(() => {
        if (isHideAnimationTab === true) {
            onPress(false)
        }
    }, [isHideAnimationTab])

    // Calendar
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [chosenDate, getChosenDate] = useState({
        milliseconds: "",
        string: "",
    });
    //Time range 
    const [timeRange, setTimeRange] = useState({
        startTime: {
            milliseconds: "",
            string: "",
        },
        endTime: {
            milliseconds: "",
            string: "",
        },
        duration: 0,
    });
    // Get location
    const [chosenLocation, getChosenLocation] = useState();
    const [isOpenLocationDropList, setOpenLocationDropList] = useState(false);
    // Price per hour
    const [inputFocus7, setInputFocus7] = useState(C.lightGray);
    const [pricePerHourLabel, setPricePerHourLabel] = useState(false);
    const [pricePerHourInput, setPricePerHourInput] = useState("");
    // Phone number
    const [phone, setPhone] = useState("");
    const [inputFocus1, setInputFocus1] = useState(C.lightGray);
    const [inputPhoneLabel, setInputPhoneLabel] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [flagType, setPositionType] = useState({ icon: "", phonePattern: [], });
    // useEffect(() => {
    //     if (flagType) {
    //         setPhone("")
    //     }
    // }, [flagType])

    const closePopup = () => {
        setHideAnimationTab(true)
        setShowAllDetails(false)
        setTimeout(() => {
            setHideAnimationTab(false)
        }, 600);
    }

    // Before open offer preview I set previous for if goBack I can set previous state for header 
    const [previousOfferDetails, setPreviousOfferDetails] = useState({});
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (isShowAllDetails === true && isOpenOfferPreview === false) {
                closePopup()
            }
            if (isShowAllDetails === false && isOpenOfferPreview === false && isOpenPaySuccesfulModal === false && isOpenPaymentDetails === false) {
                navigation.goBack()
            }

            if (isShowAllDetails === true && isOpenOfferPreview === true && isOpenPaymentDetails === false) {
                setPhone(previousOfferDetails.offerPhoneNumber)
                setInputPhoneLabel(true)
                setValue("offerPhoneNumber", previousOfferDetails.offerPhoneNumber);
                setPricePerHourInput(`${previousOfferDetails.offerPricePerHour}`)
                setValue("offerPricePerHour", previousOfferDetails.offerPricePerHour);
                setPricePerHourLabel(true)

                setOfferDetails(previousOfferDetails)
                setOpenOfferPreview(false)
                closePopup()
            }
            if (isOpenOfferPreview === true && isOpenPaymentDetails === true) {
                setOpenPaymentDetails(false)
            }

            if (isOpenPaySuccesfulModal === true) {
                setOpenPaySuccesfulModal(false)
            }
            return true
        })
        return () => {
            backHandler.remove()
        }
    }, [isShowAllDetails, isOpenOfferPreview, previousOfferDetails, isPhoneNumberString, offerPricePerHour, isPaySuccesful, isOpenPaymentDetails, isOpenPaySuccesfulModal])

    // Set phone number is exist offer
    useEffect(() => {

        if (isPhoneNumberString !== undefined) {
            setPhone(isPhoneNumberString)
            setInputPhoneLabel(true)
            setValue("offerPhoneNumber", isPhoneNumberString);
        }
        if (offerPricePerHour !== undefined) {
            setPricePerHourInput(`${offerPricePerHour}`)
            setPricePerHourLabel(true)
            setValue("offerPricePerHour", offerPricePerHour);
        }

    }, [isPhoneNumberString, offerPricePerHour]);

    // Set shifting input label
    useEffect(() => {
        if (dirtyFields.offerPhoneNumber === undefined) {
            setInputPhoneLabel(false)
        }
        if (dirtyFields.offerPhoneNumber !== undefined) {
            setInputPhoneLabel(true)
        }
        if (pricePerHourInput.length === 0) {
            setPricePerHourLabel(false)
        }
        if (pricePerHourInput.length > 0) {
            setPricePerHourLabel(true)
        }
    }, [pricePerHourInput.length, dirtyFields.offerPhoneNumber]);

    const [isCloseAllDropdown, setCloseAllDropdown] = useState(false);
    useEffect(() => {
        if (isCloseAllDropdown === true) {
            // Set reset to default
            setTimeout(() => {
                setCloseAllDropdown(false)
            }, 0);
        }
    }, [isCloseAllDropdown]);

    // Is show submit button
    const [isShowSubmitButton, setShowSubmitButton] = useState(false);
    const [isSomeFieldChange, setSomeFieldChange] = useState(false);
    useEffect(() => {
        const isDateSelected = chosenDate.milliseconds > 0
        const isTimeSelected = timeRange.endTime.milliseconds > 0
        const isLocationSelected = chosenLocation !== undefined
        const isPricePerHour = pricePerHourInput.length > 0
        const isPhoneNumber = phone.length === 17 && !errors.offerPhoneNumber

        if (isDateSelected && isTimeSelected && isLocationSelected && isPricePerHour && isPhoneNumber && isSomeFieldChange) {
            setShowSubmitButton(true)
        } else {
            setShowSubmitButton(false)
        }
    }, [chosenDate, timeRange, chosenLocation, pricePerHourInput, phone, isSomeFieldChange]);
    useEffect(() => {
        const isChangedDate = chosenDate.milliseconds !== offerDate.milliseconds
        const isChangedStartTime = timeRange.startTime.milliseconds != offerStartTime.milliseconds
        const isChangedEndTime = timeRange.endTime.milliseconds != offerEndTime.milliseconds
        const isChangedLocation = chosenLocation !== offerLocation
        const isChangedPricePerHour = pricePerHourInput != offerPricePerHour
        const isChangedPhoneNumber = phone !== offerPhoneNumber

        if (isChangedDate || isChangedStartTime || isChangedEndTime || isChangedLocation || isChangedPricePerHour || isChangedPhoneNumber) {
            setSomeFieldChange(true)
        } else {
            setSomeFieldChange(false)
        }
    }, [
        chosenDate.milliseconds,
        offerDate.millliseconds,
        timeRange.startTime.milliseconds,
        offerStartTime.milliseconds,
        timeRange.endTime.milliseconds,
        offerEndTime.milliseconds,
        chosenLocation,
        offerLocation,
        pricePerHourInput,
        offerPricePerHour,
        phone,
        offerPhoneNumber,
        isSomeFieldChange
    ]);

    // Clear all if payment successful
    // useEffect(() => {
    //     if (isPaySuccesful === true && isFirstCreatedOffer === false) {
    //         console.log("зулиииии");
    //         onPress(false)
    //         setShowAllDetails(false)
    //     }
    // }, [isPaySuccesful, isFirstCreatedOffer]);

    const [showHeaderArrow, setShowHeaderArrow] = useState(true);
    useEffect(() => {
        if (isShowAllDetails === true) {
            setShowHeaderArrow(false)
        }
        if (isShowAllDetails === false) {
            setTimeout(() => {
                setShowHeaderArrow(true)
            }, 300);
        }
    }, [isShowAllDetails]);

    // Confirm new offer window state
    const [isOpenConfirmWindow, setOpenConfirmWindow] = useState(false);
    const [isConfirm, setConfirm] = useState(false);

    const onSubmit = (data) => {
        const newOffer = {
            offerDate: chosenDate,
            offerStartTime: timeRange.startTime,
            offerEndTime: timeRange.endTime,
            offerDuration: timeRange.duration,
            offerTotalMoney: timeRange.duration * pricePerHourInput,
            offerLocation: chosenLocation,
            offerPricePerHour: pricePerHourInput,
            offerPhoneNumber: phone,
            offerAdditionalInfo: offerAdditionalInfo,
        }
        Keyboard.dismiss()
        setPreviousOfferDetails(offerDetails)
        setOfferDetails(newOffer)
        console.log("🚀 ~ file: OfferDetailsHeaderSheat.jsx ~ line 350 ~ onSubmit ~ newOffer", newOffer)
        setOpenOfferPreview(true)
        closePopup()
        // Clear input value
        // navigation.navigate("ContractorStack", { screen: "OfferPreviewScreen" })
    };
    useEffect(() => {
        if (isConfirm === true) {
            onSubmit()
            setConfirm(false)
        }
    }, [isConfirm]);

    const minimalHeaderDate = `${isDateString}, ${isTimeStartString}`
    return (
        <>
            <HeaderMinimal
                style={{
                    zIndex: 1510,
                }}
                onPress={() => { setShowAllDetails(true) }}   >
                <HeaderMinimalRow>

                    <HeaderMinimalKey>
                        Offer details:
                    </HeaderMinimalKey>
                    <HeaderMinimalText>
                        {minimalHeaderDate}
                    </HeaderMinimalText>

                    {showHeaderArrow &&
                        <>
                            <HeaderMinimalButton>
                                <HeaderMinimalIcon onPress={() => { setShowAllDetails(true) }}>
                                    <GoBackIcon width={10} height={15} />
                                </HeaderMinimalIcon>
                            </HeaderMinimalButton>

                            <HeaderRoundShape>
                                <OfferHeaderRoundedShapeBg width={55} height={16} />
                            </HeaderRoundShape>
                        </>
                    }
                </HeaderMinimalRow>
            </HeaderMinimal>

            {isShowAllDetails && <OpacityBg
                style={{
                    height: windowHeight,
                    width: windowWidth,
                    zIndex: 999,
                }}

            >
            </OpacityBg>}

            <Animated.View
                style={{
                    zIndex: 1000,
                    height,
                    // backgroundColor: C.opacity50white,
                    width: windowWidth,
                    justifyContent: "flex-start",
                    position: "absolute",
                    left: 0,
                    top: 115,
                    right: 0,
                }}
            >
                <FilterContainer>

                    {/* Header */}
                    <Header></Header>

                    <FilterBlock keyboardShouldPersistTaps={"handled"}>

                        {/* Set date */}
                        <View style={{
                            marginBottom: -12,
                        }}>
                            <DropSelectCalendar
                                setFilterDate={getChosenDate}
                                setCalendarOpen={setCalendarOpen}
                                isCloseAllDropdown={isCloseAllDropdown}
                                placeholderText={"Date"}
                                isExistedDate={offerDate}
                            />
                        </View>

                        {/* Set time */}
                        <TimePeriodPicker
                            setTimeRange={setTimeRange}
                            existedStartTimePlaceholder={offerStartTime}
                            existedEndTimePlaceholder={offerEndTime}
                            existedDuration={isDurationString}
                        />

                        {/* Opacity bg that show if calendar or location open and close it on press */}
                        {(isCalendarOpen === true || isOpenLocationDropList === true) &&
                            <Pressable style={{ width: "100%", height: "100%", backgroundColor: C.opacity20white, position: "absolute", top: 0, left: 0, bottom: 0, right: 0, zIndex: 999, }}
                                onPress={() => { setCloseAllDropdown(true) }}     >
                            </Pressable>}

                        {/* Set location */}
                        <SearchLocationDropSelect
                            setParentShowOpenDrop={setOpenLocationDropList}
                            setFilterLocation={getChosenLocation}
                            isCloseAllDropdown={isCloseAllDropdown}
                            placeholderText={"Location"}
                            existedLocation={isLocationString}
                        />

                        {/* Price per hour */}
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur } }) => (
                                <View style={{ marginHorizontal: 16, }}>
                                    <FormInputBlock>
                                        <FormInputContainerPhone>
                                            <MaskInput
                                                maxLength={5}
                                                cursorColor={C.inputCursor}
                                                onFocus={() => { setInputFocus7(C.black) }}
                                                onBlur={() => {
                                                    onBlur
                                                    setInputFocus7(C.lightGray)
                                                }}
                                                keyboardType="numeric"
                                                style={{
                                                    width: "100%",
                                                    flex: 1,
                                                    height: 48,
                                                    paddingLeft: pricePerHourInput.length > 0 ? 30 : 16,
                                                    borderRadius: 6,
                                                    borderColor: inputFocus7,
                                                    fontSize: 17,
                                                    fontFamily: F.regular,
                                                    paddingTop: pricePerHourLabel === true ? 13 : 0,
                                                    borderWidth: errors.offerPricePerHour ? 2 : 1,
                                                    color: "transparent",
                                                }}
                                                placeholderTextColor={"transparent"}
                                                value={pricePerHourInput}
                                                onChangeText={(masked) => {
                                                    onChange(masked)
                                                    setPricePerHourInput(masked);
                                                }}
                                                placeholder={"Price"}
                                                mask={S.perHourMaskPattern}
                                            />
                                            <FormInputPricePerHourBlock>
                                                <FormInputPricePerHourText
                                                    style={{
                                                        top: pricePerHourInput.length > 0 ? 1 : -7,
                                                        color: pricePerHourInput.length > 0 ? C.black : C.placeholder,
                                                    }}>
                                                    {pricePerHourInput.length > 0 ? `$ ${addDotForNumber(pricePerHourInput)}/hour` : "Price"}</FormInputPricePerHourText>
                                            </FormInputPricePerHourBlock>
                                        </FormInputContainerPhone>
                                        <FormInputLabel inputLabel={pricePerHourLabel}>Price</FormInputLabel>

                                    </FormInputBlock>
                                </View>
                            )}
                            name="offerPricePerHour"
                        />

                        {/* Phone number */}
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                minLength: 17
                            }}
                            render={({ field: { onChange, onBlur } }) => (
                                <View style={{ marginHorizontal: 16, }}>
                                    <FormInputBlock
                                        style={{
                                            marginBottom: errors.offerPhoneNumber ? 32 : !isKeyboardOpen ? 140 : 13
                                        }
                                        }
                                    >
                                        <FormInputContainerPhone>
                                            <MaskInput
                                                cursorColor={C.inputCursor}
                                                onFocus={() => { setInputFocus1(C.black) }}
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
                                                    borderLeftWidth: 1,
                                                    borderRadius: 6,
                                                    borderColor: inputFocus1,
                                                    fontSize: 17,
                                                    fontFamily: F.regular,
                                                    color: C.black,
                                                    paddingTop: inputPhoneLabel === true ? 13 : 0,
                                                    borderColor: errors.offerPhoneNumber ? C.red : inputFocus1,
                                                    borderWidth: errors.offerPhoneNumber ? 2 : 1,
                                                    color: errors.offerPhoneNumber ? C.red : C.black,
                                                }}
                                                placeholder={"Contact phone"}
                                                placeholderTextColor={C.placeholder}
                                                value={phone}
                                                onChangeText={(masked, unmasked) => {
                                                    onChange(masked)
                                                    setPhone(masked);
                                                }}
                                                mask={
                                                    ["+", "1", " ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
                                                }
                                            />
                                            {errors.offerPhoneNumber && <ShowPasswordIconButton>
                                                <ErrorIcon width={20} height={20} />
                                            </ShowPasswordIconButton>
                                            }
                                        </FormInputContainerPhone>
                                        <FormInputLabel
                                            isError={errors.offerPhoneNumber} inputLabel={inputPhoneLabel}>Contact phone</FormInputLabel>

                                        {errors.offerPhoneNumber?.type === "required" && <ErrorMessage>{S.inputRequired}</ErrorMessage>}
                                        {errors.offerPhoneNumber?.type === "minLength" && <ErrorMessage>{S.phoneNumberNotValid}</ErrorMessage>}
                                    </FormInputBlock>
                                </View>
                            )}
                            name="offerPhoneNumber"
                        />

                        {/* Empty block if open keyboard */}
                        <View
                            style={{
                                height: isCalendarOpen ? 120 : 0,
                                marginTop: isOpen ? 200 : 0,
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
                            {/* {isPriceInFooter &&
                                <ContainerLink>
                                    <ContainerPrice>${pricePerHourInput * timeRange.duration}</ContainerPrice>
                                    <ContainerHour>for {timeRange.duration} hours</ContainerHour>
                                </ContainerLink>
                            } */}
                            {isShowSubmitButton ? <ButtonSubmit
                                style={{
                                    width: "100%",
                                    backgroundColor: C.white,
                                }}
                                onPress={() => {
                                    setOpenConfirmWindow(true)
                                }}
                            >
                                <ButtonSubmitText style={{ color: C.black }}>
                                    Create New Offer
                                </ButtonSubmitText>
                            </ButtonSubmit>
                                :
                                <ButtonSubmit
                                    activeOpacity={1}
                                    style={{
                                        width: "100%",
                                        backgroundColor: C.gray,
                                        borderWidth: 0,
                                    }}
                                >
                                    <ButtonSubmitText
                                        style={{
                                            color: C.sBlack,
                                        }}
                                    >
                                        Create New Offer
                                    </ButtonSubmitText>
                                </ButtonSubmit>
                            }
                        </ContentBlockRow>

                    </ContentBlock>

                    <FooterMinimalRow
                        onPress={() => {
                            onPress(false)
                            setShowAllDetails(false)
                        }}
                    >
                        <HeaderMinimalButton
                            style={{
                                bottom: -5
                            }}
                        >
                            <FooterMinimalIcon>
                                <GoBackIcon width={10} height={15} />
                            </FooterMinimalIcon>
                        </HeaderMinimalButton>
                        <HeaderRoundShape
                            style={{
                                bottom: -14
                            }}
                        >
                            <OfferHeaderRoundedShapeBg width={55} height={16} />
                        </HeaderRoundShape>
                    </FooterMinimalRow>
                </FilterContainer>

            </Animated.View >

            {/* Confirm popup */}
            {isOpenConfirmWindow && <BottomConfirmPopup
                isOpenBottomPopup={isOpenConfirmWindow}
                setOpenBottomPopup={setOpenConfirmWindow}
                setConfirm={setConfirm}
                confirmBtnText={"Create new offer"}
                popupMainText={"Creating a new offer will delete the current one. You can read the refund policy here? "}
            />}
        </>

    )
})

export default OfferDetailsHeaderSheat;

