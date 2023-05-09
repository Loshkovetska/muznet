import React from "react";
import { useState, useEffect } from "react";
// Components
import CheckBoxWithText from "@/components/Buttons/CheckBoxWithText"
// Variables
import C from "@/res/colors"
// Styles
import { style } from "./style"
const {
    FilterContainer,
    FeedbackSubTitle,
    ButtonsRow,
    AddPayment,
    AddPaymentRowText,
    ArticleSubTitle,
} = style;
// Mixins
import { M } from "@/res/mixin"
const {
    BlackBtn,
    BlackBtnText,
} = M;

const LeaveFeedbackScreen = () => {
    // Yes No tab state
    const [isPressNo, setPressNo] = useState(false);

    const [isShowThanksText, setShowThanksText] = useState(false);

    const isShowIntro = !isPressNo && !isShowThanksText
    const isShowNo = isPressNo && !isShowThanksText

    const [isCheckBox1, setCheckBox1] = useState(false);
    const [isCheckBox2, setCheckBox2] = useState(false);
    const [isCheckBox3, setCheckBox3] = useState(false);
    const [isCheckBox4, setCheckBox4] = useState(false);

    // Is show active submit button
    const [isShowSubmitButton, setShowSubmitButton] = useState(false);

    useEffect(() => {
        if (isCheckBox1 === true || isCheckBox2 === true || isCheckBox3 === true || isCheckBox4 === true) {
            setShowSubmitButton(true)
        } else {
            setShowSubmitButton(false)
        }
    }, [isCheckBox1, isCheckBox2, isCheckBox3, isCheckBox4]);

    useEffect(() => {
        if (isCheckBox1 === true) { setCheckBox2(false); setCheckBox3(false); setCheckBox4(false) }
    }, [isCheckBox1]);

    useEffect(() => {
        if (isCheckBox2 === true) { setCheckBox1(false); setCheckBox3(false); setCheckBox4(false) }
    }, [isCheckBox2]);

    useEffect(() => {
        if (isCheckBox3 === true) { setCheckBox1(false); setCheckBox2(false); setCheckBox4(false) }
    }, [isCheckBox3]);

    useEffect(() => {
        if (isCheckBox4 === true) { setCheckBox1(false); setCheckBox2(false); setCheckBox3(false) }
    }, [isCheckBox4]);

    return (
        <FilterContainer>

            {isShowIntro && <FilterContainer>
                <FeedbackSubTitle>Did you get the help you needed?</FeedbackSubTitle>
                {/* Yes or no */}
                <ButtonsRow>

                    <AddPayment onPress={() => {

                        setPressNo(false)
                        setShowThanksText(true)
                    }}    >
                        <AddPaymentRowText>Yes</AddPaymentRowText>
                    </AddPayment>

                    <AddPayment onPress={() => {
                        setPressNo(true)
                    }}    >
                        <AddPaymentRowText>No</AddPaymentRowText>
                    </AddPayment>
                </ButtonsRow>
            </FilterContainer >}

            {isShowNo && <FilterContainer>

                <FeedbackSubTitle>Tell us a little more</FeedbackSubTitle>

                <ArticleSubTitle>Please select all that apply</ArticleSubTitle>

                <CheckBoxWithText
                    checkboxState={isCheckBox1}
                    setCheckboxState={setCheckBox1}
                    checkboxTitle={"These instructions didn’t work"}
                />
                <CheckBoxWithText
                    checkboxState={isCheckBox2}
                    setCheckboxState={setCheckBox2}
                    checkboxTitle={"This info is confusing or unclear"}
                />
                <CheckBoxWithText
                    checkboxState={isCheckBox3}
                    setCheckboxState={setCheckBox3}
                    checkboxTitle={"I didn’t find the answer to my question"}
                />
                <CheckBoxWithText
                    checkboxState={isCheckBox4}
                    setCheckboxState={setCheckBox4}
                    checkboxTitle={"Something else"}
                />
                {isShowSubmitButton ?
                    <BlackBtn style={{
                        marginTop: 16,
                        backgroundColor: C.black,
                    }}
                        onPress={() => {
                            setPressNo(false)
                            setShowThanksText(true)
                        }}
                    >
                        <BlackBtnText style={{ color: C.white }}>
                            Submit
                        </BlackBtnText>
                    </BlackBtn>
                    :
                    <BlackBtn style={{
                        marginTop: 16,
                        backgroundColor: C.gray,
                    }}             >
                        <BlackBtnText style={{ color: C.sBlack, }}    >
                            Submit
                        </BlackBtnText>
                    </BlackBtn>
                }
            </FilterContainer >}

            {isShowThanksText && <FilterContainer>
                <FeedbackSubTitle>Thanks for your feedback</FeedbackSubTitle>
            </FilterContainer >}
        </FilterContainer >

    )
}

export default LeaveFeedbackScreen;

