import RelRow from '../components/RelRow';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { styles } from '../styles/styles';
import { DUMMY_CONTACTS } from '../models/dummyData';

const RelationshipsScreen = ({ route, navigation }) => {
  console.log('rel screen - params', route.params);
  const [refresh, setRefresh] = useState(true);
  const [contacts, setContacts] = useState(DUMMY_CONTACTS);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={contacts}
          extraData={refresh}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <React.Fragment>
              <View style={{ flex: 1, flexDirection: 'row' }}>
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
