# Chatty

Mobile Chat App built with React Native (& Expo)

## Features and Requirements

## Stack
- React Native
- Firebase (Firestore)

Additional libraries:
- Expo
- Gifted Chat

## Key Features

The demo presents the following key features:
- Messages saved in a database
- Possibility to insert the name to customize the message and the header of the chat
- Possibility to send an image/position/camera shot that will be saved in a storage

## Technical Requirements

- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.

## Development Process for the chat application

### Set up Expo as Development Environment

- Install Expo Command Line Interface
  - npm install expo-cli --global
- Create new Expo project in projects directory
  - expo init [project-name]
- Start expo by navigating to project folder & running
  - npm start
  - 
### Install React Navigation library to navigate between screens

- Navigate to project folder and run
  - npm install react-navigation
- Install necessary dependencies
  - npm install @react-navigation/native @react-navigation/stack
  - expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
  - 
### Set up Android Studio as Android Emulator

- Download Android Studio
- Make sure 'Android Virtual Device' is installed
- Add Android SDK Location to ~/.zshrc file
  - export ANDROID_SDK=/Users/myuser/Library/Android/sdk
  - export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
- Create virtual device (via more actions > Virtual Device Manager) and click play to start
- Select 'Run app on Android' in Expo to run app on virtual device
- Press Command + Shift + R to start a screen recording.
- 
### Integreat Gifted Chat library to create chat UI

- Install Gifted Chat
  - npm install react-native-gifted-chat
- Integrate Gifted Chat into application
  - import { GiftedChat } from 'react-native-gifted-chat';
- Follow instructions to set up chat: https://github.com/FaridSafi/react-native-gifted-chat
- 
### Set up Cloud Firestore as data storage platform

- Install Firestore via Firebase
  - npm install firebase
- Import Firestore in application (e.g, in Chat.js)
  - import { initializeApp } from "firebase/app";
  - import { getFirestore } from "firebase/firestore";
- Register App in Firebase settings

- Copy config code to application

- Initialize app

  - // Initialize Firebase
  - const app = initializeApp(firebaseConfig);
  - // Initialize Cloud Firestore and get a reference to the service
  - const db = getFirestore(app);
- Set up anonymous authentication in firebase console
- 
### Set up Async Storage for offline functionalities

- Install package
  - expo install @react-native-community/async-storage
- Import AsyncStorage into app
  - import AsyncStorage from '@react-native-community/async-storage';
- Store and retrieve state from Async Storage
