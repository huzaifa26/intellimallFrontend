import React from "react";
import DashboardCard from "../layout/DashboardCard";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard=(props)=>{
    const [orders,setOrders]=useState([]);
    const [users,setUsers]=useState([]);
    const [product,setProduct]=useState([]);

    useEffect(()=>{
        setOrders(()=> props.ordersData)
        setUsers(()=> props.usersData)
        setProduct(()=> props.productData)
    },[])

    return(
        <div style={{display:"flex", flexWrap: "wrap"}}>
            <DashboardCard
                name={"Orders"}
                length={orders.length}
            />
            <DashboardCard
                name={"Users"}
                length={users.length}
            />

            <DashboardCard
                name={"Products"}
                length={product.length}
            />

        </div>
    )
};

export default Dashboard;