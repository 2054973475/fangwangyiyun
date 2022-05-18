<template>
  <div class="rangking-list-container">
    <div class="left">
      <div class="title">云音乐特色榜</div>
      <ul>
        <li v-for="rankingClassify,index in rankingClassifyList.slice(0,4)"
            :key="index"
            :class="params.id===String(rankingClassify.id)?'active':''"
            @click="setRankingClassifyId(rankingClassify.id)">
          <a href="JavaScript:;">
            <img :src="rankingClassify.coverImgUrl">
            <div>
              <span class="name">{{rankingClassify.name}}</span><br>
              <span class="updateFrequency">{{rankingClassify.updateFrequency}}</span>
            </div>
          </a>
        </li>
      </ul>
      <div class="title"
           style="margin-top: 20px;">全球媒体榜</div>
      <ul>
        <li v-for="rankingClassify,index in rankingClassifyList.slice(4,100)"
            :key="index"
            :class="params.id===rankingClassify.id?'active':''"
            @click="setRankingClassifyId(rankingClassify.id)">
          <a href="JavaScript:;">
            <img :src="rankingClassify.coverImgUrl">
            <div>
              <span class="name">{{rankingClassify.name}}</span><br>
              <span class="updateFrequency">{{rankingClassify.updateFrequency}}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="header"
           v-if="rankingClassify!==undefined&&rankingDetails.code!==undefined">
        <img :src="rankingClassify.coverImgUrl">
        <div class="header-content">
          <div class="name">{{rankingClassify.name}}</div>
          <div class="updateFrequency">
            <i class="bi bi-clock"></i>
            最近更新：{{updateFrequency(rankingClassify.trackNumberUpdateTime)}}
            <span class="frequency">({{rankingClassify.updateFrequency}})</span>
          </div>
          <div class="buttons">
            <a class="play">播放</a>
            <a class="addPlayList"></a>
            <a class="collect"><span>({{rankingClassify.subscribedCount}})</span></a>
            <a class="share"><span>({{rankingDetails.shareCount}})</span></a>
            <a class="download"><span>下载</span></a>
            <a class="comment"><span>({{rankingDetails.commentCount}})</span></a>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="body-header">
          <div class="title">歌曲列表</div>
          <div class="songNumber">100首歌</div>
          <div class="playCount">播放：<span>{{rankingDetails.playCount}}</span>次</div>
        </div>
        <div class="body-content">
          <table>
            <thead>
              <tr>
                <th class="no"><span></span></th>
                <th class="title"><span>标题</span></th>
                <th class="playTime"><span>时长</span></th>
                <th class="singer"><span>歌手</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="song,index in songListSong"
                  :key="index"
                  @mouseenter="songId=song.id"
                  @mouseleave="songId=0">
                <td class="no">{{index+1}}</td>
                <td class="title">
                  <img :src="song.al.picUrl"
                       v-if="index<3">
                  <a href="JavaScript:;"
                     class="playImg"></a>
                  <div class="name">
                    <a href="JavaScript:;">{{song.name}}</a>
                    <span style="color:#AEAEAE"
                          v-if="song.alia.length">-({{song.alia[0]}})</span>
                  </div>
                  <a href="JavaScript:;"
                     class="mvPlayImg"
                     v-if="song.mv"></a>
                </td>
                <td class="playTime"
                    v-show="songId!==song.id">{{playTime(song.dt)}}</td>
                <td class="playTime"
                    v-show="songId===song.id">
                  <a href="JavaScript:;"
                     class="addList"></a>
                  <a href="JavaScript:;"
                     class="collect"></a>
                  <a href="JavaScript:;"
                     class="share"></a>
                  <a href="JavaScript:;"
                     class="download"></a>
                </td>
                <td class="singer">
                  <a class="singerName"
                     href="JavaScript:;"
                     v-for="ar,index in  song.ar"
                     :key="index">{{ar.name}}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      songId: 0,
      params: {
        id: '19723756'
      }
    }
  },
  methods: {
    setRankingClassifyId (id) {
      this.params.id = String(id)
      this.$router.push({
        name: 'rankingList',
        query: this.params
      })
    },
    updateFrequency (timestamp) {
      return dayjs(timestamp).format('MM月DD日')
    },
    playTime (timestamp) {
      return dayjs(timestamp).format('mm:ss')
    },
    singer (singerNameList) {
      let singerName = ''
      singerNameList.forEach((item) => {
        singerName += item.name + '/'
      })
      return singerName.slice(0, -1)
    }
  },
  computed: {
    ...mapState('Home', ['rankingClassifyList', 'rankingDetails', 'songListSong']),
    rankingClassify () {
      return this.rankingClassifyList.find((item) => String(item.id) === this.params.id)
    }
  },
  watch: {
    '$route.query': {
      handler () {
        Object.assign(this.params, this.$route.query)
        this.$store.dispatch('Home/reqRankingDetails', this.params)
        this.$store.dispatch('Home/reqSongListSong', this.params)
      },
      deep: true
    }
  },
  mounted () {
    this.$store.dispatch('Home/reqRankingClassifyList')
    Object.assign(this.params, this.$route.query)
    this.$store.dispatch('Home/reqRankingDetails', this.params)
    this.$store.dispatch('Home/reqSongListSong', this.params)
  }
}
</script>

<style lang="less" scoped>
.rangking-list-container {
  display: flex;
  .left {
    width: 240px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding-top: 40px;
    background-color: rgb(249, 249, 249);
    .title {
      font-size: 14px;
      color: #000;
      font-weight: bold;
      font-family: simsun, \5b8b\4f53;
      padding: 0 0 12px 15px;
    }
    ul {
      li {
        a {
          display: flex;
          padding: 10px 0 10px 20px;
          img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          .name {
            position: relative;
            top: -4px;
            font-size: 12px;
            margin-bottom: 10px;
            color: #000000;
          }
          .updateFrequency {
            font-size: 12px;
            color: #999999;
          }
        }
        a:hover {
          text-decoration: none !important;
        }
      }
      li:hover {
        background-color: rgb(240, 240, 240);
      }
      .active {
        background-color: rgb(230, 230, 230) !important;
      }
    }
  }
  .right {
    flex: 1;
    // height: 600px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: white;
    .header {
      padding: 40px;
      width: 100%;
      height: 155px;
      img {
        height: 150px;
        width: 150px;
        padding: 3px;
        border: 1px solid #ccc;
        margin-right: 30px;
        float: left;
      }
      .header-content {
        position: relative;
        top: 10%;
        float: left;
        .name {
          font-size: 20px;
          color: #333333;
        }
        .updateFrequency {
          height: 35px;
          line-height: 35px;
          font-size: 12px;
          color: #666;
          .bi-clock {
            margin-right: 2px;
          }
          .frequency {
            margin-left: 5px;
            color: #999;
          }
        }
        .buttons {
          display: flex;
          align-items: center;
          margin-top: 20px;
          a {
            display: inline-block;
            font-size: 12px;
            height: 31px;
            line-height: 31px;
            border-radius: 3px;
            background-repeat: no-repeat;
            background-image: url('./images/button2.png');
          }
          a:hover {
            text-decoration: none !important;
          }
          .play {
            color: white;
            width: 55px;
            padding-right: 10px;
            text-align: right;
            background-position: -5px 16%;
          }
          .play:hover {
            background-position: -5px 18.17%;
          }
          .play:active {
            background-position: -5px 20.34%;
          }
          .addPlayList {
            width: 31px;
            margin-left: -3px;
            background-position: 0px 40.12%;
          }
          .addPlayList:hover {
            background-position: -40px 40.12%;
          }
          .addPlayList:active {
            background-position: -80px 40.12%;
          }
          .collect {
            margin-left: 5px;
            background-position: 0px 24.685%;
            border-right: 2px solid rgba(0, 0, 0, 0.15);
            span {
              margin-left: 30px;
              margin-right: 10px;
            }
          }
          .collect:hover {
            background-position: 0px 26.855%;
          }
          .share {
            margin-left: 5px;
            background-position: 0px 30.93%;
            border-right: 2px solid rgba(0, 0, 0, 0.15);
            span {
              margin-left: 30px;
              margin-right: 10px;
            }
          }
          .share:hover {
            background-position: 0px 32.02%;
          }
          .download {
            margin-left: 5px;
            background-position: 0px 69.74%;
            border-right: 2px solid rgba(0, 0, 0, 0.15);
            span {
              margin-left: 30px;
              margin-right: 10px;
            }
          }
          .download:hover {
            background-position: 0px 70.85%;
          }
          .comment {
            margin-left: 5px;
            background-position: 0px 37%;
            border-right: 2px solid rgba(0, 0, 0, 0.15);
            span {
              margin-left: 30px;
              margin-right: 10px;
            }
          }
          .comment:hover {
            background-position: 0px 38.09%;
          }
        }
      }
    }
    .body {
      padding: 0 40px;
      .body-header {
        border-bottom: 2px solid #c20c2c;
        line-height: 25px;
        height: 25px;
        padding-bottom: 5px;
        .title {
          font-size: 20px;
          color: #333333;
          float: left;
          margin-right: 20px;
        }
        .songNumber {
          font-size: 12px;
          color: #666666;
          float: left;
        }
        .playCount {
          font-size: 12px;
          color: #666666;
          float: right;
          span {
            color: #c20c2c;
            font-weight: bold;
          }
        }
      }
      .body-header::after {
        content: '';
        clear: both;
        display: block;
      }
      .body-content {
        table {
          border-collapse: collapse;
          border: 1.5px solid rgba(0, 0, 0, 0.15);
          border-top: 1.5px solid #c20c2c;
          thead {
            height: 38px;
            background-color: black;
            background-image: url('./images/table.png');
            tr {
              .no {
                span {
                  display: inline-block;
                  width: 77px;
                }
              }
              .title {
                span {
                  display: inline-block;
                  width: 260px;
                }
                padding: 8px 10px;
                text-align: left;
                font-size: 12px;
                color: #666666;
                font-weight: normal;
                border-left: 1.5px solid rgb(223, 223, 223);
              }
              .playTime {
                padding: 8px 10px;
                text-align: left;
                font-size: 12px;
                color: #666666;
                font-weight: normal;
                display: inline-block;
                width: 100px;
                border-left: 1.5px solid rgb(223, 223, 223);
              }
              .singer {
                padding: 8px 10px;
                text-align: left;
                font-size: 12px;
                color: #666666;
                font-weight: normal;
                border-left: 1.5px solid rgb(223, 223, 223);
              }
            }
          }
          tbody {
            td {
              padding: 8px 10px;
              text-align: left;
              font-size: 12px;
              color: #666666;
              font-weight: normal;
            }
            .no {
              padding-left: 20px;
            }
            .title {
              display: flex;
              align-items: center;
              img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
              }
              .name {
                max-width: 200px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                a {
                  color: #666666;
                }
              }
              .playImg {
                display: inline-block;
                height: 17px;
                width: 17px;
                background-image: url('./images/table.png');
                background-position: 0 29.2%;
                margin-right: 10px;
                vertical-align: middle;
              }
              .playImg:hover {
                background-position: 0 36.2%;
              }
              .mvPlayImg {
                display: inline-block;
                height: 17px;
                width: 23px;
                background-image: url('./images/table.png');
                background-position: 0 42.8%;
                vertical-align: middle;
                margin-left: 2px;
              }
              .mvPlayImg:hover {
                background-position: 31% 42.8%;
              }
            }
            .playTime {
              a {
                display: inline-block;
                margin-left: 2px;
                height: 16px;
                width: 18px;
                background-image: url('./images/table.png');
                background-repeat: no-repeat;
              }
              .addList {
                height: 13px;
                width: 13px;
                background-image: url('./images/icon.png');
                background-position: 0 64%;
              }
              .addList:hover {
                background-position: 31% 64%;
              }
              .collect {
                background-position: 0 48.5%;
              }
              .collect:hover {
                background-position: 19.7% 48.5%;
              }
              .share {
                background-position: 0 54.4%;
              }
              .share:hover {
                background-position: 19.8% 54.4%;
              }
              .download {
                background-position: 80% 48.5%;
              }
              .download:hover {
                background-position: 102.7% 48.5%;
              }
            }
            .singer {
              .singerName {
                color: #666666;
              }
              .singerName::after {
                content: '/';
              }
              .singerName:last-of-type:after {
                content: '';
              }
              display: inline-block;
              width: 150px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            tr:nth-of-type(-n + 3) {
              .singer {
                position: relative;
                top: -20px;
              }
              .title {
                .name {
                  max-width: 150px;
                }
              }
            }
            tr:nth-of-type(2n-1) {
              background-color: rgb(247, 247, 247);
            }
          }
        }
      }
    }
  }
}
</style>
