
import TarjetaModel1 from "./components/TarjetaModel1";
import TarjetaModel2 from "./components/TarjetaModel2";


function Tarjetas({ title_class }) {


    return (
        <div className="w-full">
            <h1 className={title_class}>Tarjetas</h1>

            <div className='flex flex-wrap justify-center items-center gap-8'>
                <TarjetaModel1 />
                <TarjetaModel2 />
            </div>
        </div>
    );
}

export default Tarjetas;
