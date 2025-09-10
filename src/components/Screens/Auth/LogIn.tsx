import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import CustomButton from "../../CustomButton";
import CustomFooter from "../../CustomFooter ";
import CustomHeader from "../../CustomHeader";
import CustomInputField from "../../CustomInpotField";
import { ScreenContent } from "../../ScreenContent";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required").min(6).max(6),
});

const LogIn = () => {
  const navigation = useNavigation();

  return (
    <ScreenContent>
      <CustomHeader title={"Login"} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Values:", values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 70,
              }}
            >
              {/* Email Field */}
              <CustomInputField
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {touched.email && errors.email && (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {errors.email}
                </Text>
              )}

              {/* Password Field */}
              <CustomInputField
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                isPassword={true} // agar tum eye icon wala banate ho
              />
              {touched.password && errors.password && (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {errors.password}
                </Text>
              )}

              {/* Forgot Password */}
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                }}
                onPress={() => navigation.navigate("forgot-password")}
              >
                <Text style={{ marginLeft: 194 }}>Forgot your password?</Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={20}
                  style={{ marginLeft: 10, color: "#DB3022" }}
                />
              </TouchableOpacity>

              {/* Submit Button */}
              <CustomButton onPress={handleSubmit} BTitle={"LOGIN"} />

              {/* Footer */}
              <View style={{ marginTop: 100 }}>
                <CustomFooter SocialTitle={"Or login with social account"} />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </ScreenContent>
  );
};

export default LogIn;
