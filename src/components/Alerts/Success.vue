<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AlertSuccess extends Vue{
    @Prop() msg: string = "Sucesso!"

    mounted() {
        this.success()
    }

    private success() {
        this.$buefy.toast.open({
            duration: 5000,
            message: this.msg,
            type: 'is-success'
        })
    }
}
</script>