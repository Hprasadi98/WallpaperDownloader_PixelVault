import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'

const ImageCard = ({item,columns, index}) => {
    const imageUrl = item?.webformatURI || item?.webformatURL || item?.url || 'https://via.placeholder.com/300';
  return (
    <Pressable>
      <Image style={styles.image} source={{uri: imageUrl}}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    image:{
        height:300,
        width:"100%",
    }
})

export default ImageCard