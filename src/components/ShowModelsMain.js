import { useState, useEffect } from 'react';
import addLangText from '../lang/components/ShowModelsMain.json'
import { useOutletContext } from 'react-router-dom';

import { Button, Divider } from "@nextui-org/react";

import AOS from 'aos'
import 'aos/dist/aos.css';


function ShowModelsMain({ id, models, className }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang],
    }

    const height_nav = 64 || document.getElementById('nav-main').clientHeight
    const show_default = {
        0: true
    }
    const [modelShow, setModelShow] = useState(show_default)

    const handleExplore = (e) => {
        var i = parseInt(e.target.dataset.i) + 1
        var new_model = { ...modelShow }
        var scroll = 0

        if (i > models.length) {
            new_model = show_default
        } else {
            new_model[i] = true
            const el = document.getElementById(i - 1)
            const coords = el.getBoundingClientRect()
            scroll = coords.bottom + window.scrollY
        }

        setModelShow(new_model)
        window.scrollTo(0, scroll)
    }

    const onObeserve = (i) => {
        const new_model = {}
        for (let k = 0; k < i + 2; k++) {
            new_model[k] = true
        }

        setModelShow(new_model)
    }


    useEffect(() => {
        AOS.init({
            duration: 200,
            delay: 300
        })

        window.scrollTo(0, height_nav)

        const targets = document.querySelectorAll('.to-obrserve');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // if (entry.intersectionRatio >= 0.6) onObeserve(entry.target.dataset.i)
                if (entry.isIntersecting) onObeserve(parseInt(entry.target.dataset.i))

            });
        }, {
            threshold: 0.6
        });
        targets.forEach(target => observer.observe(target));
        // eslint-disable-next-line
    }, [])


    return (
        <main className={context.mainClass + className}>
            <div className={' to-obrserve min-h-[100vh] flex flex-col justify-center items-center !mb-0 '} data-i={0} id={0} data-aos='zoom-in'>

                <h1 className={context.titleClass}>
                    {langText.sections_titles[id]}
                </h1>

                <Button variant='ghost' className={'hover:!bg-amber-600 border-amber-600 text-foreground'} data-i={0} onPress={handleExplore}>
                    {langText.start}
                </Button>
            </div>

            <div className='flex flex-col items-center w-full'>
                {models.map((e, i) =>
                    < article key={(i + 1)} className='to-obrserve w-full flex flex-col items-center justify-between min-h-[100vh] ' data-aos='fade-up' data-i={i + 1} id={i + 1} >
                        <Divider className='w-3/4 max-w-[1200px] my-8' />
                        {modelShow[i] && e}
                        <Divider className='w-3/4 max-w-[1200px] my-8' />

                        <Button className={' bg-amber-600  text-white mb-4'} data-i={i + 1} onPress={handleExplore}>
                            {i + 1 === models.length ? langText.back : langText.next}
                        </Button>
                    </article>
                )}
            </div>

        </main >
    );
}

export default ShowModelsMain;
