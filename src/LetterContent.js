import React from 'react';
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc } from "firebase/firestore";
import useFetch from "./useFetch";

const LetterContent = () => {
  const { id } = useParams();
  const { data:letter } = useFetch(doc(db, "Letters", id));

  return ( 
    
      <div className="l-letter-container">
      { letter && (
        <React.Fragment>
          <h2 className="c-letter-title c-text__h2">{ letter.title }</h2>
          <div className="l-author-and-date"> 
            <span className="c-author">- { letter.author }</span>
            <span className="c-created-at">{ letter.createdAt }</span>
          </div>
          <div className="c-text__p c-letter-content">{ letter.content }</div>
        </React.Fragment>        
      )}      
      </div>
         
  );
}
 
export default LetterContent;