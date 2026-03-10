import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Colors } from './src/constants/colors';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import FinancingStatusScreen from './src/screens/FinancingStatusScreen';
import RepaymentScreen from './src/screens/RepaymentScreen';
import TrainingScreen from './src/screens/TrainingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoanApplicationScreen from './src/screens/LoanApplicationScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const activeIconStyle = {
  backgroundColor: Colors.primary,
  borderRadius: 22,
  width: 44,
  height: 44,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 76,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 20,
          shadowColor: Colors.shadow,
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          backgroundColor: Colors.white,
          paddingTop: 14,
          paddingBottom: 20,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? activeIconStyle : undefined}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={26} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FinancingStatus"
        component={FinancingStatusScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? activeIconStyle : undefined}>
              <Ionicons name={focused ? 'time' : 'time-outline'} size={26} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transaksi"
        component={RepaymentScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? activeIconStyle : undefined}>
              <Ionicons name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} size={26} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? activeIconStyle : undefined}>
              <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={26} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? activeIconStyle : undefined}>
              <Ionicons name={focused ? 'person' : 'person-outline'} size={26} color={focused ? Colors.white : color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="LoanApplication" component={LoanApplicationScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
