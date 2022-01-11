import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OrderItems from "../Modals/OrderItems";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  row: {
    "&:hover": {
      background: "rgba(245,245,245,0.9)"
    }
  }, pointer: {
    cursor: 'pointer'
  }
});

const style1={
  width: '78vw'
}

if(window.screen.width<600){
  style1.width="87vw";
}

const Allorders = (props) => {
  const api="https://intelli--mall.herokuapp.com/"


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const [getOrder, setOrder] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [getOrderFromServer, setOrderFromServer] = useState([]);
  const [order_id, getOrder_id] = useState([]);
  const [user,setUser]=useState([]);

  const fetchData = () => {
    fetch(api + 'order')
      .then(response => response.json())
      .then(response => {
        setOrderFromServer(response)
      });
  }

  const changeState = useCallback(() => {
    console.log("USECALL BACK")
    fetch(api + 'order')
      .then(response => response.json())
      .then(response => {
        setOrderFromServer(response)
      });
  }, [])

  useEffect(() => {
    fetchData();
  }, []);

  // GETTING ORDER_ITEMS DATA W.R.T USER_ID AND OPEN MODEL
  const editOrderHandler = (order) => {
    fetch(api + 'orderitems/' + order.id)
      .then(response => response.json())
      .then(response => {
        setOrderItems(response)
      })
    setOrder(order);
    handleOpen();
  }

  return (
    <div>
      <OrderItems order_id={order_id} user={user} getOrderFromServer={getOrderFromServer} changeState={changeState} orderItems={orderItems} open={open} handleClose={handleClose} />
      <TableContainer sx={style1} className={classes.root} component={Paper}>
        <Table sx={{  }} aria-label="simple table">
          <TableHead sx={{background:"rgba(244, 130, 31,0.9)"}}>
            <TableRow >
              <TableCell sx={{color:"white", fontSize:"16px"}}>Name</TableCell>
              <TableCell sx={{color:"white", fontSize:"16px"}} align="center">Price</TableCell>
              <TableCell sx={{color:"white", fontSize:"16px"}} align="right" className={classes.status}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getOrderFromServer?.map((order) => (
              <TableRow
                onClick={() => { editOrderHandler(order); setUser(order); getOrder_id(order) }}
                key={order.id}
                className={classes.row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={classes.pointer} component="th" scope="row">{order.name}</TableCell>
                <TableCell align="center">{order.price}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default Allorders;