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
                <span v-if="despesaId == 0">Cadastrar</span> 
                <span v-if="edit">Editar</span> 
                <span v-if="despesaId != 0 && !edit">Detalhes da</span> 
                Despesa
            </h2>
        </div>
    </div>
    <div>
        <b-button v-if="despesaId != 0 && !edit" @click="editOn()" type="is-primary">Editar</b-button>
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
                                <b-select v-model="despesa.tipoDespesa" placeholder="-- Selecione --" :disabled="!edit">
                                    <option v-for="tipoDespesa in tipoDespesaList" :value="tipoDespesa"> {{ tipoDespesa.nome }} </option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field label="Valor (R$)">
                            <b-numberinput
                                :disabled="!edit"
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
                            <b-field label="Data da Despesa">
                                <b-datepicker
                                    :disabled="!edit"
                                    v-model="despesa.data"
                                    placeholder="Selecione uma data"
                                    :min-date="( d => new Date(d.setDate(d.getDate()-1)) )(new Date)"
                                    :locale="pt-BR"
                                    icon-right-clickable
                                    trap-focus>
                                    <b-button
                                        label="Hoje"
                                        type="is-primary"
                                        @click="despesa.data = new Date()"
                                    ></b-button>
                                </b-datepicker>
                            </b-field>
                        </div>
                        <div class="column">
                            <b-field v-bind:label="freteLabel">
                                <b-select v-model="despesa.frete" placeholder="-- Selecione --" :disabled="!edit">
                                    <option v-for="frete in freteList" :value="frete">{{ frete.id }} / {{ frete.statusFrete }} / {{ frete.cidadeOrigem.nome}}~{{ frete.cidadeDestino.nome}}</option>
                                </b-select>
                            </b-field>
                        </div>
                    </div>
                </div>      
                <div class="division"></div>
                <div class="container">
                    <div v-if="despesaId != 0 && edit">
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

@Component({
    components: {
    AlertSuccess,
    AlertWarning
    },
})

export default class DespesaDetailView extends Vue{

    public despesaId: number = 0
    public edit: boolean = false

    public freteLabel!: string

    public alert: Alert = new Alert()

    private loggedUser: LoggedUser = new LoggedUser()

    private despesaClient: DespesaClient = new DespesaClient()
    private tipoDespesaClient: TipoDespesaClient = new TipoDespesaClient() 
    private userClient: UserClient = new UserClient() 
    private freteClient: FreteClient = new FreteClient() 

    public tipoDespesaList: TipoDespesa[] = []
    public motorista: User = new User()
    public freteList: Frete[] = []

    public despesa: Despesa = new Despesa()

    public mounted(): void {
        this.despesaId = <number>(<unknown>this.$route.params.DespesaId)
        this.loggedUser.setId()
        this.getDespesas()
        this.getTipoDespesas()
        this.getFretes()
        this.getMotorista()

        if(this.despesaId != 0 && !this.edit)
            this.freteLabel = "Anexar despesa a qual frete?"
        else
            this.freteLabel = "Despesa anexada ao frete:"
        
    }

    private validation(): boolean{
        if(this.despesa.tipoDespesa == null)
            return false

        if(this.despesa.valor == null || this.despesa.valor <= 0)
            return false

        if(this.despesa.data == null)
            return false

        if(this.despesa.frete == null)
            return false

        return true
    }

    public cancelar(): void{
        this.editOff()
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
    }

    public editOff(): void{
        this.edit = false
    }

    private getDespesas(): void{
        this.despesaClient.findById(this.despesaId)
        .then(
            success => {
                this.despesa = success                
            },
            error => {console.log(error)}
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