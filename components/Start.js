import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native'; 
import { FontAwesome5 } from '@expo/vector-icons'; //User icon

const bgImage = require('../assets/Background_Image.png');

// Different background colors
const colors = [
  '#090C08',
  '#474056',
  '#8A95A5',
  '#B9C6AE'
];

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.bgColor = "#090C08"

  }

  // Change of background color from the user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  render() {
    return (

      <View style={styles.container}>
        <ImageBackground source={bgImage} resizeMode="cover" style={styles.background_image}>
          <View style={styles.header}>
            <Text style={styles.title}>Chatty</Text>
          </View>
          
          {/* Main View */}
          <View style={styles.main}>
            <View style={styles.searchSection}>
            <FontAwesome5 name="user" size={16} style={styles.searchIcon} />
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Type your name here..." />
            </View>

           {/* Label */}
            <Text style={styles.text}>Choose Your Background Color:</Text>

{/* Color Picker container */}
            <View style={styles.colorContainer}>
              {colors.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => this.changeBgColor(c)}
                  style={[{ backgroundColor: c }, styles.colorCircle]}
                />
              ))}
            </View>

{/* Pressable button */}
            <Pressable
              style={[styles.button, {backgroundColor: this.bgColor}]}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.button}>Start Chatting</Text>
            </Pressable>
          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_image: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: '100%',
  },
  text: {
    marginRight: 'auto',
    marginLeft: '7%',
    color: '#757083',
    fontSize: 16,
  },
  header: {
    flex: 0.6,
    justifyContent: 'center'
  },
  title: {
    fontSize: 40,
    color: '#fff'
  },
  main: {
    width: '88%',
    backgroundColor: 'white',
    alignItems: 'center',
    height: '44%',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderRadius: 10
  },
  searchSection: {
    border: '2px solid lightgrey',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '88%',
  },
  searchIcon: {
    paddingLeft: 10,
    color: 'grey'
  },
  input: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#fff',
    color: '#424242',
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
  },
  button: {
    width: '88%',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 7,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});