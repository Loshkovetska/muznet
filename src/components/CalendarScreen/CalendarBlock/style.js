import styled from "styled-components/native"
import F from "@/res/fonts"
import C from "@/res/colors"
import { M } from "@/res/mixin"

const Container = styled.View`
  border-radius: 6px;
  background-color: ${C.white};
`
const OptionText = styled(M.Title20)`
  padding-bottom: 8px;
  position: relative;
  //   left: 16px;
  //   top: 11px;
  z-index: 1000;
`

export const style = {
  Container: Container,
  OptionText: OptionText,
}
