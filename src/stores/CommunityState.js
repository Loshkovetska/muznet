import { observable } from "mobx"
const ModalState = observable({
  isopen: false,
  idpost: null,
  ref1: null,
  ref2: null,
  delopen: false,
  isopen2:false
})

export default ModalState
