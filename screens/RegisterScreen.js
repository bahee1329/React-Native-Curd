import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Pressable, Image, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios"



const RegisterScreen = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    //send a post request to the backend APT

// Assuming 'user' contains the data you want to send in the POST request.

axios.post("http://192.168.29.20:8000/register", user, {
  headers: {
    "Content-Type": "application/json"
  }
})
  .then((response) => {
    console.log(response);
    Alert.alert("registation sucessfull");
    setname("");
    setemail("");
    setpassword("");
  })
  .catch((error) => {
    // Handle network errors or errors from the API
    if(error)
    Alert.alert("Registration  failed");
    console.error(error);
  });


    
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ marginTop: 80 }}>
        <Image
          style={{ width: 300, height: 60 }}
          source={{
            uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c518.png",
          }} />
      </View>

      <KeyboardAvoidingView>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 50, color: "#041E42", textAlign: "center" }}>Register to Your Account</Text>
        </View>



        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#d0d0d0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <MaterialIcons style={{ marginLeft: 10, color: "gray" }} name="perm-contact-cal" size={30} color="black" />

            <TextInput value={name} onChangeText={(text) => setname(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: name ? 17 : 20 }} placeholder='Enter your Name' />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#d0d0d0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>

            <MaterialIcons style={{ marginLeft: 10, color: "gray" }} name="email" size={30} color="black" />
            <TextInput value={email} onChangeText={(text) => setemail(text)} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 17 : 20 }} placeholder='Enter your Email' />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D0D0D0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>

            <MaterialIcons style={{ marginLeft: 10, color: "gray" }} name="lock" size={30} color="black" />
            <TextInput value={password} onChangeText={(text => setpassword(text))} secureTextEntry={true} style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 17 : 20 }} placeholder='Enter your Password' />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007fff", fontWeight: 'bold' }}>Forgot password</Text>
        </View>

        <Pressable onPress={handleRegister}  style={{ width: 200, backgroundColor: "#febe10", borderRadius: 10, marginLeft: "auto", marginRight: "auto", marginTop: 80, padding: 15 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
          <Text style={{ color: "gray", textAlign: 'center' }}>Don't Hava an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})