import React from 'react';
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, collection, getDoc } from "firebase/firestore";
import useFetch from "./useFetch";
import Comments from './Comments';
import AddComment from './AddComment';

const LetterContent = () => {
  const { id } = useParams();
  const { data:letter } = useFetch(doc(db, "Letters", id));
  const commentsColRef = collection(db, "Letters", id, "Comments");  
  const { data:comments } = useFetch(commentsColRef);

  return ( 
    <React.Fragment>
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
      <div className="l-comment-section">
        <AddComment commentsColRef={commentsColRef} />
        {comments && <Comments comments={comments} />}
      </div>
    </React.Fragment>
         
  );
}
 
export default LetterContent;