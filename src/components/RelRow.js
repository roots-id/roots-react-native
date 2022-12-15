import React from "react";
import { Image, SafeAreaView, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { ROUTE_NAMES } from "../navigation";
// import {asContactShareable, getCurrentUserContact, showRel} from '../relationships'
// import { getChatItem } from '../roots'
import { styles } from "../styles/styles";

export default function RelRow(...props) {
  const item = props[0]["rel"];
  const navigation = props[0]["nav"];

  function getContactName(contact) {
    if (contact.startsWith("You")) {
      return "Your History";
    } else {
      return contact;
    }
  }

  return (
    <React.Fragment>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTE_NAMES.RELATIONSHIP_DETAILS, {
              user: item,
            })
          }
        >
          <Image
            source={{ uri: item.displayPictureUrl }}
            style={{
              width: 60,
              height: 60,
              resizeMode: "contain",
              borderRadius: 30,
              margin: 8,
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <List.Item
          title={getContactName(item.displayName)}
          titleNumberOfLines={1}
          titleStyle={styles.clickableListTitle}
          descriptionStyle={styles.listDescription}
          descriptionNumberOfLines={1}
          onPress={() => navigation.navigate(ROUTE_NAMES.CHAT, { user: item })}
        />
      </SafeAreaView>
    </React.Fragment>
  );
}
