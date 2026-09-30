interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  hasPassword: boolean;
}

interface MeQuery {
  me: User | null;
}
