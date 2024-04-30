'use client'
import TodoInput from "@/components/TodoInput";
import Todos from "@/components/Todos";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/footer";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Notification from "@/components/Notification";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/themeContext";
import ThemeSelector from "@/components/ThemeSelector";
import { useModal } from "@/context/ModalContext";
import Modal from "@/components/Modal";
import axios from "axios";
import { useTodo } from "@/context/todoContext";

export default function Home() {
  const [notf, setNotf] = useState(false);
  const {isDarkMode} = useTheme();
  const {showModal} = useModal();
  const { setTodos } = useTodo()

  useEffect(()=>{
    async function fetchData() {
      try{
        const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/todo")
        setTodos(res?.data)
      }catch(e){
        console.error(e);
      }
    }

    fetchData();
  },[])


  return (
    <div className={`top-0 left-0 w-screen h-screen
       flex items-center justify-center ${isDarkMode ? 'bg-darkPrimary' : 'bg-primary'} `}>
      {notf && <Notification setNotf={setNotf} />}
      {showModal && <Modal/> }
      <ThemeSelector/>
      <div className={`w-[90vw] h-[75vh] md:w-[35vw] sm:w-[40vw] md:h-[80vh] border-2 
      border-${isDarkMode ? 'darkSecundary' : 'secundary'} rounded-xl p-2`}>
        <TodoInput setNotf={setNotf} />
        <ProgressBar />
        <DndProvider backend={HTML5Backend}>
          <Todos />
        </DndProvider>
        <Footer />
      </div>
    </div>
  );
}
