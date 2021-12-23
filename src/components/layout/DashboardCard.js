import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: "300px",
      height: "200px",
      padding: "15px",
      marginTop: "20px",
      margin: "0 10px",
      boxShadow:"2px 2px 8px rgba(0,0,0,0.2)",
      background:"rgba(244, 130, 31,0.9)"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      color:"rgba(255,255,255,0.7)"
    },
    pos: {
      marginBottom: 12,
    },
    cardAction: {
      marginTop:"20px"
    },
    mainText:{
      color:"white",
      fontSize:"28px"
    }
  });

const DashboardCard = props =>{

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


    return(
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {props.name}
                </Typography>
                <Typography className={classes.mainText} variant="h5" component="h2">
                {props.length + " " + props.name}
                </Typography>
                {/* <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography> */}
            </CardContent>
            {/* <CardActions className={classes.cardAction}>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    )
}

export default DashboardCard