import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./views/layout/layout";
import Home from "./views/home/home";
import NotFound from "./views/notfound/notfound";

import Diseños from "./views/diseños/diseños";
import Cartas from "./views/diseños/cartas";
import Galerias from "./views/diseños/galerias";
import Presentaciones from "./views/diseños/presentaciones";
import Formularios from "./views/diseños/formularios";
import Showroom from "./views/diseños/showroom";
import Tablas from "./views/diseños/tablas";
import Mapas from "./views/diseños/mapas";

import Analisis from "./views/analisis/analisis";

import Databases from "./views/databases/databases";
import DatabasesNoUser from "./views/databases/databases_nouser";

import Test from "./views/plantilla/test";


// usuario----------------------------------------------------------------------
import { useEffect, useState } from "react";
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


  useEffect(() => {
    // eslint-disable-next-line
    async function getUser() {
      if (!user) {
        for (let i = 0; i < 3; i++) {
          const newId = Math.floor(Math.random() * (1000 - 1 + 1) + 1)

          const validateIdUser = await getAPI('es/Databases_Controller/validateIdUser?idUser=' + newId, false)

          if (typeof validateIdUser.value === 'object') {
            i = 3
          } else {
            if (!validateIdUser.value) {
              i = 3
              setUser({
                id: newId
              })
            }
          }
        }
      }
    }

    getUser()
    // eslint-disable-next-line
  })
  // ----------------------------------------------------------------------


  const routes = [
    {
      path: 'inicio',
      content: <Home />,
    },

    {
      path: 'disenos',
      content: <Diseños />,
    },
    {
      path: 'disenos/cartas',
      content: <Cartas />,
    },
    {
      path: 'disenos/galerias',
      content: <Galerias />,
    },
    {
      path: 'disenos/presentaciones',
      content: <Presentaciones />,
    },
    {
      path: 'disenos/formularios',
      content: <Formularios />,
    },
    {
      path: 'disenos/showroom',
      content: <Showroom />,
    },
    {
      path: 'disenos/tablas',
      content: <Tablas />,
    },
    {
      path: 'disenos/mapas',
      content: <Mapas />,
    },

    {
      path: 'analisis',
      content: <Analisis />,
    },

    {
      path: 'databases',
      content: user ? <Databases user={user} setUser={setUser} /> : <DatabasesNoUser />,
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
