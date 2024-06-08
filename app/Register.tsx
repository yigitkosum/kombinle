// Register.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.subtitle}>by creating a free account.</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="account" size={24} color="#6e6e6e" />
        <TextInput
          style={styles.input}
          placeholder="Full name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email" size={24} color="#6e6e6e" />
        <TextInput
          style={styles.input}
          placeholder="Valid email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="phone" size={24} color="#6e6e6e" />
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="#6e6e6e" />
        <TextInput
          style={styles.input}
          placeholder="Strong Password"
          secureTextEntry
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Text>
          By checking the box you agree to our 
          <Text style={styles.linkText}> Terms </Text>
          and 
          <Text style={styles.linkText}> Conditions</Text>.
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>
        Already a member? 
        <Text style={styles.linkText}> Log In</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6e6e6e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#6e6e6e',
  },
});

export default RegisterScreen;
