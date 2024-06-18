import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styling from './Styling';
import Planner from './Planner';
import Wardrobe from './Wardrobe';
import Explore from './Explore';
import Timeline from './TimeLine'; // Replace with your actual Timeline component
import { RootStackParamList } from '@/assets/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Timeline">
      <Stack.Screen 
        name="Timeline" 
        component={Timeline} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Explore" 
        component={Explore} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Planner" 
        component={Planner} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Styling" 
        component={Styling} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Wardrobe" 
        component={Wardrobe} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            switch (route.name) {
              case 'Timeline':
                iconName = 'home';
                break;
              case 'Explore':
                iconName = 'compass'; // changed to 'compass' as 'world' is not available in MaterialCommunityIcons
                break;
              case 'Planner':
                iconName = 'calendar';
                break;
              case 'Styling':
                iconName = 'compass';
                break;
              case 'Wardrobe':
                iconName = 'wardrobe';
                break;
              default:
                iconName = 'home'; // Default to home
            }

            return <Icon name={iconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: '#6C63FF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Timeline" component={HomeStack} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Planner" component={Planner} />
        <Tab.Screen name="Styling" component={Styling} />
        <Tab.Screen name="Wardrobe" component={Wardrobe} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
