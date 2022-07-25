import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LetterContent from './LetterContent';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navbar />
          <Switch>
            <Route exact path="/Letters/">
              <Home />
            </Route>
            <Route path="/Letters/create">              
              <Create />              
            </Route>
            <Route path="/Letters/letter/:id">
              <LetterContent />
            </Route>            
          </Switch>          
        </div>
      </div>
    </Router>    
  );
}

export default App;
