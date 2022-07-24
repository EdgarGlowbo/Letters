import { useState } from "react";
import { format } from "date-fns";
import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Publish = ({ handleClose, title, body }) => {
  const [wordCount, setWordCount] = useState(0);
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const navigate = useHistory();
  const maxLengthSynopsis = 380;  
  const handleKeyUp = (e) => {
    const current = e.target.value.length;
    setWordCount(current);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseDate = new Date();
    const formatedDate = format(baseDate, 'PPp');
    const letterObj = {
      author: author,
      synopsis: synopsis,
      content: body,
      createdAt: formatedDate,      
      title: title,
    }    
    const colRef = collection(db, 'Letters');
    const docRef = await addDoc(colRef, letterObj);
    await updateDoc(docRef, {
      id: docRef.id
    });    
    handleClose(e, e.type);
    navigate.push('/');    
  }
  return (
    <div
      className="l-auth-and-syn__bckgr"
      onClick={(e) => { handleClose(e) }}
    >
      <form
        className="l-author-and-synopsis"
        onSubmit={handleSubmit}
      >
        <div className="o-author">
          <span className="c-author c-author__span">Author:</span>
          <input
              className="c-author__input c-input"
              required
              autoFocus            
              value={ author }
              onChange={(e) => { setAuthor(e.target.value) }}
          />
        </div>
        <div className="o-synopsis">
          <div className="l-synopsis__label-and-wordcount">
            <span className="c-synopsis__label">Synopsis:</span>
            <span className="c-synopsis__wordcount">{`${wordCount}/${maxLengthSynopsis}`}</span>
          </div>
          <textarea
            cols="30"
            rows="10"
            maxLength={maxLengthSynopsis.toString()}
            className="o-synopsis__textarea"
            value={ synopsis }
            onChange={(e) => { setSynopsis(e.target.value) }}
            onKeyUp={(e) => { handleKeyUp(e) }}
          >
          </textarea>                
        </div>
        <div className="l-btn-frame o-auth-and-syn">
          <button
            type="submit"
            className="c-auth-and-syn__publish"                       
          >
            Publish
          </button>
          <button
            type="button"
            className="c-auth-and-syn__cancel"                    
          >
            Cancel
          </button>
        </div>
      </form>
    </div> 
  );  
}
 
export default Publish;