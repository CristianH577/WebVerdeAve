
import MenuModel1 from "./components/MenuModel1";
import MenuModel2 from "./components/MenuModel2";
import MenuModel3 from "./components/MenuModel3";


function Menus({ title_class }) {


    return (
        <div>
            <h1 className={title_class}>Menus</h1>

            <div className='flex flex-wrap justify-center items-center gap-8'>
                <MenuModel1 />
                <MenuModel2 />
                <MenuModel3 />
            </div>
        </div>
    );
}

export default Menus;
