import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const lectorApi = axios.create({baseURL: 'https://web-production-b34c.up.railway.app/api'});
// const lectorApi = axios.create({baseURL: 'http://192.168.1.12:3200/api'});

lectorApi.interceptors.request.use(
    async (config: any) => {
        const token = await AsyncStorage.getItem('x-token');
        if (token) {
            config.headers['x-token'] = token;
        }

        return config;
    }
);

export default lectorApi;