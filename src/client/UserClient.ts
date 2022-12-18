import { Grupo } from '@/model/enum/Grupo'
import { User } from '@/model/User'
import axios, { AxiosInstance } from 'axios'

export class UserClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/usuarios',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<User> {
        try{
            return (await this.axiosClient.get<User>(`/${id}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<User[]> {
        try {
            return (await this.axiosClient.get<User[]>(``)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByRole(role: string) : Promise<User[]> {
        try{
            return (await this.axiosClient.get<User[]>(`/grupo/${role}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async create(user: User) : Promise<void> {
        try {
            return (await this.axiosClient.post(``, user)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(user: User) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/${user.id}`, user)).data
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