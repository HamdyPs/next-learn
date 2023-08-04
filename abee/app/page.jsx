'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])
  const [addPost, setAddPost] = useState({
    title: '',
    content: ''
  })

  const getPosts = async () => {
    const { data } = await axios.get('/api/posts')
    setPosts(data.posts)
  }
  const userAddPost = async (e) => {
    e.preventDefault()
    await axios.post('/api/posts', addPost)
    getPosts()
  }
  const getUserData = async () => {
    try {
      const userData = await axios.get('/api/users/user')
      setUser(userData.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  const deletePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`)
    getPosts()

  }

  useEffect(() => {
    getPosts()
    getUserData()

  }, [])
  return (
    <main style={{
      padding: '20px 8%'
    }}>
      <div style={{
        border: '1px solid red'

      }}>
        <form onSubmit={userAddPost} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          border: '1px solid blue',
          alignItems: 'center'
        }}>
          <h5>add post here</h5>
          <input
            style={{
              padding: '10px 20px',
              width: 400
            }}
            type='text'
            placeholder='type here title ...'
            value={addPost.title}
            id={addPost.title}
            onChange={(e) => setAddPost({ ...addPost, title: e.target.value })} />
          <input
            style={{
              padding: '10px 20px',
              width: 400
            }}
            type='text'
            placeholder='type here content ...'
            value={addPost.content}
            id={addPost.content}
            onChange={(e) => setAddPost({ ...addPost, content: e.target.value })} />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              width: 400,
              cursor: 'pointer'
            }}>submit</button>
        </form>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1,500px)',
          placeContent: 'center',
          gap: 20,
          marginTop: 50
        }}>
          {posts.map((post) => (
            <div key={post._id} style={{
              border: '1px solid red',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              border: '1px solid blue',
              padding: '10px'
            }}>
              <h2>{post.userId.username}</h2>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>{post.createdAt.split('T')[1].split('.')[0]}</p>
              {post.userId._id === user?._id && <button style={{
                padding: '10px 20px',
                cursor: 'pointer'
              }}
                onClick={() => deletePost(post._id)}
              >delete</button>}
            </div>
          ))}


        </div>
      </div>
    </main>
  )
}
