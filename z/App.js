import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./views/layout/layout";
import Home from "./views/home/home";
import NotFound from "./views/notfound/notfound";

import Diseños from "./views/designs/diseños";
import Cartas from "./views/designs/cartas";
import Galerias from "./views/designs/galerias";
import Presentaciones from "./views/designs/sliders";
import Formularios from "./views/designs/formularios";
import Showroom from "./views/designs/showroom";
import Tablas from "./views/designs/tables";
import Mapas from "./views/designs/mapas";
import Mas from "./views/designs/mas";

import Analisis from "./views/analyze/analyze";

import Databases from "./views/databases/databases";
import DatabasesNoUser from "./views/databases/databases_nouser";

import Game from "./views/game/game";

import Test from "./views/plantilla/test";


// usuario----------------------------------------------------------------------
import { useState } from "react";
import { getAPI } from '../src/libs/api';
import { useBeforeUnload } from "react-router-dom";
// ----------------------------------------------------------------------


function App() {

  // usuario----------------------------------------------------------------------
  const [user, setUser] = useState(false)
  const deleteUser = () => {
    if (user) {
      setUser(false)
      getAPI('es/Databases_Controller/deleteUser?idUser=' + user.id, false)
    }
  }
  useBeforeUnload(deleteUser)
  // ----------------------------------------------------------------------


  const routes = [
    {
      path: 'inicio',
      content: <Home />,
    },

    {
      path: 'designs',
      content: <Diseños />,
    },
    {
      path: 'designs/cartas',
      content: <Cartas />,
    },
    {
      path: 'designs/galerias',
      content: <Galerias />,
    },
    {
      path: 'designs/sliders',
      content: <Presentaciones />,
    },
    {
      path: 'designs/formularios',
      content: <Formularios />,
    },
    {
      path: 'designs/showroom',
      content: <Showroom />,
    },
    {
      path: 'designs/tables',
      content: <Tablas />,
    },
    {
      path: 'designs/mapas',
      content: <Mapas />,
    },
    {
      path: 'designs/mas',
      content: <Mas />,
    },

    {
      path: 'analyze',
      content: <Analisis />,
    },

    {
      path: 'databases',
      content: user ? <Databases user={user} setUser={setUser} /> : <DatabasesNoUser user={user} setUser={setUser} />,
    },

    {
      path: 'game',
      content: <Game />,
    },

    {
      path: 'test',
      content: <Test />,
    },
  ]


  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />

            {routes.map(route =>
              <Route key={route.path} path={'/' + route.path} element={route.content} />
            )}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </NextUIProvider>
  );
}

export default App;
