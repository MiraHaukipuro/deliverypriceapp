import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaCalendarAlt} from 'react-icons/fa';
import './App.css';

function CustomInput({value, onClick}){
  return(
  <div className='input-group'>
      <input type="text" className='form-control' value={value} onClick={onClick} readOnly></input>
      <div className='input-group-append'>
        <span className='input-group-text'>
          <FaCalendarAlt/>
        </span>
      </div>
    </div>
  )
}

function App() {
  const [cartValue, setCartValue] = useState("");
  const [deliveryDistance, setDeliveryDistance] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  function handleCartChange(event) {
    setCartValue(event.target.value);
    event.preventDefault();
  }

  function handleDistanceChange(event) {
    setDeliveryDistance(event.target.value);
    event.preventDefault();
  }

  function handleItemsChange(event) {
    setNumberOfItems(event.target.value);
    event.preventDefault();
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function deliveryFee() {
    let smallOrderFee = 0;
    let itemsfee = 0;
    let deliveryDistancefee;

    if (cartValue < 10) {
      smallOrderFee = 10 - cartValue;
    }

    if (deliveryDistance > 1000) {
      deliveryDistancefee = ((deliveryDistance - 1000) / 500) + 2;
    } else {
      deliveryDistancefee = 2;
    }

    const total = smallOrderFee + deliveryDistancefee + itemsfee;

    if (cartValue < 200) {
      let deliveryPrice = Math.min(total, 15);

      const day = selectedDate.getDay();
      const hour = selectedDate.getHours();

      if (day === 5 && hour >= 15 && hour < 19) {
        deliveryPrice *= 1.2;
        deliveryPrice = Math.min(deliveryPrice, 15);
      }
      deliveryPrice = deliveryPrice.toFixed(2);
      setDeliveryPrice(deliveryPrice);

    } else {
      setDeliveryPrice(0);
    }
  }

  return (

    <form className="container">
      <h1>Delivery Fee Calculator</h1>
      <label>Cart value €</label>
      <input type="text" value={cartValue} onChange={handleCartChange}data-test-id="cartValue" />
      <label>Delivery Distance / m</label>
      <input type="text" value={deliveryDistance} onChange={handleDistanceChange} data-test-id="deliveryDistance"/>
      <label>Amount of items</label>
      <input type="text" value={numberOfItems} onChange={handleItemsChange} data-test-id="numberOfItems"/>
      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> Time
      <DatePicker selected={selectedDate} onChange={handleDateChange} customInput={<CustomInput/>} data-test-id="datePicker" />
      </label>
      <button type="button" onClick={deliveryFee}>
        Calculate Delivery Price
      </button>
      <h2 data-test-id="fee">Delivery Price: {deliveryPrice}€</h2>
    </form>
  );
}

export default App;

