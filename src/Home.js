import LetterList from "./LetterList";
import { db } from "./firebaseConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { formatDistance } from 'date-fns'
import { useEffect, useState } from "react";


const Home = () => {  
  const [timeSinceLatestEntry, setTimeSinceLatestEntry] = useState('Never'); // Use date-fns  
  const history = useHistory();
  const colRef = collection(db, 'Letters');
  const { data:letters } = useFetch(colRef);
  const handleDelete = async id => {    
    await deleteDoc(doc(db, 'Letters', id));
    history.push('/');
  };
  // const distanceLastEntry = () => {
  //   const date = new Date();
  
  //   // const distance = formatDistance(date, Publish.baseDate, { addSuffix: true });
  //   // setTimeSinceLatestEntry(distance);
  // }
  // useEffect(
  //   distanceLastEntry, []
  // );

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