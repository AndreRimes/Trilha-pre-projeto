import { useTheme } from "@/context/themeContext"
import { Tag } from "@/types/types"


export default function TagComponent({ tag, index }: { tag: Tag , index: number }) {
    const { isDarkMode } = useTheme()

    return (
        <div className={`badge badge-outline mr-1 ${isDarkMode ? 'border-darkSecundary text-darkSecundary' :
            'border-secundary text-secundary'}`} key={index}>
            {tag.title}
        </div>
    )
}