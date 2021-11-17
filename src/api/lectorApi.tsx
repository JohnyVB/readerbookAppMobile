import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const lectorApi = axios.create({baseURL: 'https://backend-lector.herokuapp.com/api'});

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