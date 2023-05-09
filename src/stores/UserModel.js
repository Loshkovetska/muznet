import { observable, runInAction } from 'mobx'
import images from '@/pages/Community/images'
import axios from 'axios'
import domain from '@/res/domain'

const { imgPost, imgPost2 } = images

const UserModel = observable({
  user: {
    id: 0,
  },
})

export default UserModel

export const UserType = observable({
  type: '',
})

export const deletePost = async (idpost) => {
  //delete
  const fd = new FormData()
  fd.append('status', 'del-post')
  fd.append('idpost', idpost)
  fd.append('iduser', UserModel.user.id)

  // const request = await fetch("", {
  //   method: "POST",
  //   body: fd,
  // })

  // const response = await request.json()

  // runInAction(() => {
  //   UserModel.user.posts = response
  // })
}
