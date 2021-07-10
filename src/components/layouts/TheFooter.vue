<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-5 col-lg-5">
          <p class="padding-top-xsm">{{ description }}</p>

          <div class="text-md">
            <a v-for="item in contacts" v-title="item.title" :href="item.link" :style="contactStyle" target="_blank">
              <i :class="`fa fa-${item.icon}`"></i>
            </a>
          </div>

          <br>

          <span v-html="designer"></span>
        </div>

        <div class="col-sm-6 col-lg-6 col-lg-offset-1">
          <div class="row">
            <div class="col-xs-4">
              <h4>{{ sponsor.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in sponsor.list">
                  <a :href="item.link" target="_blank">
                    <img v-title="item.title" :src="item.logo" :alt="item.title" class="footer-sponsor-link" width="98">
                  </a>
                </li>
              </ul>
            </div>

<!--             <div class="col-sm-4">
              <h4>{{ statistics.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in statistics.list">{{ item.title }}: {{ item.description }}</li>
              </ul>
            </div> -->

            <div class="col-xs-4">
              <h4>{{ other.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in other.list">
                  <a :href="item.link" :title="item.title" target="_blank">
                    <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// 引入 title.js 的默认值
import title from '@/directives/title'
import az from '../../assets/az.jpg'
import fb from '../../assets/fb.jpg'
import gg from '../../assets/gg.jpg'
import tt from '../../assets/tt.jpg'

export default {
  name: 'TheFooter',
  // 添加 directives 选项，并注册 title
  directives: {
    title
  },
  data() {
    return {
      description: 'This is developed by Vue',
      contacts: [
        {
          icon: 'envelope',
          title: 'Email Me',
          link: 'mailto:sean.kangaroo@gmail.com'
        },
        {
          icon: 'linkedin',
          title: 'Social',
          link: 'http://www.linkedin.com/in/Shuo-Kang'
        },
        {
          icon: 'weixin',
          title: '15380324',
          link: '#'
        }
      ],
      contactStyle: {
        paddingRight: '8px'
      },
      designer: `
        <span style="font-size:0.9em">Developed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="#"target="_blank"style="color:inherit">Sean</a>
        </span>
      `,
      sponsor: {
        title: 'Sponsors',
        list: [
          {
            logo: az,
            title: 'Amazon',
            link: 'https://www.amazon.com/'
          },
          {
            logo: fb,
            title: 'Facebook',
            link: 'http://www.facebook.com/'
          },
          {
            logo: gg,
            title: 'Google',
            link: 'http://www.google.com/'
          },
          {
            logo: tt,
            title: 'Twitter',
            link: 'http://www.twitter.com/'
          }
        ]
      },
      // statistics: {
      //   title: 'Statistics',
      //   list: [
      //     {
      //       title: 'Members',
      //       description: '22889'
      //     },
      //     {
      //       title: 'Topics',
      //       description: '7397'
      //     },
      //     {
      //       title: 'Comments',
      //       description: '39375'
      //     }
      //   ]
      // },
      other: {
        title: 'Other Info.',
        list: [
          {
            icon: 'thumbs-up',
            title: 'Tutorials',
            link: 'https://vuejscaff.com/contact'
          },
          {
            icon: 'globe',
            title: 'Materials',
            link: 'https://vuejscaff.com/sites'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>
