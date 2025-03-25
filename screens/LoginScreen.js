import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { loginUser } from '../api/apiService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password)
      console.log(data)
      // if(data.success){
 Alert.alert('Login Successful', 'Welcome back!');
      navigation.replace('Events');
      // }else{
      //   Alert.alert(data.message)
      // }
     
    } catch (error) {

      Alert.alert('Login Failed', error.message || 'Please try again.');
    }
  };

  return (
    <View>
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.forgot}>
      <Text styler={styles.forgotTxt}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={handleLogin} >
        <Text style={styles.btnTxt}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signup}>
      <Text styler={styles.forgotTxt}>Not a member? <Text style={{textDecorationLine:'underline'}}>Sign Up Here</Text></Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
input:{ 
 elevation:1,
 borderRadius:5,
  marginBottom: 10,
  backgroundColor:"#fff" 
},
forgot:{
  alignSelf:'flex-end',
marginTop:-5
},
forgotTxt:{
color:'#828282',
lineHeight:15

},
btn:{
  marginTop:20,
  alignSelf:'flex-end',
  backgroundColor:"#21D393",
  paddingHorizontal:20,
  paddingVertical:10,
  borderRadius:5,
  elevation:1,

},
btnTxt:{
  color:'#fff'
},
signup:{
  alignSelf:'flex-end',
  marginTop:10
}


})
export default LoginScreen;
