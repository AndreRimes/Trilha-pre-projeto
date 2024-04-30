import { useTheme } from "@/context/themeContext";
import { useTodo } from "@/context/todoContext";

export default function Footer() {
    const { todos, filter, setFilter, cleanCompleted } = useTodo();
    const {isDarkMode} = useTheme();

    return (
        <div className={`mt-3 w-full text-${isDarkMode ? "white": 'black'} text-sm
         flex flex-row items-center justify-around`}>
            <div className="w-1/4 mr-1 ">
                <h3 className="whitespace-nowrap"> {todos.filter(todo => !todo.completed).length} Restantes</h3>
            </div>
            <div className="w-2/4 flex flex-row justify-between">
                <h3 className={`cursor-pointer transition-all
                 ${filter === '' && 'underline'} hover:underline`} onClick={() => setFilter('')}>Tudo</h3>
                <h3 className={`${filter === 'ativas' && 'underline'} hover:underline cursor-pointer`}
                    onClick={() => setFilter('ativas')}
                >Ativas</h3>
                <h3 className={`cursor-pointer transition-all
                 ${filter === 'completas' && 'underline'} hover:underline`}
                    onClick={() => setFilter('completas')}>Completas</h3>
            </div>
            <div className="w-1/5 text-center">
                <h3 className="cursor-pointer" onClick={() => cleanCompleted()}>Limpar</h3>
            </div>
        </div>
    )
}