import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid lightblue',
  boxShadow: 24,
  borderRadius:'10px',
  p: 4,
  background:"white",
  width:"700px",
  height:"550px"
};

const style2={
    margin:"6px 4px"
}

export default function EditProduct(props) {
    
    const [file,setFile]=useState();

    const [product,setProduct]=useState({
            id:'',
            title:'',
            description:'',
            image_url:'',
            price:'',
            category:''
    });

    useEffect(()=>{
        if(props.product != undefined){
            setProduct({
                id:props.product.id,
                title:props.product.title,
                description:props.product.description,
                image_url:props.product.image_url,
                price:props.product.price,
                category:props.product.category
        })
        }
    },[props.handleClose])

    console.log(props)


    const title=useRef();
    const description=useRef();
    const image_url=useRef();
    const price=useRef();
    const category=useRef();
    const last_updated_at=useRef();


    const addProductHandler=(e)=>{
        e.preventDefault()

        if (file === undefined){
            setFile(()=> product.image_url)
        }
        
        const params={
            id:product.id,
            title:title.current.value,
            description:description.current.value,
            image_url:file,
            price:price.current.value,
            category:category.current.value,
        }

        console.log(params)

        const options={
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( params )
        }
        
        fetch( 'http://localhost:5000/product', options )
            .then( response => response.json() )
            .then( response => {
                console.log(response)
        });
    }

    const convertImageToBase64 = (image)=>{
        let reader= new FileReader();
            reader.readAsDataURL(image)
            reader.onload= async (e)=>{
            setFile(()=> e.target.result)
        }
    }

  return (
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={addProductHandler}>
            <Box sx={style}>
                <FormControl sx={style2}>
                    <TextField defaultValue={product.title} inputRef={title} sx={{ width: 500 }} label="Title" color="primary" focused />
                </FormControl>

                <FormControl sx={style2}>
                    <TextField defaultValue={product.description} inputRef={description} multiline minRows='3' maxRows="6" sx={{ width: 500 }} label="Description" color="primary" focused />
                </FormControl>

                <FormControl sx={style2}>
                    <input width="200" height="120"  type='image' src={product.image_url} label="Image" color="primary" focused/>
                </FormControl>  

                <FormControl sx={style2}>
                    <TextField onChange={() => {convertImageToBase64(image_url.current.files[0])}} inputRef={image_url} type='file' sx={{ width: 240 }} label="Image" color="primary" focused/>
                </FormControl>

                <FormControl sx={style2}>
                    <TextField defaultValue={product.price} inputRef={price} type='number' sx={{ width: 500 }} label="Price" color="primary" focused/>
                </FormControl>

                <FormControl sx={style2}>
                    <TextField defaultValue={product.category} inputRef={category} sx={{ width: 500 }} label="Category" color="primary" focused/>
                </FormControl>
                
                <div style={{margin:'4px 4px'}}>
                    <Button type="submit" variant="contained">Submit</Button>
                </div> 
            </Box>
        </form>
      </Modal>
  );
}
