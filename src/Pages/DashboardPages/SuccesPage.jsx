import { useSearchParams } from "react-router"
import useAxios from "../../Hooks/AxiosHooks"
import { useEffect } from "react"

export default function SuccessPage() {

    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const axios = useAxios()

    useEffect(() => {
        if (sessionId) {
            axios.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                })
        }
    }, [sessionId])


    return (
        <div className="py-10">
            <div className="w-full text-center text-3xl font-bold text-green-500 py-5 bg-orange-50">Payment Successful</div>
        </div>
    )
}