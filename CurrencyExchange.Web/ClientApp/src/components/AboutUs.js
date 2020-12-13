import React from 'react';
import { useGoogleMaps } from "react-hook-google-maps";
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 64
  },
  grid: {
    alignItems: "center",
    justifyContent: "cetner"
  },
}));

function AboutUs() {

  const classes = useStyles();
  const marker = { lat: 43.223430, lng: 27.931020 };

  const { ref, map, google } = useGoogleMaps(
    "AIzaSyBxh3I0ajqyB6821FjjrN-X4paZWJbY2PE",
    {
      center: marker,
      zoom: 17,
    },
  );

  if (map) {
    new google.maps.Marker({ position: marker, map });
  }

  return (
    <div>
      <div ref={ref} style={{ width: 600, height: 400 }} />
    </div>
  );
}

export default AboutUs;
