<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AlertWarning extends Vue{
    @Prop() msg: string = "Algo inesperado!"

    mounted() {
        this.warning()
    }

    private warning() {
        this.$buefy.toast.open({
            duration: 5000,
            message: this.msg,
            type: 'is-warning'
        })
    }
}
</script>