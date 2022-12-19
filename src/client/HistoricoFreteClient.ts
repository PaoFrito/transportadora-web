import axios, { AxiosInstance } from 'axios'
import { HistoricoFrete } from '@/model/HistoricoFrete';

export class HistoricoFreteClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/historicofrete',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<HistoricoFrete> {
        try{
            return (await this.axiosClient.get<HistoricoFrete>(`/${id}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<HistoricoFrete[]> {
        try {
            return (await this.axiosClient.get<HistoricoFrete[]>(``)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFreteId(freteId: number) : Promise<HistoricoFrete[]> {
        try {
            return (await this.axiosClient.get<HistoricoFrete[]>(`/frete/${freteId}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(id: number) : Promise<void> {
        try{
            return (await this.axiosClient.delete(`/${id}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

}