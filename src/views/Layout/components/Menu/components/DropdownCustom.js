
import { Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";

import { BsCaretDownFill } from "react-icons/bs";


function DropdownCustom({ item, icons, location, langText, navigate, isDropdownOpen, darkMode, sub_menus, setIsDropdownOpen }) {

    const handleDropdown = (e, name) => {
        var set = name
        if (!e) set = false
        setIsDropdownOpen(set)
    }

    return (
        <Dropdown
            className={(darkMode ? 'dark' : '')}
            isOpen={isDropdownOpen === item}
            name={item}
            onOpenChange={e => handleDropdown(e, item)}
        >
            <DropdownTrigger className=" min-w-unit-1 !w-[24px] hover:text-warning">
                <Button
                    disableRipple
                    className="p-0 min-w-0 ps-2 bg-transparent"
                    isIconOnly
                >
                    <BsCaretDownFill size={16} className={(isDropdownOpen === item ? '-rotate-180 transition-all' : '')} />
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                aria-label={langText.menu_of + langText.menu_items[item].label}
                className=" dark:text-white "
            >
                {sub_menus[item].map(sub =>
                    <DropdownItem
                        key={sub}
                        description={langText.sub_menus[item][sub].desc}
                        onClick={() => navigate('/' + item + '/' + sub)}
                        className={location.pathname.includes(sub) ? 'bg-primary-100' : ''}
                        startContent={icons[sub]}
                    >
                        {langText.sub_menus[item][sub].label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

export default DropdownCustom;
