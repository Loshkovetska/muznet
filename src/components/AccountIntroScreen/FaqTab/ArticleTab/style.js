import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const FilterContainer = styled.ScrollView`
  width: 100%;
  background-color: ${C.white};
  padding-top: 68px;
`
const Header = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-bottom: 31px;
`
const HeaderClose = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 32px;
  height: 32px;
  padding-left: 16px;
`
const HeaderTitle = styled(M.Title24)`
  line-height: 30px;
  padding-bottom: 24px;
`
const ArticleContainer = styled.View`
  padding: 0px 16px;
`
const ArticleParagraph = styled.View`
  padding-bottom: 16px;
`
const ArticleText = styled(M.PlainText17)`
  line-height: 24px;
`
const ArticleLiText = styled(M.PlainText17)`
  line-height: 24px;
  padding-bottom: 8px;
  padding-left: 16px;
  width: 80%;
`
const BoldText = styled(M.TitleBold17)`
  line-height: 24px;
`
const ArticleSubTitle = styled(M.TitleBold15)`
  line-height: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
`
const WarningBlock = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  padding: 18px;
  background-color: #fef9ef;
  border-radius: 6px;
`
const WarningBlockText = styled(M.PlainText17)`
  margin-left: 10px;
  margin-right: 25px;
  color: ${C.sBlack};
`

const PopularArticleBlock = styled.View`
  margin-top: 40px;
  padding-top: 32px;
  border-top-color: ${C.lightGray};
  border-top-width: 1px;
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
export const style = {
  FilterContainer: FilterContainer,
  Header: Header,
  HeaderClose: HeaderClose,
  HeaderTitle: HeaderTitle,
  ArticleContainer: ArticleContainer,
  ArticleParagraph: ArticleParagraph,
  ArticleText: ArticleText,
  ArticleLiText: ArticleLiText,
  ArticleSubTitle: ArticleSubTitle,
  BoldText: BoldText,
  WarningBlock: WarningBlock,
  WarningBlockText: WarningBlockText,
  PopularArticleBlock: PopularArticleBlock,
  AccountLink: AccountLink,
  AccountLinkText: AccountLinkText,
  AccountLinkIcon: AccountLinkIcon,
}
