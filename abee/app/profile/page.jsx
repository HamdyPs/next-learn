'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([])

  const getUserData = async () => {
    try {
      const userData = await axios.get('/api/users/user')
      setUser(userData.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  const getUserPosts = async () => {
    const { data } = await axios.get('/api/posts/user')
    setPosts(data.posts)
  }
  const deletePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`)
    getUserPosts()

  }
  useEffect(() => {
    getUserData()
    getUserPosts()
  }, [])
  return (
    <div style={{
      padding: "10px 8%"
    }}>
      {user ?
        <>
          <div >
            <h2>{user?.username}</h2>
            <h2>{user?.email}</h2>
          </div>
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
                {post.userId._id === user?._id && <button style={{
                  padding: '10px 20px',
                  cursor: 'pointer'
                }}
                  onClick={() => deletePost(post._id)}
                >delete</button>}
              </div>
            ))}

          </div>
        </>

        :
        <div >
          <h2>loading ...</h2>

        </div>}
    </div>
  )
}

export default ProfilePage
