import { useEffect, useState } from "react";
import lectorApi from "../api/lectorApi";
import { Lista, ListResponse } from '../interfaces/AppInterfaces';

interface Props {
    userId: string;
}

export const useList = ({userId}: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);

    const [list, setList] = useState<Lista[]>([]);

    const loadList = async() => {
        try {
            setIsLoading(true);
            const resp = await lectorApi.get<ListResponse>(`lists/${userId}`);
            setList([...resp.data.listas]);
            setIsLoading(false);
        } catch (error: any) {
            console.log(error);
            console.log(error.response.data.msg);
        }
    }

    const deleteItemList = async(listId: string, bookId: string) => {
        try {
            setLoadingDelete(true);
            await lectorApi.patch(`lists/deletebook/${listId}`, {article: bookId});
            loadList();
            setLoadingDelete(false);
        } catch (error: any) {
            console.log(error);
            console.log(error.response.data.msg);
        }
    }

    const deleteListProm = async(listId: string) => {
        try {
            await lectorApi.patch(`lists/${listId}`);
            loadList();
        } catch (error: any) {
            console.log(error);
            console.log(error.response.data.msg);
        }
    }

    const editNameListProm = async(listId: string, newNameList: string) => {
        try {
            await lectorApi.put(`lists/editlist/${listId}`, {name: newNameList});
            loadList();
        } catch (error: any) {
            console.log(error);
            console.log(error.response.data.msg);
        }
    }

    useEffect(() => {
        loadList();
    }, []);

    return {
        list,
        isLoading,
        loadList,
        deleteItemList,
        isLoadingDelete,
        deleteListProm,
        editNameListProm
    }
    
}
