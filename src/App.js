import { useState, useEffect } from 'react'

import Form from './components/NewCustomerForm';
import CustomerList from './components/Customers';



function App() {
  const [customerState, setCustomerState] = useState([]);

  const sortState = (currentState) => {
    const sorted = currentState.slice().sort((a, b) => b.date - a.date).reverse();
    setCustomerState(sorted);

  }

  useEffect(() => {
    const getCustomers = async () => {
      const data = await fetchCustomers()
      await sortState(data)
    }

    getCustomers();

  }, [customerState])

  const fetchCustomers = async () => {
    const result = await fetch('http://customer-ledger.herokuapp.com/api/customers/');
    const data = await result.json();
    return data;
  }

  const addCustomer = async (taskObj) => {
    const res = await fetch('http://customer-ledger.herokuapp.com/api/customers/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(taskObj)
    })
    const data = await res.json();

    sortState([...customerState, data]);
  }

  const updateDate = async (newDate, id) => {

    const updateData = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate })
    };

    await fetch(`http://customer-ledger.herokuapp.com/api/customers/${id}`, updateData)
    sortState(customerState.map((customer) => {
      if(customer._id === id)
      customer.date = newDate;
      return customer;
    }))



  }

  const deleteCustomer = async (id) => {
    await fetch(`http://customer-ledger.herokuapp.com/api/customers/${id}`, { method: 'DELETE' });
    sortState(customerState.filter((customer) => customer._id !== id))
  }

  return (
    <div className="App">
      <Form onAdd={addCustomer} />
      {customerState.length && <CustomerList customers={customerState} onDelete={deleteCustomer} updateCustomerDate={updateDate} />}


    </div>
  );
}

export default App;
