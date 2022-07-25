import { useState, useEffect } from "react";
import 
{ 
  getDoc, getDocs, query,
  orderBy
} from "firebase/firestore";

const useFetch = (q, distanceLastEntry) => {
  const [data, setData] = useState(null);    
    useEffect(() => {          
      const getData = async () => {              
        if (q.type === "collection") {
          const queryRequest = query(q, orderBy("dateInMs", "desc"));                  
          const querySnapshot = await getDocs(queryRequest);     
          const data = [];  
          querySnapshot.forEach(doc => {        
            data.push(doc.data());                        
          });        
          setData(data);
          distanceLastEntry(data[0].dateInMs);
        } else if (q.type === "document") {
          const docSnapshot = await getDoc(q);
          const data = docSnapshot.data();          
          setData(data);
        }                     
      }
      getData();       
    }, []);  
  return { data }
}


export default useFetch;