import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View, // Container component
  Image
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { StackNavigator } from "react-navigation";
import * as Animatable from 'react-native-animatable';

import Swiper from "./Swiper";

export default class Screen extends Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
       
      
        <Image source={require('../../assets/img/li.png')}
            style={{flexDirection:'row',alignSelf: 'flex-start',position:'absolute'
                        }} 
        
        />
        <View style={styles.mountainView}>           
          <Image source={require('../../assets/img/lipiBackground.png')} style={{width: null,
                height: null,flex:1, resizeMode: 'cover', zIndex:2 }} />
         </View>
       
        </View>
        {/* Second screen */}
        <View style={styles.slide}>

        <Image
          source={require('../../assets/img/pi.png')}
          style={{flexDirection:'row',
                   alignSelf: 'flex-end',
                   marginTop:-50,
                   marginRight:10,
                   position:'absolute'
                        }} 
        />

        <View style={styles.mountainView}>    
        
          <Image source={require('../../assets/img/lipiBackground.png')} style={{width: null,
                height: null,flex:1, resizeMode: 'cover',zIndex:2   }} />
         </View>
        
        </View>
        {/* Third screen 
        <View style={styles.slide}>
          <Icon name="ios-videocam" {...iconStyles} />
          <Text style={styles.header}>three</Text>
          <Text style={styles.text}>three</Text>
        </View>*/}
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    
    backgroundColor: "#00bcd4"
  },
  // Header styles
  header: {
    color: "#FFFFFF",
    
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#FFFFFF",
    
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center"
  },
  mountainView:{
    flex:1,
  }  
});
AppRegistry.registerComponent("Screen", () => Screen);
