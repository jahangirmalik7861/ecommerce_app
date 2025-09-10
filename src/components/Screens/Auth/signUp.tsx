import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { signupUser } from "../../../redux/SignupSlice";

import CustomButton from "../../CustomButton";
import CustomFooter from "../../CustomFooter ";
import CustomHeader from "../../CustomHeader";
import CustomInputField from "../../CustomInpotField";
import { ScreenContent } from "../../ScreenContent";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required").min(2),
  lastName: Yup.string().required("Last name is required").min(2),
  email: Yup.string().email("Invalid email format").required("Email is required"),
phone: Yup.string()
  .required("Phone is required")
  .matches(/^[0-9]{11}$/, "Phone must be exactly 11 digits"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  zipCode: Yup.string(),   
role: Yup.string(),      
category: Yup.string(),  

});

const SignUp = ({route}:any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
const handleSignup = async (values) => {
  const payload = {
    ...values,
    role: "personal",
    category: "Civil Law",
  };

  const response = await dispatch(signupUser(payload));
  console.log("🚀 ~ handleSignup ~ response:", response)
};
  return (
    <ScreenContent>
   

      <CustomHeader title={"SignUp"} route={route} />
     
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            zipCode: "",
            role: "personal",
            category: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => (
            <>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 210,
                }}
              >
                
               
                {/* First Name */}
                <CustomInputField
                  placeholder="First Name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.firstName}</Text>
                )}

                {/* Last Name */}
                <CustomInputField
                  placeholder="Last Name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.lastName}</Text>
                )}

                {/* Email */}
                <CustomInputField
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.email}</Text>
                )}

                {/* Phone */}
                <CustomInputField
                  placeholder="Phone"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                />
                {touched.phone && errors.phone && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.phone}</Text>
                )}

                {/* Password */}
                <CustomInputField
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  isPassword={true}
                />
                {touched.password && errors.password && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.password}</Text>
                )}

                {/* Zip Code */}
                <CustomInputField
                  placeholder="Zip Code"
                  value={values.zipCode}
                  onChangeText={handleChange("zipCode")}
                  onBlur={handleBlur("zipCode")}
                />
                {touched.zipCode && errors.zipCode && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.zipCode}</Text>
                )}

                {/* Role */}
                <CustomInputField
                  placeholder="Role"
                  value={values.role}
                  onChangeText={handleChange("role")}
                  onBlur={handleBlur("role")}
                />
                {touched.role && errors.role && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.role}</Text>
                )}

                {/* Category */}
                <CustomInputField
                  placeholder="Category"
                  value={values.category}
                  onChangeText={handleChange("category")}
                  onBlur={handleBlur("category")}
                />
                {touched.category && errors.category && (
                  <Text style={{ color: "red", marginTop: 5 }}>{errors.category}</Text>
                )}
              </View>

              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                  onPress={() => navigation.navigate("login")}
                >
                  <Text style={{ marginLeft: 200 }}>Already have an account?</Text>
                  <FontAwesome
                    name="long-arrow-right"
                    size={20}
                    style={{ marginLeft: 10, color: "#DB3022" }}
                  />
                </TouchableOpacity>
              </View>

              <CustomButton onPress={handleSubmit} BTitle={"SIGN UP"} />
            </>
          )}
        </Formik>

        <View style={{ marginBottom: 190}}>
          <CustomFooter SocialTitle={"Or sign up with social account"} />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};

export default SignUp;
