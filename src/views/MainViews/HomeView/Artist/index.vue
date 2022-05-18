<template>
  <div class="artist-container">
    <div class="left-container">
      <div class="left-content">
        <div v-for="artistClassify,index in artistClassifyList"
             :key="index">
          <h3>{{artistClassify.title}}</h3>
          <ul>
            <li v-for="classify,index in artistClassify.classify"
                :key="index">
              <a href="JavaScript:;"
                 @click="setArtistClassifyActive({area:artistClassify.area,type:classify.type})"
                 :class="artistClassify.area===parem.area&&classify.type===parem.type?'active':''"><i class="bi bi-square-fill"></i>{{classify.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="right-content">
        <h3>{{title}}</h3>
        <ul class="initial"
            v-if="parem.area!=='-1'">
          <li>
            <a href="JavaScript:;"
               @click="setArtistClassifyActive({initial:'-1'})"
               :class="parem.initial==='-1'?'active':''">热门</a>
          </li>
          <li v-for="letter,index in letterList"
              :key="index">
            <a href="JavaScript:;"
               @click="setArtistClassifyActive({initial:letter.toLowerCase()})"
               :class="parem.initial===letter.toLowerCase()?'active':''">{{letter}}</a>
          </li>
          <li>
            <a href="JavaScript:;"
               @click="setArtistClassifyActive({initial:'0'})"
               :class="parem.initial==='0'?'active':''">其他</a>
          </li>
        </ul>
        <ul class="artist-top10">
          <li v-for="artist,index in artistList.slice(0,10)"
              :key="index">
            <a href="JavaScript:;">
              <img v-lazy="artist.img1v1Url"
                   alt="">
              <p>
                <span>{{artist.name}}</span>
                <svg v-if="artist.accountId"
                     t="1650965905900"
                     viewBox="0 0 1024 1024"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="5956">
                  <path d="M642.8 531.8c64.3-42.6 106.9-115.4 106.9-198.1C749.7 202.6 643.1 96 512 96S274.3 202.6 274.3 333.7c0 82.7 42.6 155.6 106.9 198.1C215.8 582.9 96 727.7 96 898.3c0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-180.2 159.9-326.9 356.6-326.9 196.6 0 356.6 146.6 356.6 326.9 0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-170.6-119.8-315.4-285.2-366.5zM333.7 333.7c0-98.3 80-178.3 178.3-178.3s178.3 80 178.3 178.3S610.3 512 512 512s-178.3-80-178.3-178.3z"
                        fill="#ffffff"
                        p-id="5957"></path>
                </svg>
              </p>
            </a>
          </li>
        </ul>
        <ul class="artist">
          <li v-for="artist,index in artistList.slice(10,100)"
              :key="index">
            <a href="JavaScript:;">
              <p>
                <span>{{artist.name}}</span>
                <svg v-if="artist.accountId"
                     t="1650965905900"
                     viewBox="0 0 1024 1024"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="5956">
                  <path d="M642.8 531.8c64.3-42.6 106.9-115.4 106.9-198.1C749.7 202.6 643.1 96 512 96S274.3 202.6 274.3 333.7c0 82.7 42.6 155.6 106.9 198.1C215.8 582.9 96 727.7 96 898.3c0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-180.2 159.9-326.9 356.6-326.9 196.6 0 356.6 146.6 356.6 326.9 0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-170.6-119.8-315.4-285.2-366.5zM333.7 333.7c0-98.3 80-178.3 178.3-178.3s178.3 80 178.3 178.3S610.3 512 512 512s-178.3-80-178.3-178.3z"
                        fill="#ffffff"
                        p-id="5957"></path>
                </svg>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      parem: {
        limit: '100',
        type: '-1',
        initial: '-1',
        area: '-1'
      },
      artistClassifyList: [
        {
          area: '-1',
          title: '推荐',
          classify: [
            { type: '-1', name: '热门歌手' }
          ]
        },
        {
          area: '7',
          title: '华语',
          classify: [
            { type: '1', name: '华语男歌手' },
            { type: '2', name: '华语女歌手' },
            { type: '3', name: '华语组合/乐队' }
          ]
        },
        {
          area: '96',
          title: '欧美',
          classify: [
            { type: '1', name: '欧美男歌手' },
            { type: '2', name: '欧美女歌手' },
            { type: '3', name: '欧美组合/乐队' }
          ]
        },
        {
          area: '8',
          title: '日本',
          classify: [
            { type: '1', name: '日本男歌手' },
            { type: '2', name: '日本女歌手' },
            { type: '3', name: '日本组合/乐队' }
          ]
        },
        {
          area: '16',
          title: '韩国',
          classify: [
            { type: '1', name: '韩国男歌手' },
            { type: '2', name: '韩国女歌手' },
            { type: '3', name: '韩国组合/乐队' }
          ]
        },
        {
          area: '0',
          title: '其他',
          classify: [
            { type: '1', name: '其他男歌手' },
            { type: '2', name: '其他女歌手' },
            { type: '3', name: '其他组合/乐队' }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState('Home', ['artistList']),
    letterList () {
      const letter = []
      for (let i = 0; i < 26; i++) letter.push(String.fromCharCode(i + 65))
      return letter
    },
    title () {
      return this.artistClassifyList.find((item) => item.area === this.parem.area).classify.find((item) => item.type === this.parem.type).name
      // return ''
    }
  },
  methods: {
    setArtistClassifyActive (parem) {
      Object.assign(this.parem, parem)
      if (parem.area) {
        this.parem.initial = '-1'
      }
      this.$router.push({
        name: 'artist',
        query: this.parem
      })
    }
  },
  watch: {
    '$route.query' (value) {
      Object.assign(this.parem, value)
      this.$store.dispatch('Home/reqArtistList', this.parem)
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    Object.assign(this.parem, this.$route.query)
    this.$store.dispatch('Home/reqArtistList', this.parem)
  }
}
</script>

<style lang="less" scoped>
.artist-container {
  display: flex;
  .left-container {
    width: 180px;
    background-color: rgb(249, 249, 249);
    border: 1px solid rgba(0, 0, 0, 0.2);
    .left-content {
      margin-top: 51px;
      padding: 0 10px 10px 10px;
      ul {
        li {
          a {
            display: inline-block;
            width: 100%;
            height: 28px;
            line-height: 28px;
            margin-bottom: 2px;
            border-radius: 3px;
            color: black;
            font-size: 12px;
            i::before {
              color: rgb(175, 175, 175);
              font-size: 12px;
              transform: scale(0.35) translate(0px, 5px);
              padding: 0 7px;
            }
          }
          .active {
            color: #c20c02 !important;
            border: 1px solid rgba(0, 0, 0, 0.2) !important;
            i::before {
              color: #c20c02 !important;
            }
          }
        }
      }
      ul::after {
        content: '';
        display: inline-flex;
        position: relative;
        top: -12px;
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
      h3 {
        font-size: 16px;
        margin: 0;
        margin-bottom: 5px;
        padding-left: 14px;
      }
    }
    .left-content > div:last-of-type > ul::after {
      border: none;
    }
  }
  .right-container {
    flex: 1;
    background-color: white;
    padding: 40px;
    .right-content {
      h3 {
        margin: 0;
        padding-bottom: 2px;
        font-weight: normal;
        font-size: 24px;
        height: 40px;
        line-height: 40px;
        color: #333333;
        border-bottom: 2px solid #c20c0c;
      }
      .initial {
        margin-top: 20px;
        display: flex;
        li {
          a {
            display: inline-block;
            width: 21px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            font-size: 14px;
            margin-left: 3px;
            color: #333333;
          }
        }
        .active {
          background-color: #c20c02;
          color: white;
        }
        li:first-of-type a,
        li:last-of-type a {
          width: 45px;
        }
      }
      .artist-top10 {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        border-bottom: 1px dotted #999;
        li {
          margin: 0 0 30px 17px;
          img {
            width: 130px;
            height: 130px;
          }
          a {
            font-size: 12px;
            color: #000000;
            text-decoration: none;
            p {
              margin: 5px 0;
              span {
                display: inline-block;
                max-width: 110px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              span:hover {
                text-decoration: underline;
              }
              svg {
                float: right;
                background-color: red;
                width: 15px;
                height: 15px;
                top: 0px;
                margin-left: 5px;
                border-radius: 50%;
              }
            }
          }
        }
        li:nth-of-type(5n-4) {
          margin: 0 0 30px 0px;
        }
      }
      .artist {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        li {
          width: 20%;
          a {
            font-size: 12px;
            color: #000000;
            p {
              margin: 6px 0;
              span {
                display: inline-block;
                max-width: 110px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              span:hover {
                text-decoration: underline;
              }
              svg {
                position: relative;
                top: 0px;
                margin-left: 5px;
                background-color: red;
                width: 15px;
                height: 15px;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
