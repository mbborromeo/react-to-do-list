import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Redirect, 
import List from './components/List/List';
import Detail from './components/Detail/Detail';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" 
                        exact
                        component={List} 
                    />

                    <Route path="/detail/:id" 
                        exact
                        component={Detail} 
                    />
                </Switch>
            </Router>  
        </div>
    );
}

export default App;
