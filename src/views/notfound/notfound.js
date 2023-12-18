import React from 'react';

import addLangText from '../../lang/notfound/notfound.json'
import { useOutletContext } from 'react-router-dom';


function NotFound() {
  const context = useOutletContext()
  const langText = {
        ...addLangText[context.lang]
    }

  return (
    <main className='m-auto text-center'>

      <div className='font-semibold text-7xl'>{langText.title}</div>

    </main>
  );
}

export default NotFound;
