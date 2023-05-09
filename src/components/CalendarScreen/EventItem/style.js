import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const DealBlock = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  border-color: ${C.lightGray};
  border-width: 1px;
  border-radius: 12px;
  padding: 18px;
  padding-top: 58px;
  background-color: #ffffff;
`
const DealBlockItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

const HeaderImageBlock = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 44px;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
`

export const style = {
  DealBlock: DealBlock,
  DealBlockItem: DealBlockItem,
  HeaderImageBlock: HeaderImageBlock,
  HeaderImage: HeaderImage,
}
