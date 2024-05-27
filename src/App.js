import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./views/Layout/Layout";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

import Web from "./views/Web/Web";
import Cards from "./views/Web/Cards/Cards";
import Sliders from "./views/Web/Sliders/Sliders";
import Forms from "./views/Web/Forms/Forms";
import Galeries from "./views/Web/Galeries/Galeries";
import Showroom from "./views/Web/Showroom/Showroom";
import Tables from "./views/Web/Tables";
import Maps from "./views/Web/Maps/Maps";
import More from "./views/Web/More/More";

import APIs from "./views/Apis/Apis";
import Analyze from "./views/Apis/Analyze/Analyze";
import Databases from "./views/Apis/Databases/Databases";
import Game from "./views/Apis/Game/Game";
import MakeBoard from "./views/Apis/MakeBoard/MakeBoard";

import Design from "./views/Design/Design"

// import Prices from "./views/Prices/Prices"

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

    // {
    //   path: 'prices',
    //   content: <Prices />,
    // },

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
