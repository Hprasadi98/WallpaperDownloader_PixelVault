import {Dimensions} from "react-native";

const {width:deviceWidth, height:deviceHeight} = Dimensions.get('window');

export const wp = (percentage) => {
    const value = (percentage * Dimensions.get('window').width) / 100;
    return Math.round(value);
  };
  
  export const hp = (percentage) => {
    const value = (percentage * Dimensions.get('window').height) / 100;
    return Math.round(value);
  };

  export const getColumnCount = () => {
    if(deviceWidth >=1024){
      return 4;
    }else if(deviceWidth >=768){
      return 3;
    }else{
      return 2;
    }
  };