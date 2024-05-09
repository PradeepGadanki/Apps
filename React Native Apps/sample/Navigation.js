import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from './src/pages/Dashboard';
import Login from './src/pages/Login';
import NewMeasurement from './src/pages/NewMeasurement';
import Insights from './src/pages/Insights';
import TrendCheckGraph from './src/pages/trendcheck/TrendCheckGraph';
import More from './src/pages/More';
import RegistrationScreen from './src/pages/RegistrationScreen'
import TrendCheck from './src/pages/TrendCheck'
import FoodSearch from './src/pages/foodIntake/FoodSearch'
import SetUpGoal from './src/pages/foodIntake/SetUpGoal'
import GoalDetails from './src/pages/foodIntake/GoalDeatails'
import AddFoodDetails from './src/pages/foodIntake/AddFoodDetails.js'
import Checking from './src/pages/Checking.js'

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="RegistrationScreen" component={Login} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NewMeasurement" component={NewMeasurement} />
                <Stack.Screen name="Insights" component={Insights} />
                <Stack.Screen name="TrendCheck" component={TrendCheck} />
                <Stack.Screen name="TrendCheckGraph" component={TrendCheckGraph} />
                <Stack.Screen name="More" component={More} />
                <Stack.Screen name="FoodSearch" component={FoodSearch} />
                <Stack.Screen name="SetUpGoal" component={SetUpGoal} />
                <Stack.Screen name="GoalDetails" component={GoalDetails} />
                <Stack.Screen name="AddFoodDetails" component={AddFoodDetails} />
                <Stack.Screen name="Checking" component={Checking} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;