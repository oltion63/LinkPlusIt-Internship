import {Provider} from "react-redux";
import {store} from "./store";
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetails from './components/UserDetails.jsx'
import './index.css'
import App from './App.jsx'
import EditUser from "./components/EditUser.jsx";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/edit/:id" element={<EditUser />} />
          </Routes>
      </BrowserRouter>
  </Provider>
)
