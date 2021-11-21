import { useState, useEffect } from 'react'

import Form from './components/NewCustomerForm';
import CustomerList from './components/Customers';



function App() {
  const [customerState, setCustomerState] = useState([]);
  const apiKey = process.env.REACT_APP_apiCredentials;
  const sortState = (currentState) => {
    if(!currentState.error){
    const sorted = currentState.slice().sort((a, b) => b.date - a.date).reverse();
    setCustomerState(sorted);}
   
  }

  useEffect(() => {
    
    const getCustomers = async () => {
      const data = await fetchCustomers()
      sortState(data)
    }

    return getCustomers();
// eslint-disable-next-line 
  }, [])

  const fetchCustomers = async () => {
    const result = await fetch('https://customer-ledger.herokuapp.com/api/customers/', {
  
      headers: { 'Authorization':apiKey }
    });
    const data = await result.json();
    return data;
  }

  const addCustomer = async (taskObj) => {
    const res = await fetch('https://customer-ledger.herokuapp.com/api/customers/', {
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
        'Authorization': apiKey },
      body: JSON.stringify(taskObj)
    })
    const data = await res.json();

    sortState([...customerState, data]);
  }

  const updateDate = async (newDate, id) => {

    const updateData = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': apiKey },
      body: JSON.stringify({ date: newDate })
    };

    await fetch(`https://customer-ledger.herokuapp.com/api/customers/${id}`, updateData)
    sortState(customerState.map((customer) => {
      if(customer._id === id)
      customer.date = newDate;
      return customer;
    }))
  }

  // const completeCustomer = async (id) => {

  //   const customer = customerState.find((customer) => (customer._id === id));

  //   const updateData = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ completed: !customer.completed })
  //   };

  //   await fetch(`http://customer-ledger.herokuapp.com/api/customers/${id}`, updateData);

  //   sortState(customerState.map((customer) => {
  //     if(customer._id === id)
  //     customer.completed = !customer.completed;
  //     return customer;
  //   }))
  // }

  const deleteCustomer = async (id) => {
    await fetch(`https://customer-ledger.herokuapp.com/api/customers/${id}`,
     { method: 'DELETE',
       headers: { 'Authorization': apiKey}
     });
    sortState(customerState.filter((customer) => customer._id !== id))
  }



  return (
    <div className="App">
      <Form onAdd={addCustomer} />
      {customerState.length ? <CustomerList customers={customerState} onDelete={deleteCustomer} updateCustomerDate={updateDate} /> : <h1>Appointments loading....</h1> }


    </div>
  );
}

export default App;
