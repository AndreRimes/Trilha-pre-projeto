import { useTodo } from "@/context/todoContext";
import TodoComponent from "./Todo";
import { Todo } from "@/types/types";
import { useCallback } from "react";
import update from "immutability-helper";

export default function Todos() {
    const { todos, filter, setTodos } = useTodo();

    const moveTodo = useCallback((dragIndex: number, hoverIndex: number) => {
        setTodos((prevCards: Todo[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Todo],
                ],
            })
        );
    }, [setTodos]);

    return (
        <div className="relative z-1 w-full max-h-[70%] h-[70%] overflow-auto">
            {todos.map((todo: Todo, index: number) => {
                switch (filter) {
                    case "":
                        return (
                            <TodoComponent
                                todo={todo}
                                index={index}
                                moveTodo={moveTodo}
                                key={index}
                            />
                        );
                    case "ativas":
                        if (!todo.completed) {
                            return (
                                <TodoComponent
                                    todo={todo}
                                    index={index}
                                    moveTodo={moveTodo}
                                    key={index}
                                />
                            );
                        }
                        return null;
                    case "completas":
                        if (todo.completed) {
                            return (
                                <TodoComponent
                                    key={index}
                                    todo={todo}
                                    index={index}
                                    moveTodo={moveTodo}
                                />
                            );
                        }
                        return null;
                    default:
                        return (
                            <TodoComponent
                                todo={todo}
                                index={index}
                                moveTodo={moveTodo}
                                key={index}
                            />
                    );
                }
            })}
        </div>
    );
}
