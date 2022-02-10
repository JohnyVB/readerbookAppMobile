import { useEffect, useState } from "react";
import lectorApi from "../api/lectorApi";
import { Chapter, ChaptersResponse, SimChapter } from '../interfaces/AppInterfaces';
import { useErrorsHttp } from "./useErrorsHttp";

interface Props {
    articleId: string;
    all?: boolean;
}

export const useChapters = ({articleId, all = false}: Props) => {

   const [isloading, setIsloading] = useState<boolean>(true);

   const [chapterList, setChapterList] = useState<SimChapter[]>([]);

   const loadChapters = async (order: number = -1, inicio: number = 0, fin: number = 10) => {
       try {
            setIsloading(true);
            if (all) {
                fin = 0;
            }
            const resp = await lectorApi.post<ChaptersResponse>(`chapters/art/${articleId}/${order}`, {inicio, fin});
            mapChapterList(resp.data.capitulo);  
       } catch (error: any) {
           useErrorsHttp(error, 'useChapters => loadChapters');
       }
   }

   const mapChapterList = (chapterList: Chapter[]) => {

        const newChapterList: SimChapter[] = chapterList.map(({_id,number,title,date}) => {
            return {_id, number, title, date}
        });
        setChapterList([...newChapterList]);
        setIsloading(false);
   }

   useEffect(() => {
       loadChapters();
   }, []);

   return {
       chapterList,
       isloading,
       loadChapters
   }
}
