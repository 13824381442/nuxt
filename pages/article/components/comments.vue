<template>
  <div>
    <form class="card comment-form" v-if='user'>
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="comment-author-img" />
        <div class="btn btn-sm btn-primary" @click="addComment">
          Post Comment
        </div>
      </div>
    </form>
    
    <div class="card" v-for='item in comments' :key='item.id'>
      <div class="card-block">
        <p class="card-text">{{item.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to='{ name: "profile", params: { nusename: item.author.username } }' class="comment-author">
          <img :src="item.author.image" class="comment-author-img"  />
        </nuxt-link>
        &nbsp;
        <a href="" class="comment-author">{{item.author.username}}</a>
        <span class="date-posted">{{item.createdAt | data('MMM DD,YY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComment, addComment } from '../../../utils/api'
import { mapState } from 'vuex'
export default {
  name: 'Comments',
  data () {
    return {
      comments: [],
      body: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.getComments()
    console.log(this.user, 123456)
  },
  methods: {
    async getComments () {
      console.log(this.$route.params.slug)
      const { data } = await getComment(this.$route.params.slug)
      if (data.comments.length > 0) {
        this.comments = data.comments
      }
    },
    async addComment () {
      if (this.body) {
        try {
          const { data } = await addComment({ slug: this.$route.params.slug,  body: this.body })
          this.comments.unshift(data.comment)
        } catch (err) {
          console.dir(err)
        }
      }
    }
  }
}
</script>

<style>

</style>