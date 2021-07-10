<template>
  <div>
    <transition
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
    <!-- 此处个人理解为两种写法，其上 是通过 自定义 <transition> 结合 animate.css 实现过渡动画 -->
      <div v-show="show" class="modal" style="display:block" @click.self="close">
      <!--在DIV的v-on:click加上.self后，只有点击自身元素时，才会执行自身绑定事件，不会执行父类或子类绑定的事件。" -->
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button @click="close" class="close">×</button>
              <h4 class="modal-title">
                <slot name="title"></slot>
              </h4>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 第二种 通过 命名 <transition> 为 fade，然后在 样式 里 自己写 过渡动画 -->
    <!-- 注：如果没有 name="fade" 则用默认名 v-enter 替换 fade-enter -->
    <transition name="fade">
      <div v-show="show" class="modal-backdrop fade in" @click="close"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 触发事件以关闭弹窗
      this.$emit('update:show', false)
    }
  },
  watch: {
    show(value) {
      // 监听 show 值以切换 body 上 modal-open 类
      const bodyClassList = document.body.classList

      if (value) {
        bodyClassList.add('modal-open')
      } else {
        bodyClassList.remove('modal-open')
      }
    }
  }
}
</script>

<style scoped>
.animated { animation-duration: .4s;}
.fade-enter, .fade-leave-to { opacity: 0;}
</style>
