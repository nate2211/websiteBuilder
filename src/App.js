import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate} from 'react-router-dom';
import GetAccount from "./components/UserPages/GetAccount";
import Navbar from "./components/Navbar";
import GetShop from "./components/UserPages/GetShop";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import GetBuilder from "./components/AccountPages/Builder";
import {useSelector} from "react-redux";
import Logout from "./components/Auth/Logout";
import Account from "./components/AccountPages/Account";
import {RenderLayout} from "./components/AccountPages/RenderLayout";
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
              <Route path={"/account/render/:id"} element={<RenderLayout/>}/>
          </Routes>
    </div>
  );
}

export default App;
