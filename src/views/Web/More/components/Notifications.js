import { useRef, useState } from 'react';
import './Notifications.css'

import addLangText from '../../../../lang/Web/More/components/Notifications.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup } from '@nextui-org/react';

import { toast, Flip, Bounce, Zoom, Slide, cssTransition } from 'react-toastify';



function Notifications() {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang]
    }

    const toastId = useRef(null)

    const [notify, setNotify] = useState({
        color: 'default',
        msg: langText.msg,
        transition: 'default',
        checks: ["accumulate", "time"],
        position: 'top-right',
    })

    const transitions = {
        default: Bounce,
        flip: Flip,
        zoom: Zoom,
        slide: Slide,

        flipY: cssTransition({
            enter: "flipY-in",
            exit: "flipY-out"
        }),
        swirl: cssTransition({
            enter: "swirl-in-fwd",
            exit: "swirl-out-bck"
        }),
    }


    const showNotify = () => {
        const config = {
            type: notify.color,
            autoClose: notify.checks.includes('time')
                ? notify.checks.includes('accumulate')
                    ? 2000
                    : 5000
                : false,
            transition: transitions[notify.transition],
            position: notify.position,
        }

        if (notify.checks.includes('accumulate')) {
            toast(notify.msg, config)
        } else {
            // if (!toast.isActive(toastId.current)) toast.dismiss(toastId.current)

            if (!toast.isActive(toastId.current)) {
                toastId.current = toast(notify.msg, config)
            } else {
                toast.update(toastId.current, {
                    render: notify.msg,
                    ...config,
                })
            }
        }
    }


    return (
        <section className='flex flex-col gap-2'>
            <div className='text-center font-semibold text-lg'>
                {langText.title}
            </div>

            <RadioGroup
                label='Color'
                name='color'
                orientation="horizontal"
                defaultValue={notify.color}
                onValueChange={e => notify.color = e}
            >
                {['default', 'info', 'success', 'warning', 'error'].map(color =>
                    <Radio key={color} value={color}>{langText.colors[color]}</Radio>
                )}
            </RadioGroup>

            <RadioGroup
                label={langText.transition.label}
                name='transition'
                orientation="horizontal"
                defaultValue={notify.transition}
                onValueChange={e => notify.transition = e}
            >
                {Object.keys(transitions).map(transition =>
                    <Radio key={transition} value={transition}>
                        {langText.transition.items[transition]}
                    </Radio>
                )}
            </RadioGroup>


            <RadioGroup
                label={langText.position.label}
                name='position'
                orientation="horizontal"
                defaultValue={notify.position}
                onValueChange={e => notify.position = e}
            >
                {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(position =>
                    <Radio key={position} value={position}>
                        {langText.position.items[position]}
                    </Radio>
                )}
            </RadioGroup>


            <CheckboxGroup
                label="Preferencias"
                orientation="horizontal"
                defaultValue={notify.checks}
                onValueChange={e => notify.checks = e}
            >
                <Checkbox value="accumulate">Acumular</Checkbox>
                <Checkbox value="time">Temporal</Checkbox>
            </CheckboxGroup>


            <Input
                type='text'
                name='msg'
                className='input-xs mt-2 max-w-sm'
                maxLength={50}
                placeholder={notify.msg}
                value={notify.msg}
                max={50}
                onValueChange={e => setNotify({ ...notify, msg: e })}

                isClearable
                onClear={() => setNotify({ ...notify, msg: '' })}
            />

            <div className='text-end'>
                <Button
                    color='primary'
                    className='mt-2 button-xs'
                    onClick={showNotify}
                >
                    {langText.showNotify}
                </Button>
            </div>

        </section>
    );
}

export default Notifications;
