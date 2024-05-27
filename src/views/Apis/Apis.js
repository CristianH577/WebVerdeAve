
import { useOutletContext } from "react-router-dom";

import SectionSectionButtons from "../../components/SectionSectionButtons";

import analyze from '../../assets/imgs/apis/analyze.webp'
import databases from '../../assets/imgs/apis/databases.webp'
import game from '../../assets/imgs/apis/game.webp'
import make_board from '../../assets/imgs/apis/make_board.webp'



function APIs() {
    const context = useOutletContext()

    const sections = [
        {
            key: 'databases',
            img: databases,
        },
        {
            key: 'analyze',
            img: analyze,
        },
        {
            key: 'game',
            img: game,
        },
        {
            key: 'make_board',
            img: make_board,
        },
    ]


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>APIs</div>

            <SectionSectionButtons
                sections={sections}
            />

        </main>
    );
}

export default APIs;
