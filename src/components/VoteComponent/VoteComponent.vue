<template>
  <div class="vote-module" :style="{ backgroundImage: 'url(' + imgSrc + ')' }">
    <div class="vote-module__content">
      <div class="vote-popularity__wrapper">
        <span class="popularity-indicator" :class="{'disliked': likes < dislikes}">
          <img src="../../assets/img/like.svg" alt="">
        </span>
        <h2 class="vote-module__name">{{name}}</h2>
      </div>
      <p class="vote-module__description">
        {{description}}
      </p>
      <div class="vote-module__content__footer">
        <form action="submit">
          <fieldset>
            <label class="container container--like">
              <input type="radio" name="radio">
              <img src="../../assets/img/like.svg" alt="">
              <span class="sr-only">Like</span>
              <span class="checkmark"></span>
            </label>
            <label class="container container--dislike">
              <input type="radio" name="radio">
              <img src="../../assets/img/like.svg" alt="">
              <span class="sr-only">Dislike</span>
              <span class="checkmark"></span>
            </label>
          </fieldset>
          <button class="button" type="submit">Vote Now</button>
        </form>
      </div>
    </div>
    <div class="vote-module__measurement">
      <span class="liked" :style="{width: popularityComputed.likes + '%'}"></span>
      <span class="disliked" :style="{width: popularityComputed.dislikes + '%'}"></span>
      <div class="vote-module__measurement-like">
        <img src="../../assets/img/like.svg" alt="Like">
        <p>{{popularityComputed.likes+'%'}}</p>
      </div>
      <div class="vote-module__measurement-dislike">
        <p>{{popularityComputed.dislikes+'%'}}</p>
        <img src="../../assets/img/like.svg" alt="Like">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vote',
  props: {
    id: Number,
    name: String,
    description: String,
    likes: Number,
    dislikes: Number,
    imgSrc: String,
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    popularityComputed() {
      const rate = this.$props.likes + this.$props.dislikes;
      const popularityObj = {
        likes: (this.$props.likes * 100) / rate,
        dislikes: (this.$props.dislikes * 100) / rate,
      };
      return popularityObj;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="./voteComponent.scss" scoped>

</style>
