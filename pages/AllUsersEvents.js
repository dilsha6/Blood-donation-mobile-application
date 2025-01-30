import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { firebase } from "../firebase/config";
import Icon from "react-native-vector-icons/FontAwesome";
import MyImage from "../assets/event.jpg";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const AllUsersEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FF1515",
      },
      headerTintColor: "#FF1515",
      headerShown: true,
      title: "Blood Donation Events",
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("events")
      .onSnapshot((snapshot) => {
        const events = [];
        snapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        setUserEvents(events);
      });

    return () => unsubscribe();
  }, []);

  // Filter events based on selected district
  const filteredEvents = selectedDistrict
    ? userEvents.filter((event) => event.district === selectedDistrict)
    : userEvents;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.search}>Search Events using District</Text>

      <View style={styles.dropdownContainer}>
        <Text style={{ fontSize: 17 }}>Select District: </Text>
        <View style={styles.select1}>
          <Picker
            selectedValue={selectedDistrict}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
          >
            <Picker.Item label="Select District" value="" />
            <Picker.Item label="Kasargode" value="Kasargode" />
            <Picker.Item label="Kannur" value="Kannur" />
            <Picker.Item label="Kozhikode" value="Kozhikode" />
            <Picker.Item label="Wayanad" value="Wayanad" />
            <Picker.Item label="Malappuram" value="Malappuram" />
            <Picker.Item label="Thrissur" value="Thrissur" />
            <Picker.Item label="Palakkad" value="Palakkad" />
            <Picker.Item label="Ernakulam" value="Ernakulam" />
            <Picker.Item label="Idukki" value="Idukki" />
            <Picker.Item label="Kottayam" value="Kottayam" />
            <Picker.Item label="Alappuzha" value="Alappuzha" />
            <Picker.Item label="Pathanamthitta" value="Pathanamthitta" />
            <Picker.Item label="Kollam" value="Kollam" />
            <Picker.Item label="Thiruvananthapuram" value="Thiruvananthapuram" />
          </Picker>
        </View>
      </View>

      {filteredEvents.map((event) => (
        <View key={event.id} style={styles.eventContainer}>
          <View>
            <Image source={MyImage} style={styles.cardBackground} />

            <Text style={styles.district}>{event.district}</Text>

            <Icon
              name="thumb-tack"
              size={30}
              color="#FF1515"
              style={styles.pin}
            />

            <Text style={styles.organizerName}>
              We cordially invite you to participate in our upcoming Blood
              Donation Drive organized by '{event.organizerName}'.
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Date:</Text> {event.date}
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Time:</Text> {event.startTime} to{" "}
              {event.endTime}
            </Text>
            <Text style={styles.details}>
              <Text style={styles.bold}>Location:</Text> {event.venue}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pin: {
    margin: 20,
    marginTop: -20,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 20,
  },
  select1: {
    borderWidth: 1,
    borderColor: "#FF1515",
    borderRadius: 10,
    marginLeft: 45,
  },
  search: {
    fontSize: 18,
    color: "#FF1515",
    fontStyle: "italic",
    margin: 10,
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: "40%",
    marginBottom: 10,
    color: "#FF1515",
    borderWidth: 1,
    borderColor: "#FF1515",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventContainer: {
    marginBottom: 20,
    paddingBottom: 10,
  },
  cardBackground: {
    width: "95%",
    height: 260,
    borderRadius: 10,
    backgroundColor: "rgba(255, 70, 70, 1)",
    marginTop: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#FF1515",
  },
  organizerName: {
    textAlign: "center",
    marginTop: 50,
    fontWeight: "600",
    fontSize: 18,
    margin: 10,
    color: "#FF1515",
    fontStyle: "italic",
  },
  header: {
    textAlign: "center",
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 22,
    margin: 20,
    fontStyle: "italic",
  },
  details: {
    marginBottom: 5,
    marginLeft: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  district: {
    marginTop: -255,
    fontWeight: "bold",
    alignSelf: "flex-end",
    color: "#FF1515",
    marginRight: 20,
  },
});

export default AllUsersEvents;
