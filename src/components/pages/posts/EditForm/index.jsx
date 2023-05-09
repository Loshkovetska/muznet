import images from '@/pages/Community/images'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './style'
import SwitchToggle from 'react-native-switch-toggle'
import { observable, runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { LocationPop } from '../AddLocation'

export const EditInfoData = observable({
  dt: {
    title: '',
    description: '',
    tagsStr: '',
    tags: [],
    location: '',
    commentsOff: false,
    shareOff: false,
  },
})

const {
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
} = styles

const { Search, CloseIcon, LocateIcon, ArrowRight } = images
const EditForm = () => {
  const [state, setState] = useState({
    title: '',
    description: '',
    tagsStr: '',
    tags: [],
    location: '',
    commentsOff: false,
    shareOff: false,
  })

  useEffect(() => {
    setState({
      ...state,
      ...EditInfoData.dt,
    })
  }, [EditInfoData.dt])

  return (
    <Container
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Steps>
        <StepsLine />
        <Step>
          <StepText>Step 1</StepText>
        </Step>
        <StepsLine />
      </Steps>
      <Block>
        <Input
          value={state.title}
          placeholder="Write a title here"
          style={{ marginBottom: 12 }}
          placeholderTextColor="#5C6574"
          onChangeText={(event) => {
            setState({
              ...state,
              title: event,
            })
            runInAction(() => {
              EditInfoData.dt.title = event
            })
          }}
        />
        <Input
          multiline
          value={state.description}
          placeholder="Write a description here (optional)"
          placeholderTextColor="#5C6574"
          style={{
            maxHeight: 200,
          }}
          onChangeText={(event) => {
            setState({
              ...state,
              description: event,
            })

            runInAction(() => {
              EditInfoData.dt.description = event
            })
          }}
        />
      </Block>
      <Steps>
        <StepsLine />
        <Step>
          <StepText>Step 2</StepText>
        </Step>
        <StepsLine />
      </Steps>
      <TextBlock>
        Add tags here. It will help users to find your posts easier. For
        example: Hip-hop, Rap, Music, Guitar, Jazz, etc.
      </TextBlock>

      <SearchBlock>
        <Search
          style={{
            marginRight: 6,
            width: 20,
            height: 20,
          }}
        />
        <SearchInput
          style={{
            flex: state.tags?.length > 0 ? 0 : 1,
          }}
          value={state.tagsStr}
          placeholder={state.tags.length ? '' : 'Add tags'}
          placeholderTextColor="#5C6574"
          onChangeText={(event) => {
            const st = state
            st.tagsStr = event
            if (event.includes(' ')) {
              st.tags.push(st.tagsStr.trim())

              runInAction(() => {
                EditInfoData.dt.tags = st.tags
              })
              st.tagsStr = ''
            }
            setState({
              ...state,
              ...st,
            })
          }}
        />
        {state.tags.length ? (
          <TagsList
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {state.tags.map((ti, i) => (
              <Tag key={i}>
                <TagText>{ti}</TagText>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setState({
                      ...state,
                      tags: state.tags.filter((t, id) => id != i),
                    })

                    runInAction(() => {
                      EditInfoData.dt.tags = state.tags?.filter(
                        (t, id) => id != i,
                      )
                    })
                  }}
                >
                  <CloseIcon style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
              </Tag>
            ))}
          </TagsList>
        ) : (
          <></>
        )}
        {state.tags.length ? (
          <ClearText
            onPress={() => {
              setState({ ...state, tagsStr: '', tags: [] })
              runInAction(() => {
                EditInfoData.dt.tags = []
              })
            }}
          >
            Clear
          </ClearText>
        ) : (
          <></>
        )}
      </SearchBlock>
      <Steps>
        <StepsLine />
        <Step>
          <StepText>Step 3</StepText>
        </Step>
        <StepsLine />
      </Steps>
      <LocationBlock
        activeOpacity={1}
        onPress={() => {
          runInAction(() => {
            LocationPop.isshow = true
          })
        }}
      >
        <LocateIcon
          style={{
            marginRight: 6,
          }}
        />
        <SearchInput
          style={{
            flex: 1,
          }}
          editable={false}
          value={EditInfoData.dt.location?.place}
          placeholderTextColor="#5C6574"
          placeholder="Add Location"
        />
        <ArrowRight
          style={{
            marginLeft: 6,
          }}
        />
      </LocationBlock>
      <Steps>
        <StepsLine />
        <Step>
          <StepText>Step 4</StepText>
        </Step>
        <StepsLine />
      </Steps>

      <Block>
        <ToggleRow>
          <ToggleText>Turn off commenting</ToggleText>
          <SwitchToggle
            switchOn={state.commentsOff}
            circleColorOff={'white'}
            backgroundColorOff={'#E9E9EA'}
            containerStyle={{
              width: 51,
              height: 31,
              borderRadius: 26,
              padding: 2,
            }}
            circleStyle={{
              width: 27,
              height: 27,
              borderRadius: 20,
            }}
            onPress={() => {
              setState({
                ...state,
                commentsOff: !state.commentsOff,
              })
              runInAction(() => {
                EditInfoData.dt.commentsOff = !state.commentsOff
              })
            }}
          />
        </ToggleRow>
        <ToggleRow
          style={{
            marginTop: 16,
          }}
        >
          <ToggleText>Turn off Sharing</ToggleText>
          <SwitchToggle
            switchOn={state.shareOff}
            circleColorOff={'white'}
            backgroundColorOff={'#E9E9EA'}
            containerStyle={{
              width: 51,
              height: 31,
              borderRadius: 26,
              padding: 2,
            }}
            circleStyle={{
              width: 27,
              height: 27,
              borderRadius: 20,
            }}
            onPress={() => {
              setState({
                ...state,
                shareOff: !state.shareOff,
              })
              runInAction(() => {
                EditInfoData.dt.shareOff = !state.shareOff
              })
            }}
          />
        </ToggleRow>
      </Block>
      <Space
      />
    </Container>
  )
}

export default observer(EditForm)
