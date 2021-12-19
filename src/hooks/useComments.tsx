import { useEffect, useState } from "react"
import { Alert } from "react-native";
import lectorApi from "../api/lectorApi";
import { Comentario, CommentsResponse, SimpComment } from '../interfaces/AppInterfaces';

interface Props {
    entity: string;
    entityId: string;
    all?: boolean;
}

export const useComments = ({entity, entityId, all = false}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [saveCommentState, setSaveCommentState] = useState<boolean>(false);
    const [commentsList, setCommentsList] = useState<SimpComment[]>([]);

    const loadComments = async (order: number = -1, inicio: number = 0, fin: number = 10) => {
        setIsLoading(true);
        if (all) {
            fin = 0;
        }
        const resp = await lectorApi.post<CommentsResponse>(`comments/${entity}/${entityId}/${order}`, {inicio, fin});
        mapCommentsList(resp.data.comentarios);
    }

    const mapCommentsList = (commentList: Comentario[]) => {
        const newCommentList: SimpComment[] = commentList.map(({_id, state, article, chapter, date, user, text}) => {
            return {_id, state, article, chapter, date, user, text}
        });
        setCommentsList([...newCommentList]);
        setIsLoading(false);
    }

    const saveComment = async (text: string) => {
        try {
            setSaveCommentState(true);
            await lectorApi.post(`comments/${entity}/${entityId}`, {text});
            await loadComments();
            setSaveCommentState(false);
        } catch (error: any) {
            console.log(error);            
            console.log(error?.response?.data?.msg);
            setSaveCommentState(false);
            Alert.alert(
                'Error al guardar comentario', 
                error?.response?.data?.msg,
                [{text: 'Ok'}]
            );
        }
        
    }

    useEffect(() => {
        loadComments();
    }, []);

    return {
        commentsList,
        loadComments,
        isLoading,
        saveComment,
        saveCommentState
    }

}