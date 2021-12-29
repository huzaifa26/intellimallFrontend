import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const Feedback=(props)=>{
    const api="https://intelli-mall.herokuapp.com/"


    const [feedback,setFeedback]=useState([{
        comment:"",
        rating:0
    }]);

    useEffect(()=>{
        fetch(api+"feedback/" + props.orderData.user_id + "/"+ props.order_id.id)
        .then( response => response.json() )
        .then( response => {
            setFeedback(response)
        } );
    },[props.orderData])


    return(
        <div style={{marginTop:"50px", boxShadow:"0px 0px 1px 0.1px", borderRadius:"5px", padding:10}}>
        <Typography
            variant="h1"
            component="h5"
            sx={{ fontSize: 20, margin: "5px 0" }}
            >
            <span style={{fontWeight:"bold"}}>Feedback:</span> {feedback.status}
        </Typography>

        <Typography
            variant="h1"
            component="h5"
            sx={{ fontSize: 20, margin: "5px 0" }}
            >
            <span style={{fontWeight:"bold"}}>Comment:</span> {feedback.comment}
        </Typography>

        <Typography
            variant="h1"
            component="h5"
            sx={{ fontSize: 20, margin: "5px 0" }}
            >
            <span style={{fontWeight:"bold"}}>Rating:</span> {feedback.rating}
        </Typography>
        </div>
    )
}


export default Feedback;