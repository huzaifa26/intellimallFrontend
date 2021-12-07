import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    Paper,
    TableCell,
    TableRow,
    TableHead,
    Table,
    TableContainer,
    TableBody,
    TablePagination,
    Toolbar,
    TextField,
    InputAdornment,
    IconButton,
  } from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles((theme) => ({
    root: {
      width: "500px",
      height: "300px",
      padding: "15px",
      marginTop: "20px",
      margin: "0 10px",
      boxShadow:"2px 2px 8px rgba(0,0,0,0.2)",
      position: "absolute",
      top:"50%",
      left:"50%",
      transform:"translate(-50%,-50%)",
      backdropFilter: "blur(3px)",
      backgroundColor:'rgba(0,0,30,0.4)'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      marginLeft:"1000px"

    },
    table: {
        marginTop: theme.spacing(3),
        "& thead th": {
          fontWeight: "600",
          color: theme.palette.primary.main,
          backgroundColor: "#3c44b126",
        },
        "& tbody td": {
          fontWeight: "300",
        },
        "& tbody tr:hover": {
          backgroundColor: "#fffbf2",
          cursor: "pointer",
        },
      },
  }));


const LocationModal= props => {
  const classes = useStyles();

    return(
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"More Information"}</DialogTitle>
        <DialogContent>
        <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Access Code</TableCell>
              <TableCell>Is story building</TableCell>
              <TableCell>Number of stories</TableCell>
              {/* <TableCell>Longitude</TableCell> */}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
              <TableRow>
                <TableCell>{"Fire Alarm: " + props.accessCode.fire_alarm}</TableCell>
                <TableCell>{props.isStoryBuilding}</TableCell>
                <TableCell>{props.noOfStories}</TableCell>
                <TableCell>{}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>{"Gate: "  + props.accessCode.gate}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>{}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>{"Security Code: " + props.accessCode.security_alarm}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>{}</TableCell>
              </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>

    )
}

export default LocationModal;

