import {Dimensions} from "react-native";

export const wp = (percentage) => {
    const value = (percentage * Dimensions.get('window').width) / 100;
    return Math.round(value);
  };
  
  export const hp = (percentage) => {
    const value = (percentage * Dimensions.get('window').height) / 100;
    return Math.round(value);
  };