import React from 'react'
import { Spin } from 'antd'

const PageLoading = () => {
  return (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
      <Spin size="large" />
    </div>
  )
}

export default PageLoading
