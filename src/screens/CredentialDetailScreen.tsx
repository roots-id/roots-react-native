import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Animated,
  FlatList,
  Image,
  Text,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { Divider, IconButton } from "react-native-paper";
import BottomSheet from "@gorhom/bottom-sheet";
import * as models from "../models";
import { styles } from "../styles/styles";
import { CompositeScreenProps } from "@react-navigation/core/src/types";
import { decodeCredential } from "../models/samples/credentials";
import { goToShowQrCode } from "../navigation/helper/navigate-to";
import { useDispatch } from "react-redux";
import { updateCredentialValidation } from "../store/thunks/credential";
const credLogo = require("../assets/vc.png");
const discordLogo = require("../assets/discord.png");

export default function CredentialDetailScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log("cred details - route params are", JSON.stringify(route.params));
  const dispatch = useDispatch();
  const [cred, setCred] = useState<models.credential>(route.params.cred);
  const [verified, setVerified] = useState("help-circle");
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    console.log("cred details - initially setting cred", cred);
    setCred(route.params.cred);
  }, []);

  const updateVerification = async () => {
    if (route.params?.cred?._id) {
      const isRevoked = await dispatch(
        updateCredentialValidation(route.params?.cred)
      );
      if (isRevoked.payload) {
        setVerified("close-octagon-outline");
      } else {
        setVerified("check-bold");
      }
    }
  };

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
            color="#C5C8D1"
            onPress={() => navigation.goBack()}
            style={{borderWidth: 1, borderColor: '#FFA149', borderRadius: 10 }}
          />
          <IconButton
              icon={verified}
              size={28}
              color="#C5C8D1"
              onPress={updateVerification}
              style={{borderWidth: 1, borderColor: '#FFA149', borderRadius: 10 }}
            />
            <IconButton
              icon="qrcode"
              size={28}
              color="#C5C8D1"
              style={{borderWidth: 1, borderColor: '#FFA149', borderRadius: 10 }}
              onPress={() =>
                goToShowQrCode(navigation, {
                  encodedSignedCredential: "dummy_vcEncodedSignedCredential",
                  proof: {
                    hash: "dummy_proofHash",
                    index: 0,
                  },
                })
              }
            />
        </View>
        <Animated.View style={styles.viewAnimated}>
          <Image
            source={cred.alias === "DISCORD HANDLE" ? discordLogo : credLogo}
            style={styles.credDetailLogoStyle}
          />
          <FlatList
            data={Object.entries(
              decodeCredential(cred.verifiedCredential.encodedSignedCredential)
                .credentialSubject
            )}
            keyExtractor={([key, val]) => key}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={(item) => {
              return (
                <ScrollView style={styles.scrollableModal}>
                  <Text style={{ color: "black" }}>
                    {item.item[0] + ": " + item.item[1]}
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
