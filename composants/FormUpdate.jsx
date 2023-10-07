import { StyleSheet, Text, View , Button , TextInput , FlatList } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaOeuvre } from "../verification/oeuvre"
import db from "../firebaseConfig"
import {  getDoc, updateDoc , doc  } from "firebase/firestore"


const FormUpdate =  ({navigation , route }) => {
    const [id, setId]= useState("");
    const [nom, setNom]= useState("");
    const [description, setDescription]= useState("");
    const [image, setImage]= useState("");
    const [auteur, setAuteur]= useState("");
    const [dt_creation, setDt_creation]= useState("");
    const [erreurs, setErreurs]= useState([]);
   

    useEffect( function(){
        const id = route.params.id;
        setId(id);
        getDoc(doc(db , "oeuvres", id)).then(function(snapShot){
            console.log(snapShot.data())
            const {nom , description , image , auteur} = snapShot.data()
            setNom(nom);
            setDescription(description);
            setImage(image); 
            setAuteur(auteur);
        })
    } , [])

    const handleSubmit = async () => {
       
        const oeuvres = { nom , description , image, auteur }
        const { error } = schemaOeuvre.validate( oeuvres , {abortEarly : false}); 
        
        setErreurs([]);
        if(!error){ // si erreur est undefined 
            
            await updateDoc(doc(db, "oeuvres" , id) , oeuvres)
           
            navigation.push('accueil') ; // retour à la page d'accueil
             
        }else {
            const tableauErreurs = error.details.map(function(item){ return item.message });
            setErreurs(tableauErreurs);
        }

    }
  return (
    <View>
      <Text>Modifier une oeuvre</Text>
      <TextInput placeholder="nom" onChangeText={function(text){ setNom(text) ; setErreurs([]);}} value={nom} style={styles.input} />
      <TextInput placeholder="description" onChangeText={function(text){ setDescription(text) ; setErreurs([]);}} value={description} style={styles.input}/>
      <TextInput placeholder="image" onChangeText={function(text){ setImage(text) ; setErreurs([]);}} value={image} style={styles.input}/>
      <TextInput placeholder="auteur" onChangeText={function(text){ setAuteur(text) ; setErreurs([]);}} value={auteur} style={styles.input}/>
      <Button title="modifier" onPress={handleSubmit} color="orange" />
      <FlatList 
        data={erreurs}
        renderItem={function({item}){ return <Text>{item}</Text> }}
      />
      <View style={{ marginTop : 10 }}>
      <Button onPress={function(){
            navigation.goBack()
        }} title="retour à l'accueil" color="purple"/>
      </View>
    </View>
  )
}
export default FormUpdate

const styles = StyleSheet.create({
    input : {
        borderColor : "black" , padding : 10 , borderWidth : 2 , marginVertical : 10
    }
})