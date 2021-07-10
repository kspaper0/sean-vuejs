<template>
  <ul v-if="totalPage > 1" class="pagination">
    <li :class="{ disabled: internalCurrentPage === 1 }">
      <a href="javascript:;" @click="changePage(internalCurrentPage - 1)">«</a>
    </li>
    <li v-for="n in totalPage" :class="{ active: internalCurrentPage === n }">
      <a href="javascript:;" @click="changePage(n)">{{ n }}</a>
    </li>
    <li :class="{ disabled: internalCurrentPage === totalPage }">
      <a href="javascript:;" @click="changePage(internalCurrentPage + 1)">»</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 数据总数
    total: {
      type: Number,
      required: true
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10,
      validator: value => value > 0
    },
    /*
    * 此处是将 Home.vue 里的 :onPageChange="changePage" 传递过来
    * 传递的值类似 :pageSize="pageSize"
    * pageSize (变量名) ： 10 (值)
    * 将 changePage 这一函数传过来， 此函数负责 将 page 放入 url (并跳转路由)
    * 所以 total 和 pageSize 控制长短
    * onPageChange 负责在 分页组件 点击 -> 跳转
    */
    // 当前页改变后的回调
    onPageChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      // 组件内的当前页
      internalCurrentPage: 1
    }
  },
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(page) {
        // 更新组件内的当前页，为父组件上 currentPage 的当前值
        this.internalCurrentPage = page
      }
    }
  },
  methods: {
    changePage(page) {
      if (page === this.internalCurrentPage || page < 1 || page > this.totalPage) return
      // 点击的不是当前页时，触发 onPageChange 回调
      this.onPageChange(page)
    }
  }
}
</script>

<style scoped>

</style>
