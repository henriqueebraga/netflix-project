// similar to react useQuery
import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
    // use anywhere and do not fetch data again if data already exists
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser