import universityModel from '@/assets/models/university.glb';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import * as Location from 'expo-location';
import React, { Suspense, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Model() {
  const { scene } = useGLTF(universityModel);
  return <primitive object={scene} scale={0.5} />;
}

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();

    return () => clearInterval(timer);
  }, []);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`
      );
      const data = await response.json();
      setWeather(data.current_weather);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return 'sunny';
    if (code <= 3) return 'partly-sunny';
    if (code <= 48) return 'cloudy';
    if (code <= 67) return 'rainy';
    if (code <= 77) return 'snow';
    if (code <= 82) return 'rainy';
    if (code <= 99) return 'thunderstorm';
    return 'help';
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9e9ea7" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#9e9ea7"
          />
        </View>

        {/* Weather Widget */}
        <View style={styles.widgetContainer}>
          <View
            style={[
              styles.widgetContent,
              { backgroundColor: colorScheme === 'dark' ? 'rgba(28, 28, 30, 0.9)' : 'rgba(243, 243, 244, 0.9)' },
            ]}>
            {weather ? (
              <>
                <Ionicons
                  name={getWeatherIcon(weather.weathercode)}
                  size={24}
                  color={colorScheme === 'dark' ? '#ffffff' : '#0d0c22'}
                />
                <View style={styles.weatherInfo}>
                  <Text style={[styles.temperature, { color: colorScheme === 'dark' ? '#ffffff' : '#0d0c22' }]}>
                    {Math.round(weather.temperature)}°F
                  </Text>
                  <Text style={[styles.time, { color: colorScheme === 'dark' ? '#cccccc' : '#555555' }]}>
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </>
            ) : (
              <Text style={[styles.loadingText, { color: colorScheme === 'dark' ? '#cccccc' : '#555555' }]}>
                {errorMsg || 'Loading...'}
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* Adjusted camera position to provide an isometric-like view similar to the screenshot */}
      <Canvas
        camera={{ position: [-0.2, 0.3, 1], fov: 56 }}
        onCreated={(state) => {
          const _gl = state.gl.getContext();
          const pixelStorei = _gl.pixelStorei.bind(_gl);
          _gl.pixelStorei = function (...args) {
            const [parameter] = args;
            switch (parameter) {
              case _gl.UNPACK_FLIP_Y_WEBGL:
              case _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL:
                return;
            }
            pixelStorei(...args);
          };
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f4',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
    height: 45,
    paddingHorizontal: 12,
    // Add shadow for better visibility over the 3D model
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#0d0c22',
    fontSize: 16,
  },
  widgetContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  widgetContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 243, 244, 0.9)',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weatherInfo: {
    marginLeft: 8,
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d0c22',
  },
  time: {
    fontSize: 12,
    color: '#555',
  },
  loadingText: {
    fontSize: 12,
    color: '#555',
  },
});
