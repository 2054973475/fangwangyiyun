<template>
  <div class="home-container">
    <div class="home-nav">
      <div class="nav">
        <ul>
          <li v-for="(nav,index) in navList"
              :key="index"
              @click="setNavIndex(nav.id)">
            <router-link :to="{name:nav.path}"
                         :data-index='index'>
              <span :class="navIndex===index?'nav-active':''">{{nav.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navIndex: 0,
      // '推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架'
      navList: [
        { id: 0, title: '推荐', path: 'homePage' },
        { id: 1, title: '排行榜', path: 'rankingList' },
        { id: 2, title: '歌单', path: 'songList' },
        { id: 3, title: '主播电台', path: 'homePage' },
        { id: 4, title: '歌手', path: 'artist' },
        { id: 5, title: '新碟上架', path: 'homePage' }
      ]
    }
  },
  methods: {
    setNavIndex (id) {
      this.navIndex = id
    }
  },
  watch: {
    $route (value) {
      // console.log(value)
    }
  },
  mounted () {
    this.$store.dispatch('Home/mockReqSongListClassifyList')
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .home-nav {
    height: 30px;
    background-color: rgb(194, 12, 12);
    .nav {
      width: 982px;
      margin: auto;
      @media screen and (min-width: 1030px) {
        ul {
          margin-left: 12%;
        }
      }
      @media screen and (max-width: 1030px) {
        ul {
          margin-left: 18%;
        }
      }
      ul {
        display: flex;
        a {
          text-decoration: none;
          .nav-active {
            background-color: rgb(155, 9, 9);
            border-radius: 20px;
          }
          span {
            color: white;
            font-size: 13px;
            padding: 2px 10px;
            margin: 0 20px;
            pointer-events: none;
          }
        }
        a:hover span {
          background-color: rgb(155, 9, 9);
          border-radius: 20px;
        }
      }
    }
  }
  .home-content {
    width: 982px;
    margin: auto;
  }
}
</style>
