import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

function MapScreen({ navigation, route }) {
  const { latitude, longitude } = route.params.location;
  const dataDescription = route.params.description;
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.header}>
        <Feather
          name="arrow-left"
          size={24}
          color="#BDBDBD"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.icon}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Map</Text>
        </View>
      </View>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.06,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title={dataDescription}
          pinColor="#FF6C00"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    paddingRight: 16,
  },
  icon: {
    marginRight: "auto",
    paddingLeft: 16,
  },
  form: {
    marginHorizontal: 16,
    flex: 1,
    marginTop: 32,
  },
});

export default MapScreen;
