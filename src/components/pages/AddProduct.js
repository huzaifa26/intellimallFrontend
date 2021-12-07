import React, { useRef ,useState, useEffect } from 'react';
import { Input,FormHelperText,InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

const AddProduct = (props)=>{

    const [file,setFile]=useState();

    const title=useRef();
    const description=useRef();
    const image_url=useRef();
    const price=useRef();
    const category=useRef();
    const last_updated_at=useRef();

    const addProductHandler=(e)=>{
        e.preventDefault()
        
        const params={
            title:title.current.value,
            description:description.current.value,
            image_url:file,
            price:price.current.value,
            category:category.current.value,
        }

        console.log(params)

        const options={
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( params )
        }
        
        fetch( 'https://intellimall.run-ap-south1.goorm.io/product', options )
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

    console.log(file)

    return(
        <form onSubmit={addProductHandler}>
            <Box
                sx={{
                    '& > :not(style)': { m: 1 },}}
                >
                <FormControl>
                    <TextField inputRef={title} sx={{ width: 500 }} label="Title" color="primary" focused />
                </FormControl>

                <FormControl>
                    <TextField inputRef={description} multiline minRows='3' maxRows="6" sx={{ width: 500 }} label="Description" color="primary" focused />
                </FormControl>

                <FormControl>
                    <TextField onChange={() => {convertImageToBase64(image_url.current.files[0])}} inputRef={image_url} type='file' sx={{ width: 500 }} label="Image" color="primary" focused/>
                </FormControl>

                <FormControl>
                    <TextField inputRef={price} type='number' sx={{ width: 500 }} label="Price" color="primary" focused/>
                </FormControl>

                <FormControl>
                    <TextField inputRef={category} sx={{ width: 500 }} label="Category" color="primary" focused/>
                </FormControl>
                
                <div>
                    <Button type="submit" variant="contained">Submit</Button>
                </div> 
            </Box>
        </form>
    )
}

export default AddProduct;