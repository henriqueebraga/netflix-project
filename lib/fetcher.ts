import axios from 'axios';

const fetcher = async (url: string) => {
    return axios.get(url).then((res) => {
        return res.data;
    })
}

export default fetcher;