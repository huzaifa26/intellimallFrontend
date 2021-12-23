import React from "react";
import DashboardCard from "../layout/DashboardCard";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard=(props)=>{
    // const [orders,setOrders]=useState([]);
    // const [users,setUsers]=useState([]);
    // const [product,setProduct]=useState([]);
    // const [totalearning,settotalearning]=useState([]);


    // useEffect(()=>{
    //     setOrders(()=> props.ordersData)
    //     setUsers(()=> props.usersData)
    //     setProduct(()=> props.productData)
    //     settotalearning(()=> props.totalearning)
    // },[])

    // const api="https://intellimall.run-ap-south1.goorm.io/"
  const api="https://intelli-mall.herokuapp.com/"
  // const api = "localhost:5000/";




    const [ordersData,setOrdersData]=useState([]);
    const [usersData,setUsersData]=useState([]);
    const [productData,setProductData]=useState([]);
    const [totalearning,settotalearning]=useState(0);
  
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
        settotalearning(response[0].price)
      } );
    },[])


    return(
        <div style={{display:"flex", flexWrap: "wrap"}}>
            <DashboardCard
                name={"Orders"}
                length={ordersData.length}
            />
            <DashboardCard
                name={"Users"}
                length={usersData.length}
            />

            <DashboardCard
                name={"Products"}
                length={productData.length}
            />

            <DashboardCard
                name={"Total earning"}
                length={totalearning}
            />
        </div>
    )
};

export default Dashboard;