import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from "react";
import axios from "axios";
import DatesPicker from '../Components/datePicker';
import Footer from '../Components/footer';

function Checkout() {

    // Details Form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Payment Form
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [message, setMessage] = useState("");
  // const [checkoutPage, setCheckoutPage] = useState(1);

  // const handleNextStep = (e) => {
  //   e.preventDefault();
  //   setCheckoutPage(2);  // Moves to the payment screen
  // };

  const formDetails = async () => {
    const res = await axios.post("http://localhost:5000/auth/register", {
      firstName,
      lastName,
      email,
      phone
    });

    setMessage(res.data);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Processing payment...");
  };
  return (
    <div className='checkoutbg'>

      <div className='row'>

        {/* left panel start */}

        <div className="CheckoutBack col">
            <div className="CheckoutBox">
        
        {/* <ProgressBar variant="dark" now={checkoutPage === 1 ? 33 : 66} className='progressBar'/> */}

        <h3 className='m-plus-rounded-1c-bold checkoutHeading'>Enter your personal details:</h3>

        <form>

        <div className="row">
        <div className="col-lg-6">
            <input
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)} className='Checkoutinput'
      />
        </div>

        <div className="col-lg-6">
            <input
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)} className='Checkoutinput'
      />
        </div>

        </div>

        <div className="row">
        <div className="col-lg-6">
            <input
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)} className='Checkoutinput'
      />
        </div>

        <div className="col-lg-6">
            <input
        placeholder="Phone number"
        onChange={(e) => setPhone(e.target.value)} className='Checkoutinput'
      />
        </div>

        </div>

        <div className="row">
            <h6 className='inter-bold checkoutHeading'>Select arrival day:</h6>
            <DatesPicker></DatesPicker>

            <h6 className='inter-bold checkoutHeading'>Select departure day:</h6>
            <DatesPicker></DatesPicker>

        
            <div className="col-lg">
            <p className='inter-bold checkoutSubHeading'>Select from our addons:</p>

    <div className="row checkBoxAlign">
  <label className="checkContainer">
  <input type="checkbox" id="Breakfast" name="select_addons" value="Break"/>
  <span class="checkmark"></span>
  <label for="Breakfast" className='inter-regular'>
    <h6 className='checkBoxTextA'>Breakfast</h6>
    </label>
  </label>

  <br />

  <label className="checkContainer">
  <input type="checkbox" id="Housekeeping" name="select_addons" value="House"/>
  <span class="checkmark"></span>
  <label for="housekeeping" className='inter-regular'>
    <h6 className='checkBoxTextB'>Housekeeping</h6>
    </label>
  </label>
    </div>

        </div>
        </div>

          <button className="logInButton inter-regular" type="submit" value="Submit">Finalise details</button>

        </form>

            </div>
        </div>

          {/* right panel start */}

        <div className="CheckoutBack col">
            <div className="CheckoutBox">
        
        {/* <ProgressBar variant="dark" now={checkoutPage === 1 ? 33 : 66} className='progressBar'/> */}

        <h3 className='m-plus-rounded-1c-bold checkoutHeading'>Enter your payment details:</h3>

        <form>

        <div className="row">
        <div className="col-lg-6">
            <input
        placeholder="Cardholder's name"
        onChange={(e) => setCardName(e.target.value)} className='Checkoutinput'
      />
        </div>

        <div className="col-lg-6">
            <input
        placeholder="Card number"
        onChange={(e) => setCardNumber(e.target.value)} className='Checkoutinput'
      />
        </div>

        </div>

        <div className="row">
        <div className="col-lg-6">
            <input
        placeholder="Expiration date"
        onChange={(e) => setExpiry(e.target.value)} className='Checkoutinput'
      />
        </div>

        <div className="col-lg-6">
            <input
        placeholder="CVC"
        onChange={(e) => setCvc(e.target.value)} className='Checkoutinput'
      />
        </div>

        </div>

        
        <button className="logInButton inter-regular" type="submit" value="Submit">Finalise payment</button>

        </form>

            </div>
        </div>

        </div>

        <Footer></Footer>
    </div>
  );
}

export default Checkout;