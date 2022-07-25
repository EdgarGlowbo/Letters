import LetterList from "./LetterList";
import { db } from "./firebaseConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { formatDistance } from 'date-fns'
import { useState } from "react";


const Home = () => {  
  const [timeSinceLatestEntry, setTimeSinceLatestEntry] = useState('Never'); // Use date-fns  
  const history = useHistory();
  const colRef = collection(db, 'Letters');
  const distanceLastEntry = (date) => {      
    const baseDate = new Date();        
    const distance = formatDistance(date, baseDate, { addSuffix: true });
    setTimeSinceLatestEntry(distance);
  }      
  const { data:letters } = useFetch(colRef, distanceLastEntry);
  const handleDelete = async id => {    
    await deleteDoc(doc(db, 'Letters', id));
    history.push('/Letters/');
  };      
  return ( 
    <div className="l-container">      
      <p className="c-latest-entry">Latest entry: { timeSinceLatestEntry }</p>
      {/* Dinamically generated entries */}
      {letters && <LetterList
        letters={letters}
        handleDelete={handleDelete}
      />}
    </div>
  );
}
 
export default Home;