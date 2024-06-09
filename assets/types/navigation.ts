export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    CreateAccount: undefined;
    VerifyEmail: {
      fullName: string;
      email: string;
      password: string;
    };
  };
  