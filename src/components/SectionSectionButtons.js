
import { useNavigate, useOutletContext } from "react-router-dom";

import { Button, Image } from "@nextui-org/react";

import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react';


function SectionSectionButtons({ sections }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }

    const navigate = useNavigate()



    useEffect(() => {
        AOS.init({
            duration: 200,
            offset: 100,
            easing: 'ease-in-sine',
        });
    }, [])



    return (
        <section className='flex flex-wrap justify-center gap-4'>
            {sections.map(section =>
                <Button
                    key={section.key}
                    className="bg-content1 rounded-lg p-2 w-[200px] h-[200px] flex flex-col items-center justify-around hover:bg-content2 cursor-pointer shadow-lg border dark:border-0 hover:animate-shake "
                    data-aos="zoom-in-up"
                    onPress={() => {
                        navigate(section.key)
                        window.scroll(0, 0)
                    }}
                >
                    <h1 className='font-semibold text-2xl capitalize'>
                        {langText.sections_titles[section.key]}
                    </h1>

                    <Image
                        src={section.img}
                        alt={langText.imgOf + langText.sections_titles[section.key]}
                        removeWrapper
                        className="w-32 h-32"
                    />
                </Button>
            )}
        </section>
    );
}

export default SectionSectionButtons;
