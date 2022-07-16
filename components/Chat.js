import React from 'react';
import { View, StyleSheet, Pressable, Text, Platform, KeyboardAvoidingView, } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import 'firebase/firestore';


export default class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: this.props.route.params.name || "Unknown user",
        avatar: 'https://placeimg.com/140/140/any',
        image: null,
        location: null,
      },
      isConnected: false,
      image: null,
      location: null
    }

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAbWnB4CkY9vao7qH88JOHYJYPZOoevRmM",
      authDomain: "chatty-534b5.firebaseapp.com",
      projectId: "chatty-534b5",
      storageBucket: "chatty-534b5.appspot.com",
      messagingSenderId: "1070758162020",
      appId: "1:1070758162020:web:c3b358957d32924167b971"
    };

    //  Initialize database with config-data
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    // reference the database
    this.referenceChatMessages = firebase.firestore().collection('messages')
    this.refMsgsUser = null
    }

  // Retrieve messages from async storage
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Save messages to async storage

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Delete messages from async storage

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

   componentDidMount() {

    this.props.navigation.setOptions({ title: this.props.route.params.name || "Unknown user" })

    // Authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
     // Update user
      this.setState({
        messages: [],
        uid: user.uid,
        user: {
          _id: user?.uid || '0',
          name: user.name || 'Default',
          avatar: 'https://placeimg.com/140/140/any',
        },
      });

      // Referencing messages of current user
      this.refMsgsUser = 
      firebase
      .firestore()
      .collection('messages')
      .where('uid', '==', user.uid)
    })

    // Check if user is online

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        
        this.setState({ isConnected: true })
        console.log('online')

        // Listens for updates in the collection
        this.unsubscribe = this.referenceChatMessages
            .orderBy('createdAt', 'desc')
            .onSnapshot(this.onCollectionUpdate)


        // save messages if user is online
        this.saveMessages()
      } else {
        // if the user is offline
        this.setState({ isConnected: false })
        console.log('offline')
        // retrieve messages from AsyncStorage
        this.getMessages()
      }
    })
   }

      // Adding message to the database
      addMessage() {
        const message = this.state.messages[0]
        // Add a new message to the firebase collection
        this.referenceChatMessages.add({
          uid: this.state.uid,
          _id: message._id,
          text: message.text || '',
          createdAt: message.createdAt,
          user: this.state.user,
          image: message.image || '',
          location: message.location || null,
        })
      }

      componentWillUnmount() {
        if (this.state.isConnected) {
          // stop listening to authentication
          this.authUnsubscribe()
          // stop listening for changes
          this.unsubscribe()
        }
      }

      // Updated message state
   onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
     });
    });
    this.setState({
      messages: messages,
    });
    this.saveMessages()
  };

    // User sends a message
    onSend(messages = []) {
      this.setState(
        (previousState) => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }),
        () => {
          this.addMessage()
          this.saveMessages()
        }
      )
    }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'black',
          },
          left: {
            color: 'white',
          }
          }}
          wrapperStyle={{
          left: {
            backgroundColor: 'teal',
            padding: 7
          },
          right: {
            backgroundColor: 'darkorange',
            padding: 7
          }
          }}
        />
    );
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  // Chat input field is hidden if the user is not connected
  renderInputToolbar(props) {
    if (!this.state.isConnected) {
      return (
        <View style={styles.offline}>
                <Text style={styles.text}>You are offline, waiting to be back online</Text>
        </View>)
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  // CustomActions function 
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  render() {

  return (
    <View style={{flex: 1, backgroundColor: this.props.route.params.bgColor }}>      
      <GiftedChat
        style={styles.giftedChat}
        renderBubble={this.renderBubble.bind(this)}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        messages={this.state.messages}
        showUserAvatar= {false}
        renderActions={this.renderCustomActions}
        renderCustomView={this.renderCustomView}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.user._id,
          name: this.state.name,
          avatar: this.state.avatar,  
         }}/>
     { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}  
      </View>
  );
 }
}

const styles = StyleSheet.create({
  text: {
	margin: 'auto',
    color: '#757083',
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
},
  offline: {
    flex: 0.6,
    justifyContent: 'center'
  },
});
