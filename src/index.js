import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./pages/navigation";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import CreateUser from "./pages/createUser";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import PayConfirmation from "./pages/payConfirmation";
import UserProfile from "./pages/UserProfile";
import EditUser from "./pages/editUser";
import NoPage from "./pages/NoPage";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="payConfirmation/:apptDate" element={<PayConfirmation />} />
        <Route path="createUser" element={<CreateUser />} />
        <Route path="/" element={<Navigation />}>
            <Route path="homePage" element={<HomePage/>} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="userProfile/:userUID" element={<UserProfile />} />
            <Route path="editUser/:userUID" element={<EditUser />} />
            <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));