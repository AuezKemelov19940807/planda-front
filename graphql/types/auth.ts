export interface SignInResponse {
  signIn: {
    access_token: string;
    name: string;
    id: string;
    email: string;
    avatar: string;
    hasPassword: boolean;
  };
}

export interface SignInVariables {
  email: string;
  password: string;
}

export type GoogleSignInData = {
  googleSignIn: User;
};

export type MeData = {
  me: User;
};

export type LogoutData = {
  logOut: boolean;
};

export interface GoogleSignInResponse {
  googleSignIn: {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
    access_token: string;
    hasPassword: boolean;
  };
}

export interface GoogleSignInVariables {
  credential: string;
}

export interface UpdateUserPayload {
  avatar?: string;
  name: string;
}

export interface UpdateUserMutationData {
  updateUser: User;
}

export interface SignUpVariables {
  payload: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  };
}

export interface SignUpResponse {
  signUp: {
    id: string;
    name: string | null;
    email: string;
    avatar: string | null;
    access_token: string;
  };
}
