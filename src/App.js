import { NextUIProvider } from "@nextui-org/react";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

// views----------------------------------------------------------------------
import Layout from "./views/Layout/Layout.js";
import Home from "./views/Home/Home.js";
import NotFound from "./views/NotFound/NotFound.js";

import Web from "./views/Web/Web.js";
import Cards from "./views/Web/Cards/Cards.js";
import Sliders from "./views/Web/Sliders/Sliders.js";
import Forms from "./views/Web/Forms/Forms.js";
import Galeries from "./views/Web/Galeries/Galeries.js";
import Showroom from "./views/Web/Showroom/Showroom.js";
import Tables from "./views/Web/Tables.js";
import Maps from "./views/Web/Maps/Maps.js";
import More from "./views/Web/More/More.js";

import APIs from "./views/Apis/Apis.js";
import Analyze from "./views/Apis/Analyze/Analyze.js";
import Databases from "./views/Apis/Databases/Databases.js";
import Game from "./views/Apis/Game/Game.js";
import MakeBoard from "./views/Apis/MakeBoard/MakeBoard.js";

import Design from "./views/Design/Design.js"

import Test from "./views/Plantilla/Test.js";

// usuario ----------------------------------------------------------------------
import { useState } from "react";
import { getAPI } from '../src/libs/api.js';
import { useBeforeUnload } from "react-router-dom";


// ----------------------------------------------------------------------
function App() {

  // usuario----------------------------------------------------------------------
  const [user, setUser] = useState(false)
  const deleteUser = () => {
    if (user) {
      setUser(false)
      getAPI('es/Databases_Controller/deleteUser?id=' + user.id, false)
    }
  }
  useBeforeUnload(deleteUser)

  
  // ----------------------------------------------------------------------
  const routes = [
    {
      path: 'home',
      content: <Home />,
    },

    {
      path: 'web',
      content: <Web />,
    },
    {
      path: 'web/cards',
      content: <Cards />,
    },
    {
      path: 'web/galeries',
      content: <Galeries />,
    },
    {
      path: 'web/sliders',
      content: <Sliders />,
    },
    {
      path: 'web/forms',
      content: <Forms />,
    },
    {
      path: 'web/showroom',
      content: <Showroom />,
    },
    {
      path: 'web/tables',
      content: <Tables />,
    },
    {
      path: 'web/maps',
      content: <Maps />,
    },
    {
      path: 'web/more',
      content: <More />,
    },

    {
      path: 'apis',
      content: <APIs />,
    },
    {
      path: 'apis/analyze',
      content: <Analyze />,
    },
    {
      path: 'apis/databases',
      content: <Databases user={user} setUser={setUser} />,
    },
    {
      path: 'apis/game',
      content: <Game />,
    },
    {
      path: 'apis/make_board',
      content: <MakeBoard />,
    },

    {
      path: 'design',
      content: <Design />,
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
