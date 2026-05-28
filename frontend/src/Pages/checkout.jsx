import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from "react";
import axios from "axios";
import DatesPicker from '../Components/datePicker';
import Footer from '../Components/footer';

function Checkout() {
  const [checkoutPage, setCheckoutPage] = useState(1);
  const [message, setMessage] = useState("");

  // Personal details form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addons, setAddons] = useState([]);

  // Payment form
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  // checked addons
  const handleAddonChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAddons([...addons, value]);
    } else {
      setAddons(addons.filter((item) => item !== value));
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        firstName,
        lastName,
        email,
        phone,
        addons
      });
      
      if (res.data.success) {
        setMessage(""); // Reset messages before going to payment
        setCheckoutPage(2); 
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setMessage(`Error: ${err.response.data.error}`);
      } else {
        setMessage("Error saving your details. Please check your connection.");
      }
    }
  };

  // Finalise payment handler
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    console.log("Processing payment securely...");
    setMessage("");
    setCheckoutPage(3); // Moves to success payment display
  };

  return (
    <div className='checkoutbg'>
      <div className='row'>

        {/* Personal details form */}
        {checkoutPage === 1 && (
          <div className="CheckoutBack col">
            <div className="CheckoutBox">
              
              <ProgressBar variant="dark" now={33} className='progressBar'/>

              <h3 className='m-plus-rounded-1c-bold checkoutHeading'>Enter your personal details:</h3>

              <form onSubmit={handleDetailsSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>

                  <div className="col-lg-6">
                    <input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>

                  <div className="col-lg-6">
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <h6 className='inter-bold checkoutHeading'>Select arrival day:</h6>
                  <DatesPicker />

                  <h6 className='inter-bold checkoutHeading'>Select departure day:</h6>
                  <DatesPicker />

                  <div className="col-lg">
                    <p className='inter-bold checkoutSubHeading'>Select from our addons:</p>

                    <div className="row checkBoxAlign">
                      <label className="checkContainer">
                        <input 
                          type="checkbox" 
                          id="Breakfast" 
                          name="select_addons" 
                          value="Break"
                          onChange={handleAddonChange}
                        />
                        <span className="checkmark"></span>
                        <span className='inter-regular'>
                          <h6 className='checkBoxTextA'>Breakfast</h6>
                        </span>
                      </label>

                      <br />

                      <label className="checkContainer">
                        <input 
                          type="checkbox" 
                          id="Housekeeping" 
                          name="select_addons" 
                          value="House"
                          onChange={handleAddonChange}
                        />
                        <span className="checkmark"></span>
                        <span className='inter-regular'>
                          <h6 className='checkBoxTextB'>Housekeeping</h6>
                        </span>
                      </label>
                    </div>

                  </div>
                </div>

                <button className="logInSubmit inter-regular" type="submit">Finalise details</button>
              </form>
              
              {message && <p className="text-center mt-3" style={{color: 'red'}}>{message}</p>}
            </div>
          </div>
        )}

        {/* Payment form */}
        {checkoutPage === 2 && (
          <div className="CheckoutBack col">
            <div className="CheckoutBox">
              
              <ProgressBar variant="dark" now={66} className='progressBar'/>

              <h3 className='m-plus-rounded-1c-bold checkoutHeading'>Enter your payment details:</h3>

              <form onSubmit={handlePaymentSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      placeholder="Cardholder's name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>

                  <div className="col-lg-6">
                    <input
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <input
                      placeholder="Expiration date"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>

                  <div className="col-lg-6">
                    <input
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)} 
                      className='Checkoutinput'
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="logInButton inter-regular" 
                    type="button"  
                    onClick={() => setCheckoutPage(1)}
                  >
                    Go Back
                  </button>
                  <button className="logInSubmit inter-regular" type="submit">Finalise payment</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Payment successful */}
        {checkoutPage === 3 && (
          <div className="CheckoutBack col">
            <div className="CheckoutBox" style={{ textAlign: 'center', padding: '40px 20px' }}>
              
              <ProgressBar variant="success" now={100} className='progressBar'/>

              <div style={{ fontSize: '50px', color: '#198754', marginBottom: '15px' }}>✓</div>
              
              <h3 className='m-plus-rounded-1c-bold checkoutHeading'>
                Payment Successful!
              </h3>
              
              <p className='inter-regular LogInText'>
                Thank you, {firstName}! Your reservation has been confirmed. A receipt and summary details have been sent to <strong>{email}</strong>.
              </p>

              <button 
                className="logInSubmit inter-regular" 
                onClick={() => window.location.href = '/'}
              >
                Return Home
              </button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Checkout;