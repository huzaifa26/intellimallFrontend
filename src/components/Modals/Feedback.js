import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const Feedback=(props)=>{
//   const api = "localhost:5000/";
const api="http://intelli-mall.herokuapp.com/"


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
        <div>
        <Typography
            variant="h1"
            component="h5"
            sx={{ fontSize: 20, margin: "5px 0" }}
            >
            {"Feedback"}
        </Typography>

        <Typography
            variant="h1"
            component="h5"
            sx={{ fontSize: 20, margin: "5px 0" }}
            >
            Comment: {feedback.comment}
        </Typography>

        <Typography
            variant="h1"
            component="h5"
            sx={{ fontSize: 20, margin: "5px 0" }}
            >
            Rating: {feedback.rating}
        </Typography>
        </div>
    )
}


export default Feedback;