import {useState, useEffect} from 'react'
import './App.css';
import Form  from './components/NewCustomerForm';
import CustomerList from './components/Customers';



function App() {
	const [customerState, setCustomerState] = useState([]);


	useEffect(() => {
const getCustomers = async () => {
	const data = await fetchCustomers()
	setCustomerState(data)
}

		getCustomers();

	},[])

	const fetchCustomers = async () =>{
		const result = await fetch('http://localhost:5000/api/customers');
		const data = await result.json();
		return data;
	}
  const addCustomer = async (taskObj) => {
    const res = await fetch('http://localhost:5000/api/customers',{
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(taskObj)
    })
    const data = await res.json();
    console.log(data)
    setCustomerState([...customerState, data]);
  }

  const deleteCustomer = async (id) => {
    await fetch(`http://localhost:5000/api/customers/${id}`, {method: 'DELETE'});
    setCustomerState(customerState.filter((customer) => customer._id !== id))
  }

  return (
    <div className="App">
      <Form onAdd={addCustomer} />
     {customerState.length && <CustomerList customers={customerState} onDelete={deleteCustomer} />}


    </div>
  );
}

export default App;
