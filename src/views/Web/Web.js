
import { useOutletContext } from "react-router-dom";

import SectionSectionButtons from "../../components/SectionSectionButtons";

import galeries from '../../assets/imgs/web/articles.svg'
import cards from '../../assets/imgs/web/cards.svg'
import forms from '../../assets/imgs/web/forms.svg'
import sliders from '../../assets/imgs/web/sliders.svg'
import showroom from '../../assets/imgs/web/showroom.svg'
import tables from '../../assets/imgs/web/tables.svg'
import mapas from '../../assets/imgs/web/maps.svg'
import more from '../../assets/imgs/web/more.svg'


function Web() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }

    const sections = [
        {
            key: 'cards',
            img: cards,
        },
        {
            key: 'galeries',
            img: galeries,
        },
        {
            key: 'forms',
            img: forms,
        },
        {
            key: 'sliders',
            img: sliders,
        },
        {
            key: 'showroom',
            img: showroom,
        },
        {
            key: 'tables',
            img: tables,
        },
        {
            key: 'maps',
            img: mapas,
        },
        {
            key: 'more',
            img: more,
        },
    ]


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.web}
            </div>

            <SectionSectionButtons
                sections={sections}
            />

        </main>
    );
}

export default Web;
