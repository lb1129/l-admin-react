import React from 'react'
import { useParams } from 'react-router-dom'
type Props = {}

const ProductDetail = (props: Props) => {
  const params = useParams()
  return <div>ProductDetail {params.id}</div>
}

export default ProductDetail
