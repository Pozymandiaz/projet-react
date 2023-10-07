import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { doc, getDoc, collection } from 'firebase/firestore'; // Importez les fonctions Firebase Firestore nécessaires
import db from '../firebaseConfig'; // Assurez-vous d'importer correctement votre configuration Firebase

const SinglePage = ({ route }) => {
  const { id } = route.params;
  const [oeuvre, setOeuvre] = useState(null);

  useEffect(() => {
    // Effectuez une requête pour récupérer l'œuvre correspondante en fonction de l'ID
    const fetchOeuvre = async () => {
      try {
        const docRef = doc(db, 'oeuvres', id); // Remplacez 'oeuvres' par le nom de votre collection
        const oeuvreDoc = await getDoc(docRef);
        
        if (oeuvreDoc.exists()) {
          const data = oeuvreDoc.data();
          setOeuvre(data);
        } else {
          console.log('Œuvre non trouvée');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'œuvre:', error);
      }
    };

    fetchOeuvre();
  }, [id]);

  if (!oeuvre) {
    return (
      <View style={styles.container}>
        <Text>Œuvre non trouvée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Single Page</Text>
      <Text>Nom: {oeuvre.nom}</Text>
      <Text>Description: {oeuvre.description}</Text>
      <Image source={{ uri: oeuvre.image, width: 150, height: 100 }} />
      <Text>Auteur: {oeuvre.auteur}</Text>
    </View>
  );
};

export default SinglePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
