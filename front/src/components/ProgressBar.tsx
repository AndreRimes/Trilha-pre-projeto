import { useTheme } from "@/context/themeContext";
import { useTodo } from "@/context/todoContext";


export default function ProgressBar() {
    const { todos } = useTodo()
    const { isDarkMode } = useTheme()

    const completedTodos = todos?.filter(todo => todo.completed).length;
    const totalTodos = todos?.length;
    const percentage = totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;

    return (
        <div className="w-full bg-gray-300 h-2 rounded-lg ">
            <div
                className={`bg-${isDarkMode ? 'darkSecundary' : 'secundary'}  h-2 rounded-lg transition-all`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
}
