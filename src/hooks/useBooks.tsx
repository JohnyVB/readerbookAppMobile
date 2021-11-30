import { useEffect, useRef, useState } from "react";
import lectorApi from '../api/lectorApi';
import { BooksResponse, SimpArticulo, Articulo } from '../interfaces/AppInterfaces';

export const useBooks = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [bookList, setBookList] = useState<SimpArticulo[]>([]);

    const nextPage = useRef(10);

    const loadBooks = async() => {
        setIsLoading(true);
        const resp = await lectorApi.post<BooksResponse>('/articles', {end: nextPage.current});
        nextPage.current = (nextPage.current + 10);
        mapBooksList(resp.data.articulos);
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
