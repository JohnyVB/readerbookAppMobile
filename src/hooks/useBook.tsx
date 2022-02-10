import { useEffect, useState } from "react"
import lectorApi from "../api/lectorApi";
import { Articulo, BookResponse } from "../interfaces/AppInterfaces";
import { useErrorsHttp } from "./useErrorsHttp";

export const useBook = (bookId: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [book, setBook] = useState<Articulo>();

    const loadBook = async() => {
        try {
            setIsLoading(true);
            const resp = await lectorApi.get<BookResponse>('/articles/' + bookId);
            setBook(resp.data.articulo);
            setIsLoading(false);
        } catch (error: any) {
            useErrorsHttp(error, 'useBook => loadBook');
        }
    }

    useEffect(() => {
        loadBook();
    }, []);

    return {
        book,
        isLoading,
        loadBook
    }
}