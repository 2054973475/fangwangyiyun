<template>
  <div class="song-list-container">
    <div class="song-list-content">
      <div class="header">
        <span class="title">{{songList.cat}}</span>
        <a href="JavaScript:;"
           @click.stop="classifyListState=!classifyListState"
           class="classify">选择分类<i class="icon-down"></i></a>
        <a href="JavaScript:;"
           class="hot">热门</a>
      </div>
      <div class="classifyList"
           ref="classifyList"
           v-show="classifyListState"
           @click="setClassify">
        <i class="icon-arrows"></i>
        <div class="classifyList-content">
          <h3><a href="JavaScript:;"
               data-name="全部">全部风格</a></h3>
          <div class="allClassify">
            <ul>
              <li class="classify"
                  v-for="categories,categoriesIndex in songListClassifyListCategories"
                  :key="categoriesIndex">
                <h4><img :src="categoriesImg[categoriesIndex]">{{categories}}</h4>
                <ul>
                  <li v-for="songListClassify,index in songListClassifyList.filter((item)=>item.category===Number(categoriesIndex))"
                      :key="index">
                    <a href="JavaScript:;"
                       :data-name='songListClassify.name'>{{songListClassify.name}}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="songList">
        <ul>
          <li class="song"
              v-for="song in songList.playlists"
              :key="song.id">
            <div class="coverImg">
              <img v-lazy="song.coverImgUrl">
              <div class="bottom">
                <div class="playCount">
                  <i class="bi bi-headphones"></i>
                  <span>{{alterPlayCount(song.playCount)}}</span>
                </div>
                <a href="JavaScirpt:;"
                   class="play"><i class="bi bi-play-circle"></i></a>
              </div>
              <a href="JavaScript:;"
                 :title="song.name"></a>
            </div>
            <a href="JavaScript:;"
               class="name"
               :title="song.name">{{song.name}}</a><br>
            <div class="nickname">
              <span>by</span>
              <a href="JavaScript:;"
                 :title="song.creator.nickname">{{song.creator.nickname}}</a>
              <img :src="song.creator.avatarDetail?song.creator.avatarDetail.identityIconUrl:''"
                   v-show="song.creator.avatarDetail">
            </div>

          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination :pager-count="9"
                       :page-size="35"
                       background
                       :current-page='currentPage'
                       @current-change="currentChange"
                       prev-text="< 上一页"
                       next-text="下一页 >"
                       layout="prev, pager, next"
                       :total="songList.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentPage: 1,
      query: {
        order: this.$route.query.order || 'hot',
        cat: this.$route.query.cat || '全部',
        limit: this.$route.query.limit || 35,
        offset: this.$route.query.offset || 0
      },
      classifyListState: false,
      categoriesImg: [
        require('./images/0.png'),
        require('./images/1.png'),
        require('./images/2.png'),
        require('./images/3.png'),
        require('./images/4.png')
      ]
    }
  },
  methods: {
    setClassify (event) {
      if (event.path[0].getAttribute('data-name')) {
        this.query.cat = event.path[0].getAttribute('data-name')
        this.query.limit = 35
        this.query.offset = 0
        this.query.order = 'hot'
        this.classifyListState = false
        this.currentPage = 1
        this.$router.push({
          name: 'songList',
          query: this.query
        })
        window.scrollTo(0, 0)
      }
    },
    currentChange (page) {
      this.currentPage = page
      this.query.offset = this.query.limit * (page - 1)
      this.$router.push({
        name: 'songList',
        query: this.query
      })
    },
    alterPlayCount (value) {
      if (value < 10000) {
        return value
      } else if (value < 100000000) {
        return (value / 10000).toFixed(0) + '万'
      } else if (value >= 100000000) {
        return (value / 100000000).toFixed(0) + '亿'
      }
    },
    offClassifyList (event) {
      if (event.path.indexOf(this.$refs.classifyList) === -1) {
        this.classifyListState = false
      }
    }
  },
  computed: {
    ...mapState('Home', ['songListClassifyList', 'songListClassifyListCategories', 'songList'])
  },
  watch: {
    '$route.query': {
      handler () {
        this.$store.dispatch('Home/reqSongList', this.query)
        window.scrollTo(0, 0)
      }
    },
    immediate: true,
    deep: true
  },
  mounted () {
    window.scrollTo(0, 0)
    document.addEventListener('click', this.offClassifyList)
    Object.assign(this.query, this.$route.query)
    this.currentPage = this.query.offset / 35 + 1
    this.$store.dispatch('Home/reqSongList', this.query)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.offClassifyList)
  }
}
</script>

<style lang="less" scoped>
.song-list-container {
  background-color: white;
  .song-list-content {
    padding: 40px;
    margin: auto;
    .header {
      position: relative;
      padding-bottom: 5px;
      border-bottom: 2px solid rgb(194, 12, 12);
      .title {
        font-size: 25px;
        margin-right: 10px;
      }
      .classify {
        position: absolute;
        top: 0px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        width: 75px;
        padding-right: 10px;
        font-size: 12px;
        color: rgb(12, 115, 194);
        background-color: rgb(245, 245, 245);
        border: 1px solid rgb(230, 230, 230);
        .icon-down {
          position: absolute;
          top: 40%;
          left: 80%;
          display: inline-block;
          height: 4px;
          width: 4px;
          border-left: 2px solid rgb(12, 115, 194);
          border-bottom: 2px solid rgb(12, 115, 194);
          transform: rotate(-45deg);
        }
      }
      .hot {
        position: absolute;
        right: 0;
        bottom: 8px;
        height: 29px;
        width: 46px;
        line-height: 29px;
        text-align: center;
        background-color: rgb(198, 12, 12);
        color: white;
        font-size: 12px;
        border-radius: 3px;
      }
    }
    .classifyList {
      position: absolute;
      z-index: 999;
      .icon-arrows {
        top: 5px;
        left: 10%;
        position: absolute;
        z-index: 1;
        background-color: white;
        height: 50px;
        width: 50px;
        border: 2px solid rgba(0, 0, 0, 0.15);
        transform: rotate(45deg);
      }
      .classifyList-content {
        top: 5px;
        left: -30px;
        position: relative;
        box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.3);
        z-index: 10;
        width: 700px;
        background-color: white;
        border: 2px solid rgba(0, 0, 0, 0.15);
        > h3 {
          margin: 0;
          font-weight: normal;
          padding: 20px 0px 12px 20px;
          border-bottom: 1px solid rgb(230, 230, 230);
          a {
            border: 1px solid rgba(0, 0, 0, 0.3);
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            padding: 4px 10px;
            font-size: 12px;
            color: inherit;
          }
        }
        .allClassify {
          padding: 0 20px 20px 20px;
          .classify {
            display: flex;
            h4 {
              img {
                height: 24px;
                width: 24px;
                margin-right: 10px;
                margin-bottom: 5px;
                vertical-align: middle;
              }
              margin: 0;
              width: 80px;
              font-size: 12px;
              padding: 10px 0;
              padding-top: 14px;
            }
            ul {
              padding: 10px 0;
              border-left: 2px solid rgb(230, 230, 230);
              width: 600px;
              display: flex;
              flex-wrap: wrap;
              li {
                line-height: 25px;
                a {
                  padding: 0 10px;
                  border-right: 2px solid rgb(230, 230, 230);
                  font-size: 12px;
                  color: black;
                }
              }
            }
          }
        }
      }
    }
    .songList {
      margin-top: 30px;
      ul {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        li:nth-of-type(5n-4) {
          margin-left: 0px;
        }
        .song {
          margin-left: 33.5px;
          width: 17%;
          text-align: center;
          height: 180px;
          margin-bottom: 30px;
          .coverImg {
            position: relative;
            img {
              width: 140px;
            }
            > a {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 5px;
              background-image: url('./images/coverall.png');
              background-position: 6px 0;
            }
            .bottom {
              position: absolute;
              z-index: 40;
              left: 6px;
              bottom: 5px;
              right: 6px;
              height: 27px;
              line-height: 27px;
              background-color: rgba(0, 0, 0, 0.4);
              .play {
                float: right;
                margin-right: 10px;
                color: rgb(225, 225, 225);
              }
              .playCount {
                float: left;
                color: rgb(225, 225, 225);
                span {
                  font-size: 12px;
                }
                i {
                  margin-left: 10px;
                  margin-right: 5px;
                }
              }
            }
          }
          .name {
            display: inline-block;
            width: 140px;
            font-size: 14px;
            color: black;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .nickname {
            width: 140px;
            text-align: left;
            img {
              margin-left: 5px;
              width: 14px;
              height: 14px;
            }
            span {
              position: relative;
              top: -5px;
              font-size: 12px;
              color: #999999;
              margin-right: 3px;
            }
            a {
              display: inline-block;
              max-width: 70%;
              font-size: 12px;
              color: #666666;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          a:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .pagination {
      margin: 30px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
        border-color: black;
        color: black;
      }
      .el-pagination {
        /deep/.btn-prev,
        /deep/.btn-next {
          border: 1px solid rgba(0, 0, 0, 0.2);
          span {
            font-size: 12px;
            padding: 0 10px;
          }
        }
        /deep/.active {
          background-color: rgb(206, 17, 19);
          color: white !important;
        }
        /deep/.el-pager {
          li {
            border: 1px solid rgba(0, 0, 0, 0.2);
            min-width: 0px;
            line-height: 25px;
            font-weight: normal;
            font-size: 12px;
            padding: 0 8px;
            height: 25px !important;
            margin: 0 3px;
          }
        }
      }
    }
  }
}
</style>
