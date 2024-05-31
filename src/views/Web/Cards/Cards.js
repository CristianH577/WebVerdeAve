import addLangText from '../../../lang/Web/Cards/Cards.json'
import { useOutletContext } from 'react-router-dom';

import { LoremIpsum } from 'react-lorem-ipsum';

import ShowModelsMain from '../../../components/ShowModelsMain.js';

import CardExample from './components/CardExample.js';
import CardModel1 from './components/CardModel1.js';
import CardModel2 from './components/CardModel2.js';
import CardModel3 from './components/CardModel3.js';
import CardModel4 from './components/CardModel4.js';
import CardModel5 from './components/CardModel5.js';
import CardModel6 from './components/CardModel6.js';
import CardModel7 from './components/CardModel7.js';
import CardModel8 from './components/CardModel8.js';
import CardModel9 from './components/CardModel9.js';



function Cartas() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const contextCards = require.context('../../../assets/imgs/cards', true)

    const models = [
        <CardExample />,
        <CardModel1
            img={null || contextCards(`./example-300.webp`)}
            img_alt={langText.card.img_example_alt}
            title={langText.card.title}
            content={<LoremIpsum random={false} />}
        />,
        <CardModel2
            img={null || contextCards(`./example-50.webp`)}
            img_alt={langText.card.img_example_alt}
            title={langText.card.title}
            subtext={langText.card.subtext}
            content={<LoremIpsum random={false} />}
        />,
        <CardModel3
            img={null || contextCards(`./example-300.webp`)}
            img_alt={langText.card.img_example_alt}
            title_card={langText.card.title + " 2"}
            subtext={langText.card.subtext}
            title_img={langText.card.title + " 1"}
        />,
        <CardModel4
            img={null || contextCards(`./example-400.webp`)}
            img_alt={langText.card.img_example_alt}
            button_title={langText.actions.action}
            text={'Lorem Ipsum'}
        />,
        <CardModel5
            img={null || contextCards(`./example-50.webp`)}
            title={langText.card.title}
            subtext={langText.card.subtext}
            button_text_active={langText.active}
            button_text_inactive={langText.inactive}
            content={<LoremIpsum random={false} />}
            text1={langText.card.label}
            text2={langText.card.label}
        />,
        <CardModel6
            img={null || contextCards(`./example-200.webp`)}
            title={langText.card.title}
            subtext={langText.card.subtext}
            title_progress={langText.progress}
            text_start={langText.start}
            text_end={langText.end}
        />,
        <CardModel7
            img={null || contextCards(`./example-400.webp`)}
            img_alt={langText.card.img_example_alt}
            title={langText.card.title}
            subtext={langText.card.subtext}
        />,
        <CardModel8
            img={null || contextCards(`./example-200.webp`)}
            img_alt={langText.card.img_example_alt}
            title={langText.click_me}
        />,
        <CardModel9
            img={null || contextCards(`./example-500.webp`)}
            img_alt={langText.card.img_example_alt}
            title={langText.card.title}
            subtext={langText.card.subtext}
            sub_img={null || contextCards(`./example-50.webp`)}
            sub_img_alt={langText.card.img_example_alt}
            button_title={langText.actions.action}
            footer_title={'Lorem Ipsum'}
            footer_text={'Fusce eget accumsan venenatis gravida ultricies quam pharetra.'}
        />
    ]

    return (
        <>
            <ShowModelsMain
                id={'cards'}
                models={models}
            />
        </>
    );
}

export default Cartas;
