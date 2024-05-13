

import addLangText from '../../lang/NotFound/NotFound.json'
import { useOutletContext } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import { Button } from '@nextui-org/react';


function NotFound() {
  const context = useOutletContext()
  const langText = {
    ...addLangText[context.lang]
  }

  const navigate = useNavigate()

  return (
    <main className='m-auto text-center'>

      <div className='font-semibold text-7xl'>{langText.title}</div>

      <Button variant='ghost' color='secondary' className='mt-8' onClick={() => navigate('/')}>
        {langText.back}
      </Button>

    </main>
  );
}

export default NotFound;
