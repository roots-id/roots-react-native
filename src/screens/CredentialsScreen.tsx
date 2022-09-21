import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Divider, List} from 'react-native-paper';
import {styles} from "../styles/styles";
import {credential} from "../models";
import { CREDENTIALS } from "../models/dummyData";
import {CompositeScreenProps} from "@react-navigation/core/src/types";
const credLogo = require('../assets/vc.png');

const CredentialsScreen = ({route, navigation}: CompositeScreenProps<any, any>) => {
    console.log("creds screen - params", route.params)
    const [refresh, setRefresh] = useState(true)
    const [creds, setCreds] = useState<credential[]>([CREDENTIALS])

    useEffect(() => {
        setTimeout(() => {
            setRefresh(false);
            setCreds([CREDENTIALS])
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={creds}
                    extraData={refresh}
                    keyExtractor={(item) => item.verifiedCredential.proof.hash}
                    ItemSeparatorComponent={() => <Divider/>}
                    renderItem={({item}) => (
                        <React.Fragment>
                            <View style={{flex: 1, flexDirection: 'row',}}>
                                <SafeAreaView>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Credential Details', {cred: item})}>
                                        <Image source={credLogo}
                                               style={styles.credLogoStyle}
                                        />
                                    </TouchableOpacity>
                                </SafeAreaView>
                                <SafeAreaView style={styles.container}>
                                    <List.Item
                                        title={item.verifiedCredential.encodedSignedCredential}
                                        titleNumberOfLines={1}
                                        titleStyle={styles.clickableListTitle}
                                        descriptionStyle={styles.listDescription}
                                        descriptionNumberOfLines={1}
                                        onPress={() => navigation.navigate('Credential Details', {cred: item})}
                                    />
                                </SafeAreaView>
                            </View>
                        </React.Fragment>
                    )}
                />
            </SafeAreaView>
        </View>
    )
};

export default CredentialsScreen
