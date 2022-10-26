import React from "react";
import { View, Dimensions } from "react-native";
import HomeMap from '../../components/HomeMap';
import HomeSearch from '../../components/HomeSearch';

const HomeScreen = () => {
  return (
    <View>
      <View style={{ height: Dimensions.get('window').height - 270 }}>
        <HomeMap />
      </View>

      <HomeSearch />
    </View>
  );
};

export default HomeScreen;
