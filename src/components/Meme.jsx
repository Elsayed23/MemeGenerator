import React from 'react';
import GeneratorButton from './GeneratorButton';
import axios from 'axios';
import { Helmet } from 'react-helmet';


export default function Form() {

    const [memeImage, setMemeImage] = React.useState({
        memeurls: [],
        url: "https://i.imgflip.com/1bgw.jpg",
        topMeme: "",
        bottomMeme: ""
    })


    async function getMemes() {
        const { data } = await axios.get('https://api.imgflip.com/get_memes')
        const { memes } = data.data
        setMemeImage(prev => {
            return {
                ...prev,
                memeurls: memes,
            }
        })
    }

    React.useEffect(() => {
        getMemes()
    }, [])


    function RandomImage() {
        let memes = memeImage.memeurls
        let randomNumOfUrls = Math.floor(Math.random() * memes.length)
        setMemeImage(prevData => {
            return {
                ...prevData,
                url: memes[randomNumOfUrls].url,
            }
        })
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMemeImage(prevData => {
            return {
                ...prevData,
                [name]: value,
            }
        })
    }


    return (
        <>
            <Helmet title='Memes Generator' />
            <div className='form p-12 flex gap-4 flex-wrap justify-center'>

                <input type="text"
                    placeholder='top-meme'
                    onChange={handleChange}
                    name='topMeme'
                    value={memeImage.topMeme}
                    className='top--meme rounded-md focus:outline-none flex-grow basis-64 flex-shrink-0 border px-4 py-1'
                />
                <input type="text"
                    placeholder='bottom-meme'
                    onChange={handleChange}
                    name='bottomMeme'
                    value={memeImage.bottomMeme}
                    className='bottom--meme rounded-md focus:outline-none flex-grow basis-64 flex-shrink-0 border px-3 py-1'
                />
                <GeneratorButton random={RandomImage} />

            </div>
            <div className="ps-4 pe-4 relative">
                <h3 className='memeText absolute text-center left-1/2 -translate-x-1/2 text-3xl uppercase text-white tracking-normal top-0 m-0 meme-top'>
                    {memeImage.topMeme}
                </h3>
                {memeImage.url && <img src={memeImage.url} className='max-w-[400px] h-[400px] mx-auto' alt="" />}
                <h3 className='memeText absolute text-center left-1/2 -translate-x-1/2 text-3xl uppercase text-white tracking-normal bottom-0 m-0 meme-bottom'>
                    {memeImage.bottomMeme}
                </h3>
            </div>
        </>
    )
}