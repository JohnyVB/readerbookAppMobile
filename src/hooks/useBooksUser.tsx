import { useEffect, useState } from "react";
import lectorApi from "../api/lectorApi";
import { ArticuloUser, BooksUserResponse, SimpArticuloUser } from "../interfaces/AppInterfaces";

interface Props {
    userId: string;
}

export const useBooksUser = ({userId}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [bookList, setBookList] = useState<SimpArticuloUser[]>([]);

    const loadBooks = async() => {
        setIsLoading(true);
        const resp = await lectorApi.get<BooksUserResponse>(`articles/user/${userId}`);
        mapBookList(resp.data.articulos);
    }

    const mapBookList = (bookList: ArticuloUser[]) => {
        const newBookList: SimpArticuloUser[] = bookList.map(({_id, title, image, type}) => {
            return {_id, title, image, type}
        });
        setBookList([...newBookList]);
        setIsLoading(false);
    }

    useEffect(() => {
        loadBooks()
    }, []);

    return {
        bookList,
        isLoading
    }
}
