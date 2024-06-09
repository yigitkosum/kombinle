import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Checkbox from 'expo-checkbox';
import { RootStackParamList } from '@/assets/types/navigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isSelected, setSelection] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    let [fontsLoaded] = useFonts({
        'Montserrat': require('@/assets/fonts/Montserrat-Light.ttf'),
        'MontserratB': require('@/assets/fonts/Montserrat-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const handleNext = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields and agree to the terms and conditions.");
            return;
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>sign in to access your account</Text>


            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                />

                <Icon
                    name="email"
                    size={24}
                    color={'#6e6e6e'}
                />

            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Icon name={passwordVisible ? "eye" : "eye-off"} size={24} color="#6e6e6e" />
                </TouchableOpacity>
            </View>

            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                    color={isSelected ? '#6C63FF' : undefined}
                />
                <Text style={styles.textWithMargin}>
                    Remember Me
                    <Text style={styles.linkText}>                                  Forget Password ? </Text>
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>New member?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                    <Text style={styles.linkText}> Register Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textWithMargin: {
        fontSize: 13,
        marginLeft: 10,
    },
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
        marginTop: 60,
        fontFamily: 'MontserratB',
        fontSize: 32,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'Montserrat',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 80,
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
    checkbox: {
        alignSelf: 'center',
    },
    input: {
        color: '#FFFFF',
        fontFamily: 'Montserrat',
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
    },

    checkboxContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    linkText: {
        color: '#6C63FF',
        fontWeight: 'bold',
        fontSize: 13,
    },
    button: {
        marginTop: 100,
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      footerText: {
        textAlign: 'center',
        color: '#6e6e6e',
      },
});

export default LoginScreen;
