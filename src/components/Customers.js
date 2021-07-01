import React from 'react'
import Customer from './Customer';

const Customers = ({customers, onDelete}) => {

    return (
        <div>
{customers.map(customer => (<Customer customer={customer} onDelete={onDelete} key={customer._id} />))}
        </div>


    )
}

export default Customers
