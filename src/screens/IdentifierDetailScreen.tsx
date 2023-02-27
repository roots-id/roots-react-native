import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import * as models from '../models';
import { styles } from '../styles/styles';
import { CompositeScreenProps } from '@react-navigation/core/src/types';
import { goToShowQrCode } from '../navigation/helper/navigate-to';
import { useDispatch } from 'react-redux';
import BottomSheet from "@gorhom/bottom-sheet";
import {ROUTE_NAMES} from "../navigation";
import {addMessage} from "../store/slices/chat";
import {sendMessage} from "../helpers/messages";
import {MessageType} from "../models/constants";
import {didDocument} from "../models";
import {idDTO, resolveAndAdd} from "../store/thunks/identifier";
const atalaLogo = require('../assets/atala2.png');

export default function IdentifierDetailScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log('IdDetailScreen - route params are', JSON.stringify(route.params));
  const dispatch = useDispatch();
  const [id, setId] = useState<models.identifier>(route.params.identifier);
    const [refresh, setRefresh] = useState(true)

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["50%", "75%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    useEffect(() => {
      console.log('id details - initially setting id', id);
      setId(route.params.identifier);
    }, []);

    function setAndRefreshId(id: models.identifier) {
        console.log("IdentifierDetailScreen - setting id",id)
        setId(id)
        console.log("IdentifierDetailScreen - setting refresh",!refresh)
        setRefresh(!refresh)
    }

  return (
      <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{backgroundColor: '#140A0F', borderWidth: 1, borderColor: '#DE984F'}}
      >
          <View
              style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 16
              }}
          >
              <View style={styles.closeButtonContainer}>
                  <IconButton
                      icon="close-circle"
                      size={28}
                      iconColor="#C5C8D1"
                      onPress={() => navigation.goBack()}
                      style={{borderWidth: 1, borderColor: '#FFA149', borderRadius: 10 }}
                  />
                  <IconButton
                      icon="text-box-search-outline"
                      size={28}
                      iconColor="#C5C8D1"
                      onPress={() => {
                          const idDTO: idDTO = {id: id,callback: setAndRefreshId};
                          dispatch(resolveAndAdd(idDTO))}
                      }
                      style={{borderWidth: 1, borderColor: '#FFA149', borderRadius: 10 }}
                  />
              </View>
              <Animated.View style={styles.viewAnimated}>
                <Image source={atalaLogo} style={{
                    width: 130,
                    height: 150,
                    resizeMode: 'contain',
                    margin: 8
                }} />
                <FlatList
                  data={Object.entries(id)}
                  extraData={refresh}
                  keyExtractor={([key, val]) => key}
                  ItemSeparatorComponent={() => <Divider />}
                  renderItem={(item) => {
                    return (
                      <ScrollView style={styles.scrollableModal}>
                        <Text style={{ color: 'white' }}>
                          {item.item[0] + ': ' + item.item[1]}
                        </Text>
                      </ScrollView>
                    );
                  }}
                />
            </Animated.View>
        </View>
    </BottomSheet>
  );
}
