import React, { Component } from 'react';
import { Text, View, StyleSheet ,Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Splash from "./Splash"

const slides = [
  {
    key: 's1',
    title: 'Order some tasty food',
    text : "Now just scan the qr code and place orders right from your screen",
    image: require("../assets/slide1.png")
  }
,  {
    key: 's2',
    title: 'Order some tasty food',
    text : "Now just scan the qr code and place orders right from your screen",
    image: require("../assets/slide1.png")
  },
  {
    key: 's3',
    title: 'Order some tasty food',
    text : "Now just scan the qr code and place orders right from your screen",
    image: require("../assets/slide1.png")
  }
];


export default class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }
  
    _renderItem = ({ item }) => {
    return (
      <View style = {styles.slideContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style = {styles.text}>{item.text}</Text>
        <View style = {styles.imagecontainer}>
            <Image style = {styles.image} source = {item.image} />
        </View>
      </View>
    );
  }

  _onDone = () => {
    this.setState({ showRealApp: true });
  };
  _onSkip = () => {
    this.setState({ showRealApp: true });
  };

  render() {
    if (this.state.showRealApp) {
      return (
        <Splash navigation = {this.props} />
      );
    } else {
      return (
        <AppIntroSlider 
            renderItem={this._renderItem} 
            data={slides} 
            onDone={this._onDone}
            activeDotStyle = {{backgroundColor : "green"}}
            showSkipButton = {true}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
    slideContainer : {
        backgroundColor : "#ffffff",
        flex : 1,
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
    },
    title: { 
        fontFamily : "DMSansBold",
        fontSize : 25,
        marginTop : 150,
        paddingHorizontal : 100,
        textAlign : "center"
    }, 
    text: { 
        color : "black",
        fontSize: 12,
        opacity : 60,
        fontFamily : "DMSansRegular",
        marginTop : 20,
        paddingHorizontal : 100,
        textAlign : "center"
    }, 
    imagecontainer : {
        marginTop : 100
    },
    image : {
        width : 300,
        height : 300
    }
 });