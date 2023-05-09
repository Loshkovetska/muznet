import { StatusBar } from 'expo-status-bar'
import C from '@/res/colors'
import Constants from 'expo-constants'
import { ContentDoc } from '../../components/AccountIntroScreen/TermsOfServiceTab/TermsOfServiceTab'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import IMAGES from '@/res/images'
const { GoBackIcon } = IMAGES
// Styles
import { style } from '../../components/AccountIntroScreen/AccountsTabHeader/style'
import { View } from 'react-native'
const { Header, HeaderClose, HeaderTitle, HeaderSpace } = style
const FilterContainerBlock = styled.View`
  width: 100%;
  overflow: hidden;
`
const FilterContainer = styled.ScrollView`
  width: 100%;
  background-color: ${C.white};
  // padding-top: 68px;
  padding-bottom: 200px;

  display: flex;
  flex-direction: column;
`
const TermsScreen = () => {
  const navigate = useNavigation()
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <FilterContainerBlock
        style={{
          height: '100%',
          width: '100%',
          paddingBottom: 40,
          paddingTop: Constants.statusBarHeight + 16,
          backgroundColor: '#fff',
        }}
      >
        <Header>
          <HeaderClose
            onPress={() => {
              navigate.goBack()
            }}
          >
            <GoBackIcon width={12} height={21} />
          </HeaderClose>

          <HeaderTitle>Terms of Services</HeaderTitle>
          <HeaderSpace />
        </Header>
        <FilterContainer showsVerticalScrollIndicator={false}>
          <ContentDoc title="Terms of Services" />
          <View
            style={{
              paddingBottom: 200,
            }}
          ></View>
        </FilterContainer>
      </FilterContainerBlock>
    </>
  )
}

export default TermsScreen
