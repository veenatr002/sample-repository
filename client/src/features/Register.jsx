import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const registerhandler = async (e) => {
    e.preventDefault();
    // console.log(user)
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data)
    navigate("/login")
    
  };

  return (
    <form onSubmit={registerhandler}>
      <input
        type="text"
        placeholder="Enter Username"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <br />
      <input
        type="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />
      {/* <input type="password" placeholder='Confirm Password'value={user.password} onChange={(e)=> setUser({...user,password :e.target.value})}/> */}
      <button>Register</button>
    </form>
  );
};

export default Register;
