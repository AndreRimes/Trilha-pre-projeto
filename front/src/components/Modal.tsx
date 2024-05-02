import { useModal } from "@/context/ModalContext"
import { useTheme } from "@/context/themeContext";
import { useTodo } from "@/context/todoContext";
import { Tag } from "@/types/types";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import delIcon from "../../public/delete.png"
import delIconWhite from "../../public/deleteWhite.png"

export default function Modal() {
    const { index, setShowModal } = useModal();
    const { addTag, todos, removeTag } = useTodo();
    const {isDarkMode} = useTheme();
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            title: tag,
        }
        try{
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/tag", data)
            const r = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/tag/" + res.data.id + "/add-todo/" + todos[index].id) 
            console.log(res.data)
            addTag(index, res.data);
            setShowModal(false);
        }catch(e){
            console.error(e);
        }
    }

    const handleAddTag = async (t: Tag, isAdd: boolean) => {
        try{
            if (isAdd) {
                const r = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/tag/" + t.id + "/add-todo/" + todos[index].id);
                addTag(index, t);
            }else{
                const r = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/tag/" + t.id + "/remove-todo/" + todos[index].id);
                removeTag(index, t);
            }
        }catch(e){
            console.error(e);
        }
    }

    const handleDelete = async (t: Tag, index: number) => {
        try{
            const res =  await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/tag/" + t.id);
            const newTags = tags.filter((a: Tag) => a.id !== t.id);
            setTags(newTags);
            if(todos[index]?.tags?.map((d) => d?.id).includes(t?.id)){
                removeTag(index, t)
            }
        }catch(e){
            console.error(e);
        }
        
    }

    useEffect(() => {
        const fetchTags = async () => {
            try{
                const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/tag")
                setTags(res.data)
            }catch(e){
                console.error(e);
            } 
        }
        fetchTags();
    },[])

    return (
        <div onClick={() => setShowModal(false)} className="fixed top-0 left-0 h-full w-full
         bg-black/70 flex items-center justify-center z-10">
            <div onClick={(e) => e.stopPropagation()}
                className={`h-[50vh] w-2/3 flex items-center justify-center`}>
                <button className="btn btn-sm btn-circle btn-ghost absolute
                 right-2 top-2" onClick={() => setShowModal(false)}>✕</button>

                <div className="flex flex-col w-full h-full lg:flex-row">
                    <div className={`w-1/2 h-full card ${isDarkMode ?  'bg-base-300' : "bg-primary text-black" } rounded-box place-items-center`}> 
                        <form className="flex flex-col items-center justify-evenly w-2/3 h-full" onSubmit={(e) => handleSubmit(e)}>
                            <h1 className="text-lg">Crie uma nova Tag</h1>
                            <div className={`w-full font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                <h3 className="p-1">Tag: </h3>
                                <input className={`w-full bg-inherit py-3 rounded-md px-4 border-2 ${isDarkMode ? 'border-darkSecundary' :
                                    'border-secundary '}`} type="text" placeholder="Tag: " value={tag} onChange={(e) => setTag(e.target.value)} />
                            </div>
                            <button className={`btn text-black w-1/2 ${isDarkMode ? 'bg-darkSecundary border-darkSecundary hover:bg-darkSecundary' :
                                'bg-secundary border-secundary hover:bg-secundary'}`}
                                disabled={tag.length < 2}>Criar Tag</button>
                        </form>
                        
                    </div>
                    <div className="divider lg:divider-horizontal">Ou</div>

                    <div className={`w-1/2 h-full card bg-base-300  ${isDarkMode ? 'bg-base-300' : "bg-primary text-black"} rounded-box flex  items-center justify-center`}>
                        <div className="w-full h-[70%] overflow-y-auto flex flex-col items-center">
                            {tags && tags?.map((t: Tag, i) => {
                                return (
                                    <div className={`flex w-2/3 flex-row
                                    mt-2 kbd h-[15%] items-center py-2 border-${isDarkMode ? 'darkSecundary' : 'secundary'}
                                    bg-${isDarkMode ? 'darkPrimary' : 'primary'} justify-between`} key={i}>
                                        <div className="flex flex-row">
                                            <input onClick={() => handleAddTag(t, !todos[index]?.tags?.map((d) => d?.id).includes(t?.id))} type="checkbox" checked={todos[index]?.tags?.map((d) => d?.id)?.includes(t?.id)} className={`checkbox border-${isDarkMode ? 'darkSecundary' : 'secundary'}`} />
                                            <h1 className="text-lg px-2">{t.title}</h1>
                                        </div>

                                        <Image onClick={() => handleDelete(t, index)} src={isDarkMode ? delIconWhite : delIcon}
                                            alt="delete icon" width={19} height={19} className="cursor-pointer" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
