import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import UniverseScreen from '../screens/UniverseScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ObjectDetailScreen from '../screens/ObjectDetailScreen';
import AIGuideScreen from '../screens/AIGuideScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#05010f' },
      animation: 'fade',
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Explore" component={ExploreScreen} />
    <Stack.Screen name="Universe" component={UniverseScreen} />
    <Stack.Screen
      name="ObjectDetail"
      component={ObjectDetailScreen}
      options={{ animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name="AIGuide"
      component={AIGuideScreen}
      options={{ presentation: 'modal' }}
    />
    <Stack.Screen
      name="Achievements"
      component={AchievementsScreen}
      options={{ animation: 'slide_from_right' }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
