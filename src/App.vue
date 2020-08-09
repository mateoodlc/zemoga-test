<template>
  <div id="app">
    <div class="max-bound outer-pad">
      <section class="vote-section">
        <h2 class="heading--dark">Previous Rulings</h2>
        <div class="vote-section__container">
          <div class="vote-module__wrapper"
            v-for="(vote, index) of votesData"
            :index="index" :key="vote.id">
          <vote-component
            :id="vote.id"
            :name="vote.name"
            :description="vote.description"
            :likes="vote.likes"
            :dislikes="vote.dislikes"
            :imgSrc="vote.imgSrc"
          ></vote-component>
        </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import VoteComponent from './components/VoteComponent/VoteComponent.vue';

export default {
  name: 'App',
  data() {
    return {
      votesData: [],
    };
  },
  components: {
    VoteComponent,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await fetch('./assets/data.json');
        const data = await response.json();
        console.log(data);
        this.votesData = await data.votes;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
