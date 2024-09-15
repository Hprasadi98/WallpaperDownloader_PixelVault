import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import {wp, hp} from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
       source={require('../assets/images/wallpaper.jpg')}
       style={styles.bgImage}
       resizeMode="cover"
      />
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', "white", "white"]}
          style={styles.gradient}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 0.8}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  bgImage:{
    width: wp(100),
    height: hp(100),
    position: 'absolute',
  },
  gradient:{
    width: wp(100),
    height: hp(65),
    bottom:0,
    position: 'absolute'
  }
})

export default WelcomeScreen;