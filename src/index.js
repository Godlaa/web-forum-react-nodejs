import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import QuestionStore from './store/QuestionStore';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user_store: new UserStore(),
    question_store: new QuestionStore(),
  }}>
    <App />
  </Context.Provider>,     
);

