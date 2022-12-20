<template>
    <div>
        <section class="section is-small columns">
            <div class="column">
                <h2 class="title is-2">Lista de Despesas</h2>
            </div>
            <div class="column">
                <b-button tag="router-link" to="/despesa/0" type="is-link">Nova Despesa</b-button>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-one-quarter"></div>
                    <div class="column is-half">
                        <table class="table is-striped is-bordered is-narrow is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Detalhar</th>
                                    <th>ID</th>
                                    <th>Data da Dispesa</th>
                                    <th>Ultima modificacao</th>
                                    <th>Situacao</th>
                                    <th>Tipo de despesa</th>
                                    <th>Valor</th>
                                    <th>Motorista que criou</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="despesa in despesaList">
                                    <td>
                                        <b-button tag="router-link" v-bind:to="'despesa/'+ despesa.id" class="is-medium" type="is-info">↗</b-button>
                                    </td>
                                    <td>{{ despesa.id }}</td>
                                    <td>{{ despesa.data }}</td>
                                    <td>{{ despesa.atualizado }}</td>
                                    <td><span class="tag is-info">{{aprovada(despesa)}}</span></td>
                                    <td>{{ despesa.tipoDespesa.nome }}</td>
                                    <td>{{ despesa.valor }}</td>
                                    <td>{{ despesa.motorista.nome }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="column is-one-quarter"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import AlertSuccess from '@/components/Alerts/Success.vue'

import { DespesaClient } from '@/client/DespesaClient'
import { Despesa } from '@/model/Despesa'
import { User } from '@/model/User'

@Component({
    components: {
        AlertSuccess
    },
})

export default class FreteView extends Vue {

    private despesaClient: DespesaClient = new DespesaClient()
    public despesaList: Despesa[] = []

    public mounted(): void {
        this.getDespesas()

        for (let i = 0; i < this.despesaList.length; i++) {
            if(this.despesaList[i].aprovador == null){
                this.despesaList[i].aprovador.nome = "Aguardando Aprovacao"
            }else{
                this.despesaList[i].aprovador.nome = "Aprovado"
            }
        }
    }

    public aprovada(despesa: Despesa): string{
        console.log(despesa.aprovador)
        if(despesa.aprovador == null)
            return "Aguardando aprovacao"
        else    
            return "Aprovada"
    }

    private getDespesas(): void{
        this.despesaClient.findAll()
        .then(
            success => {this.despesaList = success},
            error => {console.log(error)}
        )
    }

}
</script>