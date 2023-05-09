import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.View`
  width: 100%;
  background-color: ${C.white};
  overflow: hidden;
`
const AdsListContainer = styled.ScrollView`
  width: 100%;
  padding-top: 68px;
`
const SwitchBlock = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 8px;
  padding: 0px 16px;
`
const SwitchBlockBtn = styled.TouchableOpacity`
  width: 50%;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-bottom-color: ${(props) =>
    props.isActive === true ? C.black : C.lightGray};
  border-bottom-width: 2px;
`
const SwitchBlockBtnText = styled(M.PlainText17)`
  font-family: ${(props) => (props.isActive === true ? F.bold : F.regular)};
`
const FaqSubTitle = styled(M.TitleBold15)`
  margin-top: 24px;
  margin-bottom: 9px;
`
const PopularArticleBlock = styled.View`
  padding: 0px 16px;
`
const AccountLink = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 17px 0px;
  border-bottom-color: ${C.lightGray};
  border-bottom-width: 1px;
`
const AccountLinkText = styled(M.PlainText17)`
  padding-right: 50px;
  width: 80%;
`
const AccountLinkIcon = styled.View`
  transform: rotate(180deg);
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const AccountLinkTopicsIcon = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`
export const style = {
  // Search input
  FilterContainer: FilterContainer,
  AdsListContainer: AdsListContainer,
  SwitchBlock: SwitchBlock,
  SwitchBlockBtn: SwitchBlockBtn,
  SwitchBlockBtnText: SwitchBlockBtnText,
  FaqSubTitle: FaqSubTitle,
  PopularArticleBlock: PopularArticleBlock,
  AccountLink: AccountLink,
  AccountLinkText: AccountLinkText,
  AccountLinkIcon: AccountLinkIcon,
  AccountLinkTopicsIcon: AccountLinkTopicsIcon,
}
