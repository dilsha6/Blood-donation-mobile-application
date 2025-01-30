import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../firebase/config";

const Donor = () => {
  const [name, setName] = useState({});
  const [dname, setdname] = useState("");
  const [Btype, setBtype] = useState("");
  const [number, setnumber] = useState("");
  const [district, setdistrict] = useState("");
  const [area, setarea] = useState("");
  const [dob, setDob] = useState("");
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [donorDetails, setdonorDetails] = useState([]);
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 57 }, (_, i) => (2006 - i).toString());

  const handleDayChange = (value) => {
    setDobDay(value);
  };
  const handleMonthChange = (value) => {
    setDobMonth(value);
  };
  const handleYearChange = (value) => {
    setDobYear(value);
  };

  useEffect(() => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
        setdname(name.name);
        loadDonorDetails();
      } else {
        console.log("User doesn't exist");
      }
    });
  }, []);

  useEffect(() => {
    if (donorDetails.length === 1) {
      const [detail] = donorDetails;
      setBtype(detail.Btype);
      setnumber(detail.number);
      setdistrict(detail.district);
      setarea(detail.area);
      setDobDay(detail.dobDay);
      setDobMonth(detail.dobMonth);
      setDobYear(detail.dobYear);
    }
  }, [donorDetails]);

  const loadDonorDetails = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    userDocRef.get().then((snapshot) => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData.donor) {
          setdonorDetails(userData.donor);
        }
      } else {
        console.log("User doesn't exist");
      }
    });
  };

  const removeDonorDetails = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    Alert.alert(
      "Confirmation",
      "Are you sure you want to remove your donor details?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            userDocRef
              .update({
                donor: firebase.firestore.FieldValue.delete(),
              })
              .then(() => {
                console.log("Donor details removed successfully!");
                setdonorDetails([]);
              })
              .catch((error) => {
                console.error("Error removing donor details:", error);
              });
          },
        },
      ]
    );
  };

  const handleAddMarks = () => {
    const userUid = firebase.auth().currentUser.uid;
    const userDocRef = firebase.firestore().collection("users").doc(userUid);

    const dname = name.name;
    userDocRef
      .update({
        donor: firebase.firestore.FieldValue.arrayUnion({
          dname: dname,
          Btype: Btype,
          number: number,
          district: district,
          area: area,
          dobDay:dobDay,
          dobMonth:dobMonth,
          dobYear:dobYear,
        }),
      })
      .then(() => {
        console.log("You became a Blood Donor Successfully!!");
        setdname("");
        setBtype("");
        setnumber("");
        setdistrict("");
        setarea("");
        setDobDay("");
        setDobMonth("");
        setDobYear("");

        Alert.alert("Success", "You have become a Blood Donor successfully!", [
          {
            text: "OK",
            onPress: () => console.log("Alert closed"),
          },
        ]);
      })
      .catch((error) => {
        console.error("Error become Blood Donor:", error);
      });
  };
  if (donorDetails.length === 1) {
    const [donorDetail] = donorDetails;
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.detailText2}>
            You have become blood donor successfully!!!
          </Text>
          <Text style={styles.label}>Your Registered Name</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.dname}</Text>
          </View>
          <Text style={styles.label}>Your Blood Type</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.Btype}</Text>
          </View>
          <Text style={styles.label}>Your District</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.district}</Text>
          </View>
          <Text style={styles.label}>Your City</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.area}</Text>
          </View>
          <Text style={styles.label}>Your Contact No</Text>
          <View style={styles.card}>
            <Text style={styles.detailText}>{donorDetail.number}</Text>
          </View>
          <Text style={styles.detail}>Date of Birth: {dob && format(new Date(dob), "dd/mm/yyyy")}</Text>
          <View style={styles.card}>
            <Text style={styles.detail}>{donorDetail.dobDay}</Text>
            <Text style={styles.detail}>{donorDetail.dobMonth}</Text>
            <Text style={styles.detail}>{donorDetail.dobYear}</Text>
          </View>
          <Text style={styles.detailText3}>
            Remove your donor details (When you remove your details, Members
            can't contact you.)
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={removeDonorDetails}
          >
            <Text style={styles.buttonText}> Remove</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Become a Blood Donor</Text>
          <Text style={styles.note}>
            A blood donor can be found in the nearest area to the person who
            needs a blood donor by the district and area.
          </Text>
          <Text style={styles.inputDetails}>Your Blood Group</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={Btype}
              onValueChange={(itemValue1) => setBtype(itemValue1)}
              style={styles.picker}
            >
              <Picker.Item label="Select Your Blood Group" value="" />
              <Picker.Item label="AA" value="AA" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
              <Picker.Item label="A1-" value="A1-"/>
              <Picker.Item label="A1+" value="A1+"/>
              <Picker.Item label="A2+" value="A2+"/>
              <Picker.Item label="A2-" value="A2-"/>
              <Picker.Item label="A1B-" value="A1B-"/>
              <Picker.Item label="A2B-" value="A2B-"/>
              <Picker.Item label="A1B+" value="A1B+"/>
              <Picker.Item label="A2B+" value="A2B+"/>
              <Picker.Item label="Bombay group" value="Bombay group"/>
            </Picker>
          </View>
          <Text style={styles.inputDetails}>Enter Your Contact No</Text>
          <TextInput
            placeholder="Enter Contact No"
            style={styles.textBoxes}
            value={number}
            onChangeText={(text) => {
              const validatedInput = text.replace(/[^0-9]/g, "");
              if (validatedInput.length <= 10) {
                setnumber(validatedInput);
              }
            }}
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={styles.inputDetails}>Your District</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={district}
              onValueChange={(itemValue) => setdistrict(itemValue)}
              style={styles.picker}
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

          <Text style={styles.inputDetails}>Enter Your City</Text>
          <TextInput
            placeholder="Enter Your City"
            style={styles.textBoxes}
            value={area}
            onChangeText={(text) => setarea(text)}
          />
          <Text style={styles.inputDetails}>Enter Your Date of Birth</Text>
          <Picker
          style={styles.picker}
          selectedValue={dobDay}
          onValueChange={handleDayChange}
        >
          {days.map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={dobMonth}
          onValueChange={handleMonthChange}
        >
          {months.map((month) => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={dobYear}
          onValueChange={handleYearChange}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
          <TouchableOpacity
            style={styles.buttonStyle2}
            onPress={handleAddMarks}
          >
            <Text style={styles.buttonText2}>Submit Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    padding: 10,
  },
  inputDetails: {
    fontSize: 17,
    marginBottom: "0%",
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "1%",
    color: "#FF1515",
  },
  note: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderColor: "#FF1515",
    borderWidth: 1,
    width: "100%",
  },
  userIcon: {
    textAlign: "center",
    color: "#FF1515",
  },
  detailText: {
    fontSize: 14,
  },
  detailText2: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
    marginTop: 30,
    fontStyle: "italic",
  },
  detailText3: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 30,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  buttonStyle: {
    backgroundColor: "#FF1515",
    borderRadius: 10,
    borderColor: "#FF1515",
    borderWidth: 1,
    justifyContent: "center",
    padding: 10,
    width: 90,
    alignSelf: "flex-end",
    marginTop: 10,
  },
});

export default Donor;
