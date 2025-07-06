# 🩸 Rare – Blood Donation Mobile App

BloodLink is a cross-platform mobile application built with React Native that connects **blood donors and recipients** in real-time. It aims to streamline the process of requesting and donating blood by providing an intuitive platform for users to register, locate donors, and respond to urgent blood requests quickly and securely.

---

## 🚀 Features

- 🔐 **User Authentication** – Sign up/login using email (Firebase Auth)
- 🩸 **Donor Registration** – Register as a donor with blood group & location
- 📍 **Find Nearby Donors** – Search for available donors by blood type and distance
- 🆘 **Raise Requests** – Create and manage blood requests for specific groups
- 🔔 **Notifications** – Get real-time alerts when someone responds to your request
- 🧾 **Donor/Request History** – Track previous donations and requests
- 📱 **Responsive UI** – Built with accessibility and simplicity in mind

---

## 🛠️ Tech Stack

| Layer        | Technology               |
|--------------|--------------------------|
| Frontend     | React Native             |
| Backend/Auth | Firebase Authentication  |
| Database     | Firebase Firestore       |
| Push Alerts  | Firebase Cloud Messaging |
| Maps         | Google Maps API          |

---

## 📸 Screenshots

---

## 🧑‍💻 How to Run Locally

1. Clone the repo:
git clone https://github.com/dilsha6/blood-donation-mobile-application.git
cd blood-donation-mobile-application

2. Install dependencies:
npm install

3. Set up Firebase:
- Create a Firebase project
- Enable Authentication, Firestore, and FCM
- Download your `google-services.json` (Android) or `GoogleService-Info.plist` (iOS)
- Place them in the correct `android/app` or `ios` directories

4. Run the app:
5. 
npx react-native run-android
or
npx react-native run-ios

---

## 💡 Future Improvements

- Add blood bank directory integration
- In-app chat between donor and requester
- Support for multi-language localization
- Enhanced security with OTP verification

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Developed By

**Dilsha K** – React Native developer passionate about building meaningful, accessible healthcare apps.

[GitHub](https://github.com/dilsha6) 
