<template>
  <card class="card-user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" :src="user.image || 'https://shamrocktools.com/spt-content/uploads/2017/09/blankdirectory.png'" alt="..." />
        <h5 class="title">{{`${user.first_name || ''} ${user.last_name || ''} ${user.middle_name || ''}`}}</h5>
      </a>
      <p class="description">{{ user.dob | dateToCuteString}}</p>
    </div>
    <p></p>
    <div class="card-description">
    </div>

    <!-- <div slot="footer" class="button-container">
      <base-button class="btn-facebook" icon round>
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button class="btn-twitter" icon round>
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button class="btn-google" icon round>
        <i class="fab fa-google-plus"></i>
      </base-button>
    </div> -->
  </card>
</template>
<script>
export default {
  props: {
    user:{
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.user);
  },
  filters: {
    dateToCuteString(val) {
      if(!val) return ''
      const date = new Date(val);
      return date.toLocaleDateString('ru-RU', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
    },
  },
};
</script>
<style></style>
