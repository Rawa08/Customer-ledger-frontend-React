import React from 'react'
import Customer from './Customer';


const Customers = ({ customers, onDelete, updateCustomerDate }) => {


    return (
        <article className="customer__card-container">



            {customers.map(customer =>
                <Customer customer={customer} onDelete={onDelete} key={customer._id} updateCustomerDate={updateCustomerDate} />

            )}



        </article>
    )
}
export default Customers
