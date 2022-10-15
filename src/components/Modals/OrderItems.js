import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Feedback from "./Feedback";

const style = {
  position: "absolute",
  overflow: "scroll",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


if (window.screen.width < 600) {
  style.width = 350;
}

const useStyles = makeStyles((theme) => ({
  model: {
    overflow: "scroll",
    background: "black",
  },
  root: {
    marginTop: 20,
  },
  row: {
    "&:hover": {
      background: "rgba(245,245,245,0.9)",
    },
  },
  pointer: {
    cursor: "pointer",
  },
  button: {
    position: "relative",
    left: "78%",
    [theme.breakpoints.down("xs")]: {
      left: "10%",
      top: "-10px",
    },
  },
  div: {
    position: "relative",
  },
}));

export default function (props) {

  const api="https://intelli--mall.herokuapp.com/"
 

  const classes = useStyles();
  const [getStatus, setStatus] = useState("In Progress");

  const [orderData, setOrderData] = useState({
    name: "",
    address: "",
    price: "",
    phone: "",
  });

  useEffect(() => {
    setOrderData(props.user);
    if (props.user.status != undefined) {
      setStatus(props.user.status);
    }
  }, [props.user]);

  // MARK AS COMPLETE FUNCTION
  const markCompleteHandler = () => {
    let date = new Date();
    let ddate =date.getFullYear() +"-" +date.getMonth() +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":" +date.getSeconds();

    const params = {
      id: props.order_id.id,
      date: ddate,
    };

    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };

    fetch(api + "order", options)
      .then((response) => response.json())
      .then((response) => {
        if (response.affectedRows > 0) {
          // feedback(props.order_id);
          props.changeState();
        }
      });
    props.handleClose();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {getStatus != "Completed" ? (
            <Button
              sx={{ background: "rgba(244, 130, 31,0.9)" }}
              className={classes.button}
              onClick={markCompleteHandler}
              type="submit"
              variant="contained"
            >
              Mark As Complete
            </Button>
          ) : (
            <Button
              className={classes.button}
              onClick={markCompleteHandler}
              type="submit"
              variant="contained"
              disabled
            >
              Completed
            </Button>
          )}
          {orderData.name != "" ? (
            <div>
              <Typography
                variant="h1"
                component="h5"
                sx={{ fontSize: 20, margin: "5px 0" }}
              >
                <span style={{fontWeight:"bold"}}>Name: </span> {orderData.name}
              </Typography>

              <Typography
                variant="h1"
                component="h5"
                sx={{ fontSize: 20, margin: "5px 0" }}
              >
                <span style={{fontWeight:"bold"}}>Address: </span> {orderData.address}
              </Typography>

              <Typography
                variant="h1"
                component="h5"
                sx={{ fontSize: 20, margin: "5px 0" }}
              >
                <span style={{fontWeight:"bold"}}>Phone: </span> {orderData.phone}
              </Typography>

              <Typography
                variant="h1"
                component="h5"
                sx={{ fontSize: 20, margin: "5px 0" }}
              >
                <span style={{fontWeight:"bold"}}>Price: </span> {orderData.price}
              </Typography>

              <Typography
                variant="h1"
                component="h5"
                sx={{ fontSize: 20, margin: "5px 0" }}
              >
                <span style={{fontWeight:"bold"}}>Last Updated: </span> {orderData.last_updated_at}
              </Typography>
            </div>
          ) : null}
          <TableContainer className={classes.root} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Images</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left" className={classes.status}>
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.orderItems.map((items) => (
                  <TableRow
                    key={items.id}
                    className={classes.row}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <input
                        width="70"
                        height="70"
                        type="image"
                        src={items.product.image_url}
                        label="Image"
                        color="primary"
                        focused
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {items.product.title}
                    </TableCell>
                    <TableCell align="left">{items.quantity}</TableCell>
                    <TableCell align="left">{items.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {getStatus == "Completed" ? <Feedback order_id={props.order_id} orderData={orderData}/> : null}
        </Box>
      </Modal>
    </div>
  );
}