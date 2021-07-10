<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">Sliding Show</h3>
      </div>
      <div class="panel-body">
        <Slider :slides="slides">
          <template slot-scope="{ currentSlide }">

              <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">

          </template>
        </Slider>
      </div>
    </div>

    <!-- 活跃用户 -->
    <div class="panel panel-default corner-radius panel-active-users">
      <div class="panel-heading text-center">
        <h3 class="panel-title">Active Users</h3>
      </div>
      <div class="panel-body">
        <div class="users-label">
          <router-link v-for="(user, index) in activeUsers" :to="`/${user.name}`" :key="index" class="users-label-item">
            <!-- v-for 指令渲染活跃用户列表，但在 <router-link> 组件上使用，需要添加 key -->
            <img :src="user.avatar" class="avatar-small inline-block">
            {{ user.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- 七天内最热 -->
    <div class="panel panel-default corner-radius panel-hot-topics">
      <div class="panel-heading text-center">
        <h3 class="panel-title">Weekly Ranking</h3>
      </div>
      <div class="panel-body">
        <ul class="list">
          <li v-for="(article, index) in hotArticles">
            <router-link :to="`/articles/${article.articleId}/content`">
              <span v-if="index === 0"><i class="fa fa-star" aria-hidden="true"></i></span>
              <span v-else>{{ index + 1 }}.</span>
              {{ article.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 其他内容 -->
    <div class="other">
      <div class="panel panel-default corner-radius sidebar-resources">
        <div class="panel-heading text-center">
          <h3 class="panel-title">Resources</h3>
        </div>
        <div class="panel-body">
          <ul class="list list-group">
            <li v-for="(item, index) in resources" class="list-group-item">
              <a :href="item.link" target="_blank">
                <img class="media-object inline-block " src="../../assets/logo.png">
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="panel panel-default corner-radius">
        <div class="panel-body text-center">
          <a href="mailto:sean.kangaroo@gmail.com" style="color:#a5a5a5">
            <span style="margin-top: 7px;display: inline-block;">
              <i class="fa fa-heart" style="color: rgba(232, 146, 136, 0.89);"></i>
              Mail Me
            </span>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import project1 from '../../assets/project1.png'
import project2 from '../../assets/project2.png'
import project3 from '../../assets/project3.png'
export default {
  name: 'Sidebar',
  data() {
    return {
      // 实战课程
      slides: [
        {
          title: 'Project 1',
          img: project1,

        },
        {
          title: 'Project 2',
          img: project2,

        },
        {
          title: 'Project 3',
          img: project3,

        }
      ],
      activeUsers: [], // 活跃用户
      hotArticles: [], // 最热文章
      resources: [
        {
          title: 'Vue Official Tutorial',
          link: 'https://vuejscaff.com/v2/guide/',
        },
        {
          title: 'Vuex Official Tutorial',
          link: 'https://vuex.vuejs.org/zh/',
        },
        {
          title: 'Vue Router Official Tutorial',
          link: 'https://router.vuejs.org/zh-cn/',
        },
        {
          title: 'Vue Loader Official Tutorial',
          link: 'https://vue-loader.vuejs.org/zh-cn/',
        },
        {
          title: 'Vue Style Guide',
          link: 'https://vuejscaff.com/v2/style-guide/',
        }
      ]
    }
  },
  // 在实例创建完成后
  created() {
    // 通过 axios 执行 GET 请求来返回活跃用户
    this.$axios.get('/users/active').then((response) => {
      // 在成功的回调里，从 response.data 获取返回数据
      this.activeUsers = response.data
    })

    // 通过 axios 执行 POST 请求来返回七天内最热文章，可以传递 num 来指定返回条数
    this.$axios.post('/articles/hot', { num: 10 }).then((response) => {
      this.hotArticles = response.data
    })
  }
}
</script>

<style scoped>
.carousel-inner img {display:block;margin:auto;line-height:1;width:70%;border:1px solid #ddd;box-shadow:0 0 10px #ccc;-moz-box-shadow:0 0 10px #ccc;-webkit-box-shadow:0 0 10px #ccc;}
</style>
