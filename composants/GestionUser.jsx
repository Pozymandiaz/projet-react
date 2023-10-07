import { StyleSheet, Text, Image , View , Button , TextInput , FlatList } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaUser} from "../verification/user"
import db from "../firebaseConfig"
import { getDocs,updateDoc , doc, collection, deleteDoc  } from "firebase/firestore"



const GestionUser = ({navigation}) => {

    const [gestionnaires, setGestionnaires] = useState([]);
    const [id, setId]= useState("");
    const [login, setLogin]= useState("");
    const [password, setPassword]= useState("");
    const [erreurs, setErreurs]= useState([]);
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
      getDocs(collection(db, "gestionnaires"))
        .then((snapShot) => {
          const data = [];
          snapShot.docs.map((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setGestionnaires(data);
          setUpdateList(!updateList);
        });
    }, [updateList])


    const supprimer = (id) => {
        deleteDoc(doc(db , "gestionnaires" , id)).then(function(){
            setUpdateList(!updateList);
        });
    }
  return (
    <View>
      <Button onPress={function(){
        navigation.navigate("Create")
      }} title="ajouter un utilisateur" />
      <FlatList 
        data={gestionnaires}
        renderItem={function({item}){ 
            return <View style={{borderWidth:1 , borderBlockColor : "black" , padding : 5 , alignItems : "center"}}>
                <Button onPress={function(){
                    navigation.navigate("UpdateUser" , {id : item.id })
                }} color="orange" title="m"/>
                <Button onPress={function(){  
                    supprimer(item.id)
                }} color="red" title="s"/>
               <Text>utilisateur { item.login }</Text>
                <Text style={{}}>password { item.password }</Text>
                
            </View>
         }}
      />
    </View>
  )
}




export default GestionUser

const styles = StyleSheet.create({})