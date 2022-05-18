<template>
  <div class="header-container">
    <div class="header-content">
      <div class="left">
        <div class="logo">
          <a href="JavaScript:;">
            <img src="./images/logo.png">
          </a>
        </div>
        <ul class="nav"
            @click="setNavIndex">
          <li v-for="(nav,index) in navList"
              :key="index">
            <a href="JavaScript:;"
               :class="navIndex===index?'nav-active':''"
               :data-index='index'>
              {{nav}}
              <i v-show="navIndex===index"
                 class="bi bi-triangle-fill"></i>
            </a>
          </li>
          <i class="hotIcon"> <svg t="1650767368017"
                 viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="12951">
              <path d="M0 256h1024v512H0V256z m194.24 155.52V640h37.44V538.88h115.84V640h37.44V411.52H347.52v95.36H231.68V411.52h-37.44zM531.2 407.04c-35.2 0-62.72 11.2-82.56 34.24-19.2 21.76-28.48 49.92-28.48 84.8 0 34.56 9.28 62.72 28.48 84.48 19.84 22.4 47.36 33.92 82.56 33.92 34.88 0 62.4-11.2 82.56-33.6 19.2-21.44 28.8-49.6 28.8-84.8 0-35.2-9.6-63.68-28.8-85.12-20.16-22.72-47.68-33.92-82.56-33.92z m0 32.96c23.68 0 41.92 7.36 54.72 22.72 12.48 15.36 18.88 36.48 18.88 63.36 0 26.88-6.4 47.68-18.88 62.72-12.8 15.04-31.04 22.72-54.72 22.72s-42.24-8-55.04-23.68c-12.48-15.36-18.56-35.84-18.56-61.76 0-26.24 6.08-46.72 18.56-62.08 13.12-16 31.36-24 55.04-24z m128.96-28.48v32h74.88V640h37.44V443.52h74.88v-32h-187.2z"
                    fill="rgb(194, 12, 12)"
                    p-id="12952"></path>
            </svg></i>

        </ul>
      </div>
      <div class="right">
        <div class="search">
          <i class="bi bi-search"></i>
          <input placeholder="音乐/视频/电台/用户" />
        </div>
        <a href="JavaScript:;"
           class="creatorsCenter">创作者中心</a>
        <a href="JavaScript:;"
           class="login">登录</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navIndex: 0,
      navList: ['发现音乐', '我的音乐', '关注', '商城', '音乐人', '下载客户端']
    }
  },
  methods: {
    setNavIndex (event) {
      if (event.target.attributes['data-index']) {
        this.navIndex = Number(event.target.getAttribute('data-index'))
      }
    }
  }

}
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 70px;
  background-color: rgb(36, 36, 36);
  border-bottom: 5px solid rgb(194, 12, 12);
  .header-content {
    max-width: 1100px;
    min-width: 982px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    font-size: 0;
    .left {
      height: 70px;
      display: flex;
      align-items: center;
      .logo {
        img {
          height: 70px;
        }
        margin-right: 10px;
      }
      .nav {
        display: flex;
        position: relative;
        margin-right: 30px;
        @media screen and (min-width: 1030px) {
          a {
            padding: 0 20px;
          }
        }
        @media screen and (max-width: 1030px) {
          a {
            padding: 0 16px;
          }
        }
        a {
          position: relative;
          display: inline-block;
          height: 70px;
          line-height: 70px;
          font-size: 14px;
          text-decoration: none;
          // padding: 0 20px;
          color: #ccc;
          i {
            position: absolute;
            height: 20px;
            top: 50%;
            left: 43%;
            color: rgb(194, 12, 12);
            font-size: 12px;
          }
        }
        a:hover {
          background-color: #000;
          color: white;
        }
        .hotIcon {
          position: absolute;
          top: 30%;
          right: -4%;
          display: flex;
          height: 14px;
          overflow: hidden;
          align-items: center;
          border-radius: 20px;
        }
        svg {
          height: 28px;
          background-color: white;
          width: 28px;
        }
      }
      .nav-active {
        color: white !important;
        background-color: #000;
      }
    }
    .right {
      height: 70px;
      display: flex;
      align-items: center;
      .search {
        background-color: white;
        border-radius: 20px;
        i {
          margin: 0 5px 0 10px;
          font-size: 14px;
          font-weight: bold;
        }
        input {
          margin: 8px 10px 8px 0;
          width: 115px;
          outline: none;
          font-size: 12px;
          border: 0;
        }
      }
      .creatorsCenter {
        margin: 0 15px;
        font-size: 12px;
        text-decoration: none;
        color: #ccc;
        padding: 8px 12px;
        border: 1px solid rgb(75, 75, 75);
        border-radius: 20px;
      }
      .login {
        font-size: 12px;
        text-decoration: none;
        color: #ccc;
      }
    }
  }
}
</style>
