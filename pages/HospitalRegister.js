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
const RegisterHospital = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");

  const [contactDetails, setContactDetails] = useState("");

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


  const registerHospital = async (email, password, name, address, contactDetails) => {

    try {

      await firebase.auth().createUserWithEmailAndPassword(email, password);


      await firebase.auth().currentUser.sendEmailVerification({

        handleCodeInApp: true,

        url: "https://reddrop-658ef.firebaseapp.com",

      });


      await firebase

        .firestore()

        .collection("hospitals")

        .doc(firebase.auth().currentUser.uid)

        .set({

          name,

          address,

          contactDetails,

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


        <Text style={styles.header}>Create New Hospital Profile</Text>

        <Text style={styles.inputDetails}>Hospital Name</Text>

        <TextInput

          placeholder="Enter Hospital Name"

          style={styles.textBoxes}

          onChangeText={(name) => setName(name)}

          autoCapitalize="none"

          autoCorrect={false}

        />

        <Text style={styles.inputDetails}>Address</Text>

        <TextInput

          placeholder="Enter Address"

          style={styles.textBoxes}

          onChangeText={(address) => setAddress(address)}

          autoCapitalize="none"

          autoCorrect={false}

        />

        <Text style={styles.inputDetails}>Contact Details</Text>

        <TextInput

          placeholder="Enter Contact Details"

          style={styles.textBoxes}

          onChangeText={(contactDetails) => setContactDetails(contactDetails)}

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

            color="#777777"

          />

        </TouchableOpacity>

        <TouchableOpacity

          style={styles.button}

          onPress={() =>

            registerHospital(email, password, name, address, contactDetails)

          }

        >

          <Text style={styles.buttonText}>Create Account</Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={styles.signUpLink}

          onPress={() => navigation.navigate("LoginHospital")}

        >

          <Text style={styles.signUpText}>Already have an account?</Text>

          <Text style={styles.signUpText}> Login</Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );

};


const styles = StyleSheet.create({

  scrollViewContent: {

    flexGrow: 1,

  },

  container: {

    paddingTop: 50,

    paddingHorizontal: 30,

  },

  header: {

    fontSize: 24,

    fontWeight: "bold",

    color: "#000000",

    paddingBottom: 20,

  },

  inputDetails: {

    color: "#777777",

    fontSize: 16,

    marginBottom: 5,

  },

  textBoxes: {

    borderColor: "#cccccc",

    borderWidth: 1,

    padding: 15,

    marginBottom: 20,

    borderRadius: 10,

  },

  eyeIcon: {

    position: "absolute",

    top: 40,

    right: 20,

  },

  button: {

    backgroundColor: "#000000",

    padding: 15,

    borderRadius: 10,

    alignItems: "center",

  },

  buttonText: {

    color: "#ffffff",

    fontSize: 20,

    fontWeight: "bold",

  },

  signUpLink: {

    flexDirection: "row",

    marginTop: 20,

  },

  signUpText: {

    color: "#000000",

    fontSize: 16,

  },

  image: {

    width: 200,

    height: 200,

    alignSelf: "center",

    marginBottom: 30,

  },

});


export default RegisterHospital;