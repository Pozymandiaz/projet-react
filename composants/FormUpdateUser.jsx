import { StyleSheet, Text, View , Button , TextInput , FlatList } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaUser } from "../verification/user"
import db from "../firebaseConfig"
import {  getDoc, updateDoc , doc  } from "firebase/firestore"


const FormUpdateUser =  ({navigation , route }) => {
    const [id, setId]= useState("");
    const [login, setLogin]= useState("");
    const [password, setPassword]= useState("");
    const [role, setRole]= useState("");
    const [erreurs, setErreurs]= useState([]);
   

    useEffect( function(){
        const id = route.params.id;
        setId(id);
        getDoc(doc(db , "gestionnaires", id)).then(function(snapShot){
            console.log(snapShot.data())
            const {login , password , role } = snapShot.data()
            setLogin(login);
            setPassword(password);
            setRole(role); 
        })
    } , [])

    const handleSubmit = async () => {
       
        const gestionnaires = { login , password , role }
        const { error } = schemaUser.validate( gestionnaires , {abortEarly : false}); 
        
        setErreurs([]);
        if(!error){ // si erreur est undefined 
            
            await updateDoc(doc(db, "gestionnaires" , id) , gestionnaires)
           
            navigation.push('accueil') ; // retour à la page d'accueil
             
        }else {
            const tableauErreurs = error.details.map(function(item){ return item.message });
            setErreurs(tableauErreurs);
        }

    }
  return (
    <View>
      <Text>Modifier une oeuvre</Text>
      <TextInput placeholder="login" onChangeText={function(text){ setLogin(text) ; setErreurs([]);}} value={login} style={styles.input} />
      <TextInput placeholder="password" onChangeText={function(text){ setPassword(text) ; setErreurs([]);}} value={password} style={styles.input}/>
      <TextInput placeholder="role" onChangeText={function(text){ setRole(text) ; setErreurs([]);}} value={role} style={styles.input}/>
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
export default FormUpdateUser

const styles = StyleSheet.create({
    input : {
        borderColor : "black" , padding : 10 , borderWidth : 2 , marginVertical : 10
    }
})