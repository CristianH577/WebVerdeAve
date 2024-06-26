
import { useOutletContext } from "react-router-dom";

import SectionsButtons from "../../components/SectionsButtons.js";


function APIs() {
    const context = useOutletContext()

    const images = require.context('../../assets/imgs/apis', true)
    const sections = images.keys().map(image => {
        const id = image.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '')
        const src = images(image)

        return {
            id: id,
            src: src
        }
    })


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>APIs</div>

            <SectionsButtons
                sections={sections}
            />

        </main>
    );
}

export default APIs;
