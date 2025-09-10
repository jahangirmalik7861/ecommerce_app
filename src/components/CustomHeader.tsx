import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({ title,route }:any) => {
  console.log('route',route)
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {route?.name !== "SignUp" && (
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
            style={{ marginTop: 22 }}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 38,
  },
  iconWrapper: {
    marginBottom: 25,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    marginLeft: 11,
  },
});

export default CustomHeader;
