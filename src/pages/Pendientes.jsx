import React from 'react'
import { useApp } from '../Actions/ContextProvider';
import OrderCard from '../components/OrderCard';
const Pendientes = () => {
  const { pendingOrders} = useApp();
  return (
    <div className='mt-4 grid grid-cols-3 auto-rows-auto gap-2'>
      {
        pendingOrders.length > 0 ? pendingOrders.map((order) => (
          <OrderCard key={order.id} order={order}/>
        )) : "No hay ordenes pendientes"
      }
    </div>
  )
}

export default Pendientes