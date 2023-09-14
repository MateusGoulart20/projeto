export function Header(props) {
    return (
        <header>
            <h1 className="text-center p-3" style={{color: props.color}}>{props.title}</h1>
        </header>
    )
}
