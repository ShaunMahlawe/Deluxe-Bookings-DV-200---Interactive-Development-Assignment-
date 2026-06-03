import { useState } from "react";
import axios from "axios";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from '../Components/footer';

import Authentication from "../Components/authentication";


function LogIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    const res = await axios.post("http://localhost:5001/auth/register", {
      email,
      password,
      name
    });

    setMessage(res.data);
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5001/auth/login", {
      email,
      password,
      name
    });

    setMessage(res.data);
  };

  return (
    <div>
    <div className="logInBack">
        <div className="logInBox" style={{backgroundColor: "#b3a6a3c3"}}>
          <div type="col">

          <Authentication/>

              </div>
          </div>
      </div>
      <Footer></Footer>
      </div>
  );
}

export default LogIn;