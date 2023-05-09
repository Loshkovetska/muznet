import { observable, runInAction } from 'mobx'
import axios from 'axios'
import domain from '@/res/domain'
import { Platform } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

const PostModel = observable({
  posts: null,
})

export default PostModel

export const getLikes = async () => {
  return await axios
    .get(`${domain}likes`)
    .then((res) => res.data)
    .catch((c) => console.log(c))
}

export const getPostComments = async (id_post) => {
  const posts = await getPosts()
  const coms =
    JSON.parse(JSON.stringify(posts)).find((c) => c.id == id_post)?.comments ||
    []
  return coms
}

const getAllPosts = async () => {
  return await axios
    .get(`${domain}posts`)
    .then((res) => res.data)
    .catch((c) => console.log(c))
}

export const getPosts = async () => {
  const posts = await getAllPosts()

  const res = posts.map((c) => {
    const com = c.comments.map((co) => {
      const relays = co.replays.map((re) => {
        return {
          ...re,
          author: {
            ...re.author,
            src: re.author.src[0],
          },
        }
      })
      return {
        ...co,
        author: {
          ...co.author,
          src: co.author.src[0],
        },
        replays: relays,
      }
    })
    return {
      ...c,
      author: {
        ...c.author,
        src: c.author.src[0],
      },
      comments: com,
      tags: c.tags.map((t) => t.name),
    }
  })

  runInAction(() => {
    PostModel.posts = res
  })

  return res
}

export const getMyPosts = async (id_client) => {
  const posts = await getPosts()
  return posts.filter((p) => p.idClient == id_client)
}

export const getLikedPosts = async (id_client) => {
  const posts = await getPosts()

  if (!posts?.length) return []

  const likes = await getLikes()
  const userLikes = likes?.filter((l) => l.idclient == id_client && l.id_post)
  const result = []

  userLikes?.forEach((u) => {
    const post = posts?.find(
      (p) => p.id == u.id_post, // && p.idClient != id_client
    )
    if (post) {
      result.push(post)
    }
  })

  return result
}

export const addPost = async (data, files) => {
  const fd = new FormData()

  for (let i = 0; i < files.length; i++) {
    const f = files[i]
    let uri = ''
    let file = null
    if (f?.id) {
      const info = await MediaLibrary.getAssetInfoAsync(f.id)
      uri = Platform.OS === 'ios' ? info.localUri.replace('file://', '') : f.uri
      file = {
        name: f.filename ? f.filename : 'photo1.jpg', //f.filename,
        type:
          f.uri.includes('.jpg') ||
          f.uri.includes('.png') ||
          f.uri.toLowerCase().includes('.jpeg')
            ? 'photo'
            : 'video', //f.type
        uri: uri,
      }
      fd.append('file' + (i + 1), file)
    } else {
      uri = Platform.OS === 'ios' ? f.uri.replace('file://', '') : f.uri
      file = {
        name: f.filename ? f.filename : 'photo1.jpg', //f.filename,
        type:
          f.uri.includes('.jpg') ||
          f.uri.includes('.png') ||
          f.uri.toLowerCase().includes('.jpeg')
            ? 'photo'
            : 'video', //f.type
        uri: uri,
      }
      fd.append('file' + (i + 1), file)
    }
  }
  Object.keys(data).forEach((c) => {
    fd.append(c, data[c])
  })

  return await axios
    .post(`${domain}addpostscard`, fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((r) => r.data)
    .catch((e) => console.log('eerr', e))
}

export const editPost = async (data) => {
  axios
    .post(`${domain}updatepostscard`, {
      ...data,
    })
    .then((r) => console.log('r', r.data))
    .catch((e) => console.log('eerr', e))
}

export const deletePost = async (id) => {
  axios
    .post(`${domain}deletepostscard`, {
      id: id,
    })
    .then((r) => {
      if (r.data) {
        getPosts()
      }
    })
    .catch((e) => console.log('eerr', e))
}

export const reportPost = async (id, msg) => {}

export const hidePost = async (id_post, id_user) => {
  // axios
  //   .post(`${domain}updatepostscommentscard`, {
  //     id: id_post,
  //   })
  //   .then((r) => {
  //     if (r.data) {
  //     }
  //   })
  //   .catch((e) => console.log('eerr', e))
}

export const toggleComments = async (id_post) => {
  axios
    .post(`${domain}updatepostscommentscard`, {
      id: id_post,
    })
    .then((r) => {
      if (r.data) {
      }
    })
    .catch((e) => console.log('eerr', e))
}

// const postTags = async (id_post) => {
//   let tags = await axios
//     .get(`${domain}tags`)
//     .then((res) => res.data)
//     .catch((c) => console.log(c))

//   return tags.filter((c) => c.idpost == id_post)
// }

// const getCommentReplays = async (id_comment) => {
//   let replays = await axios
//     .get(`${domain}replaces`)
//     .then((res) => res.data)
//     .catch((c) => console.log(c))
//   let rs = replays?.filter((c) => c.idcomments == id_comment)
//   const res = []
//   for (let i = 0; i < rs.length; i++) {
//     let ch = rs[i]
//     const user = await getUserById(rs[i].idclient)
//     const likes = await getReplayLikes(rs[i].id)

//     res.push({
//       id: ch.id,
//       author: {
//         id: user.id,
//         src: user.userAvatar[0],
//         name: user.userName,
//         username: user.userNickName,
//       },
//       datetime: ch.created_at,
//       likes: likes,
//       text: ch.text,
//     })
//   }
//   return res
// }

// const postLocation = async (id) => {
//   let locations = await axios
//     .get(`${domain}locations`)
//     .then((res) => res.data)
//     .catch((c) => console.log(c))

//   return locations.find((c) => c.id == id)
// }

// const getPostLikes = async (idpost) => {
//   const likes = await getLikes()
//   return likes.filter((l) => l.id_post == idpost) || []
// }
// const getCommentLikes = async (idcomment) => {
//   const likes = await getLikes()

//   return likes.filter((l) => l.id_comment == idcomment) || []
// }
// const getReplayLikes = async (idreplay) => {
//   const likes = await getLikes()
//   return likes.filter((l) => l.id_replay == idreplay) || []
// }

// const postComments = async (id_post) => {
//   let comments = await axios
//     .get(`${domain}comments`)
//     .then((res) => res.data)
//     .catch((c) => console.log(c))
//   return comments.filter((c) => c.idpost == id_post)
// }

//ALL POSTS
// for (let i = 0; i < posts?.length; i++) {
//   const p = posts[i]
//   const userC = await getUserById(p.idClient)
//   let tags = await postTags(p.id)

//   let loc = await postLocation(p.location)
//   let coms = await getPostComments(p.id)
//   let likes = await getPostLikes(p.id)

//   res.push({
//     id: p.id,
//     idClient: p.idClient,
//     author: {
//       id: userC.id,
//       src: userC.userAvatar[0],
//       name: userC.userName,
//       username: userC.userNickName,
//     },
//     location: loc,
//     likes: likes,
//     datetime: p.created_at,
//     tags: tags.map((c) => c.name),
//     comments: coms,
//     commentsOff: p.commentsOff == 1,
//     shareOff: p.shareOff == 1,
//     title: p.title,
//     description: p.description,
//     media: p.media.split(', '),
//   })
// }

//POST COMMENTS

// let comments = await postComments(id_post)

// let coms = []
// for (let j = 0; j < comments.length; j++) {
//   let ch = comments[j]

//   const userC = await getUserById(ch.idclient)
//   const replaces = await getCommentReplays(ch.id)
//   const likes = await getCommentLikes(ch.id)
//   coms.push({
//     id: ch.id,
//     author: {
//       id: userC.id,
//       src: userC.userAvatar[0],
//       name: userC.userName,
//       username: userC.userNickName,
//     },
//     datetime: ch.created_at,
//     likes: likes,
//     text: ch.text,
//     replays: replaces,
//   })
// }
