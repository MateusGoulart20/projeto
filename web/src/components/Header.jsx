export function Header(props) {
    return (
        <header className="col">
            
            <h1 className="text-center p-3" 
                style={
                    {color: props.color, background: props.bcolor}
                }
            >
            {props.title}
            </h1>
            
        </header>
    )
}
