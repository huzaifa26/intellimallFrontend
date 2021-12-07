import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminLayout from "./components/layout/AdminLayout"
import Dashboard from "./components/pages/Dashboard"
import Allorders from "./components/pages/Allorders";
import User from "./components/pages/User";
import Products from "./components/pages/Products";
import Signin from "./components/auth/Signin";
import AddProduct from "./components/pages/AddProduct";
// import EditProduct from "./components/pages/EditProduct";

function App() {
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [approvedUsers, setApprovedUsers]=useState([]);
  const [unapprovedUsers, setUnapprovedUsers]=useState([]);
  const [locations, setLocations] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [apiKey, setapiKey] = useState([]);
  const [currentUser, setcurrentUser] = useState();

  const [ordersData,setOrdersData]=useState();
  const [usersData,setUsersData]=useState();
  const [productData,setProductData]=useState();
  const [editProductData,setEditProductData]=useState();

  useEffect(()=>{
    fetch( 'http://localhost:5000/order' )
    .then( response => response.json() )
    .then( response => {
      setOrdersData(response)
    } );
  },[])

  useEffect(()=>{
    fetch( 'http://localhost:5000/user' )
    .then( response => response.json() )
    .then( response => {
      setUsersData(response)
    } );
  },[])

  useEffect(()=>{
    fetch( 'http://localhost:5000/product' )
    .then( response => response.json() )
    .then( response => {
      setProductData(response)
    } );
  },[])

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
          render={() => <AdminLayout body={<Dashboard ordersData={ordersData} usersData={usersData} productData={productData} />} />}
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
        {/* <Route
          exact
          path="/editproduct"
          render={() => <AdminLayout body={<EditProduct product={editProductData}/>}/>}
        /> */}
      </Switch>
    </Router>
  );
}

export default App;
