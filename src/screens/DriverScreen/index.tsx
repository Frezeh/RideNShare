/* eslint-disable */
import React, {useState} from 'react';
import {View, Text, Dimensions, Pressable} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import NewOrderPopup from '../../components/NewOrderPopup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DriverProps, Order} from '../../../types';

const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_API_KEY';

const DriverScreen = ({route, navigation}: DriverProps) => {
  const {originPlace, destinationPlace} = route.params;
  const [isOnline, setIsOnline] = useState(true);
  const [myPosition, setMyPosition] = useState({
    latitude: originPlace.details.geometry.location.lat,
    longitude: originPlace.details.geometry.location.lng,
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState<Order | null>({
    id: '1',
    type: 'Regular',

    originLatitude: originPlace.details.geometry.location.lat,
    oreiginLongitude: originPlace.details.geometry.location.lng,

    destLatitude: destinationPlace.details.geometry.location.lat,
    destLongitude: destinationPlace.details.geometry.location.lng,

    user: {
      rating: 4.8,
      name: 'Frank',
    },
  });

  const onDecline = () => {
    setNewOrder(null);
    navigation.goBack(); // go back to the previous screen
  };

  const onAccept = (newOrder: {}) => {
    setOrder(newOrder);
    setNewOrder(null);
  };

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onUserLocationChange = (event: any) => {
    setMyPosition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = (event: any) => {
    console.log('Direction found: ', event);
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: originPlace.details.geometry.location.lat,
      longitude: originPlace.details.geometry.location.lng,
    };
  };

  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#cb1a1a',
              width: 200,
              padding: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              COMPLETE {order.type}
            </Text>
          </View>
          <Text style={styles.bottomText}>{order?.user?.name}</Text>
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#d41212',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>
            Dropping off {order?.user?.name}
          </Text>
        </View>
      );
    }

    if (order && isOnline) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#1e9203',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order?.user?.name}</Text>
        </View>
      );
    }

    return <Text style={styles.bottomText}>You're offline</Text>;
  };

  return (
    <View>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 6.5243793,
          longitude: 3.3792057,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>
        {order && (
          <MapViewDirections
            origin={myPosition}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
          />
        )}
      </MapView>

      <Pressable style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: 'green'}}>₦</Text> 0.00
        </Text>
      </Pressable>

      <Pressable style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable style={[styles.roundButton, {top: 10, right: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable style={[styles.roundButton, {bottom: 110, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable style={[styles.roundButton, {bottom: 110, right: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      <Pressable onPress={onGoPress} style={styles.goButton}>
        <Text style={styles.goText}>{isOnline ? 'END' : 'GO'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Ionicons name={'options'} size={30} color="#4a4a4a" />
        {renderBottomTitle()}
        <Entypo name={'menu'} size={30} color="#4a4a4a" />
      </View>

      {newOrder && (
        <NewOrderPopup
          newOrder={newOrder}
          duration={2}
          distance={0.5}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
        />
      )}
    </View>
  );
};

export default DriverScreen;
