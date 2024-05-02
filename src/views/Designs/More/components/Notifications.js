import { useState } from 'react';

import addLangText from '../../../../lang/Designs/More/components/Notifications.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Input, Radio, RadioGroup } from '@nextui-org/react';

import { ToastContainer, toast } from 'react-toastify';



function Notifications() {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang]
    }

    const [notify, setNotify] = useState({
        color: 'default',
        msg: langText.msg
    })


    return (
        <section>
            <div className='text-center font-semibold text-lg'>
                {langText.title}
            </div>

            <RadioGroup
                label='Color'
                name='color'
                orientation="horizontal"
                className='mt-2'
                defaultValue={notify.color}
                onValueChange={e => notify.color = e}
            >
                {['default', 'info', 'success', 'warning', 'error'].map(color =>
                    <Radio key={color} value={color}>{langText.color[color]}</Radio>
                )}
            </RadioGroup>

            <Input
                type='text'
                name='msg'
                className='mt-2 input-xs'
                placeholder={notify.msg}
                value={notify.msg}
                max={50}
                onValueChange={e => setNotify({ ...notify, msg: e })}

                isClearable
                onClear={() => setNotify({ ...notify, msg: '' })}
            />

            <Button
                color='primary'
                className='mt-2 button-xs'
                onClick={() => {
                    if (notify.color === 'default') {
                        toast(notify.msg)
                    } else {
                        toast[notify.color](notify.msg)
                    }
                }}
            >
                {langText.showNotify}
            </Button>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={context.dark ? 'dark' : 'light'}
            />
        </section>
    );
}

export default Notifications;
