import React from "react";
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
import Button from '@mui/material/Button';

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

const Allorders = (props) => {
  const [age, setAge] = React.useState('');

  const [ordersData, setOrdersData] = useState();
  const [usersData, setUsersData] = useState();
  const [productData, setProductData] = useState();
  const [editProductData, setEditProductData] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();
  const [getOrder, setOrder] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [getOrderFromServer, setOrderFromServer] = useState([]);


  useEffect(()=>{
      fetch( 'http://localhost:5000/order' )
      .then( response => response.json() )
      .then( response => {
        setOrderFromServer(response)
      } );
  },[]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const editOrderHandler = (order) => {
    fetch('http://localhost:5000/orderitems/' + order.id)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setOrderItems(response)
      });

    setOrder(order);
    handleOpen();
  }

  return (
    <div>
      <OrderItems orderItems={orderItems} open={open} handleClose={handleClose} />
      <TableContainer className={classes.root} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right" className={classes.status}>Status</TableCell>
              {/* <TableCell align="right" className={classes.status}>Update Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {getOrderFromServer?.map((order) => (
              <TableRow
                onClick={() => { editOrderHandler(order) }}
                key={order.id}
                className={classes.row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={classes.pointer} component="th" scope="row">
                  {order.name}
                </TableCell>
                <TableCell align="right">{order.price}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                {/* <TableCell align="right">
                        {order.status === "In progress" && <Button onClick={()=>{markCompleteHandler(order.id)}} type="submit" variant="contained">Mark As Complete</Button>}
                      </TableCell>  */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};

export default Allorders;