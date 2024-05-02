
import addLangText from '../../../../../../lang/Apis/Analyze/components/ChangesSection/components/BarSearch.json'
import { useOutletContext } from 'react-router-dom';

import { Button, ButtonGroup, Input, Select, SelectItem } from "@nextui-org/react";


import { Search, Reset } from '../../../../../../assets/icons';


function BarSearch({ filters, setFilters, isLoading, cols, onSearch, onReset }) {
    const context = useOutletContext()
    const langText = {
        ...addLangText[context.lang],
        search: context.langText[context.lang].search.search,
        currency: context.langText[context.lang].form.currency,
        columns: context.langText[context.lang].table.columns
    }

    const condSelects = ['==', '!=', '<', '>', '<=', '>=']


    return (
        <div className='mb-2 mt-8 center items-center gap-2 sm:flex-row form-xs'>
            <Input
                className="form-input"
                placeholder={langText.search + "..."}
                variant="bordered"
                size='sm'
                classNames={{
                    inputWrapper: "rounded-lg ",
                }}

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
                label={langText.condition}
                variant="bordered"
                size='sm'
                className="form-input "
                classNames={{
                    label: 'text-neutral-400 font-normal ',
                }}
                endContent={
                    <div className="flex items-center h-full">
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
                    </div>
                }

                value={filters.num}
                isDisabled={filters.text !== ''}
                onValueChange={e => {
                    setFilters({ ...filters, num: e })
                }}
            />

            <Select
                label={langText.columns}
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
