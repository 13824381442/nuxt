<template>
  <div class="article-meta">
    <nuxt-link :to='{ name: "profile", params: { nusename: article.author.username } }'><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <a href="" class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt | data('MMM DD,YYYY')}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'articleMeta',
  props: {
    article: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style>

</style>