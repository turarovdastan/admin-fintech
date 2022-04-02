<template>
  <div>
    <div class="d-flex align-items-center gap-2">
        <b-form-input style="min-heigth:70px;font-size:20px;" class="mt-2" placeholder="ФИО,телефон номер,email" id="input-1" v-model="searchModel" trim></b-form-input>
        <b-row>
          <!-- <b-col cols="12" style="margin-left:10px;">
            Тип поиска
          </b-col> -->
          <!-- <b-col cols="12" style="margin-top:-10px">
            <b-dropdown v-model="form.searchType" id="dropdown-offset" variant="dark" offset="25" :text="form.searchType.text" class="m-2" style="width:250px;">
                <b-dropdown-item v-for="(i, k) in searchTypes" :key="k" @click="form.searchType = i">{{ i.text }}</b-dropdown-item>
            </b-dropdown>
          </b-col> -->
      </b-row>
    </div>
    <b-row class="align-items-center">
      <b-col cols="3">
        <b-row>
            <b-col cols="12" style="margin-left:10px;" class="mt-2">
              Тип выбора
            </b-col>
            <b-col cols="12" style="margin-top:-10px">
              <b-dropdown v-model="form.usersType" id="dropdown-offset" variant="dark" offset="25" :text="form.usersType.text" class="m-2" style="width:200px;">
                  <b-dropdown-item v-for="(i, k) in usersTypes" :key="k" @click="form.usersType = i">{{ i.text }}</b-dropdown-item>
              </b-dropdown>
            </b-col>
        </b-row>
      </b-col>
      <b-col cols="6">
        <b-row>
          <b-col cols="6">
            С даты:
            <input v-model="form.dateFrom" type="date" class="dark" id="start" name="trip-start"/>
          </b-col>
          <b-col cols="6">
            По дате:
            <input v-model="form.dateTo" type="date" id="start" name="trip-start"/>
          </b-col>
      </b-row>
      </b-col>
      <!-- <b-col cols="2" class="mt-6">
        <b-button variant="success" class="md-4">Найти</b-button>
      </b-col> -->
    </b-row>
    <div style="margin-top:30px;">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in items" :key="i.id" @click="$router.push(`user/${i.id}`)" class="user-table">
            <th scope="row">{{i.id}}</th>
            <td>{{i.first_name}}</td>
            <td>{{i.last_name}}</td>
            <td>{{i.middle_name}}</td>
            <td>{{ i.phone || i.email}}</td>
            <td>{{ i.created | dateToCuteString}}</td>
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
    data() {
      return {
        searchModel: '',
        form:{
          dateFrom:'',
          dateTo:'',
          usersType: { value: '', text: 'Все пользователи' },
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
    fetch() {
      this.$api.get(`/users?limit=${this.form.perPage}
        &current=${this.form.currentPage}
        &type=${this.form.usersType.value}
        &dateFrom=${this.form.dateFrom}
        &dateTo=${this.form.dateTo}
        &searchModel=${this.searchModel}`, this.Headers).then(data=>{
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
    watch: {
      form: {
        handler() {
          this.$fetch()
        },
        deep: true,
        immediate: true,
      },
      searchModel() {
        this.form = {
          dateFrom:'',
          dateTo:'',
          usersType: { value: '', text: 'Все пользователи' },
          perPage: 20,
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