<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

    <!-- 帖子列表 -->
    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li v-for="item in filters">
              <router-link v-title="item.title" :class="{ active: filter === item.filter }" :to="`/topics?filter=${item.filter}`">{{ item.name }}</router-link>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.articleId" class="list-group-item">
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="Likes">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="Replies">{{ article.comments ? article.comments.length : 0 }}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{ article.date | moment('from') }}</abbr>
                </div>
              </router-link>
              <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
                <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{ article.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 分页组件 -->
        <div class="panel-footer text-right remove-padding-horizontal pager-footer">
          <Pagination :currentPage="currentPage" :total="total" :pageSize="pageSize" :onPageChange="changePage" />
        </div>

      </div>
    </div>
    <!-- 侧栏 -->
    <TheSidebar/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入 TheSidebar.vue 的默认值
import TheSidebar from '@/components/layouts/TheSidebar'

export default {
  name: 'Home',
  components: {
    // 局部注册 TheSidebar
    TheSidebar
  },
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
      articles: [], // 文章列表
      filter: 'default', // 默认过滤方式
      filters: [ // 过滤方式列表
        { filter: 'default', name: 'Active', title: 'Last Reply'},
        { filter: 'excellent', name: 'Featured', title: 'Featured Topics'},
        { filter: 'vote', name: 'Popular', title: 'Mostly Liked'},
        { filter: 'recent', name: 'Recent', title: 'Recent Posts'},
        { filter: 'noreply', name: 'Others', title: 'Nil Replies'}
      ],
      total: 0, // 文章总数
      pageSize: 20, // 每页条数
    }
  },
  beforeRouteEnter(to, from, next) {
    const fromName = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('Registered Successfully')
            break
          // 已登录时，从登录页面跳转过来
          case 'Login':
            // 显示登录成功
            vm.showMsg('Logged In')
            break
        }
      } else if (logout) {
        vm.showMsg('Logged Out')
      }

      // 确认渲染该组件的对应路由时，设置相关数据
      vm.setDataByFilter(to.query.filter)
    })
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ]),

    // auth() {
    //   return this.$store.state.auth
    // }
    currentPage() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('Successfully')
      }
    },
    // 监听 '$route'，在查询参数变化后，设置相关数据
    '$route'(to) {
      this.setDataByFilter(to.query.filter)
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    // 设置相关数据
    setDataByFilter(filter = 'default') {

      // 每页条数
      const pageSize = this.pageSize
      // 当前页
      const currentPage = this.currentPage
      // 过滤后的所有文章
      const allArticles = this.$store.getters.getArticlesByFilter(filter)

      this.filter = filter
      // 文章总数
      this.total = allArticles.length
      // 当前页的文章
      this.articles = allArticles.slice(pageSize * (currentPage - 1), pageSize * currentPage)

      // 设置当前过滤方式为查询参数的 filter
      //this.filter = filter
      // 设置文章列表为过滤后的所有文章
      //this.articles = this.$store.getters.getArticlesByFilter(filter)
    },
    // 回调，组件的当前页改变时调用
    changePage(page) {
      // 在查询参数中混入 page，并跳转到该地址
      // 混入部分等价于 Object.assign({}, this.$route.query, { page: page })
      this.$router.push({ query: { ...this.$route.query, page } })
    }
  }
}
</script>

<style scoped>

</style>
