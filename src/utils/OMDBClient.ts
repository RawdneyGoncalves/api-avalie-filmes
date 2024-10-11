import { injectable } from 'inversify';
import axios from 'axios';
import { OMDBMovieResponse } from './OMDBMovieResponse';
import 'dotenv/config';

@injectable()
export class OMDBClient {
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.OMDB_API_KEY ?? '';

        if (!this.apiKey) {
            throw new Error('A chave de API do OMDB não está configurada. Verifique suas variáveis de ambiente.');
        }
    }

    async fetchMovieByTitle(title: string): Promise<OMDBMovieResponse> {
        const response = await axios.get<OMDBMovieResponse>('http://www.omdbapi.com/', {
            params: {
                apikey: this.apiKey,
                t: title,
            },
        });

        if (response.data.Response === 'False') {
            throw new Error(response.data.Error);
        }

        return response.data;
    }
}
