import React from 'react';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import { ROUTE_NAMES } from '../navigation/constants';

// import {asContactShareable, getContactByAlias, showRel} from '../relationships';

export default function IconActions(...props) {
//  console.log("IconActions - props",props)
    const navigation = props[0]["nav"]
    const add = props[0]["add"]
    const person = props[0]["person"]
    const scan = props[0]["scan"]
    const settings = props[0]["settings"]
    const workflows = props[0]["workflows"]
//          <IconButton
//                icon="plus"
//                size={28}
//                color="#e69138"
//                onPress={() => navigation.navigate(add)}
//            />
    return (
        <View style={{flexDirection: 'row',}}>
            <IconButton
                icon="account"
                size={28}
                color="#e69138"
                // onPress={() => showRel(navigation, asContactShareable(getContactByAlias(person)))}
                onPress={() => console.log('onPress clicked')}
            />
            <IconButton
                icon="qrcode-scan"
                size={28}
                color="#e69138"
                onPress={() => navigation.navigate(ROUTE_NAMES.SCAN_QR_CODE, {type: scan})}
            />
            <IconButton
                icon="cog-outline"
                size={28}
                color="#e69138"
                onPress={() => navigation.navigate(settings)}
            />
            <IconButton
                icon="sitemap"
                size={28}
                color="#e69138"
                onPress={() => navigation.navigate(workflows)}
            />
        </View>
    )
}
