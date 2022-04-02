<template>
<div style="width:70%;">
    <h1 class="text-center display-1">Напишите код</h1>
    <b-card no-body class="p-5 w-full">
            <b-card-text>
                <label for="text-phone">Код</label>
                <b-form-input style="min-height:50px;font-size: 24px;padding: 20px" v-mask="'99 99'" v-model="code" placeholder="00 00" aria-describedby="password-help-block"></b-form-input>
                <div v-if="seconds" style="margin:10px;">Запросить код можно через {{seconds}} сек.</div>
                <div v-else @click="getCode" style="margin:10px;" class="req-code">Запросить код.</div>
                <b-button @click="signIn" variant="success" class="my-2 py-3" style="width:100%">Далее</b-button>
            </b-card-text>
    </b-card>
</div>
</template>


<script>
import AwesomeMask from 'awesome-mask'
export default {
    layout:'empty',
    data: () => ({
        code: '',
        seconds: 30,
    }),
    methods: {
        async signIn() {
            const res = await this.$store.dispatch('signIn', { otp: this.code.split(' ').join('') })
            if(res) this.$router.push('/');
        },
        setTimer() {
            const time = setInterval(() => {
                this.seconds -= 1;
                if(this.seconds === 0) clearInterval(time)
            }, 1000)
        },
        async getCode() {
            this.seconds = 60
            const res = await this.$store.dispatch('fetchToken', this.contact);
            this.setTimer()
        }
    },
    mounted() {
        this.setTimer()
        this.$route.query.email
    },
    computed: {
        contact() {
            const email = this.$route.query.email
            const phone = this.$route.query.phone
            if(email){
                return {
                    email
                }
            }
            return {
                phone
            }
        }
    },
    directives:{
        'mask':AwesomeMask,
    }
}
</script>

<style lang="scss" scoped>
.req-code{
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
}

</style>