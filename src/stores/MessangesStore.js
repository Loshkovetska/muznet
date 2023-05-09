import axios from 'axios'
import { observable, runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import domain from '@/res/domain'

const MessagesStore = observable({
  chats: [],
  messages: null,
})

export const searchChat = async () => {}

export const getUserById = async (id) => {
  const users = await axios
    .post(`${domain}getuserbyid`, {
      id: id,
    })
    .then((r) => r.data)
  return users
}

const duplicateRemove = (array) => {
  const uniq = Array.from(new Set(array.map((name) => name.author.id)))
  // .filter((c) => c)
  const res = []

  uniq.forEach((u) => {
    const sub = array.find((c) => c.author.id == u)
    res.push(sub)
  })

  return res
}

export const getChats = async (id) => {
  let msgs = await getMessages(id)
  if (!msgs.length) return []

  let chats = []
  msgs = msgs?.map((c) => {
    c.isNew = !(c.isNew == 0)

    return c
  })

  for (i = 0; i < msgs?.length; i++) {
    const msg = msgs[i]
    let author = {}
    if (msg.from != id) {
      const user = await getUserById(msg.from)
      author = {
        avatar: user.userAvatar?.length ? user.userAvatar[0] : '',
        id: msg.from,
        name: user.userName,
        surname: user.userSurName,
      }

      const dialogsFrom = msgs.filter((m) => m.from == msg.from)
      const dialogsTo = msgs.filter((m) => m.to == msg.from)

      const dialogs = [...dialogsFrom, ...dialogsTo]

      chats.push({
        author: author,
        messages: dialogs,
      })
    }

    if (msg.to != id) {
      const user = await getUserById(msg.to)
      author = {
        avatar: user.userAvatar?.length ? user.userAvatar[0] : '',
        id: msg.to,
        name: user.userName,
        surname: user.userSurName,
      }

      const dialogsFrom = msgs.filter((m) => m.from == msg.to)
      const dialogsTo = msgs.filter((m) => m.to == msg.to)

      const dialogs = [...dialogsFrom, ...dialogsTo]

      chats.push({
        author: author,
        messages: dialogs,
      })
    }
  }

  chats = duplicateRemove(chats)

  runInAction(() => {
    MessagesStore.chats = chats
  })

  return chats
}

export const getMessages = async (id) => {
  const res = await axios
    .post(`${domain}getchatsbyuser`, {
      id_user: id,
    })
    .then((res) => res.data)
    .catch((r) => console.log('msgs', r))

  return res
}

export const getChatMessages = async (user_id, chat_user) => {
  const chats = await getChats(user_id)
  const chat = chats.find((c) => c.author.id == chat_user)
  if (chat) {
    chat.messages = chat.messages?.map((m) => {
      m.isNew = false
      m.files = []

      return m
    })
    runInAction(() => {
      MessagesStore.messages = chat
    })
  }
}

export const sendMessage = async (data) => {
  axios
    .post(`${domain}addchatsmessage`, {
      ...data,
    })
    .catch((r) => console.log('send. ', r))
}

export const changeMessagesStatus = async (id) => {
  return axios
    .post(`${domain}updatechatsstatus`, {
      id: id,
    })
    .catch((r) => console.log('status,', r))
}

export const blocksUsers = async (from, to) => {
  const users = await axios
    .get(`${domain}blacks`)
    .then((r) => r.data)
    .catch((c) => console.log('catch', c))
  if (users) {
    const blockOurUser = users.find((c) => c.from == to && c.to == from)
    const blockInOurUser = users.find((c) => c.from == from && c.to == to)

    return {
      block_current: blockOurUser ? true : false,
      block_chatUser: blockInOurUser ? true : false,
    }
  }
  return {
    block_current: false,
    block_chatUser: false,
  }
}

export const blockUser = async (blocked_id, user_id) => {
  const req = await axios
    .post(`${domain}addblacks`, {
      from: user_id,
      to: blocked_id,
    })
    .then((r) => r.data)
    .catch((r) => console.log(r))

  return req.created_at ? true : false
}

export const searchMessages = async (val, user_id) => {
  const msgs = await axios
    .post(`${domain}getmessagesearch`, {
      search: val,
    })
    .then((r) => r.data)

  let chats = []
  for (i = 0; i < msgs?.length; i++) {
    const msg = msgs[i]
    let author = {}
    if (msg.from != user_id) {
      const user = await getUserById(msg.from)
      author = {
        avatar: user.userAvatar?.length ? user.userAvatar[0] : '',
        id: msg.from,
        name: user.userName,
        surname: user.userSurName,
      }
    }

    if (msg.to != user_id) {
      const user = await getUserById(msg.to)
      author = {
        avatar: user.userAvatar?.length ? user.userAvatar[0] : '',
        id: msg.to,
        name: user.userName,
        surname: user.userSurName,
      }
    }

    const dialogsFrom = msgs.filter((m) => m.from == user_id)
    const dialogsTo = msgs.filter((m) => m.to == user_id)

    const dialogs = [...dialogsFrom, ...dialogsTo]

    chats.push({
      author: author,
      messages: dialogs,
    })
  }

  chats = duplicateRemove(chats)

  runInAction(() => {
    MessagesStore.chats = chats
  })
}
export default MessagesStore
