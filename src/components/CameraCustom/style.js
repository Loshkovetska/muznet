import styled from "styled-components/native";
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const CameraContainer = styled.View`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #141517;
position: absolute;
top: -50px;
left: 0px;
bottom: 0px;
right: 0px;
z-index: 2100;
`;
const CameraButtons = styled.View`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
margin-top: 50px;
width: 100%;
padding: 0px 26px;
`;
const CloseButton = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 48px;
height: 48px;
border-radius: 24px;
background-color: ${C.opacity20white};
position: absolute;
bottom: 26px;
right: 26px;
`;
const SecondaryButton = styled.TouchableOpacity`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 48px;
height: 48px;
border-radius: 24px;
background-color: ${C.opacity20white};
`;
const TakePictureButton = styled.TouchableHighlight`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
width: 60px;
height: 60px;
border-radius: 30px;
border-color: ${C.white};
border-width: 2px;
`;
const TakePictureButtonRound = styled.View`
width: 50px;
height: 50px;
border-radius: 30px;
background-color: ${C.white};
`;
const SendPhoto = styled(M.BlackBtn)`
background-color: ${C.white};
`;
const SendPhotoText = styled(M.MediumText17)`

`;


export const style = {
    CameraContainer: CameraContainer,
    CameraButtons: CameraButtons,
    CloseButton: CloseButton,
    SecondaryButton: SecondaryButton,
    TakePictureButton: TakePictureButton,
    TakePictureButtonRound: TakePictureButtonRound,
    SendPhoto: SendPhoto,
    SendPhotoText: SendPhotoText,
}
