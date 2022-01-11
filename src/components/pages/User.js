import React from "react";
import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles((theme)=>({
    root: {
        marginTop: 20,
        [theme.breakpoints.down("xs")]: {
            margin:"2px",
            position:'absolute',
            left:"2px",
        },
    },
    row: {
        cursor: 'pointer',
        "&:hover": {
            background: "rgba(245,245,245,0.9)"
        },  
    },
    table:{
        width:'79vw',
    },
}));

const User = (props) => {
    const api="https://intelli--mall.herokuapp.com/"

    const classes = useStyles();

    const [getUserData,setUserData]=useState([]);
    const [key,setKey]=useState(0);

    const fetchData=()=>{
        fetch( api+'user' )
        .then( response => response.json() )
        .then( response => {
        setUserData(response)   
        });
    }

    useEffect(()=>{
        fetchData()
      },[fetchData])

    const deleteUserHandler = (order) => {
        const params = {
            id: order.id,
            is_allowed_in_app: order.is_allowed_in_app
        }

        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }
        fetch(api+'user', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            });

        fetchData()
    }

    return (
        <TableContainer  className={classes.root} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead sx={{background:"rgba(244, 130, 31,0.9)"}}>
                    <TableRow >
                        <TableCell sx={{color:"white", fontSize:"16px"}}>Name</TableCell>
                        {window.screen.width>600 ?<TableCell sx={{color:"white", fontSize:"16px"}} align="left">Email</TableCell>:null}
                        <TableCell sx={{color:"white", fontSize:"16px"}} align="left">Phone</TableCell>
                        <TableCell sx={{color:"white", fontSize:"16px"}} align="left">Address</TableCell>
                        <TableCell sx={{color:"white", fontSize:"16px"}} align="left">Is Allowed</TableCell>
                        {window.screen.width>600 ?<TableCell sx={{color:"white", fontSize:"16px"}} align="left">Actions</TableCell>:null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getUserData.map((order) => (
                        <TableRow
                            key={order.id}
                            className={classes.row}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{order.name}</TableCell>
                            {window.screen.width>600 ?<TableCell align="left">{order.email_address}</TableCell>:null}
                            <TableCell align="left">{order.phone}</TableCell>
                            <TableCell sx={{width:"300px"}} align="left">{order.address}</TableCell>
                            <TableCell align="left">{order.is_allowed_in_app === 1 ? "Allowed":"Blocked"}</TableCell>
                            {window.screen.width>600 ?<TableCell align="left" onClick={() => {
                                deleteUserHandler(order);
                            }}>{order.is_allowed_in_app === 1 ? <BlockIcon /> : <DoneIcon />}</TableCell>:null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default User;

