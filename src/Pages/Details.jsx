import { useParams } from "react-router"

export default function Details() {
    const { id } = useParams()
    return (
        <div>fuck{id}</div>
    )
}