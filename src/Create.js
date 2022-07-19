import { ReactComponent as DiskIcon } from "./DiskIcon.svg";
import { ReactComponent as LetterIcon } from "./LetterIcon.svg";
const Create = () => {
  return ( 
    <form className="m-text-editor">
      <div className="l-text-editor__header">
        <div className="o-title-and-save">
          <input
            className="c-title-input c-input"
            required
            placeholder="Title"
          />
          <button className="c-save-btn c-btn">
            <DiskIcon />
          </button>          
        </div>
        <button className="c-publish-btn c-btn">
            <LetterIcon />
        </button>        
      </div>
      <div className="l-text-editor__body">
        <textarea
          cols="30"
          rows="10"
          className="c-content-textarea"
          required
          autoFocus
        >
        </textarea>
      </div>        
    </form>
  );
}
 
export default Create;