import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Map, {GeolocateControl, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
const Maps = ({location}) => {
    const [viewport, setViewport] = useState({zoom:1,longitude:0,latitude:0});
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(() => {
        if(location){
            setViewport({
              ...viewport,
              zoom:5,
              longitude: location.geo.lat,
              latitude:location.geo.lng
        })
    }})}, [location]);
    return (
        <>
        {location?<div className='w-1/2'>
                    <Box sx={{width:800 ,height: 800,backgroundColor: 'primary.dark',}}>
                        <Map
                            mapboxAccessToken="pk.eyJ1IjoiaGFyaXRzaGFybWEiLCJhIjoiY2w3cjBmZmxnMDJwMDN2b3Y2bjgzZ3JtayJ9.fRjq3am2iIfuxD8Iw4t3mw"
                            initialViewState={viewport}
                            mapStyle="mapbox://styles/mapbox/streets-v11">
                            <GeolocateControl positionOptions={{ enableHighAccuracy: true}}/>
                            <Marker longitude={viewport.longitude} latitude={viewport.latitude}/>
                        </Map>
                    </Box>
            </div>:""
        }
        </>
    );
}

export default Maps;
