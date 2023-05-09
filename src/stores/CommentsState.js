import axios from 'axios'
import { observable, runInAction } from 'mobx'
import domain from '@/res/domain'
import { getPostComments, getPosts } from './PostModel'

const CommentsState = observable({
  post: null,
  replay: null,
  list: [],
})

export default CommentsState

export const sendComment = async (obj) => {
  try {
    await axios
      .post(`${domain}addcommentscard`, {
        ...obj,
      })
      .then((r) => {
        if (r.data) {
          getPostComments(obj.idpost).then((r) => {
            runInAction(() => {
              CommentsState.list = r
            })
          })
        }
      })
      .catch((c) => console.log('add0ckm', c))
  } catch (e) {
    console.log(e)
  }
}

export const sednReplay = async (obj, idpost) => {
  try {
    await axios
      .post(`${domain}addreplacescard`, {
        ...obj,
      })
      .then((r) => {
        if (r.data) {
          getPostComments(idpost).then((r) => {
            runInAction(() => {
              CommentsState.list = r
            })
          })
        }
      })
      .catch((c) => console.log('add0ckm', c))
  } catch (e) {
    console.log(e)
  }
}

export const updateLike = async (obj) => {
  try {
    return await axios
      .post(`${domain}updateactivecardlikes`, {
        ...obj,
      })
      .then((r) => r.data)
      .catch((c) => console.log('addlike', c))
  } catch (e) {
    console.log(e)
  }
}
