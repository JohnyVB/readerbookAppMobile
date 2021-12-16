import { useEffect, useState } from "react"
import lectorApi from "../api/lectorApi";
import { Chapter, ChaptersResponse, SimChapter } from '../interfaces/AppInterfaces';

interface Props {
    articleId: string;
}

export const useChapters = ({articleId}: Props) => {
   const [isloading, setIsloading] = useState<boolean>(true);
   const [chapterList, setChapterList] = useState<SimChapter[]>([]);

   const loadChapters = async (order: number = -1, inicio: number = 0, fin: number = 10) => {
       setIsloading(true);
       const resp = await lectorApi.post<ChaptersResponse>(`chapters/art/${articleId}/${order}`, {inicio, fin});
       mapChapterList(resp.data.capitulo);  
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
