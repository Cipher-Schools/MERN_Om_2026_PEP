import { GrandChild } from "./GrandChild"


export const Child = () => {

    return (
        <>
            <h2>This is child component</h2>
            {/* <GrandChild name={name} theme={theme} /> */}
            <GrandChild />
        </>
    )
}