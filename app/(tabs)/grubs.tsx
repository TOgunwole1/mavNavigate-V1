import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, XStack, YStack, Button } from 'tamagui';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // Full width minus padding

const deals = [
  {
    id: 1,
    title: 'Connection Cafe',
    subtitle: 'University Center',
    offer: '50% OFF Lunch Buffet',
    image: 'https://www.uta.edu/campus-ops/dining/_images/connection-cafe.jpg',
    description: 'Get 50% off the all-you-care-to-eat lunch buffet every Friday.',
    expires: 'Expires in 2 days',
    code: 'MAVLUNCH50'
  },
  {
    id: 2,
    title: 'Chick-fil-A',
    subtitle: 'University Center',
    offer: 'Free Drink with Meal',
    image: 'https://d1fd34dzzl09j.cloudfront.net/Images/CFACOM/Stories%20Images/2019/12/nuggets/header.jpg',
    description: 'Free medium soft drink with purchase of any spicy chicken sandwich meal.',
    expires: 'Expires today',
    code: 'CFADRINK'
  },
  {
    id: 3,
    title: 'Starbucks',
    subtitle: 'Central Library',
    offer: 'BOGO Coffee',
    image: 'https://stories.starbucks.com/uploads/2021/09/Starbucks-50th-Anniversary-Coffee-Heritage-1.jpg',
    description: 'Buy one get one free on all handcrafted beverages from 2pm to 5pm.',
    expires: 'Expires in 5 days',
    code: 'BOGOSTAR'
  },
  {
    id: 4,
    title: 'Maverick Cafe',
    subtitle: 'Commons',
    offer: '$5 Breakfast Combo',
    image: 'https://www.uta.edu/campus-ops/dining/_images/maverick-cafe.jpg',
    description: 'Breakfast burrito and coffee for only $5. Valid until 10:30 AM.',
    expires: 'Expires in 1 week',
    code: 'MAVBREAKFAST'
  }
];

export default function GrubsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <YStack padding="$4" space="$4">
          
          {/* Header */}
          <YStack space="$2" marginTop="$2">
            <Text fontSize={28} fontWeight="bold" color="#1a1a1a">
              Campus Grubs
            </Text>
            <Text fontSize={16} color="#666">
              Exclusive food deals for Mavericks
            </Text>
          </YStack>

          {/* Filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingVertical: 5 }}>
            {['All', 'Deals', 'Coffee', 'Lunch', 'Dinner'].map((filter) => (
              <TouchableOpacity 
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={{
                  backgroundColor: activeFilter === filter ? '#1a1a1a' : '#f0f0f0',
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}
              >
                <Text color={activeFilter === filter ? 'white' : '#666'} fontWeight="600">{filter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Deals List */}
          <YStack space="$4" marginTop="$2">
            {deals.map((deal) => (
              <View 
                key={deal.id}
                width={CARD_WIDTH}
                backgroundColor="white"
                borderRadius={20}
                overflow="hidden"
                borderWidth={1}
                borderColor="#f0f0f0"
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.1}
                shadowRadius={10}
                style={{ elevation: 3 }}
              >
                <View height={180} position="relative">
                  <Image 
                    source={{ uri: deal.image }} 
                    style={{ width: '100%', height: '100%' }} 
                    contentFit="cover"
                  />
                  <View 
                    position="absolute" 
                    top={16} 
                    left={16} 
                    backgroundColor="#FF9500" 
                    paddingHorizontal={12} 
                    paddingVertical={6} 
                    borderRadius={8}
                  >
                    <Text color="white" fontWeight="bold" fontSize={12}>{deal.expires}</Text>
                  </View>
                </View>

                <YStack padding="$4" space="$2">
                  <XStack justifyContent="space-between" alignItems="flex-start">
                    <YStack flex={1} space="$1">
                      <Text fontSize={20} fontWeight="bold" color="#1a1a1a">{deal.title}</Text>
                      <Text fontSize={14} color="#666">{deal.subtitle}</Text>
                    </YStack>
                    <View backgroundColor="#E8F5E9" paddingHorizontal={10} paddingVertical={4} borderRadius={6}>
                      <Text color="#2E7D32" fontWeight="bold" fontSize={12}>ACTIVE</Text>
                    </View>
                  </XStack>

                  <Text fontSize={18} fontWeight="700" color="#FF5722" marginTop="$1">{deal.offer}</Text>
                  <Text fontSize={14} color="#444" lineHeight={20}>{deal.description}</Text>

                  <Button 
                    backgroundColor="#1a1a1a" 
                    color="white" 
                    marginTop="$3" 
                    borderRadius="$8"
                    fontWeight="bold"
                  >
                    Redeem Code: {deal.code}
                  </Button>
                </YStack>
              </View>
            ))}
          </YStack>

        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
