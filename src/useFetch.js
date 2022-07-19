import { useState, useEffect } from "react";
import { getDoc, getDocs } from "firebase/firestore";

const useFetch  = (q) => {
  const [data, setData] = useState(null);      
  
    useEffect(() => {          
      const getData = async () => {              
        if (q.type === "collection") {
          const querySnapshot = await getDocs(q);          
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
    }, []);  
  return { data }
}


export default useFetch;