import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {DataProps} from '../../../types';

const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_API_KEY';

const RouteMap = ({origin, destination}: DataProps) => {
  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: origin.details.geometry.location.lat,
        longitude: origin.details.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="black"
      />
      <Marker coordinate={originLoc} title={'Origin'} />
      <Marker coordinate={destinationLoc} title={'Destination'} />
    </MapView>
  );
};

export default RouteMap;
