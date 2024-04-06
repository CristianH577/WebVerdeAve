import React from 'react';

import { useOutletContext } from 'react-router-dom';

import CustomTable from '../../components/CustomTable'


function Prices() {
    const context = useOutletContext()
    const langText = {
        ...context.langText[context.lang],
    }

    const data = {
        "cols": [
            "category",
            "job",
            "price",
            "detail",
        ],
        "labels": {
            "category": "Categoria",
            "job": "Nombre",
            "price": "Precio",
            "detail": "Detalle",
        },
        "rows": [
            {
                "category": "Diseño Web",
                "job": "Landing Page",
                "price": '$20-60mil',
                "detail": "-",
                "id": 0
            },
            {
                "category": "Diseño Web",
                "job": "Secciones",
                "price": '$40-90mil',
                "detail": "Hasta 4 secciones.",
                "id": 1
            },
            {
                "category": "API",
                "job": "Simple",
                "price": '$20-40mil',
                "detail": "-",
                "id": 2
            },
            {
                "category": "API",
                "job": "Modelos",
                "price": '$50-100mil',
                "detail": "Hasta 4 modelos.",
                "id": 3
            },
            {
                "category": "Diseño Grafico",
                "job": "Modelos 3D Simples",
                "price": '$5-20mil',
                "detail": "-",
                "id": 4
            },
            {
                "category": "Diseño Grafico",
                "job": "Modelos 3D",
                "price": '$20-35mil',
                "detail": "Complejidad Media.",
                "id": 5
            },
            {
                "category": "Diseño Grafico",
                "job": "Tarjetas Personalizadas",
                "price": '$5-12mil',
                "detail": "-",
                "id": 6
            },
            {
                "category": "Diseño Grafico",
                "job": "Logos",
                "price": '$5-20mil',
                "detail": "-",
                "id": 7
            },
            {
                "category": "Diseño Grafico",
                "job": "Etiquetas",
                "price": '$20-50mil',
                "detail": "-",
                "id": 8
            },
            {
                "category": "Otros",
                "job": "Recuperacion de Discos",
                "price": '$2.5mil/50gb',
                "detail": "Discos duros con problemas de software. Conexion SATA.",
                "id": 9
            },
            {
                "category": "Otros",
                "job": "Clases de Programacion",
                "price": '$2mil/h',
                "detail": "Virtuales. Programacion basica/media.",
                "id": 10
            },
            {
                "category": "Otros",
                "job": "Mejora de Audio",
                "price": '$100/archivo',
                "detail": "Mejora de calidad.",
                "id": 11
            },
            {
                "category": "Diseño Grafico",
                "job": "Catalogo",
                "price": '$2-6mil/articulo',
                "detail": "-",
                "id": 12
            },
            {
                "category": "Otros",
                "job": "Consultar",
                "price": 'GRATIS',
                "detail": "Consultar trabajos no listados.",
                "id": 13
            },
        ],
    }

    return (
        <main className={context.mainClass}>

            <div className={context.titleClass}>
                {langText.sections_titles.prices}
            </div>

            <CustomTable
                data={data}
                preferences={{
                    checks: ['headers', '', 'sort', 'single'],
                }}
                sortDefault={{
                    column: 'category',
                    direction: 'ascending',
                }}
                color={'success'}
            />

        </main>
    );
}

export default Prices;
