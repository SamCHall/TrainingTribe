import { View, Text } from "react-native";
import React from "react";
import globalStyles from "../../constants/GlobalStyle";
import { useRoute } from "@react-navigation/native";
import { ExerciseCardReadOnly, TextButton } from "../../components";
import { FlatList } from "react-native-gesture-handler";
import { COLORS } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomStatusBar } from "../../components";

// Inside the 'WorkoutDetails' component

const WorkoutDetails = ({ navigation }) => {
  const route = useRoute();
  const { name, type, date, exercises } = route.params;

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <CustomStatusBar />
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          marginTop: 15,
        }}
      >
        <TextButton text={"Back"} onPress={() => navigation.goBack()} />
      </View>
      <Text
        style={[
          globalStyles.title,
          { alignSelf: "center", paddingVertical: 20 },
        ]}
      >
        {name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.tertiary,
        }}
      >
        <Text style={globalStyles.h3}>{type}</Text>
        <Text style={globalStyles.h3}>{date}</Text>
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ExerciseCardReadOnly exercise={item} />}
      />
    </SafeAreaView>
  );
};

export default WorkoutDetails;
