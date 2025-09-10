import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const CustomInputField = ({ placeholder, value, onChangeText, onBlur, isPassword }) => {
  const [password, setPassword] = useState(isPassword);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={password}  
      />

      
      {isPassword && (
        <TouchableOpacity onPress={() => setPassword(!password)}>
          <FontAwesome
            name={password ? "eye-slash" : "eye"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    width: '87%',
    height: '9%',
    backgroundColor: "#FFFFFF",
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default CustomInputField;
