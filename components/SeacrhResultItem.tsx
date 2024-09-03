import React from "react";
import { TouchableOpacity } from "react-native";
import { ChatView } from "@/components/ChatView";
import { IUser } from "@/types/types";

interface SearchResultItemProps {
  user: IUser;
  onSelect: (user: IUser) => void;
}

export const SearchResultItem = ({ user, onSelect }: SearchResultItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(user);
      }}
    >
      <ChatView
        item={{
          id: user.id,
          name: user.name,
          avatar: user.avatar || "",
          lastMessage: "",
        }}
        onPress={() => onSelect(user)}
      />
    </TouchableOpacity>
  );
};
``;
