<template>
  <div class="editor-page">
    <div class="container page">
      <div class='row' v-if='errors'>
          <div class="error-messages col-md-10 offset-md-1 col-xs-12">
            <div>{{errors}}</div>
          </div>
        </div>
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags" v-model="article.tagList">
                  <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="publish">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { addArticles } from '../../utils/api'
export default {
  middleware: 'authnticated',
  name: 'editor',
  data () {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: ''
      },
      errors: ''
    }
  },
  methods: {
    async publish () {
      if (this.verify()) {
        const { data } = await addArticles(this.article)
        this.$router.push({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      }
    },
    verify () {
      if (!this.article.title) {
        this.errors = 'fill in title'
        return false
      }
      if (!this.article.description) {
        this.errors = 'fill in description'
        return false
      }
      if (!this.article.body) {
        this.errors = 'fill in body'
        return false
      }
      if (!this.article.tagList) {
        this.errors = 'fill in tagList'
        return false
      }
      return true
    }
  }
}
</script>

<style>

</style>