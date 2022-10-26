<template>
  <div>
    <MyList :list="list" @subCount="subCount" @addCount="addCount"></MyList>
  </div>
</template>

<script>
import MyList from './components/MyList'
export default {
  name: 'App',
  data() {
    return {
      list: [
        {
          id: 100,
          name: 'CHAGEE霸王茶姬: CH...观音仙椰/茉莉仙椰2.02选1',
          price: 16.2,
          count: 1,
        },
        {
          id: 101,
          name: '青青糯山（中杯）1杯',
          price: 13.5,
          count: 1,
        },
      ],
    }
  },
  methods: {
    subCount(id) {
      this.list.forEach((item) => {
        if (item.id === id) {
          item.count--
        }
      })
    },
    addCount(id) {
      this.list.forEach((item) => {
        if (item.id === id) {
          item.count++
        }
      })
    },
  },
  components: {
    MyList,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

em,
i {
  font-style: normal;
}

.wrapper {
  width: 1225px;
  margin: 0 auto;
}
</style>
