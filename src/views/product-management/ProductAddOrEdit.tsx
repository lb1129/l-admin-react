import React from 'react'
import { useParams } from 'react-router-dom'
type Props = {}

const ProductAddOrEdit = (props: Props) => {
  const params = useParams()
  return <div>ProductAddOrEdit {params.id}</div>
}

export default ProductAddOrEdit
