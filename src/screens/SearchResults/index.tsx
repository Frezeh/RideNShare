import React from 'react';
import {View, Dimensions, Text, Pressable} from 'react-native';
import RouteMap from '../../components/RouteMap';
import CarTypeRow from '../../components/CarTypeRow';
import typesData from '../../assets/data/types';

import {SearchProps} from '../../../types';

const SearchResults = ({route, navigation}: SearchProps) => {
  const {originPlace, destinationPlace} = route.params;

  const confirm = () => {
    navigation.navigate('DriverScreen', {
      originPlace,
      destinationPlace,
    });
  };

  return (
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <RouteMap origin={originPlace} destination={destinationPlace} />
      </View>

      <View style={{height: 400}}>
        <View>
          {typesData.map((type) => (
            <CarTypeRow type={type} key={type.id} />
          ))}

          <Pressable
            onPress={confirm}
            style={{
              backgroundColor: 'black',
              padding: 10,
              margin: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Confirm Ride
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SearchResults;
