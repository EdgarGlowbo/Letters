import { useState, useEffect } from "react";
import 
{ 
  getDoc, query,
  orderBy, onSnapshot, updateDoc
} from "firebase/firestore";

const useFetch = (ref) => {
  const [data, setData] = useState(null);    
    useEffect(() => {          
      const getData = async () => {              
        if (ref.type === "collection") {
          const q = query(ref, orderBy("dateInMs", "desc"));                  
          const unsubscribe = onSnapshot(q, querySnapshot => {
            const data = [];
            querySnapshot.forEach(async doc => {
                if (!doc.data().id) {                  
                  await updateDoc(doc.ref, { id: doc.id });
                }
                data.push(doc.data());
            });
            setData(data);            
          });                                                               
        } else if (ref.type === "document") {
          const docSnapshot = await getDoc(ref);
          const data = docSnapshot.data();          
          setData(data);
        }                     
      }
      getData();       
    }, []);  
  return { data }
}


export default useFetch;