import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  DestinationSearch: {originPlace: {}; destinationPlace: {}};
  DriverScreen: {
    originPlace: {
      data: {
        [key: string]: any;
      };
      details: {
        [key: string]: any;
      };
    };
    destinationPlace: {
      data: {
        [key: string]: any;
      };
      details: {
        [key: string]: any;
      };
    };
  };
  SearchResults: {
    originPlace: {
      data: {
        [key: string]: any;
      };
      details: {
        [key: string]: any;
      };
    };
    destinationPlace: {
      data: {
        [key: string]: any;
      };
      details: {
        [key: string]: any;
      };
    };
  };
};

type SearchResultScreenRouteProp = RouteProp<
  RootStackParamList,
  'SearchResults'
>;

type SearchResultNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SearchResults'
>;

type DriverScreenRouteProp = RouteProp<RootStackParamList, 'DriverScreen'>;

type DriverNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DriverScreen'
>;

export type SearchProps = {
  route: SearchResultScreenRouteProp;
  navigation: SearchResultNavigationProp;
};

export type DriverProps = {
  route: DriverScreenRouteProp;
  navigation: DriverNavigationProp;
};

export type Order = {
  id?: string;
  type?: string;
  originLatitude?: number;
  oreiginLongitude?: number;
  destLatitude?: number;
  destLongitude?: number;
  user?: {name: string; rating: number};
  pickedUp?: boolean;
  isFinished?: boolean;
  duration?: number;
  distance?: number;
};

export type DataProps = {
  origin: {
    data: {
      [key: string]: any;
    };
    details: {
      [key: string]: any;
    };
  };
  destination: {
    data: {
      [key: string]: any;
    };
    details: {
      [key: string]: any;
    };
  };
};
