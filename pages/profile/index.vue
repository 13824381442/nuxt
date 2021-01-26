<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio ||''}}</p>
            <div class="btn btn-sm btn-outline-secondary action-btn" :class='{active: profile.following}' @click='follow'>
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons 
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <div class="nav-link" :class="{active: tab === 'my'}" @click="checkTab('my')">My Articles</div>
              </li>
              <li class="nav-item">
                <div class="nav-link" :class="{active: tab === 'you'}"  @click="checkTab('you')">Favorited Articles</div>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for=" item in articles" :key='item.slug'>
            <div class="article-meta">
              <nuxt-link :to='{name: "profile", params: { username: item.author.username } }'><img :src="item.author.image" /></nuxt-link>
              <div class="info">
                <a href="" class="author">{{item.author.username}}</a>
                <span class="date">{{item.createdAt | data('MMM DD,YY')}}</span>
              </div>
              <div class="btn btn-outline-primary btn-sm pull-xs-right" :class='{active: item.favorited}' @click="favorite(item)">
                <i class="ion-heart"></i> {{item.favoritesCount}}
              </div>
            </div>
            <nuxt-link :to='{ name: "article", params: { slug: item.slug } }' class="preview-link">
              <h1>{{item.title}}</h1>
              <p>{{item.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getProfiles, addFollow, deleteFollow, getArticlesFeedList, getArticlesList, favorite } from '../../utils/api'
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  async asyncData ({ params }) {
    let limit = 10, page = 1
    const [profiles, articlesLists] = await Promise.all([
      getProfiles(params.username),
      getArticlesList({ limit, page })
    ])
    return {
      profile: profiles.data.profile,
      articles: articlesLists.data.articles
    }
  },
  data () {
    return {
      tab: 'my'
    }
  },
  methods: {
    async follow () {
      try {
        const following = this.profile.following
        const { data } = following ? await deleteFollow(this.profile.username) : await addFollow(this.profile.username)
        this.profile = data.profile
      } catch (err) {
        console.log(err)
      }
    },
    async checkTab (tab) {
      const limit = 10, page = 1, author = this.profile.username
      const { data } = tab === 'my' ? await getArticlesList({ limit, page }) : await getArticlesFeedList({ limit, page, author })
      this.tab = tab
      this.articles = data.articles
    },
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