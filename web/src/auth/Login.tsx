

export default function Login(){

    const handleClick = () => {
        
    }

    return (
        <>
            <form>
                <label>Login: </label><br/>
                <input type="text"/><br />
                <label>Hasło: </label><br />
                <input type="text" /><br/>
                <button onClick={handleClick}>Zaloguj</button>
            </form>        
        </>
    )
}