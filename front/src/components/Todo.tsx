import { Tag, Todo } from "@/types/types"
import { useTodo } from "@/context/todoContext"
import { useState, useRef } from "react";
import Image from "next/image";
import delIcon from "../../public/delete.png"
import delIconWhite from "../../public/deleteWhite.png"
import addIcon from "../../public/more.png";
import addIconWhite from "../../public/moreWhite.png"
import { useDrop, useDrag } from "react-dnd";
import { useTheme } from "@/context/themeContext";
import { useModal } from "@/context/ModalContext";
import TagComponent from "./Tag";
import axios from "axios";


interface props {
    todo: Todo;
    index: number;
    moveTodo: (dragIndex: number, hoverIndex: number) => void;
}

export default function TodoComponent({ todo, index, moveTodo }: props) {
    const { checkTodo, deleteTodo } = useTodo();
    const {isDarkMode} = useTheme()
    const [hover, setHover] = useState(false);
    const {setShowModal, setIndex} = useModal()

    const ref = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop({
        accept: 'todo',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover(item: any, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset: any = monitor.getClientOffset()

            const hoverClientY = (clientOffset).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveTodo(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'todo',
        item: () => {
            return { index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))
    const handleClick = () => {
        setShowModal(true);
        setIndex(index)
    }

    async function handleDelete(index: number) {
        try{
            const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/todo/${todo.id}`)
            deleteTodo(index);
        }catch(e){
            console.error(e); 
        }
    }

    async function handleCheck(index:number) {
        try {
            const res = await axios.patch(process.env.NEXT_PUBLIC_API_URL + `/todo/${todo.id}`)
            checkTodo(index);
        } catch (e) {
            console.error(e);
        } 
    }

    return (
        <div className={`flex w-[95%] flex-col
          mt-2 kbd h-[15%] min-h-[15%] items-start py-2 border-${isDarkMode ? 'darkSecundary' : 'secundary'}
        bg-${isDarkMode ? 'darkPrimary' : 'primary'} hover:h-[30%] justify-between transition-all ml-1 ${isDragging ? 'opacity-40' : ''}`}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            ref={ref}
            data-handler-id={handlerId}
            key={index}>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row">
                    <input onClick={() => handleCheck(index)} type="checkbox" checked={todo.completed} className={`checkbox border-${isDarkMode ? 'darkSecundary' : 'secundary'}`} />
                    <p className={`ml-2 font-semibold text-${isDarkMode ? 'white' : 'black'}`}>{todo.title}</p>
                </div>
                <Image onClick={() => handleDelete(index)} src={isDarkMode ? delIconWhite : delIcon}
                    alt="delete icon" width={19} height={19} className="cursor-pointer" />
            </div>
            {hover && <div className="flex flex-row items-center justify-evenly">
                <p className="font-bold px-2">tags: </p>
                    {todo.tags && todo.tags.map((tag: Tag, index: number) => {
                        return (
                            <TagComponent key={index} tag={tag} index={index} />
                        )
                    })}
                <Image onClick={() => handleClick()} className="p-1 cursor-pointer" src={isDarkMode ? addIconWhite : addIcon} alt="add Icon" width={24} height={24} />
            </div>}
        </div>
    )

}