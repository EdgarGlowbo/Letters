import { auth } from "./firebaseConfig";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

const DisplayName = ( { setIsNewUser }) => {
  const [displayName, setDisplayName] = useState('');
  document.querySelector('.content').classList.add('content--dark-bckgr');
  const setDisplayNameInUser = e => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: displayName,
    }).then(() => console.log('Profile updated!')).catch((error) => console.log(error));    
    document.querySelector('.content').classList.remove('content--dark-bckgr');    
    setIsNewUser(false);
  };  
        
  return (
    <form className="o-display-name" onSubmit={setDisplayNameInUser}>
      <h1 className="c-display-name__label">
        Display name:
      </h1>
      <input 
        type="text" 
        className="c-display-name__input" 
        value={ displayName }
        onChange={(e) => { setDisplayName(e.target.value) }}
        required        
      />
      <button type="submit" className="c-display-name__btn">Ok</button>
    </form>
  );
}
 
export default DisplayName;