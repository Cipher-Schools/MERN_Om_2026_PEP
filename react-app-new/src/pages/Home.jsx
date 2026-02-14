import { useState } from "react";
import { Parent } from "../components/Parent"

export const Home = () => {

    // let name = 'Tom';
    // let theme = 'dark';
    // const [theme, setTheme] = useState('dark');

    return (
        <>
            <h2>This is Home Page</h2>
            {/* <Parent name={name} theme={theme} /> */}
            <Parent />
        </>
        
    )
}