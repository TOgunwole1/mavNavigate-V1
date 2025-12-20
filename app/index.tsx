import { Redirect } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import utaLogo from '@/assets/images/uta-logo.png';

const LoadingScreen = () => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading assets or making API calls
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isReady) {
    // When ready, redirect to the main app experience
    return <Redirect href="/map" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={utaLogo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.appName}>MavNavigate</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 128,
    height: 128,
  },
  footer: {
    paddingBottom: 64, // Corresponds to pb-16
  },
  appName: {
    color: '#a0aec0', // Corresponds to text-gray-400
    fontSize: 24, // Corresponds to text-2xl
    letterSpacing: 0.5, // Corresponds to tracking-wide
  },
});

export default LoadingScreen;
