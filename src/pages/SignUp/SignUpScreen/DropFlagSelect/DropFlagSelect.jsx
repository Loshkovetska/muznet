import React, { useEffect, useState } from 'react'

// Images
import IMAGES from '@/res/images'
import C from '@/res/colors'
const {
  GoBackIcon,
  UsaIcon,
  JamaicaIcon,
  GermanyIcon,
  UnitedKingdomIcon,
  CanadaIcon,
  FranceIcon,
} = IMAGES
// Styles
import { style } from './style'
import axios from 'axios'
import { Image } from 'react-native'
import { Text } from 'react-native'
const {
  DropBlock,
  Drop,
  DropHeader,
  ArrowBlock,
  DropContainer,
  OptionsList,
  BorderRight,
  Option,
  OptionText,
} = style

// const PositionOptions = [
//     {
//         uri: <UsaIcon width={24} height={16} />,
//         phonePattern: [
//             ["+", "1", " ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
//         ],
//     },
//     {
//         uri: <JamaicaIcon width={24} height={16} />,
//         phonePattern: [
//             ["+", "1", " ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
//         ],
//     },
//     {
//         uri: <GermanyIcon width={24} height={16} />,
//         phonePattern: [
//             ["+", "4", "9", " ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]
//         ],
//     },
//     {
//         uri: <UnitedKingdomIcon width={24} height={16} />,
//         phonePattern: [
//             ["+", "4", "4", " ", "(", /\d/, /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
//         ],
//     },
//     {
//         uri: <CanadaIcon width={24} height={16} />,
//         phonePattern: [
//             ["+", "1", " ", "(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
//         ],
//     },
//     {
//         uri: <FranceIcon width={24} height={16} />,
//         phonePattern: [
//             ["+", "3", "3", " ", /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/]
//         ],
//     },
// ]

const DropFlagSelect = ({
  selectedValue,
  toggling,
  isOpen,
  onSelect,
  inputFocus1,
  isError,
}) => {
  const [countries, setCountries] = useState([])
  const [defaultValue, setValue] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((r) => r.data)
      .then((r) => {
        const cs = []

        r?.forEach((c) => {
          if (c.name.common == 'United States') {
            setValue(c.flags.png)
          }
          cs.push({
            uri: c.flags.png,
            phonePattern: [
              [
                '+',
                c.idd.root?.replaceAll('+',''),
                ' ',
                '(',
                /\d/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /\d/,
                /\d/,
                /\d/,
                '-',
                /\d/,
                /\d/,
                /\d/,
                    /\d/,
                 /\d?/,
                /\d?/,
              ],
            ],
          })
        })

        setCountries(cs)
      })
      .catch((c) => console.log('error', c))
  }, [])

  const mainHeader = selectedValue.icon || defaultValue

  return (
    <DropBlock onPress={() => toggling(false)}>
      <Drop>
        <DropHeader
          style={{
            borderColor: isError ? C.red : inputFocus1,
            borderWidth: isError ? 2 : 1,
            borderBottomLeftRadius: isOpen === true ? 0 : 6,
          }}
          onPress={() => toggling(!isOpen)}
        >
          <OptionText isHeader={true}>
            <Image
              style={{ width: 24, height: 14 }}
              source={{
                uri: mainHeader,
              }}
              objectFit="cover"
            />
          </OptionText>

          <ArrowBlock isOpen={isOpen}>
            <GoBackIcon width={7} height={14} />
          </ArrowBlock>
          <BorderRight></BorderRight>
        </DropHeader>
      </Drop>
      {isOpen && (
        <DropContainer
          style={{
            zIndex: 999,
            borderTopLeftRadius: isOpen === true ? 0 : 6,
            borderTopRightRadius: isOpen === true ? 0 : 6,
          }}
        >
          <OptionsList>
            {countries?.map((option, id) => {
              return (
                <Option
                  onPress={onSelect({
                    icon: option.uri,
                    phonePattern: option.phonePattern,
                  })}
                  key={id}
                >
                  <OptionText>
                    <Image
                      style={{ width: 24, height: 14 }}
                      source={{
                        uri: option.uri,
                      }}
                      objectFit="cover"
                    />
                  </OptionText>
                </Option>
              )
            })}
          </OptionsList>
        </DropContainer>
      )}
    </DropBlock>
  )
}

export default DropFlagSelect
