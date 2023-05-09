import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// Helpers
import { getWindowDimension } from "@/components/helpers/getWindowDimension"
// Images
import IMAGES from "@/res/images"
const {
    RoundBlackCheckIcon,
    GoBackIcon,
} = IMAGES;
// Variables
import C from "@/res/colors"
// Styles
import { style } from "./style"
const {
    FilterContainer,
    Header,
    HeaderClose,
    HeaderTitle,
    CountriesList,
    SelectItem,
    SelectItemCol,
    SelectText,
    CheckBox,
    ContentBlock,
    SelectItemColPrice,
    PremiumLabel,
    PremiumLabelText,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    TitleBold18,
    PlainText13,
    MediumText15,
    MediumText17,
    BlackBtn,
    BlackBtnText,
} = M;

const ChoosePromoteType = ({ selectedPromoteType, setSelectedOption, setOpenNextTab }) => {
    const navigation = useNavigation();

    const { windowHeight, windowWidth } = getWindowDimension()

    const [isShowSubmitButton, setShowSubmitButton] = useState(false);

    const isVipPromote = selectedPromoteType !== undefined && selectedPromoteType === "VipPromotion"
    const isBasicPromote = selectedPromoteType !== undefined && selectedPromoteType === "BasicPromotion"
    return (
        <FilterContainer
            style={{
                height: windowHeight,
                width: windowWidth,
            }}
        >

            {/* Header */}
            <Header >
                <HeaderClose
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <GoBackIcon width={12} height={21} />
                </HeaderClose>

                <HeaderTitle>
                    Promote Your Ad
                </HeaderTitle>
            </Header>

            <CountriesList>

                <MediumText17 style={{ color: C.cyanGray, marginBottom: 16 }}  >Please, choose the type of promotion that suits you:</MediumText17>

                <SelectItem isActive={isVipPromote} onPress={() => { setSelectedOption("VipPromotion"); setShowSubmitButton(true) }}                >
                    <CheckBox isActive={isVipPromote}>
                        {isVipPromote && <RoundBlackCheckIcon width={24} height={24} />}
                    </CheckBox>
                    <SelectItemCol>
                        <SelectText>VIP promotion</SelectText>
                        <MediumText15 style={{ color: C.cyanGray }}  >A profile will be shown on the home screen in a block with popular artists.</MediumText15>
                        <SelectItemColPrice>

                            <TitleBold18>$5</TitleBold18>
                            <PlainText13 style={{ color: C.cyanGray, lineHeight: 21 }}> /day</PlainText13>
                        </SelectItemColPrice>
                    </SelectItemCol>

                    <PremiumLabel>
                        <PremiumLabelText>Premium</PremiumLabelText>
                    </PremiumLabel>
                </SelectItem>

                <SelectItem isActive={isBasicPromote} onPress={() => { setSelectedOption("BasicPromotion"); setShowSubmitButton(true) }}                >
                    <CheckBox isActive={isBasicPromote}>
                        {isBasicPromote && <RoundBlackCheckIcon width={24} height={24} />}
                    </CheckBox>
                    <SelectItemCol>
                        <SelectText>Basic promotion</SelectText>
                        <MediumText15 style={{ color: C.cyanGray }}  >Featured profiles will be shown atop the list.</MediumText15>
                        <SelectItemColPrice>

                            <TitleBold18>$3</TitleBold18>
                            <PlainText13 style={{ color: C.cyanGray, lineHeight: 21 }}> /day</PlainText13>
                        </SelectItemColPrice>
                    </SelectItemCol>
                </SelectItem>

            </CountriesList>

            {/* Footer block */}
            <ContentBlock>

                {isShowSubmitButton ? <BlackBtn
                    style={{
                        width: "100%",
                        backgroundColor: C.black,
                    }}
                    onPress={() => {
                        setOpenNextTab(true)
                    }}
                >
                    <BlackBtnText style={{ color: C.white }}>
                        Next
                    </BlackBtnText>
                </BlackBtn>
                    :
                    <BlackBtn
                        activeOpacity={0.2}
                        style={{
                            width: "100%",
                            backgroundColor: C.gray,
                        }}
                    >
                        <BlackBtnText style={{ color: C.sBlack, }}     >
                            Next
                        </BlackBtnText>
                    </BlackBtn>
                }

            </ContentBlock>

        </FilterContainer>
    )
}

export default ChoosePromoteType;

