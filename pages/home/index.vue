<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if='user'>
                <!-- v-if='user' -->
                <nuxt-link
                  exact
                  class="nav-link"
                  :class='tab === "your" ? "active" : ""'
                  :to='{ name: "home", query: { tab: "your" } }'>Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class='tab === "global" ? "active" : ""'
                  :to='{ name: "home", query: { tab: "global" } }'>Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if='$route.query.tag'>
                <nuxt-link
                  exact
                  class="nav-link"
                  :class='tab === "tab" ? "active" : ""'
                  :to='{ name: "home", query: { tab: "tab", tag: $route.query.tag } }'>#{{$route.query.tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key='article.slug'>
            <div class="article-meta">
              <nuxt-link :to='{name: "profile", params: { username: article.author.username } }'>
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to='{name: "profile", params: { username: article.author.username } }' class="author">
                  {{article.author.username}}
                </nuxt-link>
                <span class="date">{{article.createdAt | data('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class='{active: article.favorited}' @click="favorite(article)">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to='{ name: "article", params: { slug: article.slug } }' class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          
          <nav>
            <ul class='pagination'>
              <li class='page-item' :class='{ active: item === page }' v-for="item in count" :key='item'>
                <nuxt-link :to='{ name: "home", query: { page: item, tag: $route.query.tag } }' class='page-link'>
                  {{item}}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to='{ name: "home", query: { tag: tag, tab: "tab" } }' v-for="tag in tags" :key='tag' class="tag-pill tag-default">{{tag}}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticlesList, getArticlesFeedList, getTags, favorite } from '../../utils/api'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData ({ query, store }) {
    let limit = 20
    let { page = 1, tag, tab = 'global' } = query
    const { user } = store.state
    const articlesList = user && tab === 'your' ? getArticlesFeedList : getArticlesList
    const [articlesRes, tagsRes] = await Promise.all([
      articlesList({ tag, limit, offset: (Number(page) - 1) * limit }),
      getTags() 
    ])
    const { articles, articlesCount } = articlesRes.data
    const { tags } = tagsRes.data
    articles.forEach(item => { item.favoriteDdisabled = false })
    console.log(tab)
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tab
    }
  },
  computed: {
    ...mapState(['user']),
    count () {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  methods: {
    async favorite (article) {
      if (article.favoriteDdisabled) return
      const num = article.favorited ? -1 : 1
      article.favoriteDdisabled = true
      await favorite({
        method: article.favorited ? 'DELETE' : 'POST',
        slug: article.slug
      })
      article.favoritesCount += num
      article.favorited = !article.favorited
      article.favoriteDdisabled = false
    }
  }
}
</script>

<style>

</style>
