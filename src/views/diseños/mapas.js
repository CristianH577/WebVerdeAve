import React, { useState } from 'react';
import './mapas.css'

import addLangText from '../../lang/diseños/maps.json'
import { useOutletContext } from 'react-router-dom';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, Polygon, Polyline } from 'react-leaflet'
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server'
import DraggableMarker from './components/draggable_marker'

import { Divider } from "@nextui-org/react";
import { Card, CardFooter, Image, Link } from "@nextui-org/react";
import { ButtonGroup, Button } from "@nextui-org/react";

import { Geo, Geo2, Geo3, ArrowDown, ArrowDown2, GeoDraggable } from '../../assets/icons';
import { GoogleMap, Clock, Size } from '../../assets/icons';
import independencia from '../../assets/imgs/mapas/independencia.png'
import urquiza from '../../assets/imgs/mapas/urquiza.png'
import yrigoyen from '../../assets/imgs/mapas/yrigoyen.png'
import alberdi from '../../assets/imgs/mapas/alberdi.png'
import martin from '../../assets/imgs/mapas/martin.png'

import mapTuc from '../../assets/files/map_tuc'


function Mapas() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    // leaflet map
    const center = [-26.830908014632424, -65.20604648867965]
    const size = 50
    const icons = {
        independencia: <Geo size={size} />,
        urquiza: <Geo2 size={size} />,
        yrigoyen: <Geo3 size={size} />,
        alberdi: <ArrowDown size={size} />,
        martin: <ArrowDown2 size={size} />,

        direc: <GoogleMap size={32} />,
        time: <Clock size={36} />,
        size: <Size size={28} />,

        drag: <GeoDraggable size={50} />
    }
    const places = [
        {
            coord: [-26.8306, -65.20385],
            title: 'Plaza Independencia',
            direc: 'Av. 24 de Septiembre 400',
            img: independencia,
            id: 'independencia',
            color: 'danger',
            time: '24hs',
            size: '100x100m',
        },
        {
            coord: [-26.8194, -65.2027],
            title: 'Plaza Urquiza',
            direc: 'Sta. Fe 480',
            img: urquiza,
            id: 'urquiza',
            color: 'success',
            time: '24hs',
            size: '100x100m',
        },
        {
            coord: [-26.8370, -65.20533381661058],
            title: 'Plaza Hipólito Yrigoyen',
            direc: 'Gral. Paz 400/499',
            img: yrigoyen,
            id: 'yrigoyen',
            color: 'warning',
            time: '24hs',
            size: '100x50m',
        },
        {
            coord: [-26.8218, -65.2112],
            title: 'Plaza Juan Bautista Alberdi',
            direc: 'Santiago del Estero 1000',
            img: alberdi,
            id: 'alberdi',
            color: 'secondary',
            time: '24hs',
            size: '100x150m',
        },
        {
            coord: [-26.8394, -65.21063253443748],
            title: 'Plaza San Martín',
            direc: 'Lavalle 700',
            img: martin,
            id: 'martin',
            color: 'primary',
            time: '24hs',
            size: '100x100m',
        }
    ]

    const [show, setShow] = useState({
        marks: false,
        road: false,
        area: false,
        drag: false,
    })

    const getIcon = (id, className) => {
        const icon = icons[id]
        const iconMarkup = renderToStaticMarkup(icon)
        const customMarketIcon = divIcon({
            html: iconMarkup,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -30],
            className: ' hover:text-sky-400 text-' + className
        })

        return customMarketIcon
    }


    // svg map
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
        <main className={context.mainClass}>

            <div className={context.titleClass}>Mapas</div>

            {/* leaflet amap */}
            <ButtonGroup variant='shadow' className='buttongroup-xs '>
                <Button
                    color={show.marks ? 'primary' : 'default'}
                    onClick={() => setShow({ ...show, marks: !show.marks })}
                >
                    {langText.leafletButtons.marks}
                </Button>

                <Button
                    color={show.road ? 'secondary' : 'default'}
                    onClick={() => setShow({ ...show, road: !show.road })}
                >
                    {langText.leafletButtons.marks}
                </Button>

                <Button
                    className={show.area ? 'text-white' : ''}
                    color={show.area ? 'success' : 'default'}
                    onClick={() => setShow({ ...show, area: !show.area })}
                >
                    {langText.leafletButtons.area}
                </Button>

                <Button
                    color={show.drag ? 'danger' : 'default'}
                    onClick={() => setShow({ ...show, drag: !show.drag })}
                >
                    {langText.leafletButtons.drag}
                </Button>
            </ButtonGroup>

            <section className='w-full h-[500px] my-6 min-[360px]:rounded-lg shadow-medium'>
                <MapContainer
                    center={center}
                    zoom={14}
                    scrollWheelZoom={false}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    className='min-[360px]:rounded-lg'
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {show.marks &&
                        places.map((place) =>
                            <Marker
                                key={place.id}
                                position={place.coord}
                                icon={getIcon(place.id, place.color)}
                            >
                                <Popup className='bg-transparent m-0' >
                                    <Card
                                        isFooterBlurred
                                        radius="lg"
                                        className="border-none bg-transparent w-[400px] h-[300px]"
                                    >
                                        <Image
                                            radius='lg'
                                            removeWrapper
                                            alt={place.title}
                                            className="z-0 w-full h-full object-cover"
                                            src={place.img}
                                        />
                                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                            <div className="text-white/90 font-medium text-xl">{place.title}</div>
                                            <Link href={'#' + place.id}>
                                                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm" >
                                                    {langText.more}
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </Popup>
                            </Marker>
                        )
                    }

                    {show.area &&
                        <Polygon
                            pathOptions={{ color: 'green' }}
                            positions={[
                                [-26.82014335664827, -65.1940068151476],
                                [-26.844613660922768, -65.20031537039047],
                                [-26.840470877579968, -65.22151389082346],
                                [-26.816160209280568, -65.21529282455323],
                            ]}
                        />
                    }

                    {show.road &&
                        <Polyline
                            pathOptions={{ color: 'lime' }}
                            positions={[
                                [-26.838372191548306, -65.21041384294948],
                                [-26.83914586592746, -65.20663243172315],
                                [-26.824208717806087, -65.20314004559727],
                                [-26.82255368946037, -65.21053426986049],
                                [-26.81857722411979, -65.2096912802032],
                                [-26.81978092565074, -65.20352541224726],
                            ]}
                        />
                    }

                    {show.drag &&
                        <DraggableMarker center={center} icon={getIcon('drag', '')} />
                    }
                </MapContainer>
            </section>

            {show.marks &&
                <section className='mt-6 flex flex-col gap-6'>
                    {places.map((place) =>
                        <div key={place.id} id={place.id} className='max-w-[800px] flex flex-col md:flex-row gap-4 items-start bg-content1 min-[360px]:rounded-lg shadow-medium max-[360px]:w-full'>
                            <Image
                                removeWrapper
                                shadow='sm'
                                src={place.img}
                                alt={place.title}
                                className="h-full min-[360px]:max-h-[200px] object-cover max-[360px]:rounded-none"
                                width={360}
                            />

                            <div className='p-2 pe-4 max-[360px]:mb-2 break-all'>
                                <div className='font-semibold text-2xl'>{place.title}</div>
                                <div className='mt-2 min-[360px]:ms-6 flex flex-col gap-3'>
                                    {['direc', 'time', 'size'].map(e =>
                                        <div key={e} className='flex gap-2 items-center'>
                                            {icons[e]}{place[e]}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            }


            <Divider className='w-3/4 max-w-[1200px] my-8' />


            {/* svg amap */}
            <ButtonGroup variant='shadow' className='buttongroup-xs '>
                {mapSvgButtons.map(button =>
                    <Button
                        key={button}
                        name={button}
                        color={mapSvg[button] ? 'primary' : 'default'}
                        onClick={handleMapSvgButtons}
                        // isDisabled={button === 'zoom'}
                    >
                        {langText.mapSvgButtons[button]}
                        {button === 'zoom'
                            ? mapSvg.zoom && ' x' + mapSvg.zoom
                            : ''
                        }
                    </Button>
                )}
            </ButtonGroup>

            <section className='mt-4 overflow-auto max-w-full max-h-[600px]'>
                {mapTuc(mapSvg)}
            </section>
        </main>
    );
}

export default Mapas;
