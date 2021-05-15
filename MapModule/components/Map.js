import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity
} from "react-native";

import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { Icon } from "react-native-elements";

import MapViewDirections from "react-native-maps-directions";
import { getDistance } from "geolib";
import getDirections from "react-native-google-maps-directions";
import * as Location from "expo-location";

import MarkerModal from "./MarkerModal";
import { vendingMachineCoordinates } from "../VendingMachineCoordinates";

// const GOOGLEMAP_API_KEY = "AIzaSyBUYPp3NwoR6q5rd5kdZLCz6EPkpnsOMyM";
const origin = { latitude: 26.47310246425863, longitude: 73.11491079431302 };
const destinationMPD = {
  latitude: 26.471453412396343,
  longitude: 73.11336240671098
};

function clickMarker() {
  Alert.alert("Current Location", "This is your current location", [
    {
      text: "Okay",
      style: "default"
    },
    {
      text: "Cancel",
      style: "cancel"
    }
  ]);
}

const Map = props => {
  const [modal, setModal] = useState(false);
  const [
    selectedVendingMachineObject,
    setSelectedVendingMachineObject
  ] = useState();
  const [locationResult, setLocationResult] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [mapRegion, setMapRegion] = useState(null);
  const [destination, setDestination] = useState();
  const [source, setSource] = useState();
  // const [nearest, setNearest] = useState({ latitude: 0, longitude: 0 });
  // const [nearestDistance, setNearestDistance] = useState(0);
  let nearest = { latitude: 0, longitude: 0 };
  let nearestDistance = 100000;

  async function _getLocation() {
    // let { status } = Permissions.askAsync(Permissions.LOCATION);
    // let { status } = await Location.requestForegroundPermissionsAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      // this.setState({
      //   locationResult: "Permission to access location was denied"
      // });
      setLocationResult("Permission to access location was denied");
      return;
    } else {
      setHasLocationPermissions(true);
    }
    let location = await Location.getCurrentPositionAsync();
    setLocationResult(location);

    // this.setState({
    //   mapRegion: {
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //     latitudeDelta: 0.03,
    //     longitudeDelta: 0.03
    //   }
    // });

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03
    });

    setSource({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    return location;
  }

  function _handleMapRegion(region) {
    // this.setState({ mapRegion: region });
    setMapRegion(region);
  }

  function showModal(vendingPlace) {
    // this.setState({ modal: true });
    console.log("vendingPlace", vendingPlace);
    setModal(true);
    setSelectedVendingMachineObject({ location: vendingPlace.location });
  }

  function hideModal() {
    setModal(false);
    setSelectedVendingMachineObject();
  }

  async function getNearest() {
    await vendingMachineCoordinates.map((vendingPlace, index) => {
      if (
        getDistance(source, {
          latitude: vendingPlace.latitude,
          longitude: vendingPlace.longitude
        }) < nearestDistance
      ) {
        nearestDistance = getDistance(source, {
          latitude: vendingPlace.latitude,
          longitude: vendingPlace.longitude
        });

        nearest = {
          latitude: vendingPlace.latitude,
          longitude: vendingPlace.longitude
        };
      }
      // console.log("getnearest nearest", nearest);
    });

    return await { source: nearest, destination: source };
  }

  useEffect(() => {
    _getLocation();
    getNearest();
  }, []);

  // _getLocation();
  // getNearest();

  return (
    <>
      {locationResult == null ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%"
          }}
        >
          <Text style={{ fontSize: 25 }}>Finding your current location</Text>
        </View>
      ) : hasLocationPermissions == false ? (
        <Text
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 25
          }}
        >
          You haven't given us location permission
        </Text>
      ) : mapRegion === null ? (
        <Text
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 25
          }}
        >
          This map region doesn't exist
        </Text>
      ) : (
        <>
          {/* <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#25b0fa",
              position: "absolute",
              padding: 12,
              top: 550,
              right: 10,
              zIndex: 1,
            }}
            underlayColor="#DDDDDD"
            onPress={() => console.log("Directions")}
          >
            <Icon name="directions" size={25} />
          </TouchableOpacity> */}
          <MapView
            style={{ ...StyleSheet.absoluteFillObject, flex: 1 }}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={mapRegion}
            // onRegionChange={_handleMapRegion}
            showsMyLocationButton={true}
            showsUserLocation={true}
            onUserLocationChange={region => {
              setLocationResult({
                coords: {
                  latitude: region.nativeEvent.coordinate.latitude,
                  longitude: region.nativeEvent.coordinate.longitude
                }
              });

              // console.log("userlocation change", region.nativeEvent);
            }}
          >
            {mapRegion == null ? (
              <Marker
                coordinate={{
                  latitude: 0,
                  longitude: 0
                }}
              ></Marker>
            ) : (
              <>
                {/* {console.log("marker", locationResult)} */}
                <Marker
                  coordinate={{
                    latitude: locationResult.coords.latitude,
                    longitude: locationResult.coords.longitude
                  }}
                  pinColor="red"
                  // onPress={showModal}
                >
                  <Callout>
                    <Text>"Current Location"</Text>
                  </Callout>
                </Marker>
                {/* {console.log("marker region", locationResult)} */}
                <Circle
                  center={{
                    latitude: locationResult.coords.latitude,
                    longitude: locationResult.coords.longitude
                  }}
                  radius={1000}
                  fillColor={"rgba(200,300,200,0.5)"}
                />
              </>
            )}

            {vendingMachineCoordinates.map((vendingPlace, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: vendingPlace.latitude,
                  longitude: vendingPlace.longitude
                }}
                pinColor="blue"
              >
                <Callout
                  onPress={() => {
                    setModal(true);
                    setSelectedVendingMachineObject(vendingPlace);
                    setDestination({
                      latitude: vendingPlace.latitude,
                      longitude: vendingPlace.longitude
                    });
                  }}
                >
                  <Text>{vendingPlace.location}</Text>
                </Callout>
              </Marker>
            ))}
          </MapView>

          <MarkerModal
            modal={modal}
            hideModal={hideModal}
            selectedVendingMachineObject={selectedVendingMachineObject}
            source={source}
            destination={destination}
          />
          <Button
            title="Nearest Vending Machine"
            onPress={async () => {
              const data = await getNearest();
              // console.log("nearest", nearest);
              getDirections(data);
            }}
          />

          {/* <MapViewDirections
            origin={origin}
            destination={destinationMPD}
            // apikey={GOOGLEMAP_API_KEY}
            // apikey=""
          /> */}
        </>
      )}
    </>
  );
};

export default Map;
