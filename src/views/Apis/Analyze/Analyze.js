
import './Analyze.css'
import { useState, useEffect } from 'react';

import addLangText from '../../../lang/Apis/Analyze/Analyze.json'
import { useOutletContext } from 'react-router-dom';

import { Tabs, Tab } from "@nextui-org/react";
import { Tooltip, Button } from "@nextui-org/react";

import UploadData from './components/UploadSection.js';
import ShowSection from './components/ShowSection.js';
import ProcessSection from './components/ProcessSection.js';
import ChangesSection from './components/ChangesSection/ChangesSection.js';
import GraphsSection from './components/GraphsSection.js';

import { TbFileDownload } from "react-icons/tb";



function Analyze() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }


    const [data, setData] = useState(false)

    const tabs = [
        {
            key: 'upload',
            content: <UploadData setData={setData} />,
        },
        {
            key: 'show',
            content: <ShowSection data={data} />,
        },
        {
            key: 'changes',
            content: <ChangesSection data={data} setData={setData} />,
        },
        {
            key: 'analyze',
            content: <ProcessSection data={data} />,
        },
        {
            key: 'graph',
            content: <GraphsSection data={data} />,
        },
    ]

    const tabDisabledDefault = tabs.reduce((prev, val, i) => {
        if (i !== 0) prev.push(val.key)
        return prev
    }, [])
    const [tabDisabled, setTabDisabled] = useState(tabDisabledDefault)


    const handleDownload = () => {
        const newName = data.name.split('.')[0] + '_' + langText.edited + '.csv'
        const csvStringObject = data.cols.join(',') + '\n' + data.rows.map(row => Object.values(row).join(',')).join('\n');

        const element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(csvStringObject));
        element.setAttribute('download', newName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }


    useEffect(() => {
        data ? setTabDisabled([]) : setTabDisabled(tabDisabledDefault)
        // eslint-disable-next-line
    }, [data])


    return (
        <>
            <div className='notice bg-content3 opacity-50 shadow hover:opacity-100 mb-8 '>
                <div className='wrapper'>
                    <div className='content text-danger dark:text-warning'>
                        {langText.notice.map((e, i) =>
                            <div key={i}>{e}</div>
                        )}
                    </div>
                </div>
            </div>

            <main className={context.mainClass + ' mt-0'}>


                <h1 className={context.titleClass}>
                    {langText.sections_titles.analyze}
                </h1>


                <div className='font-semibold text-2xl flex '>
                    {langText.data}: {data.name}
                    {data.edited && (
                        <>
                            <Tooltip content={langText.tool_tip} className={context.dark ? 'dark text-foreground' : ''}>
                                <div className='cursor-default'>*</div>
                            </Tooltip>

                            <Button
                                isIconOnly
                                color='success'
                                size='sm'
                                variant='light'
                                className='ms-1'
                                onClick={handleDownload}
                            >
                                <TbFileDownload size={24} />
                            </Button>
                        </>
                    )}
                </div>


                <Tabs
                    color='primary'
                    aria-label={langText.tabs_aria}
                    className='mt-4'
                    disabledKeys={tabDisabled}
                    classNames={{
                        panel: 'max-[360px]:px-0 w-full ',
                        base: 'max-[360px]:w-full ',
                        tabList: 'p-2 flex-col w-full sm:flex-row sm:w-auto max-[360px]:rounded-none max-[360px]:px-0',
                        tab: ' max-[360px]:rounded-none ',
                        cursor: ' max-[360px]:rounded-none',
                    }}
                >
                    {tabs.map(tab =>
                        <Tab key={tab.key} title={langText.tabs[tab.key]} >
                            {tab.content}
                        </Tab>
                    )}
                </Tabs>

            </main>
        </>
    );
}

export default Analyze;
