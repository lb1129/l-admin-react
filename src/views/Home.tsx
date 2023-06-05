import React from 'react'
import PositionMap from '@/components/PositionMap'

function Home() {
  return (
    <div
      style={{
        height: '100%'
      }}
    >
      <PositionMap onChange={(record) => {}} />
    </div>
  )
}

export default Home
