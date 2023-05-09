import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const HeaderMinimal = styled.Pressable`
width: 100%;
height: 60px;
max-height: 120px;
position: absolute;
top: 115px;
left: 0px;
right: 0px;
background-color: ${C.white};
z-index: 1000;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-bottom-right-radius: 12px;
border-bottom-left-radius: 12px;
`;
const HeaderMinimalRow = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
width: 100%;
`;
const FooterMinimalRow = styled.Pressable`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
position: absolute;
bottom: 0px;
left: 0px;
right: 0px;
width: 100%;
height: 35px;
z-index: 1500;
`;
const HeaderMinimalKey = styled(M.TitleBold17)`

`;
const HeaderMinimalText = styled(M.PlainText17)`
margin-left: 5px;
`;
const HeaderMinimalButton = styled.View`
position: absolute;
left: 0px;
z-index: 1010;
right: 1px;
bottom: -26px;
width: 100%;
height: 20px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
const HeaderRoundShape = styled.View`
position: absolute;
left: 0px;
right: 0px;
bottom: -33px;
width: 100%;
height: 20px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
overflow: visible;
`;
const HeaderMinimalIcon = styled.TouchableOpacity`
width: 15px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
transform: rotate(-90deg);
z-index: 1000;
`;
const FooterMinimalIcon = styled.View`
width: 15px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
transform: rotate(90deg);
z-index: 1000;
`;
const FilterContainer = styled.View`
width: 100%;
height: 100%;
margin-bottom: 20px;
/* max-height: 440px; */
border-top-color: ${C.lightGray};
border-top-width: 1px;

`;
const Header = styled.View`
width: 100%;
display: flex;
align-items: center;
flex-direction: row;
padding: 0px 16px;
height:50px;
background-color: ${C.white};

/* padding-bottom: 15px; */

`;
const HeaderTitle = styled(M.TitleBold17)`
line-height: 30px;
`;
const FilterBlock = styled.ScrollView`
width: 100%;
background-color: ${C.white};
height: 100%;
border-bottom-right-radius: 12px;
border-bottom-left-radius: 12px;
`;
const CheckboxBlock = styled.View`
width: 100%;
display: flex;
flex-direction: column;
margin-top:${props => props.isWilling === true ? 7 + "px" : 14 + "px"};
margin-bottom:${props => props.isWilling === true ? -8 + "px" : 146 + "px"};
margin-left: 16px;
`;
const CheckboxBlockTitle = styled(M.TitleBold15)`
margin-bottom: 24px;
`;
const ContentBlock = styled.View`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: column;
margin-top: 16px;
padding-top: 7px;
border-bottom-right-radius: 12px;
border-bottom-left-radius: 12px;
overflow: hidden;
/* width: 100%; */
/* height : ${props => props.isKeyboardOpen === true ? 116 + "px" : 146 + "px"}; */
/* height : 80px; */
position: absolute;
left:0;
bottom:0;
background-color: ${C.white};

`;
const ContentBlockRow = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
padding: 0px 16px;
`;
const ButtonSubmit = styled(M.BorderBtn)`
margin-bottom: 40px;
`;
const ButtonSubmitText = styled(M.BorderBtnText)`

`;
const ContainerLink = styled.View`
width: 40%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-left: -5px;
`;
const ContainerPrice = styled(M.Title24)`

`;
const ContainerHour = styled(M.PlainText17)`

`;

const FormInputPricePerHourBlock = styled.View`
width: 100%;
z-index: 0;
border-style: solid;
border-radius: 6px;
height:48px;
padding-left: 16px;
padding-top: ${props => props.inputLabel === true ? 17 + "px" : 0 + "px"};
padding-right: ${props => props.isPassword === true ? 50 + "px" : 16 + "px"};
z-index: -1;
position: absolute;
left: 0px;
bottom: 0px;
right: 0px;
display: flex;
align-items: center;
flex-direction: row;
`;
const FormInputPricePerHourText = styled.Text`
margin-top: 12px;
font-size: 13px;
font-family: ${F.regular};
font-size: 17px;
`;
const AddInfoBlock = styled.View`
width: 100%;
`;
const AddInfoContainer = styled.View`
border-radius: 6px;
overflow: hidden;
display: flex;
justify-content: space-between;
align-items: flex-end;
flex-direction: row;
`;
const AddInfoInput = styled.TextInput`
width: 100%;
font-size: 17px;
padding: 16px 16px;
font-family: ${F.regular};
color: ${C.black};
border-radius: 6px;
`;
const SecurePaymentMessage = styled.Pressable`
background-color: ${C.backGray};
border-radius: 6px;
margin: 0px 16px;
margin-bottom: 200px;
padding: 16px 16px;
padding-right: 30px;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
`;
const SecurePaymentMessageText = styled(M.MediumText13)`
color: ${C.sBlack};
margin-left: 10px;
`;
const SecurePaymentMessageReadMoreText = styled(M.TitleBold15)`
text-decoration: underline;
font-size: 13px;
margin-left: 5px;
`;
const OpacityBg = styled.Pressable`
 position: absolute;
 left: 0px;
 bottom: 0px;
 right: 0px;
background-color: ${C.black};
opacity: 0.5;
`;

export const style = {
    HeaderMinimal: HeaderMinimal,
    HeaderMinimalKey: HeaderMinimalKey,
    HeaderMinimalRow: HeaderMinimalRow,
    HeaderMinimalText: HeaderMinimalText,
    HeaderMinimalButton: HeaderMinimalButton,
    HeaderMinimalIcon: HeaderMinimalIcon,
    FooterMinimalIcon: FooterMinimalIcon,
    HeaderRoundShape: HeaderRoundShape,
    FooterMinimalRow: FooterMinimalRow,
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderTitle: HeaderTitle,
    FilterBlock: FilterBlock,
    CheckboxBlock: CheckboxBlock,
    CheckboxBlockTitle: CheckboxBlockTitle,
    ContentBlock: ContentBlock,
    ContentBlockRow: ContentBlockRow,
    ContainerLink: ContainerLink,
    ContainerPrice: ContainerPrice,
    ContainerHour: ContainerHour,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,
    FormInputPricePerHourBlock: FormInputPricePerHourBlock,
    FormInputPricePerHourText: FormInputPricePerHourText,

    AddInfoBlock: AddInfoBlock,
    AddInfoContainer: AddInfoContainer,
    AddInfoInput: AddInfoInput,

    SecurePaymentMessage: SecurePaymentMessage,
    SecurePaymentMessageText: SecurePaymentMessageText,
    SecurePaymentMessageReadMoreText: SecurePaymentMessageReadMoreText,

    OpacityBg: OpacityBg,
}
