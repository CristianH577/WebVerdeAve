
import addLangText from '../../../../lang/Web/Showroom.json'
import { useOutletContext } from 'react-router-dom';


import { Input, Button, ButtonGroup } from '@nextui-org/react';

import { Search, Reset } from '../../../../assets/icons.js';
import { BsGrid, BsList } from "react-icons/bs";



function SearchBar({ handleSearch, setPreferences, preferences, onOpen, total, handleSort, handleReset }) {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
        ...addLangText[context.lang]
    }

    const icons = {
        Search: <Search />,
        Reset: <Reset />
    }


    return (
        <section className='w-full max-w-[500px]'>
            <div className='flex max-xs:flex-col gap-2 xs:items-center'>
                <Input
                    type='search'
                    classNames={{
                        inputWrapper: "max-xs:rounded-none max-xs:border-x-0",
                    }}
                    placeholder={langText.search.search + '...'}
                    endContent={<span className='cursor-pointer hover:text-warning' onClick={handleSearch}>{icons.Search}</span>}
                    variant="bordered"

                    name='search'
                    value={preferences.search}
                    onValueChange={e => setPreferences && setPreferences({ ...preferences, search: e })}
                    onKeyUp={e => {
                        if (e.key === 'Enter') handleSearch && handleSearch()
                    }}
                />

                <ButtonGroup>
                    <Button
                        color='primary'
                        onPress={onOpen || null}
                    >
                        {langText.search.filters}
                    </Button>
                    <Button
                        isIconOnly
                        onClick={handleReset}
                    >
                        {icons.Reset}
                    </Button>
                </ButtonGroup>
            </div>

            <div className="flex justify-between items-center px-4 mt-2  flex-wrap">
                <span className="text-default-400 text-md"> {langText.search.total + ': ' + total}</span>

                <div className='flex items-center'>
                    <Button
                        className="text-default-400 text-md px-0"
                        size='sm'
                        variant='transparent'
                        onClick={handleSort}
                    >
                        {langText.search.order}: <span className='text-xl'>{preferences.orderUp ? '↓' : '↑'}</span>
                    </Button>

                    <Button
                        className="text-default-400 "
                        isIconOnly
                        size='sm'
                        variant='transparent'
                        onClick={() => setPreferences && setPreferences({ ...preferences, list: !preferences.list })}
                    >
                        {preferences.list ? <BsGrid size={20} /> : <BsList size={24} />}
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;
