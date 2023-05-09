import styled from 'styled-components/native'
import F from '@/res/fonts'
const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  padding-top: 55px;
`
const ContainerTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 16px;
  border-width: 1px;
  border-color: rgba(92, 101, 116, 0.2);
  border-top-width: 0px;
`

const Title = styled.Text`
  font-family: ${F.bold};
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #333333;
`
const FuncItem = styled.TouchableOpacity``

const FuncItemText = styled.Text`
font-family: ${F.bold}
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #141517;`

const ScrollBlock = styled.ScrollView`
  width: 100%;
  // height: 100%;
  padding: 16px;
  padding-bottom: 0;
`

const Bottom = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: rgba(92, 101, 116, 0.2);
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  padding: 16px;
  position: absolute;
  bottom: 0;
  background: #fff;
  padding-bottom: 40px;
`

const Button = styled.TouchableOpacity`
  background: #0c0c0e;
  border-radius: 8px;
  padding: 18px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled.Text`
  font-family: ${F.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.333333px;
  text-transform: capitalize;

  /* 4 */

  color: #fefefe;
`

const InfoBlock = styled.View`
  display: flex;
  flex-direction: row;
  padding: 8px 16px 8px 8px;
  background: #f2f3f9;
  border-radius: 8px;
  margin: 16px 0 24px;
`

const InfoBlockText = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  /* or 124% */

  color: #000000;
  flex: 1;
  flex-wrap: wrap;
`

const InfoItem = styled.View`
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InfoItemText = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  /* or 124% */
  flex: 1;
  flex-wrap: wrap;
  color: #000000;
`

const styles = {
  Container,
  ContainerTop,
  Title,
  FuncItem,
  ScrollBlock,
  Bottom,
  Button,
  ButtonText,
  InfoBlock,
  InfoBlockText,
  InfoItem,
  InfoItemText,
  FuncItemText,
}

export default styles
