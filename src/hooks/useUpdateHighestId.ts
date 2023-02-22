import { useCallback, useEffect, useState } from "react"
import { useHighestId } from "./useHighestId"

export const useUpdateHighestId = (category: string) => {
    const [newHighestId, setNewHighestId] = useState(useHighestId(category))

    // useEffect

    const getNewHighestId = useCallback(() => {
        setNewHighestId(useHighestId(category))
    }, [category])

    return getNewHighestId
}