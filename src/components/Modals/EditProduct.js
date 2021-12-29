import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Input, FormHelperText, InputLabel } from "@mui/material";

let style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid black",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  background: "white",
  width: "57vw",
  height: "610px",
};

if (window.screen.width < 600) {
  style.width = "80vw";
  style.height = "630px";
}

const style2 = {
  margin: "6px 4px",
};

const style3 = {
  color: "rgb(244, 130, 31)",
};

const style4 = {
  width: "550px",
};

if (window.screen.width < 600) {
  style4.width = "250px";
}

export default function EditProduct(props) {
  const api = "https://intelli-mall.herokuapp.com/";

  const [file, setFile] = useState();
  const [updatedFile, setUpdatedFile] = useState();

  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    image_url: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (props.product != undefined) {
      setProduct({
        id: props.product.id,
        title: props.product.title,
        description: props.product.description,
        image_url: props.product.image_url,
        price: props.product.price,
        category: props.product.category,
      });
    }
  }, [props.handleClose]);

  const title = useRef();
  const description = useRef();
  const image_url = useRef();
  const price = useRef();
  const category = useRef();
  const last_updated_at = useRef();

  const editProductHandler = (e) => {
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
      id: product.id,
      title: title.current.value,
      description: description.current.value,
      image_url: file,
      price: price.current.value,
      category: category.current.value,
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

    fetch(api + "product", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.affectedRows > 0) {
          props.changeState();
        }
      });
    props.handleClose();
  };

  const convertImageToBase64 = (image) => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async (e) => {
      setFile(() => e.target.result);
      setUpdatedFile(e.target.result)
    };
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={editProductHandler}>
        <Box sx={style}>
          <FormControl sx={style2}>
            <TextField
              defaultValue={product.title}
              inputRef={title}
              sx={style4}
              label="Title"
              color="warning"
            />
          </FormControl>

          <FormControl sx={style2}>
            <TextField
              defaultValue={product.description}
              inputRef={description}
              multiline
              minRows="3"
              maxRows="6"
              sx={style4}
              label="Description"
              color="warning"
            />
          </FormControl>

          <FormControl sx={style2}>
            <input
              width="200"
              height="120"
              type="image"
              src={updatedFile ? updatedFile : product.image_url}
              label="Image"
              color="warning"
            />
          </FormControl>

          <FormControl sx={style2}>
            <TextField
              onChange={() => {
                convertImageToBase64(image_url.current.files[0]);
              }}
              inputRef={image_url}
              type="file"
              sx={style4}
              label="Image"
              color="warning"
            />
          </FormControl>

          <FormControl sx={style2}>
            <TextField
              defaultValue={product.price}
              inputRef={price}
              type="number"
              sx={style4}
              label="Price"
              color="warning"
            />
          </FormControl>

          <FormControl sx={style2}>
            {/* <TextField InputLabelProps={{style3}} defaultValue={product.category} inputRef={category} sx={{ width: 500 }} label="Category" color="primary" focused/> */}
            <InputLabel>Category</InputLabel>
            <Select
              inputRef={category}
              sx={style4}
              color="warning"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              defaultValue={product.category}
            >
              <MenuItem value={"beverages"}>beverages</MenuItem>
              <MenuItem value={"bread"}>bread</MenuItem>
              <MenuItem value={"canned goods"}>canned goods</MenuItem>
              <MenuItem value={"dairy"}>dairy</MenuItem>
              <MenuItem value={"dry goods"}>dry doods</MenuItem>
              <MenuItem value={"frozen foods"}>frozen foods</MenuItem>
              <MenuItem value={"meat"}>meat</MenuItem>
            </Select>
          </FormControl>

          <div style={{ margin: "4px 4px" }}>
            <Button
              onClick={() => {
                if (file === undefined) {
                  setFile(() => product.image_url);
                }
              }}
              style={{ backgroundColor: "rgb(244, 130, 31)" }}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Box>
      </form>
    </Modal>
  );
}
