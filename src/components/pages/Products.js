import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import EditProduct from "../Modals/EditProduct";
import { useState, useEffect } from "react";
import { useCallback } from "react";



const useStyles = makeStyles({
    root: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    },
    card:{
        width:'300px',
        margin:'15px 25px',
        cursor:'pointer'
    },
    price:{
        marginLeft:"7px"
    },
    button:{
        position:'absolute',
        left:'25px',
    }
  });

const Products=(props)=>{
//   const api="https://intellimall.run-ap-south1.goorm.io/"
    const api="https://intelli-mall.herokuapp.com/"
//   const api = "localhost:5000/";



    const history = useHistory();
    const classes = useStyles();
    const [getServerProduct, setServerProduct] = useState([]);


    const fetchData=()=>{
        fetch(api+'product')
        .then( response => response.json() )
        .then( response => {
            setServerProduct(response)  
        } );
    }

    const addProductHandler=()=>{
        history.push("/addProduct")
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);}
    const [getProduct, setGetProduct] = useState();

    const changeState= useCallback(()=>{
        console.log("USECALL BACK")
        fetch(api+'product')
        .then( response => response.json() )
        .then( response => {
            setServerProduct(response)  
        } );
    },[])

    useEffect(()=>{
        fetchData();
    },[])

    

    return (
        <div>
            <EditProduct changeState={changeState} product={getProduct} handleClose={handleClose} open={open}/>
            <Button style={{backgroundColor:'rgb(244, 130, 31)'}} onClick={addProductHandler} className={classes.button} variant="contained">Add Product</Button>
            <div className={classes.root}>
                {getServerProduct.map((product)=>{
                    return(
                    <Card onClick={()=>{handleOpen(); setGetProduct(()=> product)}} className={classes.card} sx={{ maxWidth: 345 }} key={product.id}>
                        <CardMedia
                            component="img"
                            height="140"
                            width="100"
                            image={product.image_url}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">{product.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                        </CardContent>
                        <CardActions className={classes.price}>
                            <Typography variant="h5" component="div">{product.price}</Typography>
                            {/* <Button size="small">Learn More</Button> */}
                        </CardActions>
                    </Card>
                    )
                })}  
            </div>  
        </div>
    )
};

export default Products;