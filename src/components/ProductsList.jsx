import React from 'react'

const ProductsList = ({item}) => {
    const {name, quantity, size, detailPrice
    } = item
  return (
    <tr className='odd:bg-gray-200 even:bg-gray-50'>
        <td className='text-center'>{name}</td>
        <td className='text-center'>{size}</td>
        <td className='text-center'>{quantity}</td>
    </tr>
  )
}

export default ProductsList