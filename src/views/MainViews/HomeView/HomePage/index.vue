<template>
  <div class="home-page-container">
    <div class="swiper">
      <div class="swiper-container"
           ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="( banner,index ) in bannerList"
               :key="index"
               :style="`background-image:url(${banner.imageUrl})`">
            <div class="dim">
              <div class="imgs">
                <img class="banner"
                     :src="banner.imageUrl">
                <img class="download"
                     src="./images/download.png">
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="home-page-content">
      <div class="left">
        <div class="hot-container">
          <div class="header">
            <i class="bi bi-record-circle-fill"></i>
            <!-- <router-link></router-link> -->
            <router-link :to="{name:'songList'}"
                         class="title">热门推荐</router-link>
            <div class="classify">
              <router-link :to="{name:'songList',query:{cat:'华语'}}">华语</router-link>|
              <router-link :to="{name:'songList',query:{cat:'流行'}}">流行</router-link>|
              <router-link :to="{name:'songList',query:{cat:'摇滚'}}">摇滚</router-link>|
              <router-link :to="{name:'songList',query:{cat:'民谣'}}">民谣</router-link>|
              <router-link :to="{name:'songList',query:{cat:'电子'}}">电子</router-link>
            </div>
            <div class="more">
              <router-link :to="{name:'songList'}">更多</router-link>
            </div>
          </div>
          <ul>
            <li v-for="recommendSong,index in recommendSongList"
                :key="index">
              <div class="coverImg">
                <img v-lazy="recommendSong.picUrl">
                <div class="bottom">
                  <div class="playCount">
                    <i class="bi bi-headphones"></i>
                    <span>{{alterPlayCount(recommendSong.playCount)}}</span>
                  </div>
                  <a href="JavaScirpt:;"
                     class="play"><i class="bi bi-play-circle"></i></a>
                </div>
                <a href="JavaScript:;"
                   :title="recommendSong.name"></a>
              </div>
              <a class="name"
                 href="JavaScript:;">{{recommendSong.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from 'swiper/swiper-bundle.js'
export default {
  data () {
    return {
      Swiper: null
    }
  },
  computed: {
    ...mapState('Home', ['bannerList', 'recommendSongList'])
  },
  methods: {
    alterPlayCount (value) {
      if (value < 10000) {
        return value
      } else if (value < 100000000) {
        return (value / 10000).toFixed(0) + '万'
      } else if (value >= 100000000) {
        return (value / 100000000).toFixed(0) + '亿'
      }
    },
    setSwiper () {
      setTimeout(() => {
        this.Swiper = new Swiper(this.$refs.swiper, {
          loop: true,
          autoplay: true,
          effect: 'fade',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination'
          }
        })
      }, 200)
    }
  },
  mounted () {
    this.setSwiper()
    this.$store.dispatch('Home/reqBannerList')
    this.$store.dispatch('Home/reqRecommendSonglist')
  }
}
</script>

<style lang="less" scoped>
.home-page-container {
  .swiper {
    height: 285px;
    .swiper-container {
      position: absolute;
      left: 0;
      max-width: 100%;
      min-width: 982px;
      height: 285px;
      .swiper-slide {
        position: relative;
        background-repeat: no-repeat;
        background-size: 500% 300%;
        background-position: center center;
        .dim {
          width: 100%;
          height: 100%;
          backdrop-filter: blur(40px);
          background-color: rgba(0, 0, 0, 0.01);
          .imgs {
            width: 982px;
            margin: auto;
            display: flex;
            justify-content: center;
            position: relative;
            .banner {
              width: 730px;
              height: 285px;
            }
            .download {
              width: 252px;
            }
          }
        }
      }
      .swiper-button-prev {
        left: -70px;
        top: 35%;
        padding: 15px 5px;
        color: rgb(230, 230, 230);
      }
      .swiper-button-next {
        right: -70px;
        top: 35%;
        padding: 15px 5px;
        color: rgb(230, 230, 230);
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .home-page-content {
    width: 982px;
    margin: auto;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    .left {
      padding: 20px 20px 40px 20px;
      flex: 1;
      .hot-container {
        .header {
          height: 35px;
          line-height: 35px;
          border-bottom: 2px solid rgb(193, 13, 12);
          .bi-record-circle-fill {
            float: left;
            color: rgb(193, 13, 12);
            font-size: 16px;
            margin: 0 10px;
          }
          .title {
            color: #333333;
            font-size: 20px;
            float: left;
            margin-right: 10px;
          }
          .classify {
            float: left;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.3);
            a {
              margin: 0 10px;
              color: #666666;
            }
          }
          .more {
            float: right;
            a {
              color: #666666;
              font-size: 12px;
            }
          }
        }
        .header::after {
          content: '';
          display: block;
          clear: both;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
          li {
            margin-left: 60px;
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
                right: 0px;
                background-image: url('./images/coverall.png');
                background-position: 0px 0;
              }
              .bottom {
                position: absolute;
                z-index: 40;
                left: 0px;
                bottom: 5px;
                right: 0px;
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
              margin-top: 5px;
              display: inline-block;
              font-size: 14px;
              color: #000000;
              width: 140px;
            }
          }
          li:nth-of-type(5n-4) {
            margin: 0;
          }
        }
      }
    }
    .right {
      width: 0px;
    }
  }
}
</style>
