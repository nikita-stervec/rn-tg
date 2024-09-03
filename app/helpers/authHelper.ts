import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const getUserTag = async (): Promise<string | null> => {
  const user = auth().currentUser;
  if (!user) {
    return null;
  }

  try {
    const userDoc = await firestore().collection("users").doc(user.uid).get();
    if (userDoc.exists) {
      const tag = userDoc.data()?.tag;
      if (tag) {
        return tag;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getUserId = (): string | null => {
  const user = auth().currentUser;
  return user ? user.uid : null;
};
