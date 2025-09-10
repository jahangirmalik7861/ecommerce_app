import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({ onPress ,BTitle }) => {
  return (
    <View style={{ marginTop: 22, alignItems: "center" }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "#DB3022",
          width: 375,
          height: 45,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop:15
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>{BTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
