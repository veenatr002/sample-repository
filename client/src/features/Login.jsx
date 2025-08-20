import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [user, setUser] = useState({
        name : "",
        password: ""
    })
    const navigate = useNavigate()

    const loginhandler =async (e) =>
    {
        e.preventDefault()
        const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
    const data = await res.json()
    console.log(data)
    localStorage.setItem("user",JSON.stringify(data))
    navigate("/")
    }


  return (
    <form onSubmit={loginhandler}>
        <input type="text" placeholder='Enter Username' value={user.name} onChange={(e)=> setUser({...user,name :e.target.value})}/>
        <input type="password" placeholder='Enter Password'value={user.password} onChange={(e)=> setUser({...user,password :e.target.value})}/>
        <button>Login</button>
    </form>
  )
}

export default Login