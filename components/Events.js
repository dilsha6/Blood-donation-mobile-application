import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebase/config";
import Accordion from "react-native-collapsible/Accordion";
import UserEvent from "./UserEvent";

const Events = () => {
  const [organizerName, setOrganizerName] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [district, setDistrict] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");

  const navigation = useNavigation();

  const [activeSections, setActiveSections] = useState([]);
  const [activeSections2, setActiveSections2] = useState([]);

  const addEvent = () => {
    const currentUser = firebase.auth().currentUser;

    firebase
      .firestore()
      .collection("events")
      .add({
        organizerName,
        venue,
        date,
        district,
        endTime,
        startTime,
        userId: currentUser.uid,
      })
      .then(() => {
        console.log("Event added!");
        navigation.goBack(); 
      })
      .catch((error) => {
        console.error("Error adding event: ", error);
      });
  };

  const SECTIONS = [
    {
      title: "Add Your Blood Donation Event",
    },
  ];

  const renderHeader = (section, _, isActive) => (
    <View style={styles.headerACC}>
      <Text style={styles.headerTextACC}>{section.title}</Text>
    </View>
  );

  const renderContent = (section) => (
    <View style={styles.content}>
      <Text style={styles.inputDetails}>Event Organizer</Text>
      <TextInput
        placeholder="Enter Organizer"
        style={styles.textBoxes}
        value={organizerName}
        onChangeText={(text) => setOrganizerName(text)}
      />
      <Text style={styles.inputDetails}>Location</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={district}
          onValueChange={(itemValue1) => setDistrict(itemValue1)}
          style={styles.picker}
        >
          <Picker.Item label="Select Your District" value="" />
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
      <Text style={styles.inputDetails}>Event Venue</Text>
      <TextInput
        placeholder="Enter Event Venue"
        style={styles.textBoxes}
        value={venue}
        onChangeText={(text) => setVenue(text)}
      />

      <Text style={styles.inputDetails}>Event Date</Text>
      <TextInput
        placeholder="Enter Event Date"
        style={styles.textBoxes}
        value={date}
        onChangeText={(text) => setDate(text)}
      />

      <Text style={styles.inputDetails}>Event Start Time</Text>
      <TextInput
        placeholder="Enter Event Start Time"
        style={styles.textBoxes}
        value={startTime}
        onChangeText={(text) => setStartTime(text)}
      />

      <Text style={styles.inputDetails}>Event End Time</Text>
      <TextInput
        placeholder="Enter Event End Time"
        style={styles.textBoxes}
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
      />

      <TouchableOpacity style={styles.buttonStyle2} onPress={addEvent}>
        <Text style={styles.buttonText2}>Submit Event Details</Text>
      </TouchableOpacity>
    </View>
  );

  const SECTIONS2 = [
    {
      title: "Manage Your Blood Donation Events",
    },
  ];

  const renderHeader2 = (section, _, isActive) => (
    <View style={styles.headerACC}>
      <Text style={styles.headerTextACC}>{section.title}</Text>
    </View>
  );

  const renderContent2 = (section) => <UserEvent />;

  return (
    <View style={styles.container}>
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setActiveSections}
        />
      </View>
      <View style={styles.accordion}>
        <Accordion
          sections={SECTIONS2}
          activeSections={activeSections2}
          renderHeader={renderHeader2}
          renderContent={renderContent2}
          onChange={setActiveSections2}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputDetails: {
    fontSize: 15,
    marginBottom: "0%",
    margin: 10,
  },
  textBoxes: {
    width: "94%",
    fontSize: 16,
    padding: 12,
    borderColor: "#F76363",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    margin: 10,
  },
  buttonStyle2: {
    backgroundColor: "#FF1515",
    padding: 13,
    borderRadius: 10,
    width: "94%",
    height: 50,
    margin: 10,
    marginBottom: 20,
    borderColor: "#FF1515",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  buttonText2: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#F76363",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  picker: {
    width: "100%",
  },
  accordion: {
    marginTop: 20,
    borderWidth: 0.8,
    borderColor: "#FF1515",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  headerACC: {
    backgroundColor: "#fff",
    padding: 5,
  },
  headerTextACC: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    paddingTop: 20,
    backgroundColor: "#fff",
  },
});

export default Events;
