import "./App.css";
import Todo from "./features/Todo";
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom"
import Login from "./features/Login";
import Register from "./features/Register";

function App() {
  const user = JSON.parse(localStorage.getItem("user")) || null
  return (
  <BrowserRouter>
  <Routes>
    {user &&
    <Route path='/' element ={<Todo/>}/>
}
 <Route path='/login' element ={<Login/>}/>
  <Route path='/register' element ={<Register/>}/>
  </Routes>
  
  </BrowserRouter>

  )
}

export default App;
