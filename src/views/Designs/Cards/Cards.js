import React, { useState } from 'react';
import addLangText from '../../../lang/Designs/Cards.json'
import { useOutletContext } from 'react-router-dom';

import { Divider } from "@nextui-org/react";

import { LoremIpsum } from 'react-lorem-ipsum';

import CardModel1 from './components/CardModel1.js';
import CardModel2 from './components/CardModel2.js';
import CardModel3 from './components/CardModel3.js';
import CardModel4 from './components/CardModel4.js';
import CardModel5 from './components/CardModel5.js';
import CardModel6 from './components/CardModel6.js';
import CardModel7 from './components/CardModel7.js';
import CardModel8 from './components/CardModel8.js';
import CardModel9 from './components/CardModel9.js';

import img_example from '../../../assets/imgs/cartas-ejemplo.jpg';



function Cartas() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const [isActive, setisActive] = useState(false)
    const [marked, setmarked] = useState(false)
    const [count, setCount] = useState(0)


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.cards}
            </div>

            <CardModel1
                img={img_example}
                img_alt={langText.card.img_example_alt}
                title={langText.card.title}
                content={<LoremIpsum random={false} />}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel2
                img={img_example}
                img_alt={langText.card.img_example_alt}
                title={langText.card.title}
                subtext={langText.card.subtext}
                content={<LoremIpsum random={false} />}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel3
                img={img_example}
                img_alt={langText.card.img_example_alt}
                title_card={langText.card.title}
                subtext={langText.card.subtext}
                title_img={langText.card.title}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel4
                img={img_example}
                img_alt={langText.card.img_example_alt}
                button_title={langText.actions.action}
                text={'Lorem Ipsum'}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel5
                img={img_example}
                title={langText.card.title}
                subtext={langText.card.subtext}
                isActive={isActive}
                setisActive={setisActive}
                button_text_active={langText.active}
                button_text_inactive={langText.inactive}
                content={<LoremIpsum random={false} />}
                text1={langText.card.label}
                text2={langText.card.label}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel6
                img={img_example}
                title={langText.card.title}
                subtext={langText.card.subtext}
                title_progress={langText.progress}
                marked={marked}
                setmarked={setmarked}
                text_start={langText.start}
                text_end={langText.end}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel7
                img={img_example}
                img_alt={langText.card.img_example_alt}
                title={langText.card.title}
                subtext={langText.card.subtext}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel8
                img={img_example}
                img_alt={langText.card.img_example_alt}
                title={langText.click_me}
                count={count}
                setCount={setCount}
            />

            <Divider className='w-3/4 max-w-[1200px] my-8' />

            <CardModel9
                img={img_example}
                img_alt={langText.card.img_example_alt}
                title={langText.card.title}
                subtext={langText.card.subtext}
                sub_img={img_example}
                sub_img_alt={langText.card.img_example_alt}
                button_title={langText.actions.action}
                footer_title={'Lorem Ipsum'}
                footer_text={'Fusce eget accumsan venenatis gravida ultricies quam pharetra.'}
            />

        </main>
    );
}

export default Cartas;
