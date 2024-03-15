import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom';
import GetAccount from "./components/GetAccount";
import Navbar from "./components/Navbar";
import GetShop from "./components/GetShop";
import Signup from "./components/Signup";
import Login from "./components/Login";
import GetBuilder from "./components/Builder";
import {useSelector} from "react-redux";
import Logout from "./components/Logout";
import Account from "./components/Account";
function App() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
    console.log(user)
  return (
    <div className="App">
        <Navbar color={"#000000"} header={"Resume Site"}/>
          <Routes>
              <Route path="/account"  element={<Account/>} />
              <Route path="/account/:id"  element={<GetAccount/>} />
              <Route path="/account/shop/:id"  element={<GetShop/>} />
              <Route path="/account/builder/:id" element={<GetBuilder/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login onLoginSuccess={() => navigate("/")}/>}/>
              <Route path={"/logout"} exact element={<Logout/>}/>
          </Routes>
    </div>
  );
}

export default App;
