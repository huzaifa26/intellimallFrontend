import React from "react";
import DashboardCard from "../layout/DashboardCard";
import { useState } from "react";
import { useEffect } from "react";



const Dashboard=(props)=>{
  const api="https://intelli-mall.herokuapp.com/"

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

      return()=>{
        setOrdersData([])
      }
    },[])
  
    useEffect(()=>{
      fetch( api+'user' )
      .then( response => response.json() )
      .then( response => {
        setUsersData(response)
      } );

      return()=>{
        setUsersData([])
      }
    },[])
  
    useEffect(()=>{
      fetch( api+'product' )
      .then( response => response.json() )
      .then( response => {
        setProductData(response)
      } );

      return()=>{
        setProductData([])
      }
    },[])
  
    useEffect(()=>{
      fetch( api+'totalearning' )
      .then( response => response.json() )
      .then( response => {
        settotalearning(response[0].price)
      } );

      return()=>{
        settotalearning([])
      }
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