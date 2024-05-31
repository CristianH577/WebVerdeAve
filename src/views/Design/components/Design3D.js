
import { useState } from "react";

import { Image } from "@nextui-org/react";


function Design3D({ title_class }) {

    const context3D = require.context('../../../assets/imgs/design/3d', true)

    const [show3D, setShow3D] = useState(false)

    return (
        <section>
            <h1 className={title_class}>Diseño 3D</h1>

            <span className="text-center">
                <p className="text-sm text-neutral-400 ">Presione las imagenes para ver modelo</p>
            </span>

            <article className='flex flex-wrap justify-center gap-8 p-2'>
                {['dino', 'rex', 'broochH', 'broochM'].map((e, i) => {
                    const img = context3D(`./${e}.webp`) || null
                    const video = null || context3D(`./${e}.mp4`)
                    // const webm = context3D(`./${e}.webm`) || null
                    return <div key={`3d-${i + 1}`}>
                        <Image
                            alt={`3d-${i + 1}`}
                            src={img}
                            removeWrapper
                            className='w-full xs:max-w-[250px] max-xs:rounded-none cursor-pointer'
                            onClick={() => setShow3D(i + 1)}
                            hidden={show3D && show3D === i + 1}
                        // onClick={e => e.target.src = webm}
                        />

                        {show3D === i + 1 &&
                            <video
                                alt={`3d-video-${i + 1}`}
                                width="250"
                                height="360"
                                autoPlay loop
                                preload="metadata"
                                className="w-full xs:rounded-xl xs:max-w-[250px]"
                            // hidden={show3D !== i + 1}
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        }
                    </div>
                })}
            </article>
        </section>
    );
}

export default Design3D;
