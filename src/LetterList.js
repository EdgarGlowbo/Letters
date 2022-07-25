import { Link } from "react-router-dom";
import { ReactComponent as XDeleteBtn } from "./XDeleteBtn.svg"

const LetterList = ({ letters, handleDelete }) => {  
  return ( 
    <ul className="m-entries">    
      {
        letters.map(letter => (
            <li className="o-entry" key={ letter.id }>
              <Link to={`/Letters/letter/${ letter.id }`}>
                <div className="l-entry-container">
                  <div className="l-entry__header">
                    <h2 className="c-text__h2 c-letter-title">{ letter.title }</h2>
                    <button 
                      className="c-entry__btn c-entry__dlt-btn"
                      onClick={() => {
                        handleDelete(letter.id);                        
                      }}
                      type="button"
                    >                    
                      <XDeleteBtn />                      
                    </button>
                  </div>              
                  <p className="c-text__p c-letter__preview">{ letter.synopsis }</p>
                </div>                
              </Link>
            </li>           
        ))
      }                  
    </ul>
  );
}
 
export default LetterList;