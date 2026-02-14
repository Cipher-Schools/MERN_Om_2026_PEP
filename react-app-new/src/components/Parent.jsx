import { Child } from "./Child"

export const Parent = () => {

    return (
        <>
            <h2>This is parent component</h2>
            {/* <Child name={name} theme={theme} /> */}
            <Child />
        </>
    )
}