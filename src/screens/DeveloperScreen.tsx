import React from 'react';
import {Button, View} from 'react-native';

const DeveloperScreen = (props) => {
    console.log(props.navigation)
    return (
        <View>
            <Button
                title={"Clear Storage"}
                onPress={() => console.log('clear storage')}
            />
            <Button
                title={"Communications Screen"}
                onPress={() => props.navigation.navigate("Communications")}
            />
            <Button
                title={"Mediator Screen"}
                onPress={() => props.navigation.navigate("Mediator")}
            />
            <Button
                title={"Sidetree Screen"}
                onPress={() => props.navigation.navigate("Sidetree")}
            />
            <Button
                title={"Current Wallet"}
                onPress={() => props.navigation.navigate("Wallet")}
            />
            <Button
                title={"Request Credential"}
                onPress={() => props.navigation.navigate("RequestCredential")}
            />
        </View>
    )
};

export default DeveloperScreen;
