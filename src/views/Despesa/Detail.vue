<template>
<div>
<div>
    <AlertSuccess v-if="alert.getSuccess()" :msg=alert.getMsg() />
    <AlertWarning v-if="alert.getError()" :msg=alert.getMsg() />
</div>    

<section class="section">
    <div class="columns">
        <div class="column">
            <h2  class="title is-2">
                <span v-if="create">Cadastrar</span> 
                <span v-if="edit">Editar</span> 
                <span v-if="detail">Detalhes da</span> 
                Despesa
            </h2>
        </div>
    </div>
    <div>
        <b-button v-if="detail" @click="editOn()" type="is-primary">Editar</b-button>
    </div>
</section>
<section class="section">
    <div class="container">
        <div class="columns">
            <div class="column is-one-quarter"></div>
            <div class="column is-half">
                <form class="box">
                <div class="division"></div>
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <b-field label="Tipo de despesa">
                                <b-select v-model="despesa.tipoDespesa" placeholder="-- Selecione --" :disabled="detail">
                                    <option v-for="tipoDespesa in tipoDespesaList" :value="tipoDespesa"> {{ tipoDespesa.nome }} </option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Valor (R$)">
                            <b-numberinput
                                :disabled="detail"
                                step="10"
                                min-step="0.01"
                                aria-minus-label="Decrement by 10"
                                aria-plus-label="Increment by 10"
                                v-model="despesa.valor"
                            ></b-numberinput>
                        </b-field>
                        </div>
                    </div>
                </div>              
                <div class="division"></div>
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <b-field v-bind:label="freteLabel">
                                <b-select v-model="despesa.frete" placeholder="-- Selecione --" :disabled="detail">
                                    <option v-for="frete in freteList" :value="frete">{{ frete.id }} / {{ frete.statusFrete }} / {{ frete.cidadeOrigem.nome}}~{{ frete.cidadeDestino.nome}}</option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                </div>      
                <div class="division"></div>
                <div class="container">
                    <div v-if="detail && isAdm">
                        <b-button @click="aprovar()" type="is-primary">Aprovar despesa</b-button>
                    </div>
                    <div v-if="edit || create">
                        <b-button @click="cancelar()" class="mr-6">Cancelar</b-button>
                        <b-button type="is-success" @click="salvar()">Enviar</b-button>
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

import Alert from '@/util/classes/Alert'

import { Component, Vue } from 'vue-property-decorator';

import AlertSuccess from '@/components/Alerts/Success.vue'
import AlertWarning from '@/components/Alerts/Warning.vue'
import { AlertMsg } from '@/util/enums/AlertMsg'
import { TipoDespesa } from '@/model/TipoDespesa';
import { User } from '@/model/User';
import { Frete } from '@/model/Frete';
import LoggedUser from '../../LoggedUser';
import { TipoDespesaClient } from '../../client/TipoDespesaClient';
import { UserClient } from '@/client/UserClient';
import { FreteClient } from '@/client/FreteClient';
import { Despesa } from '@/model/Despesa';
import { DespesaClient } from '@/client/DespesaClient';
import { Grupo } from '@/model/enum/Grupo';

@Component({
    components: {
    AlertSuccess,
    AlertWarning
    },
})

export default class DespesaDetailView extends Vue{

    public despesaId: number = 0

    public edit: boolean = false
    public detail: boolean = false
    public create: boolean = false

    public freteLabel!: string

    public alert: Alert = new Alert()

    private loggedUser: LoggedUser = new LoggedUser()
    public isAdm: boolean = false

    private despesaClient: DespesaClient = new DespesaClient()
    private tipoDespesaClient: TipoDespesaClient = new TipoDespesaClient() 
    private userClient: UserClient = new UserClient() 
    private freteClient: FreteClient = new FreteClient() 

    public tipoDespesaList: TipoDespesa[] = []
    public motorista: User = new User()
    public freteList: Frete[] = []

    public despesa: Despesa = new Despesa()

    public mounted(): void {
        this.despesaId = Number(this.$route.params.despesaId)
            
        this.change()
        this.loggedUser.setId(4)
        this.loggedUser.setGrupo(Grupo.ADMINISTRADOR)
        this.getDespesas()
        this.getTipoDespesas()
        this.getFretes()
        this.getMotorista()

        this.isAdm = this.loggedUser.getGrupo() == Grupo.ADMINISTRADOR

        if(this.despesaId != 0 && !this.edit)
            this.freteLabel = "Anexar despesa a qual frete?"
        else
            this.freteLabel = "Despesa anexada ao frete:"
    }

    private change(): void{
        if(this.despesaId == 0)
            this.create = true
        else
            this.detail = true
    }

    private validation(): boolean{
        if(this.despesa.tipoDespesa == null)
            return false

        if(this.despesa.valor == null || this.despesa.valor <= 0)
            return false

        if(this.despesa.frete == null)
            return false

        return true
    }

    public aprovar(): void{
        console.log(this.despesa.id)
        console.log(this.loggedUser.getId())
        this.despesaClient.aprovar(this.despesa.id, this.loggedUser.getId())
        .then(
            success => this.alert.showPopUp(true, AlertMsg.success),
            error => {
                this.alert.showPopUp(false, error)
                console.log(error)
            }
        )
    }

    public cancelar(): void{
        this.$router.go(-1)
    }

    public salvar(): void{

        if(!this.validation()){
            this.alert.showPopUp(false, AlertMsg.invalidField)
            return
        }

        this.despesa.motorista = this.motorista

        this.despesaClient.create(this.despesa)
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

    public editOn(): void{
        this.edit = true
        this.detail = false
    }

    public editOff(): void{
        this.edit = false
        this.detail = true
    }

    private getDespesas(): void{
        this.despesaClient.findById(this.despesaId)
        .then(
            success => {
                this.despesa = success                
            },
            error => {
                console.log(error)
                if(this.despesaId != 0)
                    this.$router.go(-1)
            }
        )
    }

    private getTipoDespesas(): void{
        this.tipoDespesaClient.findAll()
        .then(
        success => {this.tipoDespesaList = success},
        error => {console.log(error)}
        )
    }

    private getFretes(): void{
        this.freteClient.getAllInProgress()
        .then(
        success => {this.freteList = success},
        error => {console.log(error)}
        )
    }

    private getMotorista(): void{
        this.userClient.findById(this.loggedUser.getId())
        .then(
        success => {this.motorista = success},
        error => {console.log(error)}
        )
    }
}
</script>    