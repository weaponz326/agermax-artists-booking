import React, { useEffect, useState } from 'react'
import axios from 'axios'
import JSONData from './MOCK_DATA'
import { set } from 'nprogress'

const Pagination = () => {
  const [usersData, setUsersData] = useState(JSONData)
  //Set the pages configuration
  const [currentPage, setCurrentPage] = useState(4)
  const [postsPerPage, setPostsPage] = useState(10)
  const [currentUsersData, setCurrentUsersData] = useState([])

  //Find the indexes to slice for the number of items per page

  useEffect(() => {
    console.log(usersData)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    setCurrentUsersData(usersData.slice(indexOfFirstPost, indexOfLastPost))
  }, [currentPage])

  function changePage(value) {
    setCurrentPage(value)
    console.log({ value, currentPage })
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Pagination</h1>
      <ol>
        {currentUsersData && currentUsersData.length > 0 ? (
          currentUsersData.map((user, index) => <li key={user.id}>{user.first_name}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ol>
      <PageNumbers usersData={usersData} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export const PageNumbers = ({ usersData, postsPerPage, setCurrentPage }) => {
  const totalPagesNumber = Math.ceil(usersData.length / postsPerPage)
  const [pages, setPages] = useState([])
  console.log({ usersData, postsPerPage, pages })
  useEffect(() => {
    let pagesNum = []
    for (let i = 1; i <= totalPagesNumber; i++) {
      pagesNum.push(i)
    }
    setPages(pagesNum)
  }, [])

  if (pages.length <= 0) return
  return (
    <div>
      {pages.map(page => (
        <button onClick={() => setCurrentPage(page)} key={page}>
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination

Pagination.authGuard = false
Pagination.guestGuard = false
Pagination.acl = {
  action: 'manage',
  subject: 'all' // Adjust the permissions as per your application's ACL configuration
}

Pagination.getLayout = page => <div>{page}</div>
