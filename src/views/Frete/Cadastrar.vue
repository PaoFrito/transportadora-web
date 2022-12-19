<template>
<div>
<!-- Alerts -->
<div>
    <!-- Sucesso -->
    <AlertSuccess v-if="alert.success" :msg=alert.msg />

    <!-- Erro -->
    <AlertWarning v-if="alert.error" :msg=alert.msg />
</div>    

<section class="section">
    <div class="columns">
        <h2 class="title is-2">Cadastrar Frete</h2>
    </div>
</section>
<section class="section">
    <div class="container">
        <div class="columns">
            <div class="column is-one-quarter"></div>
            <div class="column is-half">
                <form class="box">
                    <!-- Origem -->
                    <div class="division"></div>
                    <div class="container">
                        <div class=" is-small columns">
                            <div class="column">
                                <b-field label="Estado de Origem">
                                    <b-select @change.native="getCidadesOrigem($event)" placeholder="-- Selecione --">
                                        <option v-for="estado in estadoList" :value="estado.id"> {{ estado.nome }} </option>
                                    </b-select>
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field label="Cidade de Origem">
                                    <b-select v-model="frete.cidadeOrigem" placeholder="-- Selecione --" :disabled="CDO">
                                        <option v-for="cidade in cidadeOrigemList" :value="cidade"> {{ cidade.nome }} </option>
                                    </b-select>
                                </b-field>
                            </div>
                        </div>
                    </div>
            
                    <!-- Destino -->
                    <div class="division"></div>
                    <div class="container">                        
                        <div class=" is-small columns">
                            <div class="column">
                                <b-field label="Estado de Destino">
                                    <b-select placeholder="-- Selecione --" @change.native="getCidadesDestino($event)">
                                        <option v-for="estado in estadoList" :value="estado.id"> {{ estado.nome }} </option>
                                    </b-select>
                                </b-field>
                            </div>  
                            <div class="column">
                                <b-field label="Cidade de Destino">
                                    <b-select v-model="frete.cidadeDestino" placeholder="-- Selecione --" :disabled="CDD">
                                        <option v-for="cidade in cidadeDestinoList" :value="cidade"> {{ cidade.nome }} </option>
                                    </b-select>
                                </b-field>
                            </div>
                        </div>
                    </div>

                    <!-- Produto -->
                    <div class="division"></div>
                    <div class="container">
                        <div>
                            <b-field label="Produto">
                                <b-select v-model="frete.produto" placeholder="-- Selecione --">
                                    <option v-for="produto in produtoList" :value="produto"> {{ produto.nome }} </option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>

                    <!-- Caminhao -->
                    <div class="division"></div>
                    <div class="container">
                        <div>
                            <b-field label="Caminhao">
                                <b-select v-model="frete.caminhao" placeholder="-- Selecione --">
                                    <option v-for="caminhao in caminhaoList" :value="caminhao"> {{ caminhao.placa }} </option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>

                    <!-- Motorista -->
                    <div class="division"></div>
                    <div class="container">
                        <div>
                            <b-field label="Motorista">
                                <b-select v-model="frete.motorista" placeholder="-- Selecione --">
                                    <option v-for="motorista in motoristaList" :value="motorista"> {{ motorista.nome }} </option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>

                    <!-- Preco -->
                    <div class="division"></div>
                    <div class="container division">
                        <div>
                            <b-field label="Preco por Tonelada">
                                <b-numberinput
                                    step="10"
                                    min-step="0.01"
                                    aria-minus-label="Decrement by 10"
                                    aria-plus-label="Increment by 10"
                                    v-model="frete.precoTonelada"
                                ></b-numberinput>
                            </b-field>
                        </div>
                    </div>
                    
                    <!-- Submit -->
                    <div class="division"></div>
                    <div class="container division">
                        <div>
                            <b-button type="is-success" @click="saveFrete()">Enviar</b-button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="column is-one-quarter"></div>
        </div>
    </div>
</section>
</div>
</template>

<script lang="ts">
import { CaminhaoClient } from '@/client/CaminhaoClient'
import { CidadeClient } from '@/client/CidadeClient'
import { EstadoClient } from '@/client/EstadoClient'
import { FreteClient } from '@/client/FreteClient'
import { ProdutoClient } from '@/client/ProdutoClient'
import { UserClient } from '@/client/UserClient'

import { NewFreteDTO } from '@/DTO/NewFreteDTO'

import { Cidade } from '@/model/Cidade'
import { Estado } from '@/model/Estado'
import { Produto } from '@/model/Produto'
import { User } from '@/model/User'
import { Caminhao } from '@/model/Caminhao'

import Alert from '@/util/classes/Alert'

import { Component, Vue } from 'vue-property-decorator';

import AlertSuccess from '@/components/Alerts/Success.vue'
import AlertWarning from '@/components/Alerts/Warning.vue'
import { AlertMsg } from '@/util/enums/AlertMsg'

@Component({
  components: {
    AlertSuccess,
    AlertWarning
  },
})

export default class FreteView extends Vue{
    private cidadeClient: CidadeClient = new CidadeClient()
    private estadoClient: EstadoClient = new EstadoClient()
    private produtoClient: ProdutoClient = new ProdutoClient()
    private userClient: UserClient = new UserClient()
    private caminhaoClient: CaminhaoClient = new CaminhaoClient()
    private freteClient: FreteClient = new FreteClient()

    public frete: NewFreteDTO = new NewFreteDTO()
    public cidadeOrigemList: Cidade[] = []
    public cidadeDestinoList: Cidade[] = []
    public estadoList: Estado[] = []
    public produtoList: Produto[] = []
    public motoristaList: User[] = []
    public caminhaoList: Caminhao[] = []

    public CDO: boolean = true
    public CDD: boolean = true

    public alert: Alert = new Alert()

    public mounted(): void {
        this.listaEstados()
        this.listaProdutos()
        this.listaCaminhao()
        this.listaUsers()
        this.getExecutor()
    }

    public saveFrete(): void{

        if(!this.validar()){
            this.alert.showPopUp(false, AlertMsg.invalidField)
            return
        }

        this.freteClient.create(this.frete)
        .then(
            success => {
                this.alert.showPopUp(true, AlertMsg.success) 
            },
            error => {
                this.alert.showPopUp(false, error)
                console.log(error)
            }
        )        
    }

    private validar() : boolean {
        if(!this.frete.cidadeOrigem) 
            return false
        
        if(!this.frete.cidadeOrigem) 
            return false
        
        if(!this.frete.cidadeDestino) 
            return false

        if(!this.frete.produto) 
            return false

        if(!this.frete.caminhao) 
            return false

        if(!this.frete.motorista) 
            return false

        if(!this.frete.precoTonelada) 
            return false

        return true
    }

    public getCidadesOrigem(event : any): void{
        this.cidadeClient.findByEstadoId(event.target.value)
        .then(
            res => { this.cidadeOrigemList = res },
            e => { console.log(e) }
        )

        this.CDO = false  
    }

    public getCidadesDestino(event : any): void{
        console.log(event.target.value)
        this.cidadeClient.findByEstadoId(event.target.value)
        .then(
            res => { this.cidadeDestinoList = res },
            e => { console.log(e) }
        )
        this.CDD = false
    }

    private listaEstados(): void {
        this.estadoClient.findAll()
        .then(
            res => { this.estadoList = res },
            e => { console.log(e) }
        )
    }

    private listaProdutos(): void {
        this.produtoClient.findAll()
        .then(
            res => {this.produtoList = res},
            e => {console.log(e)}
        )
    }

    private listaUsers(): void {
        this.userClient.findByRole('MOTORISTA')
        .then(
            res => {
                this.motoristaList = res
            },
            e => {console.log(e)}
        )
    }

    private listaCaminhao(): void {
        this.caminhaoClient.findAll()
        .then(
            res => {this.caminhaoList = res},
            e => {console.log(e)}
        )
    }

    private getExecutor():void{
        this.userClient.findById(4)
        .then(
            success => { this.frete.executor = success},
            error => { console.log(error) }
        )
    }

}
</script>
