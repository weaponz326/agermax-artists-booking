import React, { useState } from 'react'
import { Pagination } from 'antd'

const CustomPagination = ({ artistsPerPage, artists, currentPage, setCurrentPage }) => {
  const [current, setCurrent] = useState(1)
  const onChange = page => {
    setCurrentPage(page)
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Pagination
        current={currentPage}
        onChange={onChange}
        total={artists ? artists.length : artistsPerPage}
        pageSize={artistsPerPage}
        showPrevNextJumpers={true}
        responsive
      />
    </div>
  )
}
export default CustomPagination
