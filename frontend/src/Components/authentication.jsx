import { useState } from "react";
import axios from "axios";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

import ruby from "../Assets/images/login/ruby1.png"
import copper from "../Assets/images/login/copper1.png"
import emerald from "../Assets/images/login/emerald1.png"

import golf from "../Assets/images/login/golf2.png"
import bar from "../Assets/images/login/bar2.png"
import marina from "../Assets/images/login/marina2.png"

import wine from "../Assets/images/login/wine3.png"
import whiskey from "../Assets/images/login/whiskey3.png"
import drinks from "../Assets/images/login/drink3.png"

function Authentication() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageR, setMessageR] = useState("");
  const [userRole, setUserRole] = useState("B");

  //toggle seller user role
   const useSelectS = async () => {
    setUserRole("S");
  };

   //toggle buyer user role
  const useSelectB = async () => {
    setUserRole("B");
  };

  //messages for log in when a picture is chosen
  const [messagePass1, setMessagePass1] = useState("");
  const [messagePass2, setMessagePass2] = useState("");
  const [messagePass3, setMessagePass3] = useState("");

  //messages for sign up when a picture is chosen
  const [messagePass11, setMessagePass11] = useState("");
  const [messagePass12, setMessagePass12] = useState("");
  const [messagePass13, setMessagePass13] = useState("");

  //passwords for each tab section
  var [password1, setPassword1] = useState("");
  var [password2, setPassword2] = useState("");
  var [password3, setPassword3] = useState("");

  //passwords for each tab section
  var [password11, setPassword11] = useState("");
  var [password12, setPassword12] = useState("");
  var [password13, setPassword13] = useState("");

  const passSelect = async () => {
    setMessagePass1("Answer collected");
  };

  const passSelect2 = async () => {
    setMessagePass2("Answer collected");
  };

  const passSelect3 = async () => {
    setMessagePass3("Answer collected");
  };

    const passSelect11 = async () => {
    setMessagePass11("Answer collected");
  };

  const passSelect12 = async () => {
    setMessagePass12("Answer collected");
  };

  const passSelect13 = async () => {
    setMessagePass13("Answer collected");
  };

  const [selected, setSelected] = useState("");

const register = async () => {
    // Combine passwords gained from pictures
    const finalPassword = `${password11}${password12}${password13}`;
    
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password: finalPassword,
        userRole

      });
      setMessageR(res.data);
      setPassword(finalPassword); 
    } catch (error) {
      setMessageR("Registration failed.");
    }
  };

const login = async () => {
    // Adds the passwords from each picture
    const finalPassword = `${password1}${password2}${password3}`;

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password: finalPassword,
        name
      });

      // Gets the token and user data
      const { token, user, message: successMessage } = res.data;

      // Save them to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful!");
      setPassword(finalPassword);

      // Redirects the user to home page after delay
      setTimeout(() => {
        window.location.href = "/"; 
      }, 1000);

    }  catch (error) {
      setMessage("Login failed.");
    }
  };

  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      {/* Sign up tab left */}
      <Tab eventKey="home" title="Sign up">
        <div>
          <h1 className="m-plus-rounded-1c-bold LogInText">Welcome to Deluxe Bookings</h1>
          <h3 className="LogInSubHeading inter-regular LogInText">Make an account to gain access to our exclusive platform</h3>

          <input
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="custom-toggle-group">
            <ToggleButton id="tbg-radio-1" value={1} onClick={useSelectB}>
              I am a customer
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value={2} onClick={useSelectS}>
              I am a seller
            </ToggleButton>
          </ToggleButtonGroup>

          <br /><br />

          <div>
            <h2 className="inter-bold passwordText LogInText">Create a custom password:</h2>          
            <h4 className="inter-regular LogInText">Choose your favourite colour</h4>

            <div type="row">
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword11(1); passSelect11(); }}>
                <img src={ruby} alt="ruby red" className="logInButtonImg"/>
                <p>Ruby Red</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword11(2); passSelect11(); }}>
                <img src={copper} alt="copper brown" className="logInButtonImg"/>
                <p>Copper Brown</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword11(3); passSelect11(); }}>
                <img src={emerald} alt="emerald green" className="logInButtonImg"/>
                <p>Emerald Green</p>
              </button>
            </div>
            <h5 className="inter-bold LogInText">{messagePass11}</h5>
          </div>

          <br />

          <div>
            <h4 className="inter-regular LogInText">Choose the best place to relax</h4>

            <div type="row">
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword12(1); passSelect12(); }}>
                <img src={golf} alt="golf course" className="logInButtonImg"/>
                <p>The golf course</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword12(2); passSelect12(); }}>
                <img src={bar} alt="a bar" className="logInButtonImg"/>
                <p>The bar</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword12(3); passSelect12(); }}>
                <img src={marina} alt="a marina" className="logInButtonImg"/>
                <p>The marina</p>
              </button>
            </div>
            <h5 className="inter-bold LogInText">{messagePass12}</h5>
          </div>

          <br />
          
          <div>
            <h4 className="inter-regular LogInText">Choose your favourite drink</h4>

            <div type="row">
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword13(1); passSelect13(); }}>
                <img src={wine} alt="wine glasses" className="logInButtonImg"/>
                <p>Wine</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword13(2); passSelect13(); }}>
                <img src={whiskey} alt="whiskey in a glass" className="logInButtonImg"/>
                <p>Whiskey</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword13(3); passSelect13(); }}>
                <img src={drinks} alt="cocktails" className="logInButtonImg"/>
                <p>Cocktails</p>
              </button>
            </div>

            <h5 className="inter-bold LogInText">{messagePass13}</h5>

            <button onClick={register} className="logInSubmit inter-regular">Register</button>

            <br /><br />

            <h4 className="m-plus-rounded-1c-black LogInText">{messageR}</h4>
          </div>
        </div>
      </Tab>

      {/* Log In tab right */}
      <Tab eventKey="profile" title="Log in">
        <div>
          <h1 className="m-plus-rounded-1c-bold LogInText">Welcome back</h1>
          <h2 className="LogInSubHeading inter-regular LogInText">Fill in your details to access your account</h2>

          <input
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <div>
            <h2 className="inter-bold passwordText LogInText">Create a custom password:</h2>            
            <h3 className="inter-regular LogInText">Choose your favourite colour</h3>

            <div type="row">
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword1(1); passSelect(); }}>
                <img src={ruby} alt="ruby red" className="logInButtonImg"/>
                <p>Ruby Red</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword1(2); passSelect(); }}>
                <img src={copper} alt="copper brown" className="logInButtonImg"/>
                <p>Copper Brown</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword1(3); passSelect(); }}>
                <img src={emerald} alt="emerald green" className="logInButtonImg"/>
                <p>Emerald Green</p>
              </button>
            </div>
            <h5 className="inter-bold LogInText">{messagePass1}</h5>
          </div>

          <br />

          <div>
            <h4 className="inter-regular LogInText">Choose the best place to relax</h4>

            <div type="row">
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword2(1); passSelect2(); }}>
                <img src={golf} alt="golf course" className="logInButtonImg"/>
                <p>The golf course</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword2(2); passSelect2(); }}>
                <img src={bar} alt="a bar" className="logInButtonImg"/>
                <p>The bar</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword2(3); passSelect2(); }}>
                <img src={marina} alt="a marina" className="logInButtonImg"/>
                <p>The marina</p>
              </button>
            </div>
            <h5 className="inter-bold LogInText">{messagePass2}</h5>
          </div>

          <br />
          
          <div>
            <h4 className="inter-regular LogInText">Choose your favourite drink</h4>

            <div type="row">
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword3(1); passSelect3(); }}>
                <img src={wine} alt="wine glasses" className="logInButtonImg"/>
                <p>Wine</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword3(2); passSelect3(); }}>
                <img src={whiskey} alt="whiskey in a glass" className="logInButtonImg"/>
                <p>Whiskey</p>
              </button>
              <button variant="outline-dark" className="logInButton" onClick={() => { setPassword3(3); passSelect3(); }}>
                <img src={drinks} alt="cocktails" className="logInButtonImg"/>
                <p>Cocktails</p>
              </button>
            </div>

            <h5 className="inter-bold LogInText">{messagePass3}</h5>

            <button onClick={login} className="logInSubmit inter-regular">Login</button>

            <br /><br />

            <h4 className="m-plus-rounded-1c-black">{message}</h4>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Authentication;