import * as React from 'react';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OrderItems from "../Modals/OrderItems";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height:500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
    root: {
        marginTop: 20,
    },
    row: {
        "&:hover":{
            background:"rgba(245,245,245,0.9)"
        }
    },pointer:{
      cursor:'pointer'
    }
  });

export default function (props) {

    const classes = useStyles();
    const [orderItems,setOrderItems]=useState([])

    const markCompleteHandler=()=>{
        console.log(props.orderItems[0].order_id)
        const params={
          id:props.orderItems[0].order_id,
      }
  
      const options={
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( params )
    }
  
    fetch( 'http://localhost:5000/order', options )
              .then( response => response.json() )
              .then( response => {
                  console.log(response)
          });
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Button onClick={markCompleteHandler} type="submit" variant="contained">Mark As Complete</Button>
        
        <TableContainer className={classes.root} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right" className={classes.status}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.orderItems.map((items) => (
                        <TableRow
                        key={items.id}
                        className={classes.row}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell className={classes.pointer} component="th" scope="row">
                            {items.title}
                        </TableCell>
                        <TableCell align="right">{items.quantity}</TableCell>
                        <TableCell align="right">{items.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}