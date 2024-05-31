
import addLangText from '../../../../../../lang/Apis/Analyze/components/ChangesSection/components/BarSearch.json'
import { useOutletContext } from 'react-router-dom';

import { Button, ButtonGroup, Input, Select, SelectItem } from "@nextui-org/react";


import { Search, Reset } from '../../../../../../assets/icons.js';


function BarSearch({ filters, setFilters, isLoading, cols, onSearch, onReset }) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang],
        search: context.langText[context.lang].search.search,
        currency: context.langText[context.lang].form.currency,
        column: context.langText[context.lang].table.column
    }

    const condSelects = ['==', '!=', '<', '>', '<=', '>=']


    return (
        <div className='mb-2 mt-8 center items-center gap-2 sm:flex-row form-xs'>
            <Input
                className="form-input"
                placeholder={langText.search + "..."}
                variant="bordered"
                size='sm'

                value={filters.text}
                isDisabled={filters.num !== ''}
                onValueChange={e => {
                    setFilters({ ...filters, text: e })
                }}

                isClearable
                onClear={() => {
                    setFilters({ ...filters, text: '' })
                }}
            />

            <Input
                type="number"
                placeholder={langText.condition + "..."}
                variant="bordered"
                size='sm'
                className="form-input"
                endContent={
                    <div className="flex items-center h-full" >
                        <label className="sr-only" htmlFor="currency">
                            {langText.currency}
                        </label>
                        <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small cursor-pointer"
                            id="currency"
                            name="currency"
                            onChange={e => setFilters({ ...filters, cond_simbol: e.target.value })}
                            value={filters.cond_simbol}
                        >
                            {condSelects.map(e => <option key={e}>{e}</option>)}
                        </select>

                        <span role="button" data-filled={Boolean(filters.num)} class="p-2 -m-2 hidden appearance-none select-none opacity-0 data-[filled=true]:opacity-70 hover:!opacity-100 rounded-full outline-none text-medium data-[filled=true]:block transition-opacity motion-reduce:transition-none" onClick={() => setFilters({ ...filters, num: '', cond_simbol: "==" })}>
                            <svg aria-hidden="true" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em">
                                <path d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z" fill="currentColor"></path>
                            </svg>
                        </span>
                    </div>
                }

                value={filters.num}
                isDisabled={filters.text !== ''}
                onValueChange={e => {
                    setFilters({ ...filters, num: e })
                }}
            />

            <Select
                label={langText.column}
                selectionMode="single"
                className="form-select "
                variant="bordered"
                size='sm'

                selectedKeys={filters.cols ? [filters.cols] : []}
                onSelectionChange={e => {
                    const val = e.size ? [...new Set(e)][0] : ''
                    setFilters({ ...filters, cols: val })
                }}
            >
                {cols.map((col) => (
                    <SelectItem key={col} value={col}>
                        {col}
                    </SelectItem>
                ))}
            </Select>

            <ButtonGroup variant="ghost" size='lg' isDisabled={isLoading}>
                <Button
                    isIconOnly
                    isDisabled={filters.text === '' && filters.num === ''}
                    onClick={onSearch}
                >
                    <Search />
                </Button>

                <Button
                    isIconOnly
                    onClick={onReset}
                >
                    <Reset />
                </Button>
            </ButtonGroup>

        </div>
    );
}

export default BarSearch;
