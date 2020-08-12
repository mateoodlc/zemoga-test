<template>
  <div id="app">
    <div class="max-bound outer-pad">
      <section class="vote-section component-spacer">
        <h2 class="heading--dark">Previous Rulings</h2>
        <div class="vote-section__container">
          <div class="vote-module__wrapper"
            v-for="(vote, index) of votesData"
            :index="index" :key="vote.id">
          <vote-component
            :voteIndex="index"
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
import DatabaseConstants from './DatabaseConstants';
import Fetch from './Fetch';

export default {
  name: 'App',
  data() {
    return {
      votesData: [],
      fetch: new Fetch(),
    };
  },
  components: {
    VoteComponent,
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.votesData = await this.fetch.getCollection(DatabaseConstants.VOTES_COLLECTION);
    },
    updateVotes(votesStatus) {
      this.fetch.updateDocument(DatabaseConstants.VOTES_COLLECTION, votesStatus);
    },
  },
};
</script>

<style lang="scss">
#app {
}
</style>
