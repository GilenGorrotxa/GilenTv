import './App.css';
import MyContext from './context/appcontext'
import { useState } from 'react';
import Home from './pages/home/index';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FilmsTsx from './pages/films/films.tsx';

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/films",
    element: <FilmsTsx/>
  }
]);

function App() {
  const [color, setColor] = useState("black");
  return (
    <MyContext.Provider value={{color,setColor}} >
      <RouterProvider router={routes} />
    </MyContext.Provider>
  );
}

export default App;
