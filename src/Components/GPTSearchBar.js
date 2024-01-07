import { lang } from "../Utils/languageConstants"
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
    const language = useSelector((store) => store.config.lang);


    return (
        <div className='pt-[10%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12 rounded-2xl opacity-90'>
                <input className='p-4 m-4 col-span-9 rounded-lg'
                    type="text" placeholder={lang[language].gptSearchPlaceholder}
                />
                <button className='col-span-3 px-4 py-4 m-4 text-lg bg-red-700 text-white rounded-lg'>
                    {lang[language].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar