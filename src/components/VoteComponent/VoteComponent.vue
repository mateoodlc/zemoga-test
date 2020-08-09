<template>
  <div class="vote-module" :style="{ backgroundImage: 'url(' + imgSrc + ')' }">
    <div class="vote-module__content">
      <div class="vote-popularity__wrapper">
        <span class="popularity-indicator"
        :class="{'disliked': popularityComputed.likes < popularityComputed.dislikes}">
          <img src="../../assets/img/like.svg" alt="">
        </span>
        <h2 class="vote-module__name">{{name}}</h2>
      </div>
      <p class="vote-module__description">
        {{description}}
      </p>
      <div class="vote-module__content__footer">
        <form v-if="!voted">
          <fieldset>
            <label class="container container--like">
              <input type="radio" name="radio" value="liked" v-model="selectedVote">
              <img src="../../assets/img/like.svg" alt="">
              <span class="sr-only">Like</span>
              <span class="checkmark"></span>
            </label>
            <label class="container container--dislike">
              <input type="radio" name="radio" value="disliked" v-model="selectedVote">
              <img src="../../assets/img/like.svg" alt="">
              <span class="sr-only">Dislike</span>
              <span class="checkmark"></span>
            </label>
          </fieldset>
          <button
          class="button"
          :class="{'button--disabled': selectedVote == ''}"
          @click.prevent="selectedVote !== '' ? updatePopularity() : ''">
            Vote Now
          </button>
        </form>
        <button v-if="voted" class="button" @click="voteAgain">
          Vote Again
        </button>
      </div>
    </div>
    <div class="vote-module__measurement">
      <span class="liked" :style="{width: popularityComputed.likes + '%'}"></span>
      <span class="disliked" :style="{width: popularityComputed.dislikes + '%'}"></span>
      <div class="vote-module__measurement-like">
        <img src="../../assets/img/like.svg" alt="Like">
        <p>{{Math.round(popularityComputed.likes)+'%'}}</p>
      </div>
      <div class="vote-module__measurement-dislike">
        <p>{{Math.round(popularityComputed.dislikes)+'%'}}</p>
        <img src="../../assets/img/like.svg" alt="Like">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vote',
  data() {
    return {
      voted: false,
      localLikes: this.$props.likes,
      localDislikes: this.$props.dislikes,
      selectedVote: String,
    };
  },
  props: {
    id: String,
    name: String,
    description: String,
    likes: Number,
    dislikes: Number,
    imgSrc: String,
  },
  mounted() {
  },
  methods: {
    updatePopularity() {
      const voteStatus = this.selectedVote === 'liked';
      this.voted = true;
      if (voteStatus) {
        this.localLikes += 1;
      } else {
        this.localDislikes += 1;
      }
      const votesParams = {
        id: this.$props.id,
        name: this.$props.name,
        description: this.$props.description,
        likes: this.localLikes,
        dislikes: this.localDislikes,
        imgSrc: this.$props.imgSrc,
      };
      this.$parent.updateVotes(votesParams);
    },
    voteAgain() {
      this.voted = false;
      this.selectedVote = '';
    },
  },
  computed: {
    popularityComputed() {
      const rate = this.localLikes + this.localDislikes;
      const popularityObj = {
        likes: (this.localLikes * 100) / rate,
        dislikes: (this.localDislikes * 100) / rate,
      };
      return popularityObj;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./voteComponent.scss" scoped>

</style>
