import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout"
import Dashboard from "./components/pages/Dashboard"
import Allorders from "./components/pages/Allorders";
import User from "./components/pages/User";
import Products from "./components/pages/Products";
import Signin from "./components/auth/Signin";
import AddProduct from "./components/pages/AddProduct";

function App() {
  // const api="https://intellimall.run-ap-south1.goorm.io/"
  const api="https://intelli--mall.herokuapp.com/"
  // const api = "localhost:5000/";


  const [ordersData,setOrdersData]=useState();
  const [usersData,setUsersData]=useState();
  const [productData,setProductData]=useState();
  const [totalearning,settotalearning]=useState();

  useEffect(()=>{
    fetch( api+'order' )
    .then( response => response.json() )
    .then( response => {
      setOrdersData(response)
    } );
  },[])

  useEffect(()=>{
    fetch( api+'user' )
    .then( response => response.json() )
    .then( response => {
      setUsersData(response)
    } );
  },[])

  useEffect(()=>{
    fetch( api+'product' )
    .then( response => response.json() )
    .then( response => {
      setProductData(response)
    } );
  },[])

  useEffect(()=>{
    fetch( api+'totalearning' )
    .then( response => response.json() )
    .then( response => {
      settotalearning(response)
    } );
  },[])


  // const [logIn,setLogIn]=useState(true)

  return (
    <Router>
      <Switch>
      <Route
          exact
          path="/"
          render={() => <Signin />}
        />
      <Route
          exact
          path="/dashboard"
          render={() => <AdminLayout body={<Dashboard totalearning={totalearning} ordersData={ordersData} usersData={usersData} productData={productData} />} />}
        />
        <Route
          exact
          path="/allorders"
          render={() => <AdminLayout body={<Allorders body={ordersData}/>} />}
        />
        <Route
          exact
          path="/user"
          render={() => <AdminLayout body={<User body={usersData}/>} />}
        />
        <Route
          exact
          path="/products"
          render={() => <AdminLayout body={<Products body={productData}/>} />}
        />
        <Route
          exact
          path="/addproduct"
          render={() => <AdminLayout body={<AddProduct/>}/>}
        />
        <Redirect to="/" />

        {/* <Route exact path="/allorders" render={()=> logIn ? ( <AdminLayout body={<Allorders body={ordersData}/>} /> ): ( <Signin />  )} /> */}


      </Switch>
    </Router>
  );
}

export default App;
