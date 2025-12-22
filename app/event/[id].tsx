import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text, View, XStack, YStack } from 'tamagui';
import { Event } from '../../hooks/useEvents';
import { useFavorites } from '../../hooks/useFavorites';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.45;

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  
  const eventId = typeof id === 'string' ? parseInt(id, 10) : 0;

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`https://events.uta.edu/api/2/events/${eventId}`);
      const data = await response.json();
      const e = data.event;
      const instance = e.event_instances?.[0]?.event_instance;
      const startDate = instance?.start ? new Date(instance.start) : new Date();

      setEvent({
        id: e.id,
        title: e.title,
        subtitle: (e.location_name || 'UTA Campus') + (e.room_number ? ` - ${e.room_number}` : ''),
        image: e.photo_url || 'https://www.uta.edu/_nuxt/img/uta-logo.3c7c3e0.png',
        description: e.description_text || 'No description available.',
        time: startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: e.ticket_cost || 'Free'
      });
    } catch (err) {
      console.error('Error fetching event details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#1a1a1a" />
      </View>
    );
  }

  if (!event) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Event not found</Text>
      </View>
    );
  }

  const isFav = isFavorite(eventId);

  return (
    <View flex={1} backgroundColor="white">
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View height={HERO_HEIGHT} position="relative">
          <Image 
            source={{ uri: event.image }} 
            style={{ width: '100%', height: '100%' }} 
            contentFit="cover" 
          />
          
          {/* Header Buttons */}
          <SafeAreaViewOverlay>
            <XStack justifyContent="space-between" paddingHorizontal="$4" paddingTop="$2">
              <TouchableOpacity 
                onPress={() => router.back()}
                style={{ 
                  width: 40, height: 40, borderRadius: 20, 
                  backgroundColor: 'rgba(0,0,0,0.3)', 
                  alignItems: 'center', justifyContent: 'center' 
                }}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => toggleFavorite(eventId)}
                style={{ 
                  width: 40, height: 40, borderRadius: 20, 
                  backgroundColor: 'rgba(0,0,0,0.3)', 
                  alignItems: 'center', justifyContent: 'center' 
                }}
              >
                <Ionicons 
                  name={isFav ? "bookmark" : "bookmark-outline"} 
                  size={22} 
                  color={isFav ? "#FFD700" : "white"} 
                />
              </TouchableOpacity>
            </XStack>
          </SafeAreaViewOverlay>

          {/* Floating Card Info */}
          <View 
            position="absolute" 
            bottom={-40} 
            left={20} 
            right={20} 
            backgroundColor="rgba(20, 30, 40, 0.95)" 
            borderRadius={24} 
            padding="$4"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 10 }}
            shadowOpacity={0.3}
            shadowRadius={20}
            style={{ elevation: 10 }}
          >
            <YStack space="$2">
              <Text color="white" fontSize={24} fontWeight="bold">{event.title}</Text>
              
              <XStack alignItems="center" space="$1">
                <Ionicons name="location-outline" size={16} color="#ccc" />
                <Text color="#ccc" fontSize={14} numberOfLines={1}>{event.subtitle}</Text>
              </XStack>
            </YStack>
          </View>
        </View>

        {/* Content Section */}
        <YStack paddingHorizontal="$4" marginTop={70} space="$4">
          
          <Text fontWeight="bold" fontSize={20} color="#1a1a1a">About Event</Text>

          {/* Stats Row */}
          <XStack space="$4">
            <StatItem icon="time-outline" label={event.time} />
            <StatItem icon="cash-outline" label={event.price} />
          </XStack>

          {/* Description */}
          <Text color="$gray11" fontSize={15} lineHeight={24}>
            {event.description}
          </Text>

        </YStack>
      </ScrollView>

      {/* Bottom Action Button */}
      <View 
        position="absolute" 
        bottom={0} 
        left={0} 
        right={0} 
        padding="$4" 
        paddingBottom={30}
        backgroundColor="white"
        borderTopWidth={1}
        borderTopColor="#f0f0f0"
      >
        <Button 
          backgroundColor="#1a1a1a" 
          color="white" 
          size="$5" 
          borderRadius="$10"
          fontWeight="bold"
          iconAfter={<Ionicons name="navigate-outline" size={20} color="white" />}
        >
          Directions
        </Button>
      </View>
    </View>
  );
}

function StatItem({ icon, label, color = "#666" }: { icon: any, label: string, color?: string }) {
  return (
    <XStack backgroundColor="#f5f5f5" paddingVertical="$2" paddingHorizontal="$3" borderRadius="$4" alignItems="center" space="$2">
      <Ionicons name={icon} size={16} color={color === "#FFD700" ? color : "#666"} />
      <Text color="#333" fontWeight="600" fontSize={13}>{label}</Text>
    </XStack>
  );
}

// Helper to handle safe area padding manually since we are overlaying on image
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function SafeAreaViewOverlay({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
      {children}
    </View>
  );
}
