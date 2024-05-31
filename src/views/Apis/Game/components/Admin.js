
import { getFAPI } from '../../../../libs/fastapi.js';

import { Button } from "@nextui-org/react";

function Admin({ char, setChar, setIsLoading, cleanToast, setTurn, getChar, handleInteraction, default_turn }) {

    const getAdminChar = async () => {
        setIsLoading(true)
        const response = await getFAPI("game/getElementById/" + 1, 'es')
        if (response.bool) setChar(response.value)
        setIsLoading(false)
    }

    const getAllItems = async () => {
        setIsLoading(true)
        const response = await getFAPI("game/getAllItems/", 'es')
        if (response.bool) {
            getChar()
            handleInteraction(response.value, -1)
        }
        setIsLoading(false)
    }

    const test = async () => {
        setIsLoading(true)
        // const form_data = new FormData()
        // form_data.append('num', 3)
        // form_data.append('text', "sdfsdfa")
        // // form_data.append('turn', JSON.stringify({test: "gds"}))
        // // form_data.append('turn', '{test: "gds"}')

        // const data = {
        //     num: 3,
        //     text: "sdfsdfa",
        // }

        const response = await getFAPI("/game", 'es')
        console.log(response)
        setIsLoading(false)
    }


    return (
        <div>
            <Button onClick={test}>
                test
            </Button>
            <div className='flex flex-wrap gap-4 mb-4 border-y'>
                <Button onClick={getAdminChar} color='primary'>admin char</Button>
                <Button onClick={() => {
                    setChar(2)
                    cleanToast()
                }} color='primary'>test char</Button>
                <Button onClick={() => {
                    setChar(false)
                    cleanToast()
                    setTurn(default_turn)
                }} color='primary'>false char</Button>
            </div>

            {typeof char === 'object' && (
                <div className='flex flex-wrap gap-4 mb-4 max-xs:flex-col max-xs:w-full'>
                    <Button
                        onClick={() => console.log(char)}
                    >
                        front
                    </Button>
                    <Button
                        onClick={() => console.log(char.interacting)}
                    >
                        interacting
                    </Button>
                    <Button
                        onClick={getAllItems}
                    >
                        getAllItems
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Admin;
