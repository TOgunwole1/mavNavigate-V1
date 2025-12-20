import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, H3, Paragraph, ScrollView, Text, View, XStack, YStack } from 'tamagui';

const buildings = [
  { id: 1, name: 'University Center', category: 'Student Life', description: 'The hub of student activity, dining, and events.', colors: ['#FF9A9E', '#FECFEEF'] as const },
  { id: 2, name: 'Central Library', category: 'Academic', description: 'Resources, study spaces, and 24/7 access.', colors: ['#a18cd1', '#fbc2eb'] as const },
  { id: 3, name: 'College of Engineering', category: 'Academic', description: 'Innovation, research labs, and classrooms.', colors: ['#84fab0', '#8fd3f4'] as const },
  { id: 4, name: 'Business Building', category: 'Academic', description: 'College of Business administration and classes.', colors: ['#cfd9df', '#e2ebf0'] as const },
  { id: 5, name: 'Fine Arts Building', category: 'Arts', description: 'Art studios, music halls, and theatre venues.', colors: ['#f093fb', '#f5576c'] as const },
  { id: 6, name: 'Activities Building', category: 'Recreation', description: 'Sports, gym, and recreation facilities.', colors: ['#4facfe', '#00f2fe'] as const },
  { id: 7, name: 'Science Hall', category: 'Academic', description: 'Advanced laboratories and science classrooms.', colors: ['#43e97b', '#38f9d7'] as const },
  { id: 8, name: 'Life Science', category: 'Academic', description: 'Biology, psychology, and life sciences research.', colors: ['#fa709a', '#fee140'] as const },
];

export default function OnCampusScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <YStack padding="$4" space="$5">
          <XStack justifyContent="space-between" alignItems="center" marginTop="$2" marginHorizontal="$2">
            <H3 color="$color">On Campus</H3>
            <Text fontFamily="Montserrat_700Bold" 
            fontSize={24} color="black">Weekly Events</Text>
          </XStack>
          
          {buildings.map((building) => (
            <Card 
              key={building.id} 
              elevate 
              size="$4" 
              bordered={false} 
              animation="bouncy" 
              scale={0.95} 
              hoverStyle={{ scale: 0.975 }} 
              pressStyle={{ scale: 0.925 }}
              backgroundColor="white"
              borderRadius="$6"
              shadowColor="$shadowColor"
              shadowRadius={10}
              shadowOpacity={0.1}
            >
              <Card.Header padded={false}>
                <LinearGradient
                  colors={building.colors as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    height: 150,
                    borderTopLeftRadius: 15, // Match card border radius
                    borderTopRightRadius: 15,
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <XStack justifyContent="flex-end">
                    <View backgroundColor="rgba(255,255,255,0.2)" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$4">
                      <Text color="white" fontSize={10} fontWeight="bold" textTransform="uppercase">{building.category}</Text>
                    </View>
                  </XStack>
                  <View>
                    <H3 color="white" fontWeight="800" fontSize={28} lineHeight={32}>{building.name}</H3>
                  </View>
                </LinearGradient>
              </Card.Header>
              
              <Card.Footer padded flexDirection="column" alignItems="flex-start" gap="$3" paddingBottom="$4">
                <Paragraph theme="alt2" size="$3" numberOfLines={3} color="$gray11">
                  {building.description}
                </Paragraph>
                
                <XStack width="100%" justifyContent="space-between" alignItems="center" marginTop="$2">
                  <Text fontSize={12} color="$gray9" fontWeight="600">1 of 12 sections</Text>
                  <Button 
                    size="$3" 
                    borderRadius="$10" 
                    backgroundColor="$blue10" 
                    color="white" 
                    fontWeight="bold"
                    pressStyle={{ opacity: 0.8 }}
                  >
                    View Details
                  </Button>
                </XStack>
              </Card.Footer>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
