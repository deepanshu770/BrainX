import React from "react";

import {StatusBar,Dimensions, StyleSheet, Text, View } from "react-native";
const { height, width } = Dimensions.get("window");
const topMargin =StatusBar.currentHeight+10
import * as Animatable from 'react-native-animatable'
const Title = ({title,frequency_gap,color}) => {
//  const frequency_gap='hguiuif'
//  const title='title'
 console.log();
  const titleAnimation = {
    0:{
      opacity:0,
      transform:[{translateY:-45}]
    },
    1:{
      opacity:1,
      transform:[{translateY:0}]
    }
  }
  
  
  return (
    <View style={styles.title_container}>
      <View style={{ left: 20, flexDirection: "row" }}>
        {title.split("").map((item, index) => {
            
          return <Animatable.Text 
          animation={titleAnimation}
          useNativeDriver
          delay={200 + (index*70)}
          key={index}
           style={[styles.title]}>{item}
           </Animatable.Text>;
        })}
      </View>
      <View style={{ left: 26,}}
      >
        <Animatable.Text style={[styles.sub_title,{color:color}]}
        animation={titleAnimation}
        useNativeDriver
        delay={300+title.split('').length*70}>{frequency_gap}</Animatable.Text>
      </View>
    </View>
  );
  
};
const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    textTransform: "uppercase",
    color: "black",
    fontWeight: "bold",
    marginRight: 3,
    top:0
  },
  title_container: {
  
    top:topMargin ,
    justifyContent: "center",
    overflow: "hidden",
    zIndex: -1,
  },
  sub_title:{
    fontSize:20,
    
    fontWeight:'400',
    letterSpacing:2.5,
    textTransform:'uppercase'
  }
});

export default Title;


