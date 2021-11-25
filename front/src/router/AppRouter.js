
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from 'react-router-dom';
  
import { ProcesadoresScreen } from '../components/procesadoresScreen';
  

export const AppRouter = () => {

    
    return (
        
        <Router>
            <div>
                
                <ProcesadoresScreen/>

                <Routes>
    
                    <Route
                        exact path="/" 
                        element={ ProcesadoresScreen }
                        
                    />
    
                   
                </Routes>
            </div>
        </Router>
    )
}
  