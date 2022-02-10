import { useEffect, useRef, useState } from "react";
import lectorApi from '../api/lectorApi';
import { BooksResponse, SimpArticulo, Articulo } from '../interfaces/AppInterfaces';
import { useErrorsHttp } from "./useErrorsHttp";

export const useBooks = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [bookList, setBookList] = useState<SimpArticulo[]>([]);

    const nextPage = useRef(10);

    const loadBooks = async() => {
        try {
            setIsLoading(true);
            const resp = await lectorApi.post<BooksResponse>('/articles', {end: nextPage.current});
            nextPage.current = (nextPage.current + 10);
            mapBooksList(resp.data.articulos);
        } catch (error: any) {
            useErrorsHttp(error, 'useBooks => loadBooks');
        }
    }

    const mapBooksList = (bookList: Articulo[]) => {
        const newBookList: SimpArticulo[] = bookList.map(({_id, title, image, type, chapter}) => {
            return {_id,title,image,type,chapter}
        });

        setBookList([...newBookList]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadBooks();
    }, []);

    return {
        bookList,
        loadBooks,
        isLoading
    }
}
