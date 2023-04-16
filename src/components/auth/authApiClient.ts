import { UserData } from "./types";

const STORAGE_KEY_PREFIX = "tt_user_";

const getStorageKey = (username: string) => STORAGE_KEY_PREFIX + username;

const getUser = (username: string) => {
  const userDataJson = localStorage.getItem(getStorageKey(username));

  if (!userDataJson) {
    return null;
  }

  return JSON.parse(userDataJson) as UserData;
};

const getAvatarUrl = async () => {
  let randomUser;

  try {
    randomUser = randomUser = await fetch(
      "https://randomuser.me/api/?inc=picture"
    ).then((res) => res.json());

    return randomUser?.results[0].picture.thumbnail as string;
  } catch {}
};

const authenticate = (username: string, password: string) => {
  const user = getUser(username);

  if (user && user.password === password) {
    return user;
  }

  return null;
};

const signUp = async (username: string, password: string) => {
  if (getUser(username)) {
    throw new SignUpError("The username is already taken");
  }

  const user: UserData = {
    id: Date.now(),
    username,
    password,
    avatarUrl: await getAvatarUrl(),
  };
  localStorage.setItem(getStorageKey(user.username), JSON.stringify(user));

  return user;
};

class SignUpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SignUpError";
  }
}

export { authenticate, signUp, SignUpError };
