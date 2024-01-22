import React, { useState } from 'react'
import { Pagination } from 'antd'

const CustomPagination = ({ artistsPerPage, artistsDataList, currentPage, setCurrentPage, setCurrentArtistsData }) => {
  const [current, setCurrent] = useState(1)
  const onChange = page => {
    console.log(page)
    setCurrentPage(page)
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Pagination
        current={currentPage}
        onChange={onChange}
        total={artistsDataList.length}
        pageSize={artistsPerPage}
        showPrevNextJumpers={true}
      />
    </div>
  )
}
export default CustomPagination
