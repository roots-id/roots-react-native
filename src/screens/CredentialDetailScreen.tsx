import React, {
  useEffect,
  useState
} from "react";
import {
  Animated,
  FlatList,
  Image,
  Text,
  View,
  ScrollView,

} from "react-native";
import { Divider, IconButton, Button } from "react-native-paper";
import { styles } from "../styles/styles";
import { BottomSheet } from "../components/bottom-sheet";
import { CompositeScreenProps } from "@react-navigation/core/src/types";
import { decodeCredential } from "../models/samples/credentials";
import { goToShowQrCode } from "../navigation/helper/navigate-to";
import { useDispatch } from "react-redux";
import {updateMessage } from "../store/slices/chat";
import { denyCredentialOffer, addCredentialToList } from "../store/thunks/credential";


const credLogo = require("../assets/vc.png");
const discordLogo = require("../assets/discord.png");

export default function CredentialDetailScreen({
  route,
  navigation,
}: CompositeScreenProps<any, any>) {
  console.log("cred details - route params are", JSON.stringify(route.params.msg));
  console.log("cred details - route params are", JSON.stringify(route.params));
  const dispatch = useDispatch();
  const [cred, setCred] = useState<any>(route.params.msg.data.credential);
  const [msg, setMsg] = useState<any>(route.params.msg);

  const [verified, setVerified] = useState("help-circle");

  // useEffect(() => {
  //   console.log("cred details - initially setting cred", cred);
  //   setCred(route.params.cred);
  // }, []);

  const updateVerification = async () => {
    if (route.params?.cred?._id) {
      console.log('check verification ')
    }
  };

  const handleAccept =  async () => {
    //set is_offer if cred to false using spread operator
    const updatedCred = { ...cred, is_offer: 'Accepted' };
    dispatch(addCredentialToList(updatedCred));
    setCred(updatedCred);
    console.log('updated cred', updatedCred)
  
    //update the data in the msg with the current cred 
    const updatedMsg = { ...msg, data: { ...msg.data, credential: updatedCred } };
    const res = await dispatch(updateMessage({chatId: updatedMsg.rel, messageId: updatedMsg._id, message: updatedMsg}));
    // navigation.goBack()
  };

  const handleDeny = () => {
    //set is_offer if cred to false using spread operator
    const updatedCred = { ...cred, is_offer: 'Denied' };
    // dispatch(denyCredentialOffer(updatedCred));
    setCred(updatedCred);
    
    //update the data in the msg with the current cred 
    const updatedMsg = { ...msg, data: { ...msg.data, credential: updatedCred } };
    dispatch(updateMessage({chatId: updatedMsg.rel, messageId: updatedMsg._id, message: updatedMsg}));
    // navigation.goBack()

  };

  return (
    <BottomSheet>
      <View
        style={{
          flex: 0.6,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >


        <View style={styles.closeButtonContainer}>
        <Text style={{  paddingRight:10, paddingTop:15, color: "white", fontSize: 20, fontWeight: "bold" }}>
          Credential Offer
        </Text>
          <IconButton
            icon="keyboard-backspace"
            size={28}
            iconColor="white"
            onPress={() => navigation.goBack()}
            style={{ borderWidth: 1, borderColor: "#FFA149", borderRadius: 10 }}
          />
          <IconButton
            icon={verified}
            size={28}
            iconColor="white"
            onPress={updateVerification}
            style={{ borderWidth: 1, borderColor: "#FFA149", borderRadius: 10 }}
          />
          <IconButton
            icon="qrcode"
            size={28}
            iconColor="white"
            style={{ borderWidth: 1, borderColor: "#FFA149", borderRadius: 10 }}
            onPress={() =>
              goToShowQrCode(navigation, JSON.stringify(cred))
            }
          />
        </View>
        <View style={{ marginLeft: 26, flexDirection: "row", flexWrap: "wrap" }}>
          <Image
            source={{ uri: cred.image_url }}
            style={styles.credDetailLogoStyle}
          />
          <View style={{ marginTop: 16, marginLeft: 20 }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Issuer</Text>
            <Text style={{ fontWeight: "normal", color: "white" }}>{cred.issuer}</Text>
            <Text style={{ fontWeight: "bold", color: "white" }}>Type</Text>
            <Text style={{ fontWeight: "normal", color: "white" }}>VerifiableCredential</Text>
          </View>
        </View>
      </View>
      {cred.is_offer==='offered' ? (
        <View style={{ marginLeft: "20%", flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: 16 }}>
            <Button
              mode="contained"
              onPress={handleAccept}
              style={{ backgroundColor: "#ff9138", height: 40}}
              labelStyle={{ color: "white", fontSize: 18 }}
            >
              Accept
            </Button>
          </View>
          <View style={{ marginRight: 16 }}>
            <Button
              mode="contained"
              onPress={handleDeny}
              style={{ backgroundColor: "#140A0F", height: 40, borderColor: "white", borderWidth: 1}}
              labelStyle={{ color: "white", fontSize: 18 }}
            >
              Deny
            </Button>
          </View>
        </View>
      ) : 
      <View style={{ marginLeft: "10%", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "white" , fontSize: 20, fontWeight: 'bold'}}>Offer Status : {cred.is_offer}</Text>
      </View>
      
      
      }
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Animated.View style={styles.viewAnimated}>
          <FlatList
            data={[
              { key: "ID", value: cred.id },
              { key: "Issuance Date", value: cred.issuanceDate },
              { key: "Degree Type", value: cred.credentialSubject.degree.type },
              { key: "Degree Name", value: cred.credentialSubject.degree.name },
            ]}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={(item) => {
              return (
                <ScrollView style={styles.scrollableModal}>
                  <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "white" , fontWeight:'bold'}}>
                    {item.item.key }: {" "}
                  </Text>
                  <Text style={{ color: "white" }}>
                    {item.item.value}
                  </Text>
                  </View>
                </ScrollView>
              );
            }}
          />


        </Animated.View>
      </View>
    </BottomSheet>
  );
}
