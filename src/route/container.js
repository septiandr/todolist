import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator();
import { Ionicons } from '@expo/vector-icons'; 
import AddTodo from '../screen/addtodo';
import FinishTodo from '../screen/finishedtodo';
import Todo from '../screen/todo';

export default function Container() {
  return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Todo') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Finish todo') {
                    iconName = 'checkmark-done';
                  }else if (route.name === 'Add todo') {
                    iconName = 'ios-add-circle';
                  }
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
            >
                <Tab.Screen name="Todo" component={Todo} />
                <Tab.Screen name="Add todo" component={AddTodo} />
                <Tab.Screen name="Finish todo" component={FinishTodo} />
            </Tab.Navigator>
        </NavigationContainer>
        );
}