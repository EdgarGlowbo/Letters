import { auth } from "./firebaseConfig";
import { addDoc } from "firebase/firestore";
import { useState } from "react";

const AddComment = ({ commentsColRef }) => {
  const [comment, setComment] = useState('');
      
  const handleSubmit = async e => {
    e.preventDefault();
    const date = new Date();
    const dateInMs = date.getTime();    
    await addDoc(commentsColRef, {
      author: auth.currentUser.displayName,
      comment: comment,      
      dateInMs: dateInMs,      
    });        
    setComment('');    
  };
  return (
    <form className="m-add-comment" onSubmit={handleSubmit}>
      <textarea
            cols="30"
            rows="5"
            className="c-add-comment__textarea"            
            onChange={(e) => { setComment(e.target.value) }}
            required          
            spellCheck="false"
            placeholder="Add a comment..."
            value={comment}
          >
      </textarea>
        <div className="l-add-comment__bottom-right">          
          <button 
            type="button"
            className="c-add-comment__cancel-btn"
            onClick={() => { setComment('') }}
          >
          Cancel
          </button>
          <button type="submit" className="c-add-comment__submit-btn">Comment</button>
        </div>        
    </form>
  );
}
 
export default AddComment;