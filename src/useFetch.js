import { useState, useEffect } from "react";
import 
{ 
  getDoc, getDocs, query,
  orderBy, limit
} from "firebase/firestore";

const useFetch  = (q) => {
  const [data, setData] = useState(null);
  const [baseDate, setBaseDate] = useState(null);
  
    useEffect(() => {          
      const getData = async () => {              
        if (q.type === "collection") {
          const queryRequest = query(q, orderBy("createdAt", "asc"));
          // const firstDocQuery = query(q, orderBy("createdAt", "desc"), limit(1));
          // const firstDocQuerySnapshot = await getDocs(firstDocQuery, orderBy("createdAt", "desc"), limit(1));          
          const querySnapshot = await getDocs(queryRequest);     
          const data = [];  
          querySnapshot.forEach(doc => {        
            data.push(doc.data());
          });        
          setData(data);  
        } else if (q.type === "document") {
          const docSnapshot = await getDoc(q);
          const data = docSnapshot.data();          
          setData(data);
        }                     
      }
      getData();
      console.log('Pls stop')      
    }, []);  
  return { data }
}


export default useFetch;