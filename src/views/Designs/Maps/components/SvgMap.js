import React, { useState } from 'react';

import addLangText from '../../../../lang/Designs/Maps/components/SvgMap.json'
import { useOutletContext } from 'react-router-dom';

import { ButtonGroup, Button } from "@nextui-org/react";

import mapTuc from '../../../../assets/files/map_tuc'


function SvgMap() {
    const context = useOutletContext()
    const langText = {
        // ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const [mapSvg, setMapSvg] = useState({
        labels: false,
        legends: false,
        hover: false,
        zoom: false,
        shadow: false,
    })


    const mapSvgButtons = ['labels', 'legends', 'shadow', 'hover', 'zoom']
    const handleMapSvgButtons = (e) => {
        const name = e.target.name
        const newState = { ...mapSvg }
        var val = !mapSvg[name]
        if (name === 'zoom') {
            switch (mapSvg.zoom) {
                case false:
                    val = 1.5
                    break;
                case 1.5:
                    val = 2
                    break;

                default:
                    val = false
                    break;
            }
        }
        newState[name] = val
        setMapSvg(newState)
    }


    return (
        <section className='center'>
            <ButtonGroup variant='shadow' className='buttongroup-xs '>
                {mapSvgButtons.map(button =>
                    <Button
                        key={button}
                        name={button}
                        color={mapSvg[button] ? 'primary' : 'default'}
                        onClick={handleMapSvgButtons}
                    >
                        {langText[button]}
                        {button === 'zoom'
                            ? mapSvg.zoom && ' x' + mapSvg.zoom
                            : ''
                        }
                    </Button>
                )}
            </ButtonGroup>

            <div className='mt-4 overflow-auto max-w-full max-h-[600px]'>
                {mapTuc(mapSvg)}
            </div>
        </section>
    );
}

export default SvgMap;
