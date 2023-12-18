import React, { useCallback, useMemo, useRef, useState } from 'react';

import addLangText from '../../../lang/diseños/components/draggable_marker.json'
import { useOutletContext } from 'react-router-dom';

import { Marker, Popup } from 'react-leaflet'


function DraggableMarker({ center, icon }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])


    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
            icon={icon}
        >
            <Popup className='cursor-pointer' >
                <div className='flex flex-col gap-2'>
                    <span className='hover:text-warning text-center font-semibold' onClick={toggleDraggable}>
                        {draggable
                            ? langText.fixed
                            : langText.move
                        }
                    </span>
                    <div className='text-neutral-500'>{langText.lat}: {position.lat || center[0]}</div>
                    <div className='text-neutral-500'>{langText.long}: {position.lng || center[1]}</div>
                </div>
            </Popup>
        </Marker>
    );
}

export default DraggableMarker;
