import { useQuery } from "@tanstack/react-query"
import useAxios from "../Hooks/AxiosHooks"

export default function Meals() {

    const axios = useAxios()
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
const res = axios.get('/meals')
        }
    })

    return (
        <div className="m-5">
            <h1 className="text-center font-bold text-3xl w-full py-4 bg-gray-100 rounded-2xl border-b-3 border-orange-500 drop-shadow-md my-5">Explore Our All Meals</h1>
        </div>
    )
}