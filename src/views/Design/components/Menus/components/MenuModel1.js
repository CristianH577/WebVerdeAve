

import LoremIpsum from 'react-lorem-ipsum';

import { Divider, Image } from "@nextui-org/react";
import { BsWhatsapp, BsPinMap } from "react-icons/bs";

import img_menu from '../../../../../assets/imgs/showroom/fruta/sandía.webp'
import img_cat1 from '../../../../../assets/imgs/showroom/fruta/ciruela.webp'
import img_cat2 from '../../../../../assets/imgs/showroom/fruta/calabaza.webp'
import img_cat3 from '../../../../../assets/imgs/showroom/fruta/cereza.webp'
import { SVGEspecial, SVGMancha1, SVGOff50 } from '../../../../../assets/imgs/design/menus/SvgsMenus';


function MenuModel1() {
    const menu = [
        {
            category: "Categoria 1",
            img: img_cat1,
            list: [
                {
                    name: "Nombre 1",
                    price: 99,
                },
                {
                    name: "Nombre 2",
                    price: 99,
                },
            ]
        },
        {
            category: "Categoria 2",
            img: img_cat2,
            list: [
                {
                    name: "Nombre 1",
                    price: 99,
                },
                {
                    name: "Nombre 2",
                    price: 99,
                },
            ]
        },
        {
            category: "Categoria 3",
            img: img_cat3,
            list: [
                {
                    name: "Nombre 1",
                    price: 99,
                },
                {
                    name: "Nombre 2",
                    price: 99,
                },
            ]
        },
    ]


    return (
        <div className='w-full max-w-[700px] bg-gradient-to-br from-content3 to-content1 p-8 md:rounded-lg space-y-4 font-["menulis"]' >

            <span className='relative flex items-center justify-center mt-8 mb-20'>
                <h1 className='text-7xl text- font-extrabold uppercase text-center absolute z-10' >
                    Menu
                </h1>

                <SVGMancha1 className='absolute h-[100px] w-full left-2'
                    style={{
                        backgroundSize: '100% 100%',
                        transform: 'scaleX(2)'
                    }}
                />
            </span>

            <div className='flex justify-center items-center relative pt-4'>
                <SVGEspecial width={300} from={'#18c964'} to={'#72dfa1'} img={img_menu} />

                <SVGOff50 size={105} className='absolute -top-2 left-[56%]' />
            </div>

            {menu.map(cat =>
                <div key={cat.category} className='flex justify-between items-center gap-8'>
                    <div className='space-y-2'>
                        <h2 className='text-4xl text-success-400 font-semibold'>{cat.category}</h2>

                        <ol className='space-y-1'>
                            {cat.list.map(e =>
                                <li key={e.name}>
                                    <div className='flex gap-4 items-center justify-between text-success-600 text-xl font-semibold'>
                                        <h3 className=' w-'>{e.name}</h3>
                                        <Divider className='w-1/2' />
                                        <p className=' w-'>$ {e.price}</p>
                                    </div>

                                    <LoremIpsum avgSentencesPerParagraph={1} />
                                </li>
                            )}
                        </ol>
                    </div>

                    <Image
                        src={cat.img}
                        className='object-contain w-[200px] h-[200px] rounded-full border-2 bg-gradient- from-success to-success-200 border-success'
                        removeWrapper
                        style={{
                            background: 'radial-gradient(circle, hsl(var(--nextui-success-100)), hsl(var(--nextui-success-300)))'
                        }}
                    />
                </div>
            )}

            <div className='flex justify-center gap-8 pt-8'>
                <div className='flex items-center gap-2'>
                    <BsPinMap size={24} className='text-success' />
                    Direccion, Provincia
                </div>
                <div className='flex items-center gap-2'>
                    <BsWhatsapp size={24} className='text-success' />
                    381 999 9999
                </div>
            </div>
        </div>

    );
}

export default MenuModel1;
