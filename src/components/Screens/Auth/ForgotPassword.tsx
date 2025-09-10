

import { Formik } from "formik"
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from "yup"
import CustomButton from '../../CustomButton'
import CustomHeader from "../../CustomHeader"
import CustomInputField from "../../CustomInpotField"

const validationSchema = Yup.object().shape({
   email: Yup.string().email("Invalid email format").required("Email is required"),
 
});

const ForgotPassword = () => {
  return (
    <View>
      <CustomHeader title={"Forgot password"} />

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Forgot password values:", values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
              <Text style={{ fontSize: 16, width: "85%" }}>
                Please, enter your email address. You will receive 
                a link to create a new password via email
              </Text>

             
              <CustomInputField
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {touched.email && errors.email && (
                <Text style={{ color: "red", marginTop: 5 }}>{errors.email}</Text>
              )}
            </View>

           
            <View style={{ marginTop: 40 }}>
              <CustomButton onPress={handleSubmit} BTitle={'Send'} />
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default ForgotPassword
