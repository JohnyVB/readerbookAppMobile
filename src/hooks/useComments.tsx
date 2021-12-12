import { useEffect, useState } from "react"
import lectorApi from "../api/lectorApi";
import { Comentario, CommentsResponse, SimpComment } from '../interfaces/AppInterfaces';

interface Props {
    entity: string;
    entityId: string;
}

export const useComments = ({entity, entityId}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [commentsList, setCommentsList] = useState<SimpComment[]>([]);

    const loadComments = async (order: number = -1) => {
        setIsLoading(true);
        const resp = await lectorApi.get<CommentsResponse>(`comments/${entity}/${entityId}/${order}`);
        mapCommentsList(resp.data.comentarios);
    }

    const mapCommentsList = (commentList: Comentario[]) => {
        const newCommentList: SimpComment[] = commentList.map(({_id, state, article, chapter, date, user, text}) => {
            return {_id, state, article, chapter, date, user, text}
        });
        setCommentsList([...newCommentList]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadComments();
    }, []);

    return {
        commentsList,
        loadComments,
        isLoading
    }

}