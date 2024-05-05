import './stylesheets/error.css'

interface prop {
    content: string
}

export default function Error(props: prop){
    
    return (
        <div id='errorBox'>
            <p id='errorMessage'>{props.content}</p>
        </div>
    )
}