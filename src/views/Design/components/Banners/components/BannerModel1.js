

function BannerModel1() {

    function SvgBanner({ className, size, width, height, fill, stroke, ...props }) {

        const panels_fill = "fill-content1/60"

        return <svg
            stroke="currentColor"
            className={"stroke-divider " + className}
            viewBox="0 0 16 16"
            width={size || width || 16}
            height={size || height || 16}
            strokeWidth={.1}
        >
            <polyline
                points="4,-1 8,4 0,18"
                className={panels_fill}
            />

            <polyline
                points="3,3 10,17 0,17"
                className={panels_fill}
            />

            <polyline
                points="2,6 7.5,17 0,17"
                className={panels_fill}
            />

            <polyline
                points="1.2,10 5,17 0,17"
                className={panels_fill}
            />

            <polyline
                points="-1,-1 4,-1 .3,17 0,17"
                className='stroke-1 fill-content1 stroke-rose-800'
            />
        </svg>
    }


    return (
        <div className={"flex w-screen max-w-[800px] relative max-sm:flex-col max-sm:max-w-[360px] max-sm:h-[600px] bg-content3 min-[800px]:rounded-lg xs:rounded-lg sm:rounded-none border border-divider"}>
            <div className="flex gap-8 py-2 px-4 w-2/3 bg-content1 max-sm:flex-col max-sm:items-center max-sm:w-full max-sm:justify-center max-sm:h-1/2">
                <div className="uppercase text-5xl">
                    <h1 className={"font-bold text-rose-800"}>
                        Banner
                    </h1>
                    <p className="text-neutral-500">
                        Plantilla
                    </p>
                </div>

                <div className="w-auto text-center text-neutral-400 flex items-center ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
            </div>

            <SvgBanner className='absolute h-full w-auto sm:left-2/3 max-sm:rotate-90 max-sm:top-[45%] max-sm:h-[100vw] max-sm:max-h-[360px] max-sm:w-fit' fill='fill-content1' />

            <div className="w-1/3 bg- flex items-center justify-end uppercase text-2xl pe-8 max-sm:w-full max-sm:justify-center max-sm:h-1/2 max-sm:items-center">
                Contenido
            </div>

            <span className={"absolute right-0 bottom-0 m-2 rounded-md px-2 w-16 text-center shadow-md shadow-content3 text-sm bg-rose-400 dark:bg-rose-800"}>
                Span
            </span>
        </div>
    );
}

export default BannerModel1;
