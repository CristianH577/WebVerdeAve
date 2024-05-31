import { useState } from 'react';

import addLangText from '../../../lang/Web/Galeries/Galeries.json'
import { useOutletContext } from 'react-router-dom';

import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import MakeGalery from './components/MakeGalery.js'


function Galeries() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const modeloDefault = {
        design: 'none',
        display: 'grid',
        pagination: 'pages',
        results: '4',
    }

    const [modelo, setModelo] = useState(modeloDefault)
    const [data] = useState({
        totalArticles: 30,
        articles: Array.from(Array(30), (x, i) =>
            x = {
                key: i + 1,
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.',
            }
        ),
    })

    const [content, setContent] = useState(null)
    const [loadingContent, setLoadingContent] = useState(false)


    const selectsGalleries = [
        {
            key: 'design',
            items: ["none", "button", "label", "card", "table"],
        },
        {
            key: 'display',
            items: ["grid", "list", "slider"],
        },
        {
            key: 'pagination',
            items: ["none", "pages", "solicitude", "infinite"],
        },
        {
            key: 'results',
            items: ["10", "1", "2", "3", "4", "5"],
        },
    ]


    const handleSelects = (selectKey, key) => {
        if (key.currentKey) {
            const newModelo = { ...modelo }

            newModelo[selectKey] = key.currentKey

            if (selectKey === 'design') {
                if (key.currentKey === 'table') newModelo.display = 'list'
            }

            setModelo(newModelo)
        }
    }

    const NewGalery = () => {
        setLoadingContent(true)
        setContent(<MakeGalery data={data} model={modelo} />)
        setTimeout(() => {
            setLoadingContent(false)
        }, 200);
    }


    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.galeries}
            </div>

            {/* selects */}
            <section className='mb-8 text-center w-full'>
                <div className='flex max-[360px]:flex-col gap-2 justify-center flex-wrap items-center'>
                    {selectsGalleries.map((select) =>
                        <Select
                            key={select.key}
                            label={langText.selectsGalleries[select.key].label}
                            className="min-[360px]:max-w-[200px] "
                            classNames={{
                                trigger: 'capitalize max-[360px]:rounded-none',
                                popoverContent: (context.dark ? 'dark text-foreground' : ''),
                            }}
                            selectedKeys={
                                select.key === 'display'
                                    ? modelo.design === 'table' ? ['list'] : [modelo[select.key]]
                                    : [modelo[select.key]]
                            }
                            isDisabled={select.key === 'display' && modelo.design === 'table'}

                            onSelectionChange={(key) => handleSelects(select.key, key)}
                        >
                            {select.items.map(item => (
                                <SelectItem key={item} >
                                    {select.key === 'results' ? item : langText.selectsGalleries[select.key].items[item]}
                                </SelectItem>
                            ))}
                        </Select>
                    )}

                </div>

                <Button
                    color='secondary'
                    variant='shadow'
                    size='lg'
                    onPress={NewGalery}
                    isLoading={loadingContent}
                    className='mt-2 max-[360px]:w-full max-[360px]:rounded-none '
                >
                    {langText.showGalerie}
                </Button>
            </section>

            {!loadingContent && content}

        </main>
    );
}

export default Galeries;
