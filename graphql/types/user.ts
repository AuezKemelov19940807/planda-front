interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  hasPassword: boolean;
  isGoogleAccount: boolean;
}

interface MeQuery {
  me: User | null;
}
