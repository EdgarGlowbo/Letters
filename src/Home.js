import LetterList from "./LetterList";
import { db, auth } from "./firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import {
  collection, doc, deleteDoc,  
} from "firebase/firestore";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { formatDistance } from 'date-fns'
import { useState, useEffect } from "react";
import DisplayName from "./DisplayName";

const Home = () => {  
  const [timeSinceLatestEntry, setTimeSinceLatestEntry] = useState('Never'); // Use date-fns
  // If user displayName  is null or there's not user at all then the DisplayName component runs
  const [isNewUser, setIsNewUser] = useState(false);  
  const history = useHistory();
  const colRef = collection(db, 'Letters');      
  const { data:letters } = useFetch(colRef); 
  const distanceLastEntry = (date) => {      
    const baseDate = new Date();        
    const distance = formatDistance(date, baseDate, { addSuffix: true });
    setTimeSinceLatestEntry(distance);
  }
  
  const handleDelete = async id => {    
    await deleteDoc(doc(db, 'Letters', id));
    history.push('/Letters/');
  };

    
  useEffect(() => {
    if (letters) { distanceLastEntry(letters[0].dateInMs) }
    signInAnonymously(auth)
    .then(cred => {                
      setIsNewUser(cred.user.displayName === null ? true : false);
      if (isNewUser) { document.querySelector('.content').classList.add('content--dark-bckgr') }
    })
    .catch((err) => console.log(err));
  }, []);
  return ( 
    <div className="l-container">
      { isNewUser && <DisplayName setIsNewUser={setIsNewUser} />}
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