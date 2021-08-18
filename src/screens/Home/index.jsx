import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Home() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const mapsRef = useRef();

    useEffect(() => {
        getUserPosition()
    }, []);

    async function getUserPosition() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            const { coords } = location;
            const { latitude, longitude } = coords;
            setLat(latitude);
            setLong(longitude);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => mapsRef.current?.animateCamera({
                    center: {
                        latitude: -16.0134945,
                        longitude: -48.082024,
                    }
                }, { duration: 1000 })}
                style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: 'yellow', padding: 10, zIndex: 2 }}>
                <Text>Animate</Text>
            </TouchableOpacity>
            {lat && long && (
                <MapView
                    ref={mapsRef}
                    initialRegion={{
                        latitude: lat,
                        longitude: long,
                        longitudeDelta: 0.005,
                        latitudeDelta: 0.005,
                    }}
                    style={{ width: "100%", height: "100%" }}>
                    <Marker
                        draggable
                        coordinate={{
                            latitude: lat,
                            longitude: long
                        }}
                        onDragEnd={(event) => console.log(event.nativeEvent)}
                    >
                        <Callout>
                            <View>
                                <Text>Teste</Text>
                                <Text>Teste</Text>
                            </View>
                        </Callout>
                    </Marker>
                </MapView>
            )}

        </View>
    );
}

