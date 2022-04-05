<template>
<div style="width:70%;">
    <h1 class="text-center display-1">Войти</h1>
    <b-card no-body class="p-5 w-full">
            <div class="c-tabs">
                <div class="c-tab" @click="tab = 0" :class="{'active' : tab === 0}">
                    Email
                </div>
                <div class="c-tab" @click="tab = 1" :class="{'active' : tab === 1}">
                    Телефон
                </div>
            </div>
            <b-card-text v-if="tab === 0">
                <label for="text-email">Email</label>
                <b-form-input style="min-height:50px;font-size: 24px;padding: 20px" v-model="email" type="email" id="text-email" placeholder="example@site.com" aria-describedby="password-help-block"></b-form-input>
                <b-button @click="email && fetchTokenEmail()" variant="success" class="my-2 py-3" style="width:100%">Далее</b-button>
            </b-card-text>
            <b-card-text v-if="tab === 1">
                <label for="text-phone">Phone</label>
                <b-form-input style="min-height:50px;font-size: 24px;padding: 20px" v-model="phone" v-mask="'(999) 999 99 99'" placeholder="+7 999 999 99 99" aria-describedby="password-help-block"></b-form-input>
                <b-button @click="phone && fetchTokenPhone()" variant="success" class="my-2 py-3" style="width:100%">Далее</b-button>
            </b-card-text>
    </b-card>
</div>
</template>


<script>
import AwesomeMask from 'awesome-mask'
export default {
    middleware:'dashboard',
    layout:'empty',
    data: () => ({
        tab:0,
        phone: '',
        email: '',
    }),
    methods: {
        async fetchTokenPhone() {
            const res = await this.$store.dispatch('fetchToken', {phone: this.phone});
            if(res) this.$router.push('/login/code?phone=' + this.phone);
        },
        async fetchTokenEmail() {
           const res = await this.$store.dispatch('fetchToken', {email: this.email});
           if(res) this.$router.push('/login/code?email=' + this.email);
        },
    },
    directives:{
        'mask':AwesomeMask,
    },
}
</script>

<style lang="scss" scoped>
.c-tabs{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
    gap: 20px;
    .c-tab{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        height: 54px;
        background-color: #e6eef9;
        z-index: 1;
        border-radius: 99px;
        transition: 0.25s ease-out;
        opacity: .7;
        cursor: pointer;
    }
    .active{
        background: #e6eef9;
        opacity: 1;
    }
}
</style>