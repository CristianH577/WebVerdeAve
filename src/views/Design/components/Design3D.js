
import { useState } from "react";

import { Image } from "@nextui-org/react";


function Design3D({ title_class }) {

    const images = require.context('../../../assets/imgs/design/3d', true);
    const videos = require.context('../../../assets/videos', true);

    const [show3D, setShow3D] = useState(false)

    const items = images.keys().map(image => {
        const id = image.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '')
        const src = images(image)

        return {
            id: id,
            src: src
        }
    })

    return (
        <section>
            <h1 className={title_class}>Diseño 3D</h1>

            <span className="text-center">
                <p className="text-sm text-neutral-400 ">Presione las imagenes para ver modelo</p>
            </span>

            <article className='flex flex-wrap justify-center gap-8 p-2'>
                {items.map((item, i) => {
                    const video = null || videos(`./${item.id}.mp4`)
                    return <div key={`3d-${i + 1}`}>
                        <Image
                            alt={`3d-${i + 1}`}
                            src={item.src}
                            removeWrapper
                            className='w-full xs:max-w-[250px] max-xs:rounded-none cursor-pointer'
                            onClick={() => setShow3D(i + 1)}
                            hidden={show3D && show3D === i + 1}
                        />

                        {show3D === i + 1 &&
                            <video
                                alt={`3d-video-${i + 1}`}
                                width="250"
                                height="360"
                                autoPlay loop
                                preload="metadata"
                                className="w-full xs:rounded-xl xs:max-w-[250px]"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        }
                    </div>

                }
                )}
            </article>
        </section>
    );
}

export default Design3D;
