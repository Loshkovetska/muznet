import styled from 'styled-components/native'
import F from '@/res/fonts'

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
`

const Step = styled.View`
  background: #e1e2e4;
  border-radius: 40px;
  border: 4px solid #eeeeee;
  margin: 0 16px;
  padding: 7px 24px;
`

const Steps = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`

const StepsLine = styled.View`
  flex: 1;
  height: 1px;
  background: rgba(92, 101, 116, 0.2);
`

const StepText = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #141517;
`

const Block = styled.View`
  padding: 0 16px 24px;
`

const Input = styled.TextInput`
  width: 100%;
  background: #fefefe;
  border: 1px solid rgba(185, 185, 186, 0.2);
  border-radius: 8px;
  padding: 14px 16px;
  font-family: ${F.regular};

  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.333333px;

  /* 2 */

  color: #141517;
`

const TextBlock = styled.Text`
  width: 100%;
  padding: 10px 16px;
  background: #f2f3f9;
  font-family: ${F.regular};
  font-weight: 400;
  font-size: 17px;
  line-height: 24px;
  /* or 141% */

  /* 1 */

  color: #141517;
  margin-bottom: 16px;
`

const SearchBlock = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid rgba(185, 185, 186, 0.2);
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  justify-content: space-between;
  margin-bottom: 24px;
`

const SearchInput = styled.TextInput`
  border: none;
  background: transparent;
  font-family: ${F.regular};
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.333333px;
  color: #141517;
  min-width: 50px;
  margin-right: 8px;
`

const TagsList = styled.ScrollView`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const Tag = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 8px;
  background: #ffffff;
  border: 1px solid rgba(185, 185, 186, 0.3);
  border-radius: 6px;
  margin-right: 5px;
  flex: 1;
`
const TagText = styled.Text`
  margin-right: 4px;
  font-family: ${F.regular};
  flex: 1;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.333333px;

  /* 2 */

  color: #636364;
`

const ClearText = styled.Text`
  font-family: ${F.bold};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #141517;
  margin-left: 6px;
`

const LocationBlock = styled.TouchableOpacity`
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`
const ToggleRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ToggleText = styled.Text`
  font-family: ${F.regular};
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.333333px;
  flex: 1;

  /* 1 */

  color: #141517;
`

const Space = styled.View`
  padding-bottom: 300px;
`

const styles = {
  Container,
  Steps,
  StepsLine,
  Step,
  StepText,
  Block,
  Input,
  TextBlock,
  SearchBlock,
  SearchInput,
  TagsList,
  Tag,
  TagText,
  ClearText,
  LocationBlock,
  ToggleRow,
  ToggleText,
  Space,
}

export default styles
