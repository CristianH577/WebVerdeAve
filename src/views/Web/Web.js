
import { useOutletContext } from "react-router-dom";

import SectionsButtons from "../../components/SectionsButtons.js";

function Web() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }

    const images = require.context('../../assets/imgs/web/sections', true);
    const more = { id: 'more' }
    const sections = []
    
    images.keys().forEach(image => {
        const id = image.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '')
        const src = images(image)

        if (id === 'more') {
            more.src = src
            return null
        } else {
            sections.push({
                id: id,
                src: src
            })
        }
    })
    sections.push(more)


    return (
        <main className={context.mainClass}>

            <h1 className={context.titleClass}>
                {langText.sections_titles.web}
            </h1>

            <SectionsButtons
                sections={sections}
            />

        </main>
    );
}

export default Web;
