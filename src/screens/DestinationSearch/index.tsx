import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import PlaceRow from "./PlaceRow";

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 6.5243793, lng: 3.3792057 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 6.5243793, lng: 3.3692057 } },
};

const DestinationSearch = () => {
  const [originPlace, setOriginPlace] = useState<{} | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<{} | null>(null);

  const navigation = useNavigation();

  const checkNavigation = () => {
    if (originPlace && destinationPlace) {
      navigation.navigate('SearchResults', {
        originPlace,
        destinationPlace,
      })
    }
  }

  useEffect(() => {
    checkNavigation();
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
       
        <GooglePlacesAutocomplete
          placeholder="Search pick-up location"
          onPress={(data, details = null) => {
            setOriginPlace({data, details});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'YOUR_GOOGLE_API_KEY',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description}
          // renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        <GooglePlacesAutocomplete
          placeholder="Search destination"
          onPress={(data, details = null) => {
            setDestinationPlace({data, details});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'YOUR_GOOGLE_API_KEY',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
        />

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />

      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
