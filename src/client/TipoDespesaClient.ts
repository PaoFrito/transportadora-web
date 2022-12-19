import { TipoDespesa } from '@/model/TipoDespesa'
import axios, { AxiosInstance } from 'axios'

export class TipoDespesaClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/tipodespesas',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<TipoDespesa> {
        try{
            return (await this.axiosClient.get<TipoDespesa>(`/${id}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<TipoDespesa[]> {
        try {
            return (await this.axiosClient.get<TipoDespesa[]>(``)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async create(tipoDespesa: TipoDespesa) : Promise<void> {
        try {
            return (await this.axiosClient.post(``, tipoDespesa)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(tipoDespesa: TipoDespesa) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/${tipoDespesa.id}`, tipoDespesa)).data
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