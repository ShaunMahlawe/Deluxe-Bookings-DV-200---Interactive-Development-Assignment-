import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../api/config";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from '../../components/public/footer';

import Authentication from "../../components/public/authentication";


function LogIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      email,
      password,
      name
    });

    setMessage(res.data);
  };

  const login = async () => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
      name
    });

    setMessage(res.data);
  };

  return (
    <div>
    <div className="logInBack">
        {/* SOFT REMOVE: inline translucent panel color moved to the design-system CSS. */}
        {/* <div className="logInBox" style={{backgroundColor: "#b3a6a3c3"}}> */}
        <div className="logInBox">
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
