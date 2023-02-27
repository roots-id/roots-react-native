import RelRow from "../components/RelRow";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FlatList, SafeAreaView, View } from "react-native";
import { Divider } from "react-native-paper";
import { getContacts } from "../store/selectors/contact";
import { styles } from "../styles/styles";

const RelationshipsScreen = ({ route, navigation }) => {
    console.log("rel screen - params", route.params);
    const [refresh, setRefresh] = useState(true);
    const contacts = useSelector(getContacts);

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
                    data={contacts}
                    extraData={refresh}
                    keyExtractor={(item) => String(item._id)}
                    ItemSeparatorComponent={() => <Divider />}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
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
                                <RelRow rel={item} nav={navigation} />
                            </View>
                        </React.Fragment>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

export default RelationshipsScreen;
