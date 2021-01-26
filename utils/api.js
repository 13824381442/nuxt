import { request } from '../plugins/request'

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}
// 注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
// 更新用户
export const updataUser = (data) => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}
// 首页文章列表
export const getArticlesList = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    data
  })
}
//首页关注文章列表
export const getArticlesFeedList = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    data
  })
}
// 首页筛选类
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}
// 文章点赞
export const favorite = ({ method, slug }) => {
  console.log(method, slug)
  return request({
    method,
    url: `/api/articles/${slug}/favorite`
  })
}
// 文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}
// 评论列表
export const getComment = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}
// 添加文章
export const addArticles = data => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}
// 查看用户信息
export const getProfiles = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}
// 关注
export const addFollow = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}
//取消关注
export const deleteFollow = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}
// 添加评论
export const addComment = ({ slug, body }) => {
  const data = { comment: { body } }
  console.log(data)
  return request({
    method: 'POST ',
    url: `/api/articles/${slug}/comments`,
    data
  })
}