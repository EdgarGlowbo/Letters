import LetterList from "./LetterList";
import { db } from "./firebaseConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";


const Home = () => {  
  const timeSinceLatestEntry = '18 minutes ago...'; // Use date-fns  
  const history = useHistory();
  const colRef = collection(db, 'Letters');
  const { data:letters } = useFetch(colRef);
  const handleDelete = async id => {    
    await deleteDoc(doc(db, 'Letters', id));
    history.push('/');
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