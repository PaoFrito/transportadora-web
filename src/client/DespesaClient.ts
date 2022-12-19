import { Despesa } from '@/model/Despesa'
import axios, { AxiosInstance } from 'axios'

export class DespesaClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/despesas',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<Despesa> {
        try{
            return (await this.axiosClient.get<Despesa>(`/${id}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async findByAprovadorId(aprovadorId: number) : Promise<Despesa> {
        try{
            return (await this.axiosClient.get<Despesa>(`/despesa/${aprovadorId}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<Despesa[]> {
        try {
            return (await this.axiosClient.get<Despesa[]>(``)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async create(despesa: Despesa) : Promise<void> {
        try {
            return (await this.axiosClient.post(``, despesa)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(despesa: Despesa) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/${despesa.id}`, despesa)).data
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