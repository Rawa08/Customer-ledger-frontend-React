import { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const NewCustomerForm = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [treatment, setTreatment] = useState('');
    const [date, setDate] = useState(new Date());


const handelDate = (date) => {

    setDate(date)
}

    const onSubmit = (e) => {
        e.preventDefault();

        props.onAdd({ name, email, treatment, date })

        setName('');
        setEmail('');
        setTreatment('');

    }










    return (
        <section className="form-container">

            <form className="add-customer__form" onSubmit={onSubmit}>

                <label>Name:</label>
                <input className="form__input" type='text' placeholder=' -Required' value={name} onChange={(e) => { setName(e.target.value) }} required />



                <label>Email</label>
                <input className="form__input" type='text'  value={email} onChange={(e) => { setEmail(e.target.value) }} />



                <label>TreatMent</label>
                <select className="form__input"   value={treatment} onChange={(e) => { setTreatment(e.target.value) }} >
               <option></option>
                <option>Nail Art</option>
                    <option>Keratin</option>

                    <option>Lash Lift</option>
                    <option>Eyelash Extensions</option>
                    <option>Eyelash and Eyebrow Tinting</option>
                    <option>Chemical Peels</option>
                    <option>Permanent Makeup Tattoos</option>



                </select>

                <div className='form-control'>
                    <label>Appointment Date: </label>
                    <DatePicker
                        selected={date}
                        onChange={handelDate}
                        showTimeSelect
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeFormat="HH:mm"
                        minTime={new Date(new Date().setHours(7, 0))}
                        maxTime={new Date(new Date().setHours(21, 0))}

                    />
                </div>


                <input className='form__button--submit' type='submit' value='Add Customer' />

            </form>
        </section>
    )
}

export default NewCustomerForm;
