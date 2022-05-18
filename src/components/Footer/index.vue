<template>
  <div class="footer-container">
    <div class="footer">
      <div class="left">
        <ul>
          <li><a href="JavaScript:;">服务条款</a>|</li>
          <li><a href="JavaScript:;">隐私政策</a>|</li>
          <li><a href="JavaScript:;">儿童隐私政策</a>|</li>
          <li><a href="JavaScript:;">版权投诉</a>|</li>
          <li><a href="JavaScript:;">投资者关系</a>|</li>
          <li><a href="JavaScript:;">广告合作</a>|</li>
          <li><a href="JavaScript:;">廉正举报</a>|</li>
          <li><a href="JavaScript:;">联系我们</a></li>
        </ul>
        <p>网易公司版权所有©1997-2022&nbsp;&nbsp;&nbsp;杭州乐读科技有限公司运营：<a href="JavaScript:;">浙网文[2021] 1186-054号</a></p>
        <p>
          <a href="JavaScript:;">粤B2-20090191-18 工业和信息化部备案管理系统网站</a>
          &nbsp;
          <a href="JavaScript:;">
            <img style="width:13px;height:13px"
                 src="./images/police.png">
            浙公网安备 33010902002564号</a>
        </p>
      </div>
      <div class="right">
        <ul>
          <li>
            <a href="JavaScript:;"></a>
            <span></span>
          </li>
          <li>
            <a href="JavaScript:;"></a>
            <span></span>
          </li>
          <li>
            <a href="JavaScript:;"></a>
            <span></span>
          </li>
          <li>
            <a href="JavaScript:;"></a>
            <span></span>
          </li>
          <li>
            <a href="JavaScript:;"></a>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.footer-container {
  width: 100%;
  height: 172px;
  border-top: 1px solid rgb(211, 211, 211);
  background-color: rgb(242, 242, 242);
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .footer {
    padding-top: 15px;
    margin: auto;
    width: 982px;
    .left {
      float: left;
      ul {
        display: flex;
        li {
          font-size: 12px;
          color: rgb(153, 153, 153);
          a {
            color: inherit;
            padding: 0 5px;
          }
        }
        li:first-of-type a {
          padding-left: 0;
        }
      }
      p {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #666666;
        a {
          color: inherit;
        }
      }
    }
    .right {
      float: right;
      margin-top: 22px;
      ul {
        display: flex;
        align-items: center;
        li {
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          a {
            display: inline-block;
            width: 50px;
            height: 45px;
            background-size: 200%;
            margin-bottom: 5px;
            background-repeat: no-repeat;
          }
          span {
            display: inline-block;
            width: 60px;
            height: 14px;
            background-repeat: no-repeat;
          }
        }
        li:first-of-type {
          margin-left: 0px;
          a {
            background-image: url('./images/foot_enter_new.png');
            background-position: 108% 90%;
          }
          span {
            width: 72px;
            background-size: 240%;
            background-position: -4% 85%;
            background-image: url('./images/foot_enter_tt.png');
          }
        }
        li:nth-of-type(2) {
          a {
            background-image: url('./images/foot_enter_new.png');
            background-position: 108% 20%;
          }
          span {
            width: 60px;
            background-size: 290%;
            background-position: -5% 71%;
            background-image: url('./images/foot_enter_tt.png');
          }
        }
        li:nth-of-type(3) {
          a {
            background-image: url('./images/foot_enter_new.png');
            background-position: -8% 0%;
          }
          span {
            width: 60px;
            background-size: 280%;
            background-position: -7% 0%;
            background-image: url('./images/foot_enter_tt.png');
          }
        }
        li:nth-of-type(4) {
          a {
            background-image: url('./images/foot_enter_new.png');
            background-position: 108% 10%;
          }
          span {
            width: 60px;
            background-size: 290%;
            background-position: -5% 44%;
            background-image: url('./images/foot_enter_tt.png');
          }
        }
        li:nth-of-type(5) {
          a {
            background-image: url('./images/foot_enter_new.png');
            background-position: -8% 20%;
          }
          span {
            width: 60px;
            background-size: 290%;
            background-position: -5% 59%;
            background-image: url('./images/foot_enter_tt.png');
          }
        }
      }
    }
  }
  .footer::after {
    display: block;
    content: '';
    clear: both;
  }
}
</style>
