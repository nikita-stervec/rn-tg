import firestore from "@react-native-firebase/firestore";

interface IUser {
  name: string;
  timestamp: number;
  email: string;
}

export const addUser = (name: string, email: string, tag: string) => {
  try {
    firestore().collection("users").add({
      username: name,
      createdAt: firestore.FieldValue.serverTimestamp(),
      email: email,
      tag: tag,
    });
  } catch (e) {
    throw e;
  }
};

export const searchUserByTag = async (tag: string) => {
  try {
    const querySnapshot = await firestore()
      .collection("users")
      .where("tag", "==", tag)
      .get();

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (e) {
    console.error("Search error:", e);
    throw e;
  }
};
