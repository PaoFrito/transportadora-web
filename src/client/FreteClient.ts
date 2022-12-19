import { Frete } from '@/model/Frete'
import axios, { AxiosInstance } from 'axios'
import { FreteEmTransporte } from '../DTO/FreteEmTransporte';
import { FreteObservacao } from '../DTO/FreteObervacao';
import { FreteDescarga } from '../DTO/FreteDescarga';
import { FreteAtualizado } from '../DTO/FreteAtualizado';
import { NewFreteDTO } from '../DTO/NewFreteDTO';

export class FreteClient {

    private axiosClient: AxiosInstance

    constructor(){
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:3000/api/fretes',
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    public async findById(id: number) : Promise<Frete> {
        try{
            return (await this.axiosClient.get<Frete>(`/${id}`)).data
        }catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async findAll() : Promise<Frete[]> {
        try {
            return (await this.axiosClient.get<Frete[]>(``)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async create(frete: NewFreteDTO) : Promise<void> {
        try {
            console.log("client")
            console.log(frete)
            return (await this.axiosClient.post(``, frete)).data
        } catch (error: any) {
            console.log(error)
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

    public async updateStatusEmTransporte(frete: FreteEmTransporte) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/status/em_transporte/${frete.id}`, frete)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async updateStatusInterrompido(frete: FreteObservacao) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/status/interrompido/${frete.id}`, frete)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async updateStatusDescarga(frete: FreteDescarga) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/status/descarga/${frete.id}`, frete)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async updateStatusFaturado(frete: FreteAtualizado) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/status/faturado/${frete.id}`, frete)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async updateStatusCancelado(frete: FreteObservacao) : Promise<void> {
        try {
            return (await this.axiosClient.put(`/status/cancelado/${frete.id}`, frete)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

}