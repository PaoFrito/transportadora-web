<template>
<div>
<section class="section">
    <div class="container">
        <div class="columns">
            <div class="column is-one-quarter"><h2 class="title is-2">Cadastrar Frete</h2></div>
            <div class="column is-half"></div>
            <div class="column is-one-quarter">
                
                <b-tag type="is-info" size="is-large">Large</b-tag>
            </div>
        </div>
    </div>
</section>
<section class="section">
    <div class="container">
        <div class="columns">
            <div class="column is-one-quarter"></div>
            <div class="column is-half">
                <div class="box">
                    a
                </div>
            </div>
            <div class="column is-one-quarter"></div>
        </div>
    </div>
</section>
</div>
</template>

<script lang="ts">
import { Frete } from '@/model/Frete';
import Vue from 'vue'
import { Prop } from 'vue-property-decorator';

export default class DetalharFreteView extends Vue{
    @Prop() frete!:Frete
}
</script>