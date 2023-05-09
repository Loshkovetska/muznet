import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
width: 100%;
background-color: ${C.white};
padding-top: 68px;
overflow: hidden;
`;
const Header = styled.View`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
margin-bottom: 45px;
`;
const HeaderClose = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 32px;
height: 32px;
position: absolute;
top: 0px;
left: 8px;
bottom: 0px;
`;
const HeaderTitle = styled(M.Title24)`
line-height: 30px;
margin-bottom: 16px;
`;
const FilterBlock = styled.ScrollView`

`;
const OfferDetailsTitle = styled(M.MediumText17)`
margin-bottom:24px;
color: ${C.cyanGray};
`;
const OfferPayment = styled.View`
margin: 0px 16px;
`;
const FormText = styled(M.MediumText20)`
margin-top: 44px;
margin-bottom: 16px;

`;
const FormBlock = styled.View`

`;
const FormInputBlock = styled(M.FormInputBlock)`

`;
const FormInputContainer = styled.View`

`;
const FormInput = styled.TextInput`
font-size: 17px;
padding: 8px 16px;
background-color: ${C.white};
font-family: ${F.regular};
color: ${C.black};
border-width: 1px;
border-style: solid;
border-radius: 6px;
`;
const FooterButton = styled.View`
position: absolute;
left: 16px;
right: 0px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`;
const ButtonSubmit = styled(M.BlackBtn)`
width: 100%;
`;
const ButtonSubmitText = styled(M.BlackBtnText)`

`;
const ErrorMessage = styled.Text`
color: ${C.red};
font-family: ${F.regular};
font-size: 13.5px;
position:absolute;
bottom: -25px ;
left:0px;
`;

export const style = {
    FilterContainer: FilterContainer,
    Header: Header,
    HeaderClose: HeaderClose,
    HeaderTitle: HeaderTitle,
    FilterBlock: FilterBlock,
    OfferDetailsTitle: OfferDetailsTitle,
    OfferPayment: OfferPayment,
    FormBlock: FormBlock,
    FormText: FormText,
    FormInputBlock: FormInputBlock,
    FormInputContainer: FormInputContainer,
    FormInput: FormInput,
    ButtonSubmit: ButtonSubmit,
    ButtonSubmitText: ButtonSubmitText,
    FooterButton: ErrorMessage,
    ErrorMessage: FooterButton,
}
