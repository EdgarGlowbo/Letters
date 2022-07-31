import LetterList from "./LetterList";
import { db, auth } from "./firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import {
  collection, doc, deleteDoc,  
} from "firebase/firestore";
import useFetch from "./useFetch";
import { formatDistance } from 'date-fns'
import { useState, useEffect } from "react";
import DisplayName from "./DisplayName";

const Home = () => {  
  const [timeSinceLatestEntry, setTimeSinceLatestEntry] = useState('Never'); // Use date-fns
  // If user displayName  is null or there's not user at all then the DisplayName component runs
  const [isNewUser, setIsNewUser] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [currID, setCurrID] = useState('');
  const colRef = collection(db, 'Letters');      
  const { data:letters } = useFetch(colRef); 
  const distanceLastEntry = (date) => {      
    const baseDate = new Date();        
    const distance = formatDistance(date, baseDate, { addSuffix: true });
    setTimeSinceLatestEntry(distance);
  }
  const handleDelete = async id => {    
    await deleteDoc(doc(db, 'Letters', id));    
  };  
  const displayConfirmDeleteWdw = (e) => {    
    setIsDisplayed(!isDisplayed);        
    document.querySelector('.content').classList.toggle('content--dark-bckgr');
    const targetClasses = e.target.classList;
    
    if (targetClasses.contains('c-dlt-letter-warning__btn-confirm')) {            
      handleDelete(currID);
    } else if (targetClasses.contains('c-dlt-letter-warning__btn-cancel') || targetClasses.contains('content--dark-bckgr')) {
      setIsDisplayed(!isDisplayed);
    }
  };    
  useEffect(() => {
    if (letters) { distanceLastEntry(letters[0].dateInMs) }    
    signInAnonymously(auth)
    .then(cred => {                
      setIsNewUser(cred.user.displayName ? false : true);      
    })
    .catch((err) => console.log(err));
  }, [letters]);
  return ( 
    <div className="l-container">
      { isNewUser && <DisplayName setIsNewUser={setIsNewUser} />}      
      <p className="c-latest-entry">Latest entry: { timeSinceLatestEntry }</p>      
      {/* Dinamically generated entries */}
      {letters && <LetterList
        letters={letters}        
        displayConfirmDeleteWdw={displayConfirmDeleteWdw}
        setCurrID={setCurrID}
      />}
      {isDisplayed && 
        <div className="o-dlt-letter-warning" onClick={ (e) => { displayConfirmDeleteWdw(e) }}>
          <h1 className="c-dlt-letter-warning__label">
            Are you sure you want to delete this letter?
          </h1>
          <div className="l-dlt-letter-warning__btn-container">
            <button type="button" className="c-dlt-letter-warning__btn-confirm">Confirm</button>
            <button type="button" className="c-dlt-letter-warning__btn-cancel">Cancel</button> 
          </div>                             
        </div>
      }
    </div>
  );
}
 
export default Home;