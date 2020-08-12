<template>
  <div class="vote-module" :style="{ backgroundImage: 'url(' + imgSrc + ')' }">
    <div class="vote-module__content">
      <div class="vote-popularity__wrapper">
        <span class="popularity-indicator"
        :class="{'disliked': popularityComputed.likes < popularityComputed.dislikes}"
        v-if="localLikes && localDislikes > 0">
          <img src="../../assets/img/like.svg" alt="">
        </span>
        <h2 class="vote-module__name">{{name}}</h2>
      </div>
      <p v-if="!voted" class="vote-module__description">
        {{description}}
      </p>
      <p v-if="voted" class="vote-module__description">
        Thank you for voting!
      </p>
      <div class="vote-module__content__footer">
        <form v-if="!voted" class="vote-module__form">
          <fieldset>
            <div class="wrapper wrapper--like">
              <input
              :id="'like'+$props.id"
              name="popularity"
              type="radio"
              value="liked"
              v-model="selectedVote">
              <label :for="'like'+$props.id"><span class="sr-only">Like</span></label>
              <img src="../../assets/img/like.svg" alt="">
            </div>
            <div class="wrapper wrapper--dislike">
              <input
              :id="'dislike'+$props.id"
              name="popularity"
              type="radio"
              value="disliked"
              v-model="selectedVote">
              <label :for="'dislike'+$props.id"><span class="sr-only">Like</span></label>
              <img src="../../assets/img/like.svg" alt="">
            </div>
          </fieldset>
          <button
          class="button button__submit-vote"
          :class="{'button--disabled': selectedVote == ''}"
          :tabindex="selectedVote == '' ? -1 : 0"
          @click.prevent="selectedVote !== '' ? updatePopularity() : ''">
            Vote Now
          </button>
        </form>
        <button v-if="voted" class="button button__vote-again"
        @click="voteAgain" ref="voteAgainRef">
          Vote Again
        </button>
      </div>
    </div>
    <div class="vote-module__measurement">
      <span class="liked" :style="{width: popularityComputed.likes + '%'}"></span>
      <span class="disliked" :style="{width: popularityComputed.dislikes + '%'}"></span>
      <div class="vote-module__measurement-like">
        <img src="../../assets/img/like.svg" alt="Like">
        <p>{{popularityComputed.likes + '%'}}</p>
      </div>
      <div class="vote-module__measurement-dislike">
        <p>{{popularityComputed.dislikes + '%'}}</p>
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
      selectedVote: this.$props.voteIndex === 0 ? 'liked' : '',
    };
  },
  props: {
    id: String,
    name: String,
    description: String,
    likes: Number,
    dislikes: Number,
    imgSrc: String,
    voteIndex: Number,
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
      setTimeout(() => {
        this.$refs.voteAgainRef.focus();
      }, 100);
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
        likes: ((this.localLikes * 100) / rate).toFixed(1),
        dislikes: ((this.localDislikes * 100) / rate).toFixed(1),
      };
      if (this.localLikes === 0 && this.localDislikes === 0) {
        popularityObj.likes = 50;
        popularityObj.dislikes = 50;
        return popularityObj;
      }
      return popularityObj;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./voteComponent.scss" scoped>

</style>
