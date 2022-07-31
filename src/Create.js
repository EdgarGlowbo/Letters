import React, { useState } from "react";
import { ReactComponent as DiskIcon } from "./DiskIcon.svg";
import { ReactComponent as LetterIcon } from "./LetterIcon.svg";
import Publish from "./Publish";
const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const togglePublishWdw = () => { 
    setIsOpen(!isOpen);
    document.querySelector('.content').classList.toggle('l-auth-and-syn__bckgr');
  };
  const handleClose = (e, type) => {
    const isCancelBtn = e.target.classList.contains('c-auth-and-syn__cancel');
    const isPublishForm = e.target.classList.contains('l-author-and-synopsis');
    const isBackground = e.target.classList.contains('l-auth-and-syn__bckgr');
    
    if (isCancelBtn || isBackground || (isPublishForm && type === 'submit')) {
      togglePublishWdw() 
    }   
  }
  return (
    <React.Fragment>
      { isOpen && 
        <Publish        
          handleClose={ handleClose }
          title={title}
          body={body}
        /> 
      }
      <div 
        className="m-text-editor"        
      >
        <div className="l-text-editor__header">
          <div className="o-title-and-save">
            <input
              className="c-title-input c-input"
              required
              placeholder="Title"
              value={ title }
              onChange={(e) => { setTitle(e.target.value) }}
            />
            <button className="c-save-btn c-btn" type="button" disabled>
              <DiskIcon />
            </button>          
          </div>
          <button
            type="button"
            className="c-publish-btn c-btn"
            onClick={ (e) => { togglePublishWdw(e) } }
          >
              <LetterIcon />
          </button>        
        </div>
        <div className="l-text-editor__body">
          <textarea
            cols="30"
            rows="10"
            className="c-content-textarea"
            value={ body }
            onChange={(e) => { setBody(e.target.value) }}
            required
            autoFocus
            spellCheck="false"
          >
          </textarea>
        </div>      
      </div>
    </React.Fragment>           
  );
}
 
export default Create;