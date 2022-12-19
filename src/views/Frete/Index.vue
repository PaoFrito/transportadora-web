<template>
<div>

<!-- Alerts -->
<div>
    <!-- Sucesso -->
    <AlertSuccess v-if="alert.getSuccess()" :msg=alert.getMsg() />

    <!-- Erro -->
    <AlertWarning v-if="alert.getError()" :msg=alert.getMsg() />
</div>  

<!-- modals -->    
<div>
    <!-- Atualizado -->
    <div v-if="curStatusFrete == statusfrete.faturado" class="modal" v-bind:class="{'modal is-active': modal.getState()}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Atualizar Frete</p>
                <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body">
                <form class="form">
                    <div class="container">
                        <div class="division"></div>
                        <div class="container">
                            <h4 class="is-4">Deseja mesmo atualizar este frete para Faturado?</h4>
                        </div>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="updateFreteFaturado()">Atualizar</button>
                <button class="button"  @click="closeModal()">Cancelar</button>
            </footer>
        </div>
    </div>
    
    <!-- Descarga -->
    <div v-if="curStatusFrete == statusfrete.descarga" class="modal" v-bind:class="{'modal is-active': modal.getState()}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Atualizar Frete</p>
                <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body">
                <form class="form">
                    <div class="container">
                        <div class="division"></div>
                        <div class="container">
                            <b-field label="Quilometragem Fim">
                                <b-numberinput
                                    step="5"
                                    min-step="0.01"
                                    aria-minus-label="Decrement by 5"
                                    aria-plus-label="Increment by 5"
                                    v-model="freteDescarga.quilometragemFim"
                                ></b-numberinput>
                            </b-field>
                        </div>
                        <div class="division"></div>
                        <div class="container">
                            <b-field label="Peso Final">
                                <b-numberinput
                                    step="1"
                                    min-step="0.01"
                                    aria-minus-label="Decrement by 1"
                                    aria-plus-label="Increment by 1"
                                    v-model="freteDescarga.pesoFinal"
                                ></b-numberinput>
                            </b-field>
                        </div>  
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="updateFreteDescarga()">Atualizar</button>
                <button class="button"  @click="closeModal()">Cancelar</button>
            </footer>
        </div>
    </div>

    <!-- Em transporte -->
    <div v-if="curStatusFrete == statusfrete.em_transporte" class="modal" v-bind:class="{'modal is-active': modal.getState()}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Atualizar Frete</p>
                <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body">
                <form class="form">
                    <div class="container">
                        <div class="division"></div>
                        <div class="container">
                            <b-field label="Quilometragem Inicial">
                                <b-numberinput
                                    step="5"
                                    min-step="0.01"
                                    aria-minus-label="Decrement by 5"
                                    aria-plus-label="Increment by 5"
                                    v-model="freteEmTransporte.quilometragemIni"
                                ></b-numberinput>
                            </b-field>
                        </div>
                        <div class="division"></div>
                        <div class="container">
                            <b-field label="Peso Inicial">
                                <b-numberinput
                                    step="1"
                                    min-step="0.01"
                                    aria-minus-label="Decrement by 1"
                                    aria-plus-label="Increment by 1"
                                    v-model="freteEmTransporte.pesoInicial"
                                ></b-numberinput>
                            </b-field>
                        </div>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="updateFreteTransporte()">Atualizar</button>
                <button class="button"  @click="closeModal()">Cancelar</button>
            </footer>
        </div>
    </div>

    <!-- Observacao -->
    <div v-if="curStatusFrete == statusfrete.interrompido || curStatusFrete == statusfrete.cancelado" class="modal" v-bind:class="{'modal is-active': modal.getState()}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Atualizar Frete</p>
                <button class="delete" aria-label="close" @click="closeModal()"></button>
            </header>
            <section class="modal-card-body">
                <form class="form">
                    <div class="container">
                        <div class="division"></div>
                        <div class="container">
                            <b-field v-model="freteObservacao.observacao" label="Observacao">
                                <b-input maxlength="200" type="textarea" placeholder="..."></b-input>
                            </b-field>
                        </div>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="updateFreteObservacao()">Atualizar</button>
                <button class="button"  @click="closeModal()">Cancelar</button>
            </footer>
        </div>
    </div>
</div>

<!-- content -->
<section class="section is-small columns">
    <div class="column">
        <h2 class="title is-2">Lista de Fretes</h2>
    </div>
    <div class="column">
        <b-button tag="router-link" to="/frete/cadastrar" type="is-link">Novo Frete</b-button>
    </div>
</section>
<section class="section">
    <div class="table-container">
        <table class="table is-striped is-bordered is-narrow is-fullwidth">
            <thead>
                <tr>
                    <th>Detalhar</th>
                    <th>Frete criado em</th>
                    <th>Ultima atualizacao em</th>
                    <th>Cidade de Origem</th>
                    <th>Cidade de Destino</th>
                    <th>Produto</th>
                    <th>Status</th>
                    <th>Placa do Caminhao</th>
                    <th>Motorista</th>
                    <th>Mudar Status Para</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="frete in freteList">
                    <td><b-button class="is-medium" type="is-info">
                        <p>{{frete.id}}</p>
                        <router-link v-bind:to="'frete/' + frete.id">↗</router-link>
                    </b-button></td>
                    <td>{{ frete.cadastro}}</td>
                    <td>{{ frete.atualizado }}</td>
                    <td>{{ frete.cidadeOrigem.nome }}</td>
                    <td>{{ frete.cidadeDestino.nome }}</td>
                    <td>{{ frete.produto.nome }}</td>
                    <td>{{ frete.statusFrete }}</td>
                    <td>{{ frete.caminhao.placa }}</td>
                    <td>{{ frete.motorista.nome }}</td>
                    <td>
                        <div class="buttons">
                            <!-- btn em transporte -->
                            <div v-if="frete.statusFrete === statusfrete.carga" >
                                <b-button class="is-small" type="is-primary" outlined @click="openModal(frete, statusfrete.em_transporte)"><abbr title="Em Transporte">Et</abbr></b-button>
                            </div>
                            
                            <!-- btn descarga -->
                            <div v-if="frete.statusFrete == statusfrete.em_transporte || frete.statusFrete == statusfrete.interrompido">
                                <b-button class="is-small" type="is-primary" outlined @click="openModal(frete, statusfrete.descarga)"><abbr title="Descarga">De</abbr></b-button>
                            </div>

                            <!-- btn faturado -->
                            <div v-if="frete.statusFrete == statusfrete.descarga">
                                <b-button class="is-small" type="is-primary" outlined @click="openModal(frete, statusfrete.faturado)"><abbr title="Faturado">Fa</abbr></b-button>
                            </div>

                            <!-- btn cancelado -->
                            <div v-if="frete.statusFrete == statusfrete.carga" >
                                <b-button class="is-small" type="is-primary" outlined @click="openModal(frete, statusfrete.cancelado)"><abbr title="Cancelado">Ca</abbr></b-button>
                            </div>

                            <!-- btn interrompido -->
                            <div v-if="frete.statusFrete == statusfrete.em_transporte || frete.statusFrete == statusfrete.carga">
                                <b-button class="is-small" type="is-primary" outlined @click="openModal(frete, statusfrete.interrompido)"><abbr title="Interrompido">In</abbr></b-button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>        
    </div>
</section>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Alert from '@/util/classes/Alert'
import { AlertMsg } from '@/util/enums/AlertMsg'
import AlertSuccess from '@/components/Alerts/Success.vue'
import AlertWarning from '@/components/Alerts/Warning.vue'

import { FreteClient } from '../../client/FreteClient';
import { Frete } from '../../model/Frete';
import { StatusFrete } from '../../model/enum/StatusFrete';
import { FreteAtualizado } from '../../DTO/FreteAtualizado';
import { FreteDescarga } from '../../DTO/FreteDescarga';
import { FreteEmTransporte } from '../../DTO/FreteEmTransporte';
import { FreteObservacao } from '../../DTO/FreteObervacao';
import { UserClient } from '../../client/UserClient';
import { User } from '@/model/User';
import Modal from '@/util/classes/Modal';

class LocalStatusFrete{
    carga: string = StatusFrete[StatusFrete.CARGA]
    em_transporte: string = StatusFrete[StatusFrete.EM_TRANSPORTE]
    interrompido: string = StatusFrete[StatusFrete.INTERROMPIDO]
    descarga: string = StatusFrete[StatusFrete.DESCARGA]
    faturado: string = StatusFrete[StatusFrete.FATURADO]
    cancelado: string = StatusFrete[StatusFrete.CANCELADO]
}

@Component({
  components: {
    AlertSuccess,
    AlertWarning
  },
})

export default class FreteView extends Vue{
    private freteClient: FreteClient = new FreteClient()
    public freteList: Frete[] = []  

    private userClient: UserClient = new UserClient()
    private executor: User = new User()

    private freteAtualizado: FreteAtualizado = new FreteAtualizado()
    public freteDescarga: FreteDescarga = new FreteDescarga()
    public freteEmTransporte: FreteEmTransporte = new FreteEmTransporte()
    public freteObservacao: FreteObservacao = new FreteObservacao()

    public statusfrete: LocalStatusFrete = new LocalStatusFrete()

    public alert: Alert = new Alert()
    public modal:Modal = new Modal()

    public curFrete: Frete = new Frete()
    public curStatusFrete: string = ""

    public mounted(): void {
        this.getFretes()
        this.getUser()
        this.nullCurFrete()
    }

    private nullCurFrete(): void{
        this.curFrete.observacao = ""
        this.curFrete.quilometragemFim = 0
        this.curFrete.quilometragemIni = 0
        this.curFrete.pesoFinal = 0
        this.curFrete.pesoInicial = 0  
        this.curStatusFrete = ""

        this.freteDescarga.pesoFinal = 0
        this.freteDescarga.quilometragemFim = 0

        this.freteEmTransporte.pesoInicial = 0
        this.freteEmTransporte.quilometragemIni = 0

        this.freteObservacao.observacao = ""
    }

    public openModal(curFrete: Frete, status: string) : void{
        this.curFrete = curFrete
        this.curStatusFrete = status
        this.modal.openModal()
    }

    public closeModal() : void{
        this.modal.closeModal()
        this.nullCurFrete()
        this.$router.go(0)
    }

    private validateFreteTransporte(): boolean{
        if(this.freteEmTransporte.pesoInicial >= 100 || this.freteEmTransporte.pesoInicial <= 0)
            return false

        if(this.freteEmTransporte.quilometragemIni <= 0 || this.freteEmTransporte.quilometragemIni == null)
            return false
        
            
        return true
    }

    public updateFreteTransporte(): void{

        if(!this.validateFreteTransporte()){
            this.alert.showPopUp(false, AlertMsg.invalidField)
            this.closeModal()
            return
        }

        this.freteEmTransporte.id = this.curFrete.id
        this.freteEmTransporte.executor = this.executor

        this.freteClient.updateStatusEmTransporte(this.freteEmTransporte)
        .then(
            success => {
                this.alert.showPopUp(true, AlertMsg.success)
            },
            error => {
                console.log(error)
                this.alert.showPopUp(false, error)
            }
        )

        this.closeModal()
    }

    private validateFreteObservacao(): boolean{
        if(this.freteObservacao.observacao == null)
            return false

        return true
    }

    public updateFreteObservacao(): void{
        if(!this.validateFreteObservacao()){
            this.alert.showPopUp(false, AlertMsg.invalidField)
            this.closeModal()
            return
        }

        this.freteObservacao.id = this.curFrete.id
        this.freteObservacao.executor = this.executor

        if(this.curStatusFrete == this.statusfrete.interrompido)
            this.updateFreteInterrompido()

        if(this.curStatusFrete == this.statusfrete.cancelado)
            this.updateFreteCancelado()

        this.closeModal()
    }

    private updateFreteInterrompido(): void{
        this.freteClient.updateStatusInterrompido(this.freteObservacao)
        .then(
            success => {
                this.alert.showPopUp(true, AlertMsg.success)
            },
            error => {
                console.log(error)
                this.alert.showPopUp(false, error)
            }
        )
    }

    private updateFreteCancelado(): void{
        this.freteClient.updateStatusCancelado(this.freteObservacao)
        .then(
            success => {
                this.alert.showPopUp(true, AlertMsg.success)
            },
            error => {
                console.log(error)
                this.alert.showPopUp(false, error)
            }
        )
    }

    private validateFreteDescarga(): boolean{

        if(this.freteDescarga.pesoFinal >= 100 || this.freteDescarga.pesoFinal == null)
            return false

        if(this.freteDescarga.quilometragemFim == null)
            return false

        return true
    }

    public updateFreteDescarga(): void{

        if(!this.validateFreteDescarga()){
            this.alert.showPopUp(false, AlertMsg.invalidField)
            this.closeModal()
            return
        }

        this.freteDescarga.id = this.curFrete.id
        this.freteDescarga.executor = this.executor

        this.freteClient.updateStatusDescarga(this.freteDescarga)
        .then(
            success => {
                this.alert.showPopUp(true, AlertMsg.success)
            },
            error => {
                console.log(error)
                this.alert.showPopUp(false, error)
            }
        )

        this.closeModal()
    }

    public updateFreteFaturado(): void{
        this.freteAtualizado.id = this.curFrete.id
        this.freteAtualizado.executor = this.executor

        this.freteClient.updateStatusFaturado(this.freteAtualizado)
        .then(
            success => {
                this.alert.showPopUp(true, AlertMsg.success)
            },
            error => {
                console.log(error)
                this.alert.showPopUp(false, error)
            }
        )

        this.closeModal()
    }

    public getFretes(): void{
        this.freteClient.findAll()
        .then(
            success => {this.freteList = success},
            error => {console.log(error)}
        )
    }

    private getUser(): void {
        this.userClient.findById(4)
        .then(
            success => {this.executor = success},
            error => {console.log(error)}
        )
    }

}
</script>