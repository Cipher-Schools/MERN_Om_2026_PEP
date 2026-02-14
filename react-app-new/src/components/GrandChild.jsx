import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const GrandChild = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <h2>This is grandchild component</h2>
            <p>Hello</p>
            <p>Theme: {theme}</p>
            <button onClick={toggleTheme}>ToggleTheme</button>
        </>
    )
}