import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { MenuItem, Card, Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Map from "../../Map/Map";

import { db, storage } from "../../firebase/firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddLocation = ({ open, handleClose, apiKey }) => {
  const classes = useStyles();
  const [address, setaddress] = useState();
  const [story, setstory] = useState();
  const [latitude, setlatitude] = useState(12);
  const [longitude, setlongitude] = useState(43);
  const [floorplan, setFloorplan] = useState();
  const [error, setError] = useState();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFloorplan(e.target.files[0]);
    }
  };

  const adduser = (e) => {
    e.preventDefault();
    const uploadfloorplan = storage
      .ref(`floorplans/${floorplan.name}`)
      .put(floorplan);
    uploadfloorplan.on(
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("floorplans")
          .child(floorplan.name)
          .getDownloadURL()
          .then(async (url) => {
            try {
              const checkLocation = await db
                .collection("Location")
                .where("address", "==", address)
                .get();

              if (checkLocation.empty) {
                e.target.reset();
                const res = await db.collection("Location").add({
                  created_on: firebase.firestore.FieldValue.serverTimestamp(),
                  address: address,
                  last_updated_at:
                    firebase.firestore.FieldValue.serverTimestamp(),
                  is_story_building: story,
                  latitude: latitude,
                  longitude: longitude,
                  floorplan: url,
                });
              } else {
                setError("A Location with same Address Already Exists");
              }
            } catch (error) {
              console.log(error);
            }
          });
      }
    );
  };

  return (
    <Card style={{ padding: "10px", marginTop: "20px", maxWidth: "1220px" }}>
      <form className={classes.form} onSubmit={adduser}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* {
              <Map
                latitude={latitude}
                longitude={longitude}
                setlatitude={setlatitude}
                setlongitude={setlongitude}
                apiKey={apiKey}
              />
            } */}
            <Typography
              variant="h5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {" "}
              Map will Come Here
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="address"
              name="address"
              variant="outlined"
              required
              fullWidth
              id="address"
              label="Address"
              autoFocus
              onChange={(e) => setaddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              select
              variant="outlined"
              required
              fullWidth
              id="story_building"
              label="Type of Building"
              name="story_building"
              onChange={(e) => setstory(e.target.value)}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <CloudUploadIcon color="primary" /> <span>Upload Floor Plan</span>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Location
        </Button>
      </form>
    </Card>
  );
};

export default AddLocation;
