import React from 'react'

const Customer = ({customer, onDelete}) => {
    const {_id, name, email, treatment, date, added, completed} = customer;

    // const formatedDate = (date) => {
    //     const year = date.getFullYear();

    //      const monthInt = date.getMonth()+1;
    //     const month = monthInt  < 10 ? '0' + monthInt : monthInt;

    //      const dayInt = date.getDate();
    //     const day = dayInt < 10 ? '0' + dayInt : dayInt;

    //      const hoursInt = date .getHours();
    //      const hours = hoursInt < 10 ? '0' + hoursInt : hoursInt;

    //      const minInt = date.getMinutes();
    //      const min = minInt < 10 ? '0' + minInt : minInt;

    //      const formatedDate = `${year}-${month}-${day}:${hours}-${min}`;

    //     newD = formatedDate;
    //     return newD
    // }




    return (
        <div key={_id}>
            <p>Name: {name}</p>
            <p>Name: {email}</p>
            <p>Treatment: {treatment}</p>
            <p>{`${date.slice(0,10)} -- ${date.slice(11,16)}`}</p>
            <p>{completed ? 'Treated' : 'Booked'}</p>
            <p>Added: {added}</p>
            <p>{_id}</p>

            <button onClick={()=>onDelete(_id)}>Remove</button>
        </div>
    )
}

export default Customer
