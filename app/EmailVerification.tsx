import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/assets/types/navigation';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationProp, useNavigation } from '@react-navigation/native';
type VerifyEmailScreenRouteProp = RouteProp<RootStackParamList, 'VerifyEmail'>;

type Props = {
  route: VerifyEmailScreenRouteProp;
};

const EmailVerification: React.FC<Props> = ({ route }) => {
  const { fullName, email, password } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [counter, setCounter] = useState<number>(180);
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [isResending, setIsResending] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  let [fontsLoaded] = useFonts({
    'Montserrat': require('@/assets/fonts/Montserrat-Light.ttf'),
    'MontserratB': require('@/assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  useEffect(() => {
    generateAndSendCode();
  }, []);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (isResending) {
      setIsResending(false);
    }
  }, [counter, isResending]);

  const generateAndSendCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    sendVerificationEmail(email, newCode);
  };

  const sendVerificationEmail = async (email: string, code: string) => {
    try {
      const response = await fetch('http://localhost:8081/api/sendVerificationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to send verification email');
    }
  };

  const handleResend = () => {
    setCounter(180);
    setIsResending(true);
    generateAndSendCode();
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleVerify = () => {
    if (code.join('') === generatedCode) {
      Alert.alert('Success', 'Your email has been verified.');
      navigation.navigate('VerifyEmail', { fullName, email, password });
    } else {
      Alert.alert('Error', 'The entered code is incorrect. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Almost there</Text>
      <Text style={styles.subHeader}>
        Please enter the 6-digit code sent to your email <Text style={styles.email}>{email}</Text> for verification.
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(index, value)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText} onPress={handleVerify}>VERIFY</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn’t receive any code? <Text style={styles.resendLink} onPress={handleResend}>Resend Again</Text>
      </Text>

      <Text style={styles.timerText}>
        Request new code in {Math.floor(counter / 60).toString().padStart(2, '0')}:{(counter % 60).toString().padStart(2, '0')}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontFamily: 'MontserratB',
    fontSize: 24,
  },
  subHeader: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  email: {
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    color: '#C4C4C4',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
  },
  verifyButton: {
    backgroundColor: '#4630EB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical: 20,
  },
  verifyButtonText: {
    fontFamily: 'MontserratB',
    color: '#fff',
  },
  resendText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
  },
  resendLink: {
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default EmailVerification;
