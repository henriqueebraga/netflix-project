import axios from "axios";
import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
    movieId: number;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data, mutate  } = useCurrentUser();
    const currentUser = data?.currentUser;

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorite = useCallback(async () => {
        let response;

        if (isFavorite) {
            response = await fetch('/api/favorite', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movieId })
            });
        } else {
            response = await fetch('/api/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ movieId })
            });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        })
        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
    return (
        <div
            onClick={toggleFavorite}
            className="
                cursor-pointer
                group/item
                w-6
                h-6
                lg:w-10
                lg:h-10
                border-white
                border-2
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:border-neutral-300
            "
        >
            <Icon className="text-white" size={25} />
        </div>
    )
}

export default FavoriteButton;