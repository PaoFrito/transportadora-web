<template>
<div>
<!-- modals -->    
<div>
    <!-- Atualizado -->
    <div  class="modal" v-bind:class="{'modal is-active': showModal}">
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
                <button class="button is-success">Atualizar</button>
                <button class="button"  @click="closeModal()">Cancelar</button>
            </footer>
        </div>
    </div>
    
    <!-- Descarga -->
    <div v-if="curStatusFrete == statusfrete.descarga" class="modal" v-bind:class="{'modal is-active': showModal}">
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
                                    v-model="frete.quilometragemFim"
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
                                    v-model="frete.pesoFinal"
                                ></b-numberinput>
                            </b-field>
                        </div>  
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Atualizar</button>
                <button class="button"  @click="closeModal()">Cancelar</button>
            </footer>
        </div>
    </div>

    <!-- Em transporte -->
    <div v-if="curStatusFrete == statusfrete.em_transporte" class="modal" v-bind:class="{'modal is-active': showModal}">
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
                                    v-model="frete.quilometragemFim"
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
                                    v-model="frete.pesoFinal"
                                ></b-numberinput>
                            </b-field>
                        </div>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Atualizar</button>
                <button class="button"  @click="closeModal()">Cancelar</button>
            </footer>
        </div>
    </div>

    <!-- Observacao -->
    <div v-if="curStatusFrete == statusfrete.em_transporte" class="modal" v-bind:class="{'modal is-active': showModal}">
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
                            <b-field v-model="frete." label="Observacao">
                                <b-input maxlength="200" type="textarea" placeholder="..."></b-input>
                            </b-field>
                        </div>
                    </div>
                </form>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success">Atualizar</button>
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
import Vue from 'vue';
import Component from "vue-class-component";

import { FreteClient } from '../../client/FreteClient';
import { Frete } from '../../model/Frete';
import { StatusFrete } from '../../model/enum/StatusFrete';
import { FreteAtualizado } from '../../DTO/FreteAtualizado';
import { FreteDescarga } from '../../DTO/FreteDescarga';
import { FreteEmTransporte } from '../../DTO/FreteEmTransporte';
import { FreteObservacao } from '../../DTO/FreteObervacao';

class LocalStatusFrete{
    carga: string = StatusFrete[StatusFrete.CARGA]
    em_transporte: string = StatusFrete[StatusFrete.EM_TRANSPORTE]
    interrompido: string = StatusFrete[StatusFrete.INTERROMPIDO]
    descarga: string = StatusFrete[StatusFrete.DESCARGA]
    faturado: string = StatusFrete[StatusFrete.FATURADO]
    cancelado: string = StatusFrete[StatusFrete.CANCELADO]
}

@Component
export default class FreteView extends Vue{
    private freteClient: FreteClient = new FreteClient()
    public freteList: Frete[] = []

    public freteAtualizado: FreteAtualizado = new FreteAtualizado()
    public freteDescarga: FreteDescarga = new FreteDescarga()
    public freteEmTransporte: FreteEmTransporte = new FreteEmTransporte()
    public freteObservacao: FreteObservacao = new FreteObservacao()

    public statusfrete: LocalStatusFrete = new LocalStatusFrete

    public showModal: boolean = false

    public curFrete: Frete = new Frete()
    public curStatusFrete: string = ""

    public mounted(): void {
        this.getFretes()
        this.nullCurFrete()

    }

    private nullCurFrete(): void{
        this.curFrete.observacao = ""
        this.curFrete.quilometragemFim = 0
        this.curFrete.quilometragemIni = 0
        this.curFrete.pesoFinal = 0
        this.curFrete.pesoInicial = 0  
    }

    public openModal(curFrete: Frete, status: string) : void{
        this.curFrete = curFrete
        this.curStatusFrete = status
        this.showModal = true
    }

    public closeModal() : void{
        this.showModal = false
        this.nullCurFrete()
    }

    public updateFrete(): void{

    }

    public async getFretes(): Promise<void>{
        this.freteList = await this.freteClient.findAll()
    }

}
</script>