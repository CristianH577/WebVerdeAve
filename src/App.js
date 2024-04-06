import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./views/Layout/Layout";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

import Designs from "./views/Designs/Designs";
import Cards from "./views/Designs/Cards/Cards";
import Sliders from "./views/Designs/Sliders/Sliders";
import Forms from "./views/Designs/Forms";
import Galeries from "./views/Designs/Galeries/Galeries";
import Showroom from "./views/Designs/Showroom";
import Tables from "./views/Designs/Tables";
import Maps from "./views/Designs/Maps/Maps";
import More from "./views/Designs/More/More";

import APIs from "./views/Apis/Apis";
import Analyze from "./views/Apis/Analyze/Analyze";
import Databases from "./views/Apis/Databases/Databases";
import DatabasesNoUser from "./views/Apis/Databases/DatabasesNoUser";
import Game from "./views/Apis/Game/Game";

import Prices from "./views/Prices/Prices"

import Test from "./views/Plantilla/Test";


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
      path: 'home',
      content: <Home />,
    },

    {
      path: 'designs',
      content: <Designs />,
    },
    {
      path: 'designs/cards',
      content: <Cards />,
    },
    {
      path: 'designs/galeries',
      content: <Galeries />,
    },
    {
      path: 'designs/sliders',
      content: <Sliders />,
    },
    {
      path: 'designs/forms',
      content: <Forms />,
    },
    {
      path: 'designs/showroom',
      content: <Showroom />,
    },
    {
      path: 'designs/tables',
      content: <Tables />,
    },
    {
      path: 'designs/maps',
      content: <Maps />,
    },
    {
      path: 'designs/more',
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
      content: user ? <Databases user={user} setUser={setUser} /> : <DatabasesNoUser user={user} setUser={setUser} />,
    },

    {
      path: 'apis/game',
      content: <Game />,
    },

    {
      path: 'prices',
      content: <Prices />,
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
