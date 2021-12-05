import { useEffect, useState } from "react"
import lectorApi from "../api/lectorApi";
import { Articulo, BookResponse } from "../interfaces/AppInterfaces";

export const useBook = (bookId: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [book, setBook] = useState<Articulo>();

    const loadBook = async() => {
        setIsLoading(true);
        const resp = await lectorApi.get<BookResponse>('/articles/' + bookId);
        setBook(resp.data.articulo);
        setIsLoading(false);
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