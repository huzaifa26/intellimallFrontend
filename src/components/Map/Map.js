// GEOCODE API TEST
//   https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
// +Mountain+View,+CA&key=AIzaSyCjQY4CjdsL-C83_sSbLzP4cwDy8dkSmmY


// PLACES API TEST
// https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name%2Crating%2Cformatted_phone_number&key=AIzaSyCjQY4CjdsL-C83_sSbLzP4cwDy8dkSmmY


// MAPS API TEST
// https://maps.googleapis.com/maps/api/js?key=AIzaSyCjQY4CjdsL-C83_sSbLzP4cwDy8dkSmmY&libraries=places

import React, { useState, useRef, useCallback } from "react";
// import AutoCompleteComponent from "./AutoComplete";
import {
  GoogleMap,
  // useLoadScript,
  // Marker,
  // InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

import { useJsApiLoader } from '@react-google-maps/api';

const center = {
  lat: 	21.422487,
  lng: 39.826206
};

const mapStyles = {
    maxWidth: "12000px",
    height: "550px",
  };

const libraries=["places"];

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "",
    libraries,
  })

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({lat,lng},address)=>{
    console.log({lat,lng},address)
    props.getCoordinate({lat,lng},address)
    mapRef.current.panTo({lat,lng})
    mapRef.current.setZoom(14);
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div>
      <AutoCompleteComponent panTo={panTo}/>
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={mapStyles}
        onLoad={onMapLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      </div>
  ) : <></>
}



// SEARCH OPTION CODE
const AutoCompleteComponent = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng }, address);
        } catch (error) {
            console.log("Error: ", error);
        }
  };

  return (
    <div
      style={{
        position: "relative",
        top: "2rem",
        left: "50%",
        zIndex: "10",
        width: "100%",
        maxWidth: "400px",
        transform: "translate(-25%)",
      }}
    >
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList >
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default React.memo(Map)

