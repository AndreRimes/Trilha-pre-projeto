'use client'
import { FormEvent, useState } from "react";
import { useTodo } from "@/context/todoContext";
import { useTheme } from "@/context/themeContext";
import axios from "axios";

export default function TodoInput({ setNotf }: { setNotf: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { isDarkMode } = useTheme()
    const [todoText, setTodoText] = useState('');
    const { addTodo } = useTodo();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            title : todoText,
        }
        try{
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/todo", data)
            console.log(res.data);
            addTodo(res.data)
            setNotf(true);
            setTodoText('')
        }catch(e){
            console.error(e);
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="w-full h-[15%] flex flex-row items-center justify-around ">
            <input type="text" placeholder="Todo: " className={`h-1/3 w-2/3 border-2
              border-${isDarkMode ? 'border-darkSecundary bg-darkPrimary text-white' : 'border-secundary bg-primary text-black'} 
              font-semibold rounded-md py-5 px-2 `}
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)} />
            <button className={`btn btn-primary ${isDarkMode ? 'bg-darkSecundary hover:bg-darkSecundary' :
                'bg-secundary hover:bg-secundary'} w-1/4 border-none`}
                disabled={todoText.length < 3 || todoText.length > 30}
            >ADD Todo</button>
        </form>
    )
}