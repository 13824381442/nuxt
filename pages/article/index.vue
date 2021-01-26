<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>

        <articleMeta :article='article'></articleMeta>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <articleMeta :article='article'></articleMeta>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <Comments></Comments>
          
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticle } from '../../utils/api'
import markdown from 'markdown-it'
import articleMeta from './components/meta.vue'
import Comments from './components/comments.vue'
export default {
  name: 'ArticleIndex',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const md = new markdown()
    data.article.body = md.render(data.article.body)
    return {
      article: data.article
    }
  },
  components: {
    articleMeta,
    Comments
  }
}
</script>

<style>

</style>