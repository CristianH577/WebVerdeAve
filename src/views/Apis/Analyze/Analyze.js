import React from 'react';
import './Analyze.css'
import { useState, useEffect } from 'react';

import addLangText from '../../../lang/Apis/Analyze/Analyze.json'
import { useOutletContext } from 'react-router-dom';

import { Tabs, Tab } from "@nextui-org/react";
import { Tooltip, Button } from "@nextui-org/react";

import UploadData from './UploadSection';
import ShowSection from './ShowSection';
import ProcessSection from './ProcessSection';
import ChangesSection from './ChangesSection';
import GraphsSection from './GraphsSection';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Download } from '../../../assets/icons';


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
        <main className={context.mainClass + ' mt-0'}>
            <div className='notice bg-custom opacity-50 shadow hover:opacity-100 mb-4'>
                <div className='wrapper'>
                    <div className='content text-danger'>
                        {langText.notice.map((e, i) =>
                            <div key={i}>{e}</div>
                        )}
                    </div>
                </div>
            </div>

            <div className={context.titleClass}>
                {langText.sections_titles.analyze}
            </div>

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
                            <Download size={24} />
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


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={context.dark ? 'dark' : 'light'}
            />

        </main>
    );
}

export default Analyze;
