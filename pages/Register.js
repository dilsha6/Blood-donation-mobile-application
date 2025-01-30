import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import MyImage from "../assets/logo.png";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerShown: true,
      title: "",
    });
  }, [navigation]);

  const registerUser = async (email, password, name) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://reddrop-658ef.firebaseapp.com",
      });

      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          name,
          email,
        });

      alert("Verification Email Sent Your Email Address");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Image source={MyImage} style={styles.image} />

        <Text style={styles.header}>Create New Profile</Text>
        <Text style={styles.inputDetails}>Full Name</Text>
        <TextInput
          placeholder="Enter Full Name"
          style={styles.textBoxes}
          onChangeText={(name) => setName(name)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.inputDetails}>Email</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.textBoxes}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.inputDetails}>Password</Text>
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          style={styles.textBoxes}
          value={password}
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeIcon}
        >
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => registerUser(email, password, name)}
        >
          <Text style={styles.buttonText}>Create Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: "25%",
    height: "14%",
    alignSelf: "center",
    marginBottom: "5%",
  },
  inputDetails: {
    fontSize: 17,
    marginLeft: "5%",
    marginTop: "3%",
    marginBottom: "-3%",
  },
  textBoxes: {
    width: "90%",
    fontSize: 16,
    padding: 12,
    borderColor: "#F76363",
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    marginLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  buttonStyle: {
    backgroundColor: "#FF1515",
    padding: 13,
    borderRadius: 10,
    width: "90%",
    height: 50,
    margin: 10,
    marginLeft: 20,
    marginBottom: 20,
    borderColor: "#FF1515",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "8%",
    color: "#FF1515",
    alignSelf: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#F76363",
    borderRadius: 10,
    margin: 20,
    marginLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  picker: {
    width: "100%",
  },
  show: {
    textAlign: "right",
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  eyeIcon: {
    paddingRight: "8%",
    marginTop: "-13%",
    alignItems: "flex-end",
    marginBottom: "10%",
  },
});

export default Register;
