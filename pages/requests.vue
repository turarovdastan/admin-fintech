<template>
  <div>
    <div style="margin-top:30px;">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Имя</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Отчество</th>
            <th scope="col">Контакты</th>
            <th scope="col">Дата подачи заявки</th>
            <th scope="col" class="text-center">Статус</th>
            <th scope="col" class="text-center">Профиль</th>
            <th scope="col" class="text-center">доступы</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in items" :key="i.id">
            <th scope="row">{{i.id}}</th>
            <td>{{i.first_name}}</td>
            <td>{{i.last_name}}</td>
            <td>{{i.middle_name }}</td>
            <td>{{ i.phone || i.email}}</td>
            <td>{{ i.created | dateToCuteString}}</td>
            <td style="text-align: center;">
              <i v-if="i.status_verification === 'APPROVED'" class="tim-icons icon-check-2"></i>
              <i v-else class="tim-icons icon-simple-remove"></i>
            </td>
            <td @click="$router.push(`user/${i.user_id}`)" class="user-table" style="text-align: center;">
              <i class="tim-icons icon-single-02"></i>
            </td>
            <td @click="$router.push(`user/settings/${i.user_id}`)" class="user-table" style="text-align: center;">
              <i class="tim-icons icon-settings"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="rows > 1" class="d-flex align-items-center justify-content-center">
          <b-pagination
              size="lg"
              pills
              v-model="form.currentPage"
              :total-rows="rows"
              :per-page="form.perPage"
              aria-controls="my-table"
          ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    fetchOnServer: false,
    fetchKey: 'site-users',
    data() {
      return {
        searchModel: '',
        form:{
          perPage: 20,
          currentPage: 1,
        },
        usersTypes: [
          { value: '', text: 'Все пользователи' },
          { value: 'WAIT', text: 'Статус WAIT' },
          { value: 'APPROVED', text: 'Статус APPROVED' },
        ],
        size: 0,
        items: []
      }
    },
    async fetch() {
      this.$api.get(`/verification/waits?limit=${this.form.perPage}
        &current=${this.form.currentPage}`, this.Headers).then(data=>{
        this.items = data.data.payload.users;
        this.size = data.data.payload.size;
      })
    },
    computed: {
      rows() {
        return this.size;
      },
      Headers() {
        return {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.token
            }
        }
      }
    },
    methods: {
      refresh() {
        this.form = {
          dateFrom:'',
          dateTo:'',
          usersType: { value: '', text: 'Все пользователи' },
          perPage: this.form.perPage,
          currentPage: this.form.currentPage,
        }
        this.searchModel = ''
        this.$fetch()
      }
    },
    watch: {
      form: {
        handler() {
          this.$fetch()
        },
        deep: true,
      },
      searchModel() {
        this.form = {
          dateFrom:'',
          dateTo:'',
          usersType: { value: '', text: 'Все пользователи' },
          perPage: this.form.perPage,
          currentPage: this.form.currentPage,
        }
        this.$fetch()
      }
    },
  filters: {
    dateToCuteString(val) {
      const date = new Date(val);
      return date.toLocaleDateString('ru-RU', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
    },
  },
  }
</script>


<style lang="scss" scoped>
.user-table{
  cursor: pointer;
  &:hover{
    background: #607d8b7e;
  }
}
label {
	font-size: 0.75rem;
	font-weight: 400;
	display: block;
	margin-bottom: 0.5rem;
	color: #B0BEC5;
	border: 1px solid #ECEFF1;
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
}
input[type=date] {
	font-family: 'Roboto', sans-serif;
	display:block;
	border: none;
	border-radius: 0.25rem;
	border: 1px solid transparent;
	line-height: 1.5rem;
	padding: 0;
	font-size: 1rem;
	color: #607D8B;
	width: 100%;
  height: 40px;
  padding: 0 20px;
}
input:focus {outline: none;}
#ui-datepicker-div {
	display: none;
	background-color: #fff;
	box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.1);
	margin-top: 0.25rem;
	border-radius: 0.5rem;
	padding: 0.5rem;
}
input[type=date]{
    background: #21253E;
    color: #fff;
}
.c-table{
  width: 100%;
  @media (max-width:920px) {
    width: 1000px;
    overflow-x: scroll;
  }
}
</style>