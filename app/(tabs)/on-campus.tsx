import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, XStack, YStack } from 'tamagui';
import { useEvents } from '../../hooks/useEvents';
import { useFavorites } from '../../hooks/useFavorites';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.5;
const SNAP_INTERVAL = CARD_WIDTH + 20;

const categories = ['Most Viewed', 'Nearby', 'Latest'];

export default function OnCampusScreen() {
  const [activeCategory, setActiveCategory] = useState('Most Viewed');
  const [searchQuery, setSearchQuery] = useState('');
  const { events, loading } = useEvents();
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSearching = searchQuery.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <YStack padding="$4" space="$5">
          
          {/* Header Title */}
          <Text fontSize={28} fontWeight="bold" color="#1a1a1a" marginTop="$2">
            Weekly Events
          </Text>

          {/* Search Bar */}
          <View 
            height={50} 
            backgroundColor="#fff" 
            borderRadius="$10" 
            borderWidth={1} 
            borderColor="#eee"
            flexDirection="row" 
            alignItems="center" 
            paddingHorizontal="$4"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.05}
            shadowRadius={4}
            style={{ elevation: 2 }}
          >
            <TextInput 
              placeholder="Search events on campus" 
              placeholderTextColor="#999"
              style={{ flex: 1, height: '100%', fontSize: 16, color: '#000' }} 
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {isSearching ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#ccc" />
              </TouchableOpacity>
            ) : (
              <>
                <View width={1} height={24} backgroundColor="#eee" marginHorizontal="$3" />
                <Ionicons name="search" size={20} color="#ccc" />
              </>
            )}
          </View>

          {!isSearching && (
            <>
              <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
                <Text fontSize={20} fontWeight="700" color="#1a1a1a">Trending</Text>
              </XStack>

              {/* Filter Chips */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                {categories.map((cat) => (
                  <TouchableOpacity 
                    key={cat} 
                    onPress={() => setActiveCategory(cat)}
                    style={{
                      backgroundColor: activeCategory === cat ? '#1a1a1a' : '#f8f9fa',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 20,
                    }}
                  >
                    <Text 
                      color={activeCategory === cat ? 'white' : '#666'} 
                      fontWeight="600"
                      fontSize={14}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {/* Events List */}
          {loading ? (
            <ActivityIndicator size="large" color="#1a1a1a" />
          ) : isSearching ? (
            <YStack space="$4">
              <Text fontSize={18} fontWeight="600" color="#1a1a1a">Search Results</Text>
              {filteredEvents.length === 0 ? (
                <View padding="$8" alignItems="center">
                  <Ionicons name="search-outline" size={48} color="#ccc" />
                  <Text color="#666" fontSize={16} marginTop="$2">No events found</Text>
                </View>
              ) : (
                filteredEvents.map((item) => (
                  <Link key={item.id} href={`/event/${item.id}`} asChild>
                    <TouchableOpacity activeOpacity={0.9}>
                      <View 
                        width="100%" 
                        height={220} 
                        borderRadius={24} 
                        overflow="hidden" 
                        position="relative"
                        backgroundColor="#f0f0f0"
                      >
                        <Image 
                          source={{ uri: item.image }} 
                          style={{ width: '100%', height: '100%' }} 
                          contentFit="cover" 
                        />
                        <View position="absolute" top={0} left={0} right={0} bottom={0} backgroundColor="rgba(0,0,0,0.2)" />
                        
                        <View position="absolute" bottom={16} left={16} right={16}>
                          <Text color="white" fontWeight="bold" fontSize={18} numberOfLines={2}>{item.title}</Text>
                          <Text color="#eee" fontSize={14} numberOfLines={1}>{item.subtitle}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Link>
                ))
              )}
            </YStack>
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ gap: 20, paddingRight: 20 }}
              decelerationRate="fast"
              snapToInterval={SNAP_INTERVAL} // card width + gap
            >
              {events.map((item) => (
                <Link key={item.id} href={`/event/${item.id}`} asChild>
                  <TouchableOpacity activeOpacity={0.9}>
                    <View 
                      width={CARD_WIDTH} 
                      height={CARD_HEIGHT} 
                      borderRadius={24} 
                      overflow="hidden" 
                      position="relative"
                      backgroundColor="#f0f0f0"
                    >
                      <Image 
                        source={{ uri: item.image }} 
                        style={{ width: '100%', height: '100%' }} 
                        contentFit="cover" 
                        transition={200}
                      />
                      
                      {/* Heart Icon */}
                      <View position="absolute" top={16} right={16} zIndex={10}>
                        <TouchableOpacity onPress={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}>
                          <View 
                            backgroundColor="rgba(0,0,0,0.2)" 
                            width={36} 
                            height={36} 
                            borderRadius={18} 
                            alignItems="center" 
                            justifyContent="center"
                          >
                            <Ionicons 
                              name={isFavorite(item.id) ? "heart" : "heart-outline"} 
                              size={20} 
                              color={isFavorite(item.id) ? "#FF4D4D" : "white"} 
                            />
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Overlay Info */}
                      <View 
                        position="absolute" 
                        bottom={16} 
                        left={16} 
                        right={16} 
                        backgroundColor="rgba(30, 40, 50, 0.85)" 
                        borderRadius={16} 
                        padding="$3"
                      >
                        <Text color="white" fontWeight="bold" fontSize={18} marginBottom="$1" numberOfLines={2}>{item.title}</Text>
                        
                        <XStack justifyContent="space-between" alignItems="center">
                          <XStack alignItems="center" space="$1.5">
                            <Ionicons name="location-outline" size={14} color="#ccc" />
                            <Text color="#ccc" fontSize={13} numberOfLines={1} maxWidth={150}>{item.subtitle}</Text>
                          </XStack>
                        </XStack>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>
          )}

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
