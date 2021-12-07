import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    row: {
        cursor: 'pointer',
        "&:hover": {
            background: "rgba(245,245,245,0.9)"
        }
    },
});

const User = (props) => {
    const classes = useStyles();

    const [getUserData,setUserData]=useState([]);

    useEffect(()=>{
        fetch( 'http://localhost:5000/user' )
        .then( response => response.json() )
        .then( response => {
        setUserData(response)
        } );
      },[])

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
        fetch('http://localhost:5000/user', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            });
    }

    return (
        <TableContainer className={classes.root} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Is Allowed</TableCell>
                        <TableCell align="right">Actions</TableCell>
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
                            <TableCell align="right">{order.email_address}</TableCell>
                            <TableCell align="right">{order.phone}</TableCell>
                            <TableCell align="right">{order.address}</TableCell>
                            <TableCell align="right">{order.is_allowed_in_app}</TableCell>
                            <TableCell align="right" onClick={() => {
                                deleteUserHandler(order);
                            }}>{order.is_allowed_in_app === 1 ? <DeleteIcon /> : <DoneIcon />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default User;

