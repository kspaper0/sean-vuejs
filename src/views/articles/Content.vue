<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body content-body">
      <h1 class="text-center">{{ title }}</h1>
      <div class="article-meta text-center">
        <i class="fa fa-clock-o"></i>
        <abbr>{{ date | moment('from') }}</abbr>
      </div>
      <div class="entry-content">
        <div class="content-body entry-content panel-body ">
          <div class="markdown-body" v-html="content"></div>

          <div v-if="auth && uid === 1" class="panel-footer operate">
            <div class="actions">
              <a @click="deleteArticle" class="admin" href="javascript:;"><i class="fa fa-trash-o"></i></a>
              <a @click="editArticle" class="admin" href="javascript:;"><i class="fa fa-pencil-square-o"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 点赞 -->
    <div class="votes-container panel panel-default padding-md">
      <div class="panel-body vote-box text-center">
        <div class="btn-group">
          <a @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="likeClass">
            <i class="fa fa-thumbs-up"></i> {{ likeClass ? 'Liked' : 'Like' }}
          </a>
          <div class="or"></div>
          <button @click="showQrcode = true" class="btn btn-success"><i class="fa fa-heart"></i> Donate</button>
        </div>
        <div class="voted-users">
          <div class="user-lists">
            <span v-for="likeUser in likeUsers">
              <!-- 点赞用户是当前用户时，加上类 animated 和 swing 以显示一个特别的动画  -->
              <router-link :to="`/${likeUser.uname}`" :src="likeUser.uavatar" tag="img" class="img-thumbnail avatar avatar-middle" :class="{ 'animated swing' : likeUser.uid === 1 }"></router-link>
            </span>
          </div>
          <div v-if="!likeUsers.length" class="vote-hint">Would you like to be the first one ?</div>
        </div>
      </div>
    </div>

    <!-- 打赏弹窗 -->
    <Modal :show.sync="showQrcode" class="text-center">
      <div v-if="user" slot="title">
        <img :src="user.avatar" class="img-thumbnail avatar" width="48">
      </div>
      <div>
        <p class="text-md">This is for test purpose</p>
        <div class="payment-qrcode inline-block">
          <h5>Learn more at VuejsCaff.com</h5>
          <p><qrcode-vue value="https://vuejscaff.com/" :size="160"></qrcode-vue></p>
        </div>
      </div>
      <div slot="footer">
        <div class="text-center">Thank you :)</div>
      </div>
    </Modal>

    <!-- 评论列表 -->
    <div class="replies panel panel-default list-panel replies-index">
      <div class="panel-heading">
        <div class="total">
          Replies: <b>{{ comments.length }}</b>
        </div>
      </div>
      <div class="panel-body">
        <transition-group id="reply-list" name="fade" tag="ul" class="list-group row">
          <li v-for="(comment, index) in comments" :key="comment.commentId" class="list-group-item media">
            <div class="avatar avatar-container pull-left">
              <router-link :to="`/${comment.uname}`">
                <img :src="comment.uavatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-link>
            </div>
            <div class="infos">
              <div class="media-heading">
                <router-link :to="`/${comment.uname}`" class="remove-padding-left author rm-link-color">
                  {{ comment.uname }}
                </router-link>

                <!-- 编辑删除图标 -->
                <span v-if="auth" class="operate pull-right">
                  <span v-if="comment.uid === 1">
                    <a href="javascript:;" @click="editComment(comment.commentId, index)"><i class="fa fa-edit"></i></a>
                      <span> ⋅ </span>
                      <a href="javascript:;" @click="deleteComment(comment.commentId)"><i class="fa fa-trash-o"></i></a>
                  </span>
                </span>

                <div class="meta">
                  <a :id="`reply${index + 1}`" :href="`#reply${index + 1}`" class="anchor">#{{ index + 1 }}</a>
                  <span> ⋅ </span>
                  <abbr class="timeago">
                    {{ comment.date | moment('from', { startOf: 'second' }) }}
                  </abbr>
                </div>
              </div>

              <div class="preview media-body markdown-reply markdown-body" v-html="comment.content"></div>
            </div>
          </li>
        </transition-group>
        <div v-show="!comments.length" class="empty-block">
          No comments yet ~~
        </div>
      </div>
    </div>

    <!-- 评论框 -->
    <div id="reply-box" class="reply-box form box-block">
      <div class="form-group comment-editor">
        <textarea v-if="auth" id="editor"></textarea>
        <textarea v-else disabled class="form-control" placeholder="Please login first to comment" style="height:172px"></textarea>
      </div>
      <div class="form-group reply-post-submit">
        <button id="reply-btn" :disabled="!auth" @click="comment" class="btn btn-primary">
          {{ commentId ? 'Save' : 'Reply' }}
        </button>
        <span v-show="commentId" class="help-inline btn-cancel" style="cursor:pointer" @click="cancelEditComment">Cancel</span>
        <span v-show="!commentId" class="help-inline">Ctrl+Enter</span>
      </div>
      <div v-show="commentHtml" id="preview-box" class="box preview markdown-body" v-html="commentHtml"></div>
    </div>

  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
import { mapState } from 'vuex'
// 引入 qrcode.vue 的默认值
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Content',
  components: {
    QrcodeVue
  },
  data() {
    return {
      title: '', // 文章标题
      content: '', // 文章内容
      date: '', // 文章创建时间
      uid: 1, // 用户 ID
      likeUsers: [], // 点赞用户列表
      likeClass: '', // 点赞样式
      showQrcode: false, // 是否显示打赏弹窗
      commentHtml: '', // 评论 HTML
      comments: [], // 评论列表
      commentId: undefined, // 评论 ID
    }
  },
  computed: {
    ...mapState([
      'auth',
      'user'
    ])
  },
  created() {
    const articleId = this.$route.params.articleId
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      // 获取当前文章的 likeUsers
      // 获取文章的 comments
      let { uid, title, content, date, likeUsers, comments } = article

      this.uid = uid
      this.title = title
      this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
      this.date = date
      // 更新实例的 likeUsers
      this.likeUsers = likeUsers || []
      // 更新 likeClass，点赞用户列表包含当前用户时，赋值为 active，表示已赞
      this.likeClass = this.likeUsers.some(likeUser => likeUser.uid === 1) ? 'active' : ''
      // 渲染文章的 comments
      this.renderComments(comments)

      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightBlock(el)
        })
      })
    }

    this.articleId = articleId
  },

  mounted() {
    // 已登录时，才开始创建
    if (this.auth) {
      // 自动高亮编辑器的内容
      window.hljs = hljs

      const simplemde = new SimpleMDE({
        element: document.querySelector('#editor'),
        placeholder: 'Please use Markdown Format ;-)，Please use highlight for code snippet pasted.',
        spellChecker: false,
        autoDownloadFontAwesome: false,
        // 不显示工具栏
        toolbar: false,
        // 不显示状态栏
        status: false,
        renderingConfig: {
          codeSyntaxHighlighting: true
        }
      })

      // 内容改变监听
      simplemde.codemirror.on('change', () => {
        // 更新 commentMarkdown 为编辑器的内容
        this.commentMarkdown = simplemde.value()
        // 更新 commentHtml，我们先替换原内容中的 emoji 标识，然后使用 markdown 方法将内容转成 HTML
        this.commentHtml = simplemde.markdown(emoji.emojify(this.commentMarkdown, name => name))
      })

      // 按键松开监听
      simplemde.codemirror.on('keyup', (codemirror, event) => {
        // 使用 Ctrl+Enter 时提交评论
        if (event.ctrlKey && event.keyCode === 13) {
          this.comment()
        } else if (this.commentId && event.keyCode === 27) { // 存在 commentId，且按下 Esc 键时
          // 取消编辑评论
          this.cancelEditComment()
        }
      })

      // 将编辑器添加到当前实例
      this.simplemde = simplemde
    }
  },

  methods: {
    editArticle() {
      this.$router.push({ name: 'Edit', params: { articleId: this.articleId } })
      // 此处只是跳转页面，但不操作逻辑
    },
    deleteArticle() {
      this.$swal({
        text: 'Are you sure to delete the article ?',
        confirmButtonText: 'Yes'
      }).then((res) => {
        if (res.value) {
          this.$store.dispatch('post', { articleId: this.articleId })
        }
      })
    },
    like(e) {
      // 未登录时，提示登录
      if (!this.auth) {
        this.$swal({
          text: 'Please login first',
          confirmButtonText: 'Proceed'
        }).then((res) => {
          if (res.value) {
            this.$router.push('/auth/login')
          }
        })
      } else {
        const target = e.currentTarget
        // 点赞按钮是否含有 active 类，我们用它来判断是否已赞
        const active = target.classList.contains('active')
        const articleId = this.articleId

        if (active) {
          // 清除已赞样式
          this.likeClass = ''
          // 分发 like 事件取消赞，更新实例的 likeUsers 为返回的值
          this.$store.dispatch('like', { articleId }).then((likeUsers) => {
            // 使用带用户信息的点赞用户
            this.likeUsers = this.recompute('likeUsers')
          })
        } else {
          // 添加已赞样式
          this.likeClass = 'active animated rubberBand'
          // 分发 like 事件，传入 isAdd 参数点赞，更新实例的 likeUsers 为返回的值
          this.$store.dispatch('like', { articleId, isAdd: true }).then((likeUsers) => {
            // 使用带用户信息的点赞用户
            this.likeUsers = this.recompute('likeUsers')
          })
        }
      }
    },

    comment() {
      if (this.commentMarkdown && this.commentMarkdown.trim() !== '') {
        this.$store.dispatch('comment', {
          comment: { content: this.commentMarkdown },
          articleId: this.articleId,
          commentId: this.commentId
        }).then(this.renderComments) // 在 .then 的回调里，调用 this.renderComments 渲染评论

        if (this.commentId) { // 有 commentId 时，取消编辑评论
          this.cancelEditComment()
        } else { // 没有 commentId 时，写入原来的逻辑
          this.simplemde.value('')
          document.querySelector('#reply-btn').focus()

          // 将最后的评论滚动到页面的顶部
          this.$nextTick(() => {
            const lastComment = document.querySelector('#reply-list li:last-child')
            if (lastComment) lastComment.scrollIntoView(true)
          })
        }
      }
    },

    renderComments(comments) {
      if (Array.isArray(comments)) {
        // 使用带用户信息的评论
        comments = this.recompute('comments')
        // 深拷贝 comments 以不影响其原值
        const newComments = comments.map(comment => ({ ...comment }))
        const user = this.user || {}

        for (let comment of newComments) {
          // comment.uname = user.name
          // comment.uavatar = user.avatar
          // 将评论内容从 Markdown 转成 HTML
          comment.content = SimpleMDE.prototype.markdown(emoji.emojify(comment.content, name => name))
        }

        // 更新实例的 comments
        this.comments = newComments
        // 将 Markdown 格式的评论添加到当前实例
        this.commentsMarkdown = comments
      }
    },

    // 编辑评论
    editComment(commentId, commentIndex) {
      // 编辑器
      const simplemde = this.simplemde
      // 编辑器
      const codemirror = simplemde.codemirror
      // Markdown 格式的所有评论
      const comments = this.commentsMarkdown

      for (const comment of comments) {
        // 找到与 commentId 对应的评论时
        if (parseInt(comment.commentId) === parseInt(commentId)) {
          // 设置编辑器的内容
          simplemde.value(comment.content)
          // 使编辑器获得焦点
          codemirror.focus()
          // 将光标移到内容的后面
          codemirror.setCursor(codemirror.lineCount(), 0)
          // 评论索引 + 1，用来指示页面滚动的位置
          this.commentIndex = commentIndex + 1
          // 更新 commentId
          this.commentId = commentId
          break
        }
      }
    },

    // 取消编辑评论
    cancelEditComment() {
      // 清除 commentId
      this.commentId = undefined
      // 清空编辑器
      this.simplemde.value('')

      // 下次 DOM 更新后，将评论滚动回视图的顶部
      this.$nextTick(() => {
        if (this.commentIndex === undefined) return
        const currentComment = document.querySelector(`#reply-list li:nth-child(${this.commentIndex})`)

        if (currentComment) {
          currentComment.scrollIntoView(true)
          currentComment.querySelector('.operate a').focus()
        }
      })
    },

    // 删除评论
    deleteComment(commentId) {
      this.$swal({
        text: 'Are you sure to delete the comment ?',
        confirmButtonText: 'Delete'
      }).then((res) => {
        if (res.value) {
          // 此时不用传入 comment
          this.$store.dispatch('comment', {
            commentId,
            articleId: this.articleId
          }).then(this.renderComments)
          this.cancelEditComment()
        }
      })
    },

    // 返回带用户信息的文章的某项属性
    recompute(key) {
      const articleId = this.$route.params.articleId
      // 这里的文章是基于 getters.computedArticles 的，所以包含用户信息了
      const article = this.$store.getters.getArticleById(articleId)
      let arr

      if (article) {
        arr = article[key]
      }

      return arr || []
    },
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .5s;}
.fade-enter, .fade-leave-to { opacity: 0;}
</style>
