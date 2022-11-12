<template>
  <!-- 下单页 -->
  <div class="order">
    <!-- 下单详情 -->
    <div class="order_wrap">
      <h3>订单</h3>
      <div class="order_wrap_center">
        <!-- 支付方式 -->
        <div class="paymentMethod">
          <p>支付方式</p>
          <!-- 模拟下拉列表 -->
          <div id="select_time">
            {{ selectValue }}
            <i class="el-icon-arrow-down" @click="handerDis"></i>
            <ul class="select_list" ref="select_list">
              <li class="active" @click="handerClickOption">微信支付</li>
              <li @click="handerClickOption">支付宝支付</li>
              <li @click="handerClickOption">银行卡支付</li>
            </ul>
          </div>
        </div>
        <!-- 收货地址 -->
        <div class="address">
          <p>收货地址</p>
          <input type="text" v-model="addressTrue" placeholder="填写位置" />
        </div>
        <!-- 图书信息 -->
        <div class="book_wrap">
          <div class="cover">
            <img :src="'/node' + book_detail.book_cover" alt="" />
          </div>
          <div class="book_content">
            <p>
              书名: <span>{{ book_detail.book_name }}</span>
            </p>
            <p>
              价格: <span>{{ book_detail.bookA_price }}</span>
            </p>
          </div>
        </div>
        <!-- 付款按钮 -->
        <button class="payment" @click="handerPlOrder()">付款</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      addressTrue: this.$store.state.userInfo.user_loacation,
      book_detail: {},
      selectValue: "微信支付",
    };
  },
  methods: {
    handerDis() {
      this.display = !this.display;
      if (this.display) {
        this.$refs.select_list.style.display = "block";
      } else {
        this.$refs.select_list.style.display = "none";
      }
    },
    handerClickOption(e) {
      console.log(e.target.innerText);
      this.selectValue = e.target.innerText;
      let list = this.$refs.select_list.children;
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove("active");
      }
      e.target.classList.add("active");
      this.display = false;
      this.$refs.select_list.style.display = "none";
    },
    async handerPlOrder() {
      await this.$axios
        .post("/node/buyerorder", {
          buyerorder_buyerid: this.$store.state.userInfo.user_id,
          buyerorder_bookid: this.book_detail.bookA_id,
          buyerorder_sellerid: this.book_detail.bookA_stand,
          buyerorder_address: this.addressTrue,
          buyerorder_price: this.book_detail.bookA_price,
        })
        .then((res) => {
          console.log(res, "order");
        })
        .catch((err) => {
          console.log(err);
        });
      await this.$axios
        .put(`/node/bookabout/state/${this.book_detail.bookA_id}`, {
          bookA_state: 3,
        })
        .then((res) => {
          console.log(res, "bookabout");
        })
        .catch((err) => {
          console.log(err);
        });
      await this.$axios
        .post("/node/record", {
          r_userId: this.$store.state.userInfo.user_id,
          r_url: 4,
          r_result: 1,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
  mounted() {
    this.book_detail = JSON.parse(this.$route.query.book_detail);
  },
};
</script>
<style lang="less" scoped>
.order {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  .order_wrap {
    max-width: 700px;
    height: 600px;
    margin: 40px auto;
    border: 1px solid #333;
    box-shadow: 0 0 10px #eee;
    display: flex;
    flex-direction: column;
    h3 {
      line-height: 40px;
      background: rgb(189, 235, 177);
      text-align: center;
    }
    .order_wrap_center {
      flex-grow: 1;
      width: 100%;
      padding: 0 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      // 支付方式
      .paymentMethod {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #333;
      }
      // 收货地址
      .address {
        height: 110px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        box-sizing: border-box;
        border: 1px solid #333;
        font-size: 14px;
        input {
          border: 1px solid #333;
          height: 25px;
          padding: 0 4px;
          box-sizing: border-box;
          margin-top: 20px;
          &:focus {
            border: 1px solid blue;
          }
        }
      }

      // 图书信息
      .book_wrap {
        height: 150px;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        border: 1px solid #333;
        align-items: center;
        .cover {
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          margin-bottom: 10px;
        }
        span {
          margin-left: 10px;
        }
      }

      // 付款按钮
      .payment {
        width: 150px;
        height: 30px;
        background: rgb(189, 235, 177);
        margin: 0 auto;
      }
    }
  }
  // 模拟下拉列表
  #select_time {
    position: relative;
    height: 20px;
    line-height: 20px;
    outline: none;
    width: 100px;
    font-size: 12px;
    padding: 0 4px;
    border: 1px solid #333;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      cursor: pointer;
    }
    .select_list {
      position: absolute;
      top: calc(100% + 3px);
      left: -1px;
      width: 100px;
      background: #fff;
      box-shadow: 0 0 3px #b0b0b0;
      display: none;
      li {
        width: 100px;
        height: 20px;
        cursor: pointer;
        border-top: none;
        line-height: 20px;
        padding: 0 4px;
        box-sizing: border-box;
        font-size: 12px;
      }
      .active {
        background: rgb(226, 226, 226);
      }
    }
  }
}
</style>