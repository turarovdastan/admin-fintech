<template>
  <card>
    <h5 slot="header" class="title">Профиль</h5>
    <form>
      <div class="row">
        <div class="col-md-4">
          <base-input
            type="text"
            label="статус верификации"
            placeholder=""
            v-model="user.status_verification"
            :disabled="true"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="email"
            :label="user.email ? 'Email address' : 'Phone number'"
            placeholder="mike@email.com"
            :value="user.email || user.phone"
            :disabled="true"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="email"
            label="пользователь админ?"
            placeholder="mike@email.com"
            :value="user.role === 1 ? 'да' : 'нет'"
            :disabled="true"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input
            type="text"
            label="Имя"
            placeholder="First Name"
            v-model="user.first_name"
            :disabled="true"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Отчество"
            placeholder="First Name"
            v-model="user.middle_name"
            :disabled="true"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Фамилия"
            placeholder="Last Name"
            v-model="user.last_name"
            :disabled="true"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Адресс"
            placeholder="Home Address"
            v-model="user.address"
            :disabled="true"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input
            type="text"
            label="Город"
            placeholder="City"
            v-model="user.city"
            :disabled="true"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            type="text"
            label="Страна"
            placeholder="Country"
            v-model="user.country"
            :disabled="true"
          >
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input
            label="ZIP код"
            placeholder="ZIP Code"
            v-model="user.zip_index"
            :disabled="true"
          >
          </base-input>
        </div>
      </div>
      <hr>
      <div class="row documents">
        <div v-if="user.selfie" @click="openModal(user.selfie)" class="col-md-2">
          <strong>Фото лица</strong>
          <div class="row">
            <img v-for="(i,k) in user.selfie" :src="i" :key="k" class="col-md-2" alt="">
          </div>
        </div>
        <div v-if="user.passport.length"  @click="openModal(user.passport)" class="col-md-4">
          <strong>Фото паспорта</strong>
          <div class="row">
            <img v-for="(i,k) in user.passport" :src="i" :key="k" class="col-md-2" alt="">
          </div>
        </div>
        <div v-if="user.id_passport.length"  @click="openModal(user.id_passport)" class="col-md-4">
          <strong>Фото id карты</strong>
          <div class="row">
            <img v-for="(i,k) in user.id_passport" :src="i" :key="k" class="col-md-2" alt="">
          </div>
        </div>
        <div v-if="user.driver.length"  @click="openModal(user.driver)" class="col-md-4">
          <strong>Фото ВУ</strong>
          <div class="row">
            <img v-for="(i,k) in user.driver" :src="i" :key="k" class="col-md-2" alt="">
          </div>
        </div>
      </div>
      <div v-if="showSettings" class="row ml-2">
        <base-button @click="makeAdmin" v-if="user.role === 0" native-type="submit" type="primary" class="btn-fill col-md-3">
          Сделать админом
        </base-button>
        <base-button @click="dropAdmin" v-if="user.role === 1" native-type="submit" type="primary" class="btn-fill col-md-3">
          Убрать админство
        </base-button>
        <base-button @click="verify" v-if="user.status_verification === 'WAIT'" native-type="submit" type="primary" class="btn-fill col-md-3">
          Верифицировать
        </base-button>
      </div>
    </form>
    <Modal v-if="slides" :slides="slides" @close="slides=null"/>
  </card>
</template>
<script>
import Modal from './Modal.vue'
export default {
  props: {
    data: {
      type: Object
    },
    showSettings: {
      type: Boolean,
      default: false,
    }
  },
  data:() => ({
    slides: null,
  }),
  methods: {
    async verify() {
      const res = await this.$api.post(`/verification/approved`, {id:this.user.id},this.Headers)
      this.data.status_verification = 'APPROVED'  
    },
    async makeAdmin() {
      const res = await this.$api.put(`/users/${this.user.id}`, {},this.Headers)
      this.data.role = 1
    },
    async dropAdmin() {
      const res = await this.$api.delete(`/users/${this.user.id}`, this.Headers)
      this.data.role = 0  
    },
    openModal(slides) {
      this.slides = slides
    }
  },
  computed: {
    Headers() {
      return {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.token
          }
      }
    },
    user() {
      return this.data
    }
  },
  components:{
    Modal
  }
};
</script>
<style lang="scss" scoped>
input:disabled {
  color: #fff !important;
}
input{
  color: #fff !important;
}
.documents{
  margin: 30px 0 40px 0;
  .row{
    margin-top: 15px;
  }
  img{
    width: 90px;
    height: 90px;
    object-fit: cover;
    max-width: 100% !important;
  }
}
</style>
