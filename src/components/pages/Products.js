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
    const history = useHistory();
    const classes = useStyles();

    const addProductHandler=()=>{
        history.push("/addProduct")
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [getProduct, setGetProduct] = useState();
    const [getServerProduct, setServerProduct] = useState([]);


    useEffect(()=>{
        fetch('http://localhost:5000/product')
        .then( response => response.json() )
        .then( response => {
            console.log(response)
            setServerProduct(response)
        } );
    },[])


    return (
        <div>
            <EditProduct product={getProduct} handleClose={handleClose} open={open}/>
            <Button onClick={addProductHandler} className={classes.button} variant="contained">Add Product</Button>
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