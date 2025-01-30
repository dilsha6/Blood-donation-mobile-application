import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, PermissionsAndroid } from 'react-native';

const GeolocationExample = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Check and request location permission for Android
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app requires access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If permission is granted, get the current location
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            (error) => setErrorMsg(error.message)
          );
        } else {
          setErrorMsg('Location permission denied.');
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    // Call the function to get location when component mounts
    getLocation();

    // Clean up any event listeners or subscriptions
    return () => {
      // You can clear any subscriptions here if needed
    };
  }, []);

  return (
    <View>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

<MapView
  provider={MapView.PROVIDER_GOOGLE}
  style={{ flex: 1 }}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Marker
    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
    title="Marker Title"
    description="Marker Description"
  />
</MapView>
export default GeolocationExample;

