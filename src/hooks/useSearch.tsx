import { useState } from "react";
import lectorApi from "../api/lectorApi";
import { SearchResponse, SimpArticuloSearch, ArticuloSearch } from '../interfaces/AppInterfaces';

export const useSearch = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [dataString, setDataString] = useState<string>('');
    
    const [resultSearch, setResultSearch] = useState<SimpArticuloSearch[]>([]);

    const loadResults = async(searchString: string) => { 
        try {
            setIsLoading(true);
            setDataString(searchString);
            const resp = await lectorApi.get<SearchResponse>(`searchs/${searchString}`);
            mapSearchList(resp.data.articulos);
        } catch (error: any) {
            console.log(error.response.data.msg);
        }
    }

    const mapSearchList = (searchList: ArticuloSearch[]) => {
        const newSearchList: SimpArticuloSearch[] = searchList.map(({_id, title, image, type}) => {
            return {_id, title, image, type}
        });
        setResultSearch([...newSearchList]);
        setIsLoading(false);
    }

    return {
        resultSearch,
        isLoading,
        loadResults,
        dataString
    }
}
