import React from "react"
import { useState, useEffect } from "react"

// Images
import IMAGES from "@/res/images"
const { GoBackIcon, CheckRoundBlackIcon } = IMAGES
// Styles
import { style } from "./style"
import C from "@/res/colors"
import { S } from "@/res/strings"

const {
  DropBlock,
  Drop,
  DropHeader,
  ArrowBlock,
  DropContainer,
  OptionsList,
  Option,
  OptionText,
  OptionActiveIcon,
} = style
import { M } from "@/res/mixin"
const { FormInputLabel, ErrorMessage, ShowPasswordIconButton } = M
const DropSelect = ({
  isResetAll,
  selectedValue,
  toggling,
  isOpen,
  onSelect,
  dropHeader,
  dropOptions,
  isRequiredShowError,
}) => {
  const [mainHeader, setMainHeader] = useState()

  useEffect(() => {
    setMainHeader(selectedValue || dropHeader)
  }, [selectedValue, dropHeader])

  // If resetAll
  useEffect(() => {
    if (isResetAll === true) {
      setMainHeader(dropHeader)
    }
  }, [isResetAll])

  const isShowError = isRequiredShowError === true

  const openDropStyle = isOpen
    ? {
        shadowColor: "rgba(23, 24, 25, 1)",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      }
    : {}
  return (
    <DropBlock
      style={{
        marginBottom: isShowError ? 45 : 24,
        zIndex: isOpen ? 1111 : 1,
        ...openDropStyle,
      }}
      onPress={() => toggling(false)}
    >
      <Drop>
        <DropHeader
          style={{
            borderColor: isShowError ? C.red : C.lightGray,
            borderWidth: isShowError ? 2 : 1,
            borderBottomWidth: isOpen === true ? 0 : isShowError ? 2 : 1,
            borderBottomLeftRadius: isOpen === true ? 0 : 6,
            borderBottomRightRadius: isOpen === true ? 0 : 6,
            elevation: isOpen === true ? 5 : 0,
          }}
          onPress={() => toggling(!isOpen)}
        >
          <OptionText
            style={{
              color: dropHeader === selectedValue ? C.sBlack : C.black,
            }}
            isHeader={true}
          >
            {mainHeader}
          </OptionText>
          <ArrowBlock isOpen={isOpen}>
            <GoBackIcon width={10} height={15} />
          </ArrowBlock>
        </DropHeader>

        {isShowError && <ErrorMessage>{S.inputRequired}</ErrorMessage>}
      </Drop>
      {isOpen && (
        <DropContainer
          nestedScrollEnabled={true}
          style={{
            zIndex: 1111,
            borderTopLeftRadius: isOpen === true ? 0 : 6,
            borderTopRightRadius: isOpen === true ? 0 : 6,
            elevation: 6,
            position: "absolute",
          }}
        >
          <OptionsList>
            {dropOptions.map((option, id) => {
              const isActive = option === selectedValue
              return (
                <Option isActive={isActive} onPress={onSelect(option)} key={id}>
                  <OptionText>{option}</OptionText>
                  {isActive === true && (
                    <OptionActiveIcon>
                      <CheckRoundBlackIcon width={20} height={20} />
                    </OptionActiveIcon>
                  )}
                </Option>
              )
            })}
          </OptionsList>
        </DropContainer>
      )}
    </DropBlock>
  )
}

export default DropSelect
