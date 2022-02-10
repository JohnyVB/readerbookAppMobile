import { useEffect, useState } from "react";
import lectorApi from "../api/lectorApi";
import { Chapter, ChaptersResponse } from '../interfaces/AppInterfaces';
import { useErrorsHttp } from "./useErrorsHttp";

interface Props {
    articleId: string;
    numChapter: number;
}

export const useChapterView = ({ articleId, numChapter }: Props) => {

    const [isloading, setIsloading] = useState<boolean>(true);

    const [allChapters, setAllChapters] = useState<Chapter[]>([]);

    const [currentChapter, setCurrentChapter] = useState<Chapter>();

    const [endChapter, setEndChapter] = useState<boolean>(false);

    const [startChapter, setStartChapter] = useState<boolean>(false); 

    const getAllChapters = async () => {
        try {
            setIsloading(true);
            const resp = await lectorApi.post<ChaptersResponse>(`chapters/art/${articleId}/${1}`, { inicio: 0, fin: 0 });
            setAllChapters([...resp.data.capitulo]);
            getCurrentChapter(resp.data.capitulo);
        } catch (error: any) {
            useErrorsHttp(error, 'useChapterView => getAllChapters');
        }
    }

    const getCurrentChapter = async (arrayChapters: Chapter[]) => {
        const chapter = arrayChapters.find(item => item.number === numChapter)
        setCurrentChapter(chapter);
        checkChapter(numChapter, arrayChapters);
        setIsloading(false);
    }

    const nextChapter = () => {
        const chapter = allChapters.find(item => item.number === (currentChapter!.number + 1))
        setCurrentChapter(chapter);
        checkChapter(chapter!.number, allChapters);
    }

    const previousChapter = () => {
        const chapter = allChapters.find(item => item.number === (currentChapter!.number - 1))
        setCurrentChapter(chapter);
        checkChapter(chapter!.number, allChapters);
    }

    const checkChapter = (numChapterCurrent: number, arrayChapters: Chapter[]) => {
        
        const chapterNext = arrayChapters.find(item => item.number === (numChapterCurrent + 1) && item.state === true);
        const chapterPrevious = arrayChapters.find(item => item.number === (numChapterCurrent - 1) && item.state === true);

        if(chapterNext && !chapterPrevious){
            setStartChapter(true);
            setEndChapter(false);
        }else if(!chapterNext && chapterPrevious){
            setStartChapter(false);
            setEndChapter(true);
        }else if(chapterNext && chapterPrevious){
            setStartChapter(false);
            setEndChapter(false);
        }
    }

    useEffect(() => {
        getAllChapters();
    }, []);

    return {
        currentChapter,
        isloading,
        nextChapter,
        previousChapter,
        startChapter,
        endChapter,
    }
}
