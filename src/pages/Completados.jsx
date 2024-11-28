import React from 'react'
import { useApp } from '../Actions/ContextProvider';
import OrderCard from '../components/OrderCard';
const Completados = () => {
  const { completeOrders} = useApp();
  return (
    <div className='mt-4 grid grid-cols-3 auto-rows-auto gap-2'>{
      completeOrders.length > 0 ? completeOrders.map((order) => (
        <OrderCard key={order.id} order={order}/>
      )) : "No hay ordenes completas"
    }</div>
  )
}

export default Completados