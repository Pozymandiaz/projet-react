import { StyleSheet, Text, View , Button , TextInput , FlatList } from 'react-native'
import { CheckBox } from 'react-native-elements';
import React , {useState} from 'react'
import { schemaUser } from "../verification/user"
import db from "../firebaseConfig"
import { collection , addDoc } from "firebase/firestore"


const FormCreateUser = () => {
    const [login, setLogin]= useState("");
    const [password, setPassword]= useState("");
    const [role, setRole] = useState(false);
    const [erreurs, setErreurs]= useState([]);
    const handleSubmit = () => {
        console.log(login , password , role); 
        const gestionnaires = { login , password , role }
        const { error } = schemaUser.validate( gestionnaires , {abortEarly : false}); 
       
        console.log(error); 
        setErreurs([]);
        if(!error){ // si erreur est undefined 

             addDoc(collection(db, "gestionnaires") , gestionnaires).then(function(reponse){
                setLogin("")
                setPassword("")
                setRole("")
                alert("l utilisateur à bien été créé dans la base de donnée")
             })
        }else {
            const tableauErreurs = error.details.map(function(item){ return item.message });
            setErreurs(tableauErreurs);
        }

    }

  return (
        <View>
      <Text>Créer un nouvelle utilisateur </Text>
      <TextInput placeholder="login" onChangeText={function(text){ setLogin(text) ; setErreurs([]);}} value={login} style={styles.input} />
      <TextInput placeholder="password" onChangeText={function(text){ setPassword(text) ; setErreurs([]);}} value={password} style={styles.input}/>

      <CheckBox
            title="role"
            checked={role} // Assurez-vous de définir et de maintenir l'état de votre checkbox
            onPress={() => setRole(!role)} // Inversez l'état de la checkbox lorsque vous appuyez dessus
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            //value={role}
        />

      

      <Button title="créer" onPress={handleSubmit} />
      <FlatList 
        data={erreurs}
        renderItem={function({item}){ return <Text>{item}</Text> }}
      />
       

    </View>
  )
}
export default FormCreateUser
const styles = StyleSheet.create({
    input : {
        borderColor : "black" , padding : 10 , borderWidth : 2 , marginVertical : 10
    }
})