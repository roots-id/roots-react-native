import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { Divider, List } from "react-native-paper";
import { useSelector } from "react-redux";
import { styles } from "../styles/styles";
import { CompositeScreenProps } from "@react-navigation/core/src/types";
import { ROUTE_NAMES } from "../navigation";
import { getVerifiedCredentials } from "../store/selectors/credential";
const credLogo = require("../assets/vc.png");
const discordLogo = require("../assets/discord.png");

const CredentialsScreen = ({
  route,
  navigation,
}: CompositeScreenProps<any, any>) => {
  console.log("creds screen - params", route.params);
  const [refresh, setRefresh] = useState(true);
  const creds = useSelector(getVerifiedCredentials);
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          ...styles.container,
          borderColor: "#DE984F",
          borderWidth: 1,
          borderRadius: 20,
          margin: 16,
        }}
      >
        <FlatList
          data={creds}
          extraData={refresh}
          keyExtractor={(item) => item.verifiedCredential.proof.hash}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <React.Fragment>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderBottomColor: "#3A3A3A",
                  borderBottomWidth: 1,
                }}
              >
                <SafeAreaView>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(ROUTE_NAMES.CREDENTIAL_DETAILS, {
                        cred: item,
                      })
                    }
                  >
                    <Image
                      source={
                        item.alias === "DISCORD HANDLE" ? discordLogo : credLogo
                      }
                      style={styles.credLogoStyle}
                    />
                  </TouchableOpacity>
                </SafeAreaView>
                <SafeAreaView style={styles.container}>
                  <List.Item
                    title={item.alias}
                    titleNumberOfLines={1}
                    titleStyle={styles.clickableListTitle}
                    descriptionStyle={styles.listDescription}
                    descriptionNumberOfLines={1}
                    onPress={() =>
                      navigation.navigate(ROUTE_NAMES.CREDENTIAL_DETAILS, {
                        cred: item,
                      })
                    }
                  />
                </SafeAreaView>
              </View>
            </React.Fragment>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default CredentialsScreen;
