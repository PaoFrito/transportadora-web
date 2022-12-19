<template>
<div>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column"><h2 class="title is-2">Informacoes do Frete</h2></div>
            </div>
        </div>
    </section>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column"></div>
                <div class="column is-four-fifths">
                    <div class="box">
                        <div>
                            <b-steps v-model=activeStep :has-navigation=false>
                                <b-step-item label="CARGA"></b-step-item>
                                <div v-for="step in historicoFrete">
                                    <b-step-item :type="{'is-info': true,'is-success': isFaturado, 'is-warning': isInterrompido, 'is-danger': isCancelado}" v-bind:label=step.statusFrete  ></b-step-item>
                                </div>
                                <div v-if="showStepFaturado">
                                    <b-step-item label="FATURADO"></b-step-item>
                                </div>
                            </b-steps>
                            <div class="columns marginTop">
                                <div class="column is-1"></div>
                                <div class="column is-2"> 
                                    <h6 class="title is-6">Cidade de Origem</h6>
                                    <span class="tag is-info">
                                        <p class="subtitle is-5 white">{{frete.cidadeOrigem.nome}}</p>
                                    </span>
                                </div>
                                <div class="column is-6"></div>
                                <div class="column is-2"> 
                                    <h6 class="title is-6">Cidade de Destino</h6>
                                    <span class="tag is-info">
                                        <p class="subtitle is-5 white">{{frete.cidadeDestino.nome}}</p>
                                    </span>
                                </div>
                                <div class="column is-1"></div>
                            </div>
                        </div>
                        <div>
                            <h4 class="title is-4">Produto transportado</h4>
                            <h4 class="subtitle is-4">{{ frete.produto.nome }}</h4>
                        </div>
                        <div class="columns">
                            <div class="column is-2"></div>
                            <div class="column">
                                <h5 class="title is-5">Peso Inicial Transportado</h5>
                                <p class="subtitle is-5">{{frete.pesoInicial}} TON</p>
                            </div>
                            <div class="column">   
                                <h5 class="title is-5">Peso Final Transportado</h5>
                                <p class="subtitle is-5">{{frete.pesoFinal}} TON</p>
                            </div>
                            <div class="column is-2"></div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <h5 class="title is-5">Total Bruto Recebido</h5>
                                <p class="subtitle is-5">{{frete.totalBrutoRecebidoNota}} TON</p>
                            </div>
                            <div class="column">
                                <h5 class="title is-5">Total Liquido Recebido</h5>
                                <p class="subtitle is-5">{{frete.totalLiquidoRecebido}} TON</p>
                            </div>
                            <div class="column">
                                <h5 class="title is-5">Preco por Tonelada</h5>
                                <p class="subtitle is-5">{{frete.precoTonelada}} TON</p>
                            </div>
                        </div>
                        <div class="section">
                            <div class="columns">
                                <div class="column is-2"></div>
                                <div class="column mt-3">
                                    <div><h4 class="title is-4">Motorista</h4></div>
                                    <div class="block text-align-left mt-5">
                                        <p><span class="title is-6">Nome:</span>  {{ frete.motorista.nome }}</p>
                                        <p><span class="title is-6">CPF:</span>  {{ frete.motorista.cpf }}</p>
                                        <p><span class="title is-6">Idade:</span>  {{ idadeMotorista }} Anos</p>
                                        <p><span class="title is-6">Telefone:</span>  {{ frete.motorista.telefone }}</p>
                                        <p><span class="title is-6">Endereco:</span>  {{ frete.motorista.endereco }}</p>
                                        <p><span class="title is-6">Grupo:</span>  {{ frete.motorista.grupo }}</p>
                                        <p><span class="title is-6">Observacao:</span>  {{ frete.motorista.observacao }}</p>
                                    </div>
                                </div>
                                <div class="vertical-divisor"></div>
                                <div class="column mt-3">
                                    <div><h4 class="title is-4">Caminhao</h4></div>
                                    <div class="block text-align-right mt-5">
                                        <p><span class="title is-6">Modelo:</span>  {{ frete.caminhao.modelo.nome }}</p>
                                        <p><span class="title is-6">Ano:</span>  {{ frete.caminhao.ano }} Anos</p>
                                        <p><span class="title is-6">Cor:</span>  {{ frete.caminhao.cor }} Anos</p>
                                        <p><span class="title is-6">Motorista Responsavel:</span>  {{ frete.caminhao.motorista.nome }}</p>
                                        <p><span class="title is-6">Observacao:</span>  {{ frete.caminhao.observacao }}</p>
                                        <p><span class="title is-6">Quilimetragem Inicial:</span>  {{ frete.quilometragemIni }}</p>
                                        <p><span class="title is-6">Quilimetragem Final:</span>  {{ frete.quilometragemFim }}</p>
                                    </div>
                                </div>
                                <div class="column is-2"></div>
                            </div>
                        </div>
                        <div class="section text-align-left">
                            <h4 class="title is-4">Observacao</h4>
                            <p class="subtitle is-6"></p>
                        </div>
                    </div>
                </div>
                <div class="column"></div>
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

import { getAge } from '@/util/functions/AgeCalculator'

import { Frete } from '@/model/Frete';
import { HistoricoFrete } from '../../model/HistoricoFrete';
import { FreteClient } from '@/client/FreteClient';
import { HistoricoFreteClient } from '@/client/HistoricoFreteClient';
import { StatusFrete } from '@/model/enum/StatusFrete';

@Component({
    components: {
    AlertSuccess,
    AlertWarning
    },
})

export default class DetalharFreteView extends Vue{

    public alert: Alert = new Alert()

    public frete: Frete = new Frete()
    private freteClient: FreteClient = new FreteClient()
    public historicoFrete: HistoricoFrete[] = []
    private historicoFreteClient: HistoricoFreteClient = new HistoricoFreteClient()
    public showStepFaturado: boolean = false
    public isFaturado: boolean = false
    public isInterrompido: boolean = false
    public isCancelado: boolean = false
    public activeStep: number = 0
    public idadeMotorista!: number
    private id!: number
    public mounted(): void {
        this.id = <number>(<unknown>this.$route.params.Freteid)
        this.getFrete()
    }

    private getFrete():void {
        this.freteClient.findById(this.id)
        .then(
            success => {this.frete = success},
            error => {console.log(error)}
        )
        .then(() =>
            this.historicoFreteClient.findByFreteId(this.frete.id)
            .then(
                success => {
                    this.historicoFrete = success
                    if(this.historicoFrete.length <= 1)
                        this.historicoFrete.shift()

                    let status: string = <string>(<unknown>this.historicoFrete[this.historicoFrete.length - 1].statusFrete)
                    let cancelado: string = StatusFrete[StatusFrete.CANCELADO]
                    let faturado: string = StatusFrete[StatusFrete.FATURADO]
                    let interrompido: string = StatusFrete[StatusFrete.INTERROMPIDO]

                    if(status != cancelado && status != faturado)
                        this.showStepFaturado = true;
                    
                    if(status == faturado)
                        this.isFaturado = true

                    if(status == cancelado)
                        this.isCancelado = true

                    if(status == interrompido)
                        this.isInterrompido = true

                    this.activeStep = this.historicoFrete.length
                    this.idadeMotorista = getAge(this.frete.motorista.dataNascimento)
                },
                error => {console.log(error)}
            )
        )
    }

}
</script>
<style>
.marginTop{
    margin-top: -55px !important;  
}

.white{
    color: #FFF !important;
}
</style>
