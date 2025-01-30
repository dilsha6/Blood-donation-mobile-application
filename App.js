import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase } from "./firebase/config";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import AllDonors from "./pages/AllDonor";
import DonarDetails from "./pages/DonorDetails";
import AllUsersEvents from "./pages/AllUsersEvents";
import DonorDay from "./pages/DonorDay";
import Requirements from "./pages/Requirements";
import Benefits from "./pages/Benefits";
import MapView from "./pages/MapView";

const Stack = createNativeStackNavigator();
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AllDonor" component={AllDonors} />
      <Stack.Screen name="DonorDetails" component={DonarDetails} />
      <Stack.Screen name="AllUsersEvents" component={AllUsersEvents} />
      <Stack.Screen name="DonorDay" component={DonorDay} />
      <Stack.Screen name="Requirements" component={Requirements} />
      <Stack.Screen name="Benefits" component={Benefits} />
      <Stack.Screen name="MapView" component={MapView} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
