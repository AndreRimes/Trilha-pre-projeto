import { useState, useEffect } from 'react';
import Image from "next/image";
import check from "../../public/check-mark (1).png";
import checkWhite from "../../public/check-mark white.png"
import { useTheme } from '@/context/themeContext';

interface Props {
    setNotf: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notification: React.FC<Props> = ({ setNotf }) => {
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const {isDarkMode} = useTheme()


    useEffect(() => {
        const id = setTimeout(() => {
            setNotf(false);
        }, 3000); 
        setTimerId(id);

        return () => {
            if (timerId) clearTimeout(timerId);
        };
    }, [setTimerId, setNotf, timerId]);

    const handleClose = () => {
        if (timerId) clearTimeout(timerId);
        setNotf(false);
    };

    return (
        <div className={`absolute -translate-y-[45vh] ${isDarkMode ? 'border-darkSecundary text-white': 'border-secundary text-black'}  border-2 rounded-lg flex flex-row
         items-center justify-around w-[80vw] sm:w-[55vw] md:w-[22vw] h-[4vh]   py-5 px-2  transition-all`}>
            <Image src={isDarkMode ? checkWhite : check} alt="check icon" width={20} height={20} />
            <h1 className="text-lg">Novo Todo adicionado</h1>
            <h1 onClick={handleClose} className=" font-bold text-lg cursor-pointer">X</h1>
        </div>
    );
};

export default Notification;
