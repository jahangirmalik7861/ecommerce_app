import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const CustomFooter  = ({SocialTitle}) => {
  return (
    <View style={{justifyContent:'center',alignItems:'center',marginTop:50}}>
      <Text style={{fontSize:18}}>{SocialTitle}</Text>
      <View style={styles.container}>
    
      <View style={styles.iconWrapper}>
        <AntDesign name="google" size={28} color="#DB4437" />
      </View>

     
      <View style={styles.iconWrapper}>
        <FontAwesome name="facebook" size={28} color="#1877F2" />
      </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  iconWrapper: {
    backgroundColor: "#fff",
    width: 80,
    height: 65,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
    shadowColor: "#000", 
    shadowRadius: 4,
  },
});
export default CustomFooter 

