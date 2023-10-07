import { StyleSheet, Text, View , Button , TextInput , FlatList } from 'react-native'
import React , {useState} from 'react'
import { schemaOeuvre } from "../verification/oeuvre"
import db from "../firebaseConfig"
import { collection , addDoc } from "firebase/firestore"
import DateTimePicker from '@react-native-community/datetimepicker';


const FormCreate = () => {
    const [nom, setNom]= useState("");
    const [description, setDescription]= useState("");
    const [image, setImage]= useState("");
    const [auteur, setAuteur]= useState("");
    const [dt_creation, setDateCreation] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);    const [erreurs, setErreurs]= useState([]);
    const handleSubmit = () => {
        console.log(nom , description , auteur, image); 
        const oeuvre = { nom , description , auteur, image }
        const { error } = schemaOeuvre.validate( oeuvre , {abortEarly : false}); 
       
        console.log(error); 
        setErreurs([]);
        if(!error){ // si erreur est undefined 

             addDoc(collection(db, "oeuvres") , oeuvre).then(function(reponse){
                setNom("")
                setDescription("")
                setAuteur("")
                setImage("")
                alert("l'oeuvre est bien créé en base de donnée")
             })
        }else {
            const tableauErreurs = error.details.map(function(item){ return item.message });
            setErreurs(tableauErreurs);
        }

    }
    const handleDateChange = (event, selectedDate) => {
      setShowPicker(false); // Hide the picker after selection
      if (selectedDate) {
          setDateCreation(selectedDate);
      }
  };

  return (
        <View>
      <Text>Créer une nouvelle oeuvre </Text>
      <TextInput placeholder="nom" onChangeText={function(text){ setNom(text) ; setErreurs([]);}} value={nom} style={styles.input} />
      <TextInput placeholder="description" onChangeText={function(text){ setDescription(text) ; setErreurs([]);}} value={description} style={styles.input}/>
      <TextInput placeholder="auteur" onChangeText={function(text){ setAuteur(text) ; setErreurs([]);}} value={auteur} style={styles.input}/>
      <TextInput placeholder="image" onChangeText={function(text){ setImage(text) ; setErreurs([]);}} value={image} style={styles.input}/>
      

      <Button title="Choisir une date de création" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={dt_creation}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        <Text>Date choisie: {dt_creation.toLocaleDateString()}</Text>



      <Button title="créer" onPress={handleSubmit} />
      <FlatList 
        data={erreurs}
        renderItem={function({item}){ return <Text>{item}</Text> }}
      />
       

    </View>
  )
}
export default FormCreate
const styles = StyleSheet.create({
    input : {
        borderColor : "black" , padding : 10 , borderWidth : 2 , marginVertical : 10
    }
})