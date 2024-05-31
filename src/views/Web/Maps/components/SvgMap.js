import { useState } from 'react';

import addLangText from '../../../../lang/Web/Maps/components/SvgMap.json'
import { useOutletContext } from 'react-router-dom';

import { ButtonGroup, Button } from "@nextui-org/react";

import MapTuc from './MapTuc.js';


function SvgMap() {
    const context = useOutletContext()
    const langText = {
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
        <section className='flex flex-col items-start xs:items-center overflow-x-auto max-w-screen xs:ps-2'>
            <ButtonGroup variant='shadow' >
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

            <div className='mt-4 bg-danger-50 ms-auto '>
                <MapTuc {...mapSvg} />
            </div>
        </section>
    );
}

export default SvgMap;
