<template>
  <div>
    <div class="content wrapper">
      <table>
        <thead>
          <tr>
            <th>项目</th>
            <th>单价</th>
            <th>数量</th>
            <th>总价</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="obj in list" :key="obj.id">
            <td>
              <a href="#">{{ obj.name }}</a>
            </td>
            <td>￥{{ obj.price }}</td>
            <td>
              <button
                :class="{ disabled: obj.count == 1 }"
                @click="subCount(obj.id)"
              >
                -
              </button>
              <input type="text" v-model.number="obj.count" />
              <button class="btn" @click="addCount(obj.id)">+</button>
            </td>
            <td>￥{{ (obj.count * obj.price) | toFixedTwo }}</td>
          </tr>
        </tbody>
      </table>
      <div class="row"></div>
      <div class="row price">
        <span class="left" v-if="priceSum >= 30">
          <input type="checkbox" v-model="isChecked" @click="updateDiscount" />
          满30减10
        </span>
        <span class="left" v-else-if="priceSum < 30"> 暂无可用优惠券 </span>
        <span class="total-price">
          应付金额：<span><em>￥</em>{{ priceSum | toFixedTwo }}</span>
        </span>
      </div>
      <div class="row mobile-info">
        将发送美团券密码至手机号：153****3202 <a href="#">绑定新手机号</a>
      </div>
      <div class="form-submit">
        <button class="btn">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyList',
  data() {
    return {
      count: 1,
      isChecked: false,
      discount: 0,
    }
  },
  methods: {
    subCount(id) {
      this.$emit('subCount', id)
    },
    addCount(id) {
      this.$emit('addCount', id)
    },
    updateDiscount() {
      if (this.priceSum >= 30) {
        this.discount = 10
      } else if (this.priceSum < 30) {
        this.discount = 0
        this.isChecked = false
      }
    },
  },
  //
  computed: {
    priceSum() {
      let sum = this.list.reduce(
        (sum, obj) => (sum += obj.count * obj.price),
        0
      )
      if (this.isChecked === true) {
        return (sum -= this.discount)
      }
      return sum
    },
  },
  props: ['list'],
}
</script>

<style scoped>
.content table {
  width: 100%;
  border: none;
  border-collapse: collapse;
  border-spacing: 0;
}
.content thead {
  height: 40px;
  background-color: #f7f7f7;
  text-align: left;
}

.content thead th {
  padding-left: 15px;
  font-size: 18px;
}

.content thead th:first-child {
  width: 58%;
}

.content tr th:last-child,
.content tr td:last-child {
  padding-right: 15px;
  text-align: right;
}

.content tbody tr {
  height: 75px;
  line-height: 75px;
}

.content tbody td {
  padding-left: 15px;
  color: #666;
}

.content tbody td a {
  color: #666;
}

.content tr td:last-child {
  color: #f76120;
}
.content tbody td a:hover {
  text-decoration: underline;
}

.content td button {
  position: relative;
  width: 34px;
  height: 34px;
  box-sizing: content-box;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #e5e5e5;
  color: #000;
  font-size: 24px;
  font-weight: 700;
  vertical-align: middle;
}

.content tbody td input {
  padding: 0;
  width: 35px;
  height: 35px;
  color: #222;
  text-align: center;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  vertical-align: middle;
  outline: none;
}

.content tbody tr {
  border-bottom: 1px solid #e5e5e5;
}

.row {
  padding: 12px;
  border-top: 1px solid #e5e5e5;
  text-align: right;
}

.price {
  padding: 12px;
  height: 70px;
}

.price .total-price {
  display: inline-block;
  font-size: 12px;
  font-weight: bolder;
  color: #666;
  line-height: 40px;
}

.price .total-price span {
  font-size: 20px;
  color: #f76120;
}

.mobile-info {
  text-align: left;
  font-size: 12px;
}
.mobile-info a {
  color: #2bb8aa;
}

.form-submit {
  text-align: right;
}

.form-submit .btn {
  display: inline-block;
  padding: 5px 20px 4px;
  box-sizing: content-box;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  background-color: #2db3a6;
  border: 1px solid #008177;
  border-radius: 2px;
  cursor: pointer;
  letter-spacing: 2px;
}

.form-submit .btn:hover {
  background-color: #019a8d;
}

.disabled {
  pointer-events: none;
}

.price .left {
  float: left;
  line-height: 45px;
}
</style>
