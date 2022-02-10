export const useErrorsHttp = (error: any, funtionName: string) => {
    console.log('ERROR IN => ', funtionName);
    console.log('ERROR RESPONSE => ', error?.response); 
};
