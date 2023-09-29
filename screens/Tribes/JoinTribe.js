import { View, Text } from "react-native";
import React from "react";
import { useRealm } from "../../models";
import globalStyles from "../../constants/GlobalStyle";
import { FlatList } from "react-native-gesture-handler";
import { OvalButton } from "../../components";
import { COLORS } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { useUser } from "@realm/react";

const JoinTribe = ({ navigation }) => {
  const realm = useRealm();

  // get all tribes that aren't called Mia's Warriors (AI)
  const tribes = realm.objects("Tribe").filtered("name != $0", "Mia's Warriors (AI)").filtered("name != $0", "Demo Tribe");
  // const tribes = realm.objects("Tribe");
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const JoinTribe = async ({ tribeId }) => {
    setIsLoading(true);
    try {
      const tribe = realm.objects("Tribe").filtered("_id == $0", tribeId)[0];
      if (tribe) {
        realm.write(() => {
          tribe.members.push(user.id);
        });
        const customDataCollection = user
          .mongoClient("mongodb-atlas")
          .db("todo")
          .collection("User");
        const filter = { _id: user.id };
        const update = {
          $set: {
            tribe: tribeId,
          },
        };
        await customDataCollection.updateOne(filter, update);
        await user.refreshCustomData();
        await realm.syncSession.uploadAllLocalChanges();
      } else {
      }
      setIsLoading(false);
      navigation.replace("Home");
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <View style={[globalStyles.container, {marginTop: 15}]}>
      <Text style={globalStyles.subTitle}>Join A Tribe:</Text>
      <FlatList
        data={tribes}
        renderItem={({ item }) => (
          <View style={globalStyles.exerciseItem}>
            <Text style={globalStyles.h3}>{item.name}</Text>
            <View style={{ flexDirection: "row", paddingVertical: 5 }}>
              <FontAwesome name="users" size={16} color={COLORS.secondary} />
              <Text style={globalStyles.text}>
                {" "}
                {item.members.length}
                {item._id.toHexString}
              </Text>
            </View>
            <OvalButton
              text="Join"
              onPress={() => JoinTribe({ tribeId: item._id })}
            />
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={COLORS.secondary}
      />
    </View>
  );
};

export default JoinTribe;
