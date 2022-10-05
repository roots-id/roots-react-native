import RelRow from '../components/RelRow';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { styles } from '../styles/styles';

const DUMMY_RELATIONSHIP = [
  {
    id: 'dummy_id_1',
    displayPictureUrl:
      'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png',
    displayName: 'Guest',
  },
  {
    id: 'dummy_id_2',
    displayPictureUrl:
      'https://avatars.githubusercontent.com/u/681493?v=4',
    displayName: 'Esteban',
  },
  {
    id: 'dummy_id_3',
    displayPictureUrl:
      'https://avatars.githubusercontent.com/u/2913773?v=4',
    displayName: 'Rodolfo',
  },
  {
    id: 'dummy_id_4',
    displayPictureUrl:
      'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png',
    displayName: 'MeGrimLance',
  },
];
const RelationshipsScreen = ({ route, navigation }) => {
  console.log('rel screen - params', route.params);
  const [refresh, setRefresh] = useState(true);
  const [contacts, setContacts] = useState(DUMMY_RELATIONSHIP);

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
