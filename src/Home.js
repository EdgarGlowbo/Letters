import LetterList from "./LetterList";
import { db } from "./firebaseConfig";
import { collection } from "firebase/firestore";
import useFetch from "./useFetch";

const Home = () => {  
  const timeSinceLatestEntry = '18 minutes ago...'; // Use date-fns  
      
  const colRef = collection(db, 'Letters');
  const { data:letters } = useFetch(colRef);
  // const handleDelete = id => {
  //   const newLetterList = letters.filter(letter => letter.id !== id);
  //   setLetters(newLetterList);    
  // };

  return ( 
    <div className="l-container">      
      <p className="c-latest-entry">Latest entry: { timeSinceLatestEntry }</p>
      {/* Dinamically generated entries */}
      {letters && <LetterList letters={letters} />}
    </div>
  );
}
 
export default Home;