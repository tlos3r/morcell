import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { NativeBaseProvider } from "native-base";
import { Header } from './component/Header'
import { Footer } from "./component/Footer";
import { NativeRouter, Route, Routes, } from "react-router-native";
import { Home } from "./component/Home";
import Account from "./component/Account";
import { Cart } from "./component/Cart";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Forget from "./component/Auth/Forget";
import Admin from "./component/Admin/Admin";
import AddProduct from "./component/Admin/AddProduct";
import ViewProduct from "./component/Admin/ViewProduct";
import Details from "./component/Details";
export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<><Header /><Home /></>} />
            <Route path="/account" element={<><Header /><Account /></>} />
            <Route path="/cart" element={<><Header /> <Cart /></>} />
            <Route path="/admin" element={<><Header /> <Admin /></>} />
            <Route path="/add-product/:id" element={<><Header /><AddProduct /></>} />
            <Route path="/view-product" element={<><Header /><ViewProduct /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget" element={<Forget />} />
            <Route path="/details/:id" element={<><Header /><Details /></>} />
          </Routes>
          <Footer />
        </NativeRouter>
      </NativeBaseProvider>
    </Provider>
  );
}