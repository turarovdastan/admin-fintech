<template>
  <div v-if="user" class="row">
    <div class="col-md-12 d-flex justify-content-center">
      <user-card :user="user"/>
    </div>
    <div class="col-md-12">
      <edit-profile-form :showSettings="true" :data="user"/>
    </div>
  </div>
</template>
<script>
import EditProfileForm from '../../../components/UserProfile/EditProfileForm.vue';
import UserCard from '../../../components/UserProfile/UserCard.vue';

export default {
  name: 'user',
  components: {
    EditProfileForm,
    UserCard
  },
  data: () => ({
    user: null
  }),
  fetch() {
    this.$api.get(`/users/${this.$route.params.id}`, this.Headers).then(data => {
      this.user = data.data.payload.user
    })
  },
  computed: {
      Headers() {
        return {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.token
            }
        }
      }
  }
};
</script>
<style></style>
