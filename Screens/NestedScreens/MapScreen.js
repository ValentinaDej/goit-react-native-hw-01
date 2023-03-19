import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen({ route }) {
  const { latitude, longitude } = route.params.location;
  const dataDescription = route.params.description;

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
  },
});

export default MapScreen;
