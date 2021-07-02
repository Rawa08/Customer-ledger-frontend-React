
const Customer = ({ customer, completed }) => {

    const { _id, name, email, treatment, date, added } = customer;



    const formateDateTime = () => {
        const datePart = date.slice(0, 10);
        const utcHouer = parseInt(date.slice(11, 13)) + 2;
        const min = date.slice(13, 16);
        const formatedDateTime = `${datePart} ${utcHouer.toString()}${min}`
        return formatedDateTime;
    }

    return (
        <div key={_id} className="customer__card">
            <p className="archive__title">Archive</p>
<hr className="archive__line" />

            <p>Name: {name}</p>
            <p>email: {email}</p>
            <p>Treatment: {treatment}</p>
             <p>{formateDateTime()}</p>
             <button className="btn bg--blue" onClick={() => completed(_id)}> Uncomplete</button>
            <p className="customer-added__date">Created: {added.slice(0, 10)}</p>
        </div>
    )
}

export default Customer
