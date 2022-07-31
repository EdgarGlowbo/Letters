import { ReactComponent as XDeleteBtn } from "./XDeleteBtn.svg";
import { useParams } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const Comments = ({ comments }) => {
  const { id } = useParams();
  const handleDelete = async (commentID) => {
    await deleteDoc(doc(db, 'Letters', id, "Comments", commentID));
  }
  return (
    <ul className="m-comments-list">
    {comments.map(comment => (
      <li className="m-comment" key={comment.id}>
        <div className="l-comment__container">
            <div className="l-comment__header">
              <div className="l-comment__top-left">
                <span className="c-comment__uname c-comment__uname--bold">{comment.author}</span>
                <span className="c-comment__distance c-comment__distance--gray">15 min</span>
              </div>              
              <button 
                className="c-comment__dlt-btn"
                onClick={() => {
                  handleDelete(comment.id);                        
                }}
                type="button"
              >                    
                <XDeleteBtn />                      
              </button>
            </div>
            <p className="c-comment__content">{comment.comment}</p>
            <div className="l-comment__footer l-comment__footer--unavailable">
              <button 
                className="c-comment__like-btn"            
                type="button"
              >
                <div className="c-heart-shape"></div>                                                   
              </button>
              <span className="c-comment__likes-count">
                0
              </span>
            </div>
        </div>
      </li>      
    ))}
    </ul>              
  );
}
 
export default Comments;