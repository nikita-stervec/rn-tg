import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { IMessage, SendMessageParams, IUser } from "@/types/types";

export const addUser = async (name: string, email: string, tag: string) => {
  const user = auth().currentUser;
  if (!user) {
    return;
  }

  try {
    await firestore().collection("users").doc(user.uid).set({
      username: name,
      createdAt: firestore.FieldValue.serverTimestamp(),
      email: email,
      tag: tag,
    });
  } catch (e) {
    console.error("Error adding user to Firestore:", e);
    throw e;
  }
};

export const searchUserByTag = async (tag: string): Promise<IUser[]> => {
  try {
    const querySnapshot = await firestore()
      .collection("users")
      .where("tag", "==", tag)
      .get();

    if (querySnapshot.empty) {
      return [];
    }

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().username,
      tag: doc.data().tag,
    }));

    return users;
  } catch (e) {
    console.error("Search error:", e);
    throw e;
  }
};

export const createChat = async (chatId: string, participants: string[]) => {
  try {
    const uniqueParticipants = [...new Set(participants)];

    if (uniqueParticipants.length < 2) {
      throw new Error("A chat must have at least two participants");
    }

    const chatDoc = firestore().collection("chats").doc(chatId);
    await chatDoc.set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      participants: uniqueParticipants,
      type: uniqueParticipants.length === 2 ? "private" : "group",
    });
  } catch (e) {
    console.error("Error creating chat:", e);
    throw e;
  }
};

export const sendMessage = async (
  chatId: string,
  message: SendMessageParams,
  participants: string[]
) => {
  try {
    if (!message.text || !message.senderTag) {
      throw new Error("Message text and senderTag are required");
    }

    const chatDoc = firestore().collection("chats").doc(chatId);
    const chatSnapshot = await chatDoc.get();

    if (!chatSnapshot.exists) {
      await createChat(chatId, participants);
    } else {
      const chatData = chatSnapshot.data();
      const updatedParticipants = [
        ...new Set([...chatData?.participants, ...participants]),
      ];
      await chatDoc.update({ participants: updatedParticipants });
    }

    const messagesCollection = chatDoc.collection("messages");

    await messagesCollection.add({
      text: message.text,
      senderTag: message.senderTag,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.error("Error sending message:", e);
    throw e;
  }
};

export const getMessages = async (
  chatId: string,
  userTag: string
): Promise<IMessage[]> => {
  try {
    const messagesCollection = firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages");

    const messagesSnapshot = await messagesCollection
      .orderBy("createdAt", "asc")
      .get();
    const messages = messagesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        senderTag: data.senderTag,
        sender: data.senderTag === userTag,
        createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
      };
    });
    return messages;
  } catch (e) {
    console.error("Error getting messages:", e);
    throw e;
  }
};

export const subscribeToChat = async (userTag: string, chatId: string) => {
  try {
    await firestore().collection("subscriptions").add({
      userTag,
      chatId,
      subscribedAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.error("Error subscribing to chat:", e);
    throw e;
  }
};

export const getSubscriptions = async (userTag: string) => {
  try {
    const subscriptionsSnapshot = await firestore()
      .collection("subscriptions")
      .where("userTag", "==", userTag)
      .get();

    const subscriptions = subscriptionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return subscriptions;
  } catch (e) {
    console.error("Error getting subscriptions:", e);
    throw e;
  }
};

export const getChatsWithUserMessages = async (
  userTag: string
): Promise<{ id: string; [key: string]: any }[]> => {
  try {
    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot =
      await firestore()
        .collection("chats")
        .where("participants", "array-contains", userTag)
        .get();

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Record<string, unknown>),
    }));
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

export const getOrCreatePrivateChat = async (
  user1Tag: string,
  user2Tag: string
): Promise<string | null> => {
  const chatId =
    user1Tag < user2Tag ? `${user1Tag}-${user2Tag}` : `${user2Tag}-${user1Tag}`;

  try {
    const chatDoc = await firestore().collection("chats").doc(chatId).get();

    if (chatDoc.exists) {
      return chatId;
    } else {
      await firestore()
        .collection("chats")
        .doc(chatId)
        .set({
          participants: [user1Tag, user2Tag],
          createdAt: firestore.FieldValue.serverTimestamp(),
          type: "private",
        });
      return chatId;
    }
  } catch (error) {
    console.error("Error creating or getting chat:", error);
    return null;
  }
};
