import React, { useState, useCallback } from "react";
import { 
  View, Text, TextInput, Alert, StyleSheet, 
  TouchableOpacity, Image 
} from "react-native";
import { loginUser } from "../api/apiService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { Img } from "./images";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();

  const handleLogin = useCallback(async () => {
    try {
      const data = await loginUser(email, password);
      console.log(data);
      if (data.success) {
        dispatch(loginSuccess({ email }));
        Alert.alert("Login Successful", "Welcome back!");
        // navigation.replace('Events');
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message || "Please try again.");
    }
  }, [email, password, dispatch]);

  return (
    <View style={styles.container}>
      {/* Banner & Logo */}
      <View style={styles.banner}>
        <Text style={styles.logo}>Pliē</Text>
        <Image source={Img.placeholder} style={styles.image} />
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecure(!secure)}>
            <Image source={Img.eye} style={styles.eyeImage} />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <Text style={styles.signUpText}>
          Not a member? <Text style={styles.signUpLink}>Sign Up Here</Text>
        </Text>
      </View>

      {/* Social Login Options */}
      <View style={styles.socialContainer}>
        <Text style={styles.orText}>or Sign In with:</Text>
        <View style={styles.socialButtons}>
          {["apple", "google", "fb"].map((icon, index) => (
            <TouchableOpacity key={index} style={styles.socialButton}>
              <Image source={Img[icon]} style={styles.socialIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Guest Login */}
      <TouchableOpacity style={styles.guestLogin}>
        <Text style={styles.guestText}>Enter as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 
  },
  banner: { 
    alignItems: "center", 
    marginBottom: 20, 
    height: 150 
  },
  logo: { 
    fontSize: 32, 
    fontWeight: "bold" 
  },
  image: { 
    width: 80, 
    height: 80, 
    marginTop: 10 
  },
  inputContainer: { 
    marginTop: 20 
  },
  label: { 
    fontSize: 14, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
  },
  passwordContainer: { 
    position: "relative" 
  },
  eyeIcon: { 
    position: "absolute", 
    right: 10, 
    top: 15 
  },
  eyeImage: {
    height: 20,
    width: 20,
  },
  forgotPassword: { 
    alignSelf: "flex-end", 
    marginVertical: 10 
  },
  forgotText: { 
    color: "#828282" 
  },
  signInButton: { 
    backgroundColor: "#34A853", 
    padding: 15, 
    borderRadius: 5, 
    alignItems: "center", 
    marginTop: 10 
  },
  signInText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
  signUpText: { 
    textAlign: "center", 
    marginTop: 10 
  },
  signUpLink: { 
    fontWeight: "bold", 
    textDecorationLine: "underline" 
  },
  socialContainer: { 
    alignItems: "center", 
    marginVertical: 20 
  },
  orText: { 
    fontSize: 14, 
    color: "gray", 
    marginBottom: 10 
  },
  socialButtons: { 
    flexDirection: "row" 
  },
  socialButton: { 
    marginHorizontal: 10 
  },
  socialIcon: { 
    width: 40, 
    height: 40 
  },
  guestLogin: { 
    alignItems: "center", 
    marginTop: 10 
  },
  guestText: { 
    fontSize: 14, 
    color: "gray" 
  },
});

export default LoginScreen;
