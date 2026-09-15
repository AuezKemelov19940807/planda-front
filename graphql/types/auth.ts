import { User } from "./user";

export type GoogleSignInData = {
  googleSignIn: User;
};

export type MeData = {
  me: User;
};

export type LogoutData = {
  logOut: boolean;
};
