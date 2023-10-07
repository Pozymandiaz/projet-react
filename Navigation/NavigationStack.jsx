
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from '../composants/Acceuil';
import FormUpdate from '../composants/FormUpdate';
import FormCreate from '../composants/FormCreate';
import GestionOeuvres from '../composants/GestionOeuvres';
import Login from '../composants/Login';
const Stack = createNativeStackNavigator()


const NavigationStack = () => {
    return (
        <Stack.Navigator screenOptions={{
          unmountOnBlur : true,
        }}>
          <Stack.Screen component={Accueil} name="accueil" options={{title: "accueil"}}/>
          <Stack.Screen component={FormUpdate} name="Update" options={{title: "Update"}}/>
          <Stack.Screen component={FormCreate} name="Create" options={{title: "Create"}}/>
          <Stack.Screen component={GestionOeuvres} name="Gestion" options={{title: "Gestion"}}/>
          <Stack.Screen component={Login} name="Login" options={{title: "Login"}}/>

         

        </Stack.Navigator>
      );
}



export default NavigationStack;


export const NavigationStack2 = () => {
  return (
      <Stack.Navigator screenOptions={{
        unmountOnBlur : true,
      }}>
        <Stack.Screen component={GestionOeuvres} name="gestion" options={{headerShown : false}}/>
        <Stack.Screen component={FormUpdate} name="Update" options={{title: "Update"}}/>
        <Stack.Screen component={FormCreate} name="Create" options={{title: "Create"}}/>
        <Stack.Screen component={GestionOeuvres} name="Gestion" options={{title: "Gestion"}}/>
       

      </Stack.Navigator>
    );
}
