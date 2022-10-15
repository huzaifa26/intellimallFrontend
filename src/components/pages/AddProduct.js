import React, { useRef, useState, useEffect } from "react";
import { Input, FormHelperText, InputLabel } from "@mui/material";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import Loader from "./../loader/Loader";

const useStyles = makeStyles((theme) => ({
  row: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "330px",
    },
  },
}));

const AddProduct = (props) => {
  const classes = useStyles();

  const api = "https://intelli--mall.herokuapp.com/";

  const history = useHistory();

  //LOADER SETTING
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);}


  const [file, setFile] = useState();

  const title = useRef();
  const description = useRef();
  const image_url = useRef();
  const price = useRef();
  const category = useRef();
  const last_updated_at = useRef();

  const addProductHandler = (e) => {
    e.preventDefault();


    let date = new Date();
    let ddate =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    const params = {
      title: title.current.value,
      description: description.current.value,
      image_url: file,
      price: price.current.value,
      category: category.current.value,
      date: ddate,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    };

    fetch(api + "product", options)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response)
        history.push("/products");
      });
  };

  const convertImageToBase64 = (image) => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async (e) => {
      setFile(() => e.target.result);
    };
  };

  return (
    <form onSubmit={addProductHandler}>
        {/* <Loader open={open} handleClose={handleClose}/> */}
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <FormControl>
          <TextField
            className={classes.row}
            inputRef={title}
            label="Title"
            color="warning"
          />
        </FormControl>

        <FormControl>
          <TextField
            className={classes.row}
            inputRef={description}
            multiline
            minRows="3"
            maxRows="6"
            label="Description"
            color="warning"
          />
        </FormControl>

        <FormControl>
          <TextField
            className={classes.row}
            onChange={() => {
              convertImageToBase64(image_url.current.files[0]);
            }}
            inputRef={image_url}
            type="file"
            color="warning"
          />
        </FormControl>

        <FormControl>
          <TextField
            className={classes.row}
            inputRef={price}
            type="number"
            label="Price"
            color="warning"
          />
        </FormControl>

        <FormControl>
          <InputLabel color="warning">Category</InputLabel>
          <Select
            inputRef={category}
            className={classes.row}
            color="warning"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            {/* ["Beverages","Bread","Canned Goods","Dairy","Dry Goods","Frozen Foods","Meat"] */}
            <MenuItem value={"beverages"}>beverages</MenuItem>
            <MenuItem value={"bread"}>bread</MenuItem>
            <MenuItem value={"canned goods"}>canned goods</MenuItem>
            <MenuItem value={"dairy"}>dairy</MenuItem>
            <MenuItem value={"dry goods"}>dry doods</MenuItem>
            <MenuItem value={"frozen foods"}>frozen foods</MenuItem>
            <MenuItem value={"meat"}>meat</MenuItem>
          </Select>
        </FormControl>

        <div>
          <Button
            style={{ backgroundColor: "rgb(244, 130, 31)" }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default AddProduct;
