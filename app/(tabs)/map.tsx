import universityModel from '@/assets/models/university.glb';
import { Ionicons } from '@expo/vector-icons';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import React, { Suspense } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Model() {
  const { scene } = useGLTF(universityModel);
  return <primitive object={scene} scale={0.5} />;
}

export default function MapScreen() {
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
});
