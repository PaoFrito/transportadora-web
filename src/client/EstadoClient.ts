import { Estado } from '@/model/Estado'
import axios, { AxiosInstance } from 'axios'

export class EstadoClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/estados',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<Estado> {
        try{
            return (await this.axiosClient.get<Estado>(`/${id}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<Estado[]> {
        try {
            return (await this.axiosClient.get<Estado[]>(``)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async create(estado: Estado) : Promise<void> {
        try {
            return (await this.axiosClient.post(``, estado)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(estado: Estado) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/${estado.id}`, estado)).data
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