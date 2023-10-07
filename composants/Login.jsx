import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Assurez-vous d'importer les fonctions Firebase Firestore appropriées
import db from '../firebaseConfig'; // Assurez-vous d'importer correctement votre configuration Firebase

function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = async () => {
    try {
      // Effectuez une requête pour récupérer l'utilisateur correspondant au login
      const usersCollection = collection(db, 'gestionnaires');
      const q = query(usersCollection, where('login', '==', login));
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0]; // Supposons qu'il y ait un seul utilisateur avec le même login

      if (userDoc) {
        const userData = userDoc.data();
        if (userData.password === password) {
          // Si le mot de passe correspond, redirigez l'utilisateur vers la page de gestion des œuvres
          navigation.navigate('Gestion', { identifiants: { login, password } });
        } else {
          // Affichez un message d'erreur si le mot de passe est incorrect
          setErreur('Désolé, mot de passe incorrect.');
        }
      } else {
        // Affichez un message d'erreur si l'utilisateur n'est pas trouvé
        setErreur('Désolé, identifiant incorrect.');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des informations de connexion', error);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TextInput
        placeholder="login"
        style={style.input}
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        style={style.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={'connexion'} onPress={handleSubmit} />
      {erreur !== '' && <Text style={style.erreur}>{erreur}</Text>}

      <Button onPress={function(){
        navigation.navigate("ForgotPassword")
      }} title="mot de passe oublié" />
    

    </View>
  );
}

export default Login;

const style = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    marginVertical: 20,
  },
  erreur: {
    color: 'red',
    marginTop: 10,
  },
});
