import React from 'react'
import { useApp } from '../Actions/ContextProvider';
import OrderCard from '../components/OrderCard';
const Cancelados = () => {
  const { canceledOrders } = useApp();
  return (
    <div className='mt-4 grid grid-cols-3 auto-rows-auto gap-2'>
      {
        canceledOrders.length > 0 ? canceledOrders.map((order) => (
          <OrderCard key={order.id} order={order}/>
        )) : "No hay ordenes canceladas"
      }
    </div>
  )
}

export default Cancelados