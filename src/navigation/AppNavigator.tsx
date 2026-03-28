import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Session } from '@supabase/supabase-js';

import { Colors } from '../constants/theme';
import { Profile } from '../types';

// Auth
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

// Map
import MapScreen from '../screens/Map/MapScreen';
import AddStarterScreen from '../screens/Map/AddStarterScreen';
import StarterDetailScreen from '../screens/Map/StarterDetailScreen';

// Recipes
import RecipesScreen from '../screens/Recipes/RecipesScreen';
import SubmitRecipeScreen from '../screens/Recipes/SubmitRecipeScreen';
import RecipeDetailScreen from '../screens/Recipes/RecipeDetailScreen';

// Tools
import ToolsScreen from '../screens/Tools/ToolsScreen';

// Messages
import MessagesScreen from '../screens/Messages/MessagesScreen';
import ChatScreen from '../screens/Messages/ChatScreen';

// Profile
import ProfileScreen from '../screens/Profile/ProfileScreen';
import FamilyTreeScreen from '../screens/Profile/FamilyTreeScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ── Stack Navigators ─────────────────────────────────
function MapStack({ session, profile }: { session: Session | null; profile: Profile | null }) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }}>
      <Stack.Screen name="MapMain" options={{ headerShown: false }}>
        {props => <MapScreen {...props} route={{ ...props.route, params: { ...props.route.params, session, profile } }} />}
      </Stack.Screen>
      <Stack.Screen name="AddStarter" component={AddStarterScreen} options={{ title: 'Add Starter' }} />
      <Stack.Screen name="StarterDetail" component={StarterDetailScreen} options={{ title: 'Starter' }} />
      <Stack.Screen name="FamilyTree" component={FamilyTreeScreen} options={{ title: 'Family Tree' }} />
    </Stack.Navigator>
  );
}

function RecipesStack({ session, profile }: { session: Session | null; profile: Profile | null }) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }}>
      <Stack.Screen name="RecipesMain" options={{ headerShown: false }}>
        {props => <RecipesScreen {...props} route={{ ...props.route, params: { ...props.route.params, session, profile } }} />}
      </Stack.Screen>
      <Stack.Screen name="SubmitRecipe" component={SubmitRecipeScreen} options={{ title: 'Share Recipe' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
    </Stack.Navigator>
  );
}

function MessagesStack({ session, profile }: { session: Session | null; profile: Profile | null }) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }}>
      <Stack.Screen name="MessagesMain" options={{ headerShown: false }}>
        {props => <MessagesScreen {...props} route={{ ...props.route, params: { ...props.route.params, session, profile } }} />}
      </Stack.Screen>
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
}

function ProfileStack({ session, profile }: { session: Session | null; profile: Profile | null }) {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }}>
      <Stack.Screen name="ProfileMain" options={{ headerShown: false }}>
        {props => <ProfileScreen {...props} route={{ ...props.route, params: { ...props.route.params, session, profile } }} />}
      </Stack.Screen>
      <Stack.Screen name="FamilyTree" component={FamilyTreeScreen} options={{ title: 'Family Tree' }} />
      <Stack.Screen name="AddStarter" component={AddStarterScreen} options={{ title: 'Add Starter' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe' }} />
    </Stack.Navigator>
  );
}

// ── Auth Stack ────────────────────────────────────────
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// ── Main Tab Navigator ────────────────────────────────
function MainTabs({ session, profile }: { session: Session; profile: Profile | null }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 4,
          height: 56,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', letterSpacing: 0.3 },
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, { focused: string; unfocused: string }> = {
            Map: { focused: 'map', unfocused: 'map-outline' },
            Recipes: { focused: 'restaurant', unfocused: 'restaurant-outline' },
            Tools: { focused: 'calculator', unfocused: 'calculator-outline' },
            Messages: { focused: 'chatbubbles', unfocused: 'chatbubbles-outline' },
            Profile: { focused: 'person', unfocused: 'person-outline' },
          };
          const icon = icons[route.name];
          return <Ionicons name={(focused ? icon?.focused : icon?.unfocused) as any ?? 'ellipse'} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Map" options={{ title: 'Map' }}>
        {() => <MapStack session={session} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen name="Recipes" options={{ title: 'Recipes' }}>
        {() => <RecipesStack session={session} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen name="Tools" component={ToolsScreen} options={{ title: 'Tools' }} />
      <Tab.Screen name="Messages" options={{ title: 'Messages' }}>
        {() => <MessagesStack session={session} profile={profile} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" options={{ title: 'Profile' }}>
        {() => <ProfileStack session={session} profile={profile} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// ── Root Navigator ────────────────────────────────────
interface Props {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
}

export default function AppNavigator({ session, profile, loading }: Props) {
  if (loading) return null;

  return (
    <NavigationContainer>
      {session ? <MainTabs session={session} profile={profile} /> : <AuthStack />}
    </NavigationContainer>
  );
}
