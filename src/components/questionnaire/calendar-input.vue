<template>
  <div
    class="calendar-input-container orange-theme"
    v-show="show"
    :style="containerStyle"
  >
    <label for="calendar-input">
      <input
        ref="mainInput"
        class="calendar-input"
        type="text"
        readonly="readonly"
        :class="{focus: isfocus}"
        @click="focus"
        v-model="selectValue"
      />
    </label>

    <transition name="fade">
      <div id="calendar" v-show="changeShowCalendar">
        <div id="calendar-header">
          <span class="arrow" @click="subMonth">&lt;</span>
          <span id="date-box"
            >{{ trueSelectYear }}年{{ trueSelectMonth }}月</span
          >
          <span class="arrow" @click="addMonth">&gt;</span>
        </div>
        <div class="week">
          <span
            v-for="(item, index) in week"
            :class="{weekend: index === 0 || index === 6}"
            >{{ item }}</span
          >
        </div>
        <div class="days">
          <span
            v-for="(item, index) in renderData"
            :class="{
              weekend: index % 7 === 0 || index % 7 === 6,
              unselect: unselectArr.includes(index),
              select: index === firstDayInWeek + trueSelectDay - 1,
            }"
            @click="changeSelectDay(index)"
            >{{ item }}</span
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CalendarInput',
  props: {
    show: {
      //是否显示组件
      type: Boolean,
      default: true,
    },
    limit: {
      //日期可选范围
      type: Object,
      default() {
        return {
          minYear: 1900,
          minMonth: 1,
          minDay: 1,
          maxYear: 2030,
          maxMonth: 3,
          maxDay: 20,
        };
      },
    },
    showCalendar: {
      //是否显示日历
      type: Boolean,
      default: true,
    },
    containerStyle: {
      //组件容器样式
      type: Object,
    },
  },
  data() {
    return {
      isfocus: false,
      changeShowCalendar: this.showCalendar,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      date: new Date(),
      selectYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth() + 1,
      selectDay: new Date().getDate(),
    };
  },
  methods: {
    focus() {
      this.isfocus = !this.isfocus;
      this.changeShowCalendar = !this.changeShowCalendar;
    },
    subMonth() {
      if (this.selectMonth === 1) {
        this.selectMonth = 12;
        this.selectYear -= 1;
      } else {
        this.selectMonth -= 1;
      }
      if (this.selectYear < this.limit.minYear)
        this.selectYear = this.limit.minYear;
      if (this.selectYear === this.limit.minYear) {
        if (this.selectMonth <= this.limit.minMonth) {
          this.selectMonth = this.limit.minMonth;
        }
      }
    },
    addMonth() {
      if (this.selectMonth === 12) {
        this.selectMonth = 1;
        this.selectYear += 1;
      } else {
        this.selectMonth += 1;
      }
      if (this.selectYear > this.limit.maxYear)
        this.selectYear = this.limit.maxYear;
      if (this.selectYear === this.limit.maxYear) {
        if (this.selectMonth >= this.limit.maxMonth) {
          this.selectMonth = this.limit.maxMonth;
        }
      }
    },
    changeSelectDay(index) {
      if (this.unselectArr.includes(index)) return false;
      this.selectDay = index - this.firstDayInWeek + 1;
    },
  },
  computed: {
    trueSelectYear: function() {
      if (this.selectYear < this.limit.minYear) return this.limit.minYear;
      if (this.selectYear > this.limit.maxYear) return this.limit.maxYear;
      return this.selectYear;
    },
    trueSelectMonth: function() {
      if (
        this.selectYear === this.limit.minYear &&
        this.selectMonth < this.limit.minMonth
      )
        return this.limit.minMonth;
      if (
        this.selectYear === this.limit.maxYear &&
        this.selectMonth > this.limit.maxMonth
      )
        return this.limit.maxMonth;
      return this.selectMonth;
    },
    trueSelectDay: function() {
      if (
        this.selectYear === this.limit.minYear &&
        this.selectMonth === this.limit.minMonth &&
        this.selectDay < this.limit.minDay
      )
        return this.limit.minDay;
      if (
        this.selectYear === this.limit.maxYear &&
        this.selectMonth === this.limit.maxMonth &&
        this.selectDay > this.limit.maxDay
      )
        return this.limit.maxDay;
      if (this.selectDay > this.dayCount) return this.dayCount;
      return this.selectDay;
    },
    selectValue: function() {
      return `${this.trueSelectYear}-${this.trueSelectMonth}-${this.trueSelectDay}`;
    },
    firstDayInWeek: function() {
      return new Date(
        this.trueSelectYear,
        this.trueSelectMonth - 1,
        1
      ).getDay();
    },
    dayCount: function() {
      return new Date(this.trueSelectYear, this.trueSelectMonth, 0).getDate();
    },
    lastMonthDay: function() {
      let lastNum = this.firstDayInWeek;
      let lastDays = [];
      if (lastNum === 0) return lastDays;

      let i = 0;
      let lastDayNum = new Date(
        this.trueSelectYear,
        this.trueSelectMonth - 1,
        0
      ).getDate();
      for (; i < lastNum; i++) {
        lastDays.unshift(lastDayNum);
        lastDayNum--;
      }
      return lastDays;
    },
    nextMonthDay: function() {
      let num = 42 - this.firstDayInWeek - this.dayCount;
      let nextDays = [];
      if (num === 0) return nextDays;

      let i = 1;
      for (; i <= num; i++) {
        nextDays.push(i);
      }
      return nextDays;
    },
    renderData: function() {
      let nowDays = [];
      let i = 1;
      for (; i <= this.dayCount; i++) {
        nowDays.push(i);
      }
      return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay];
    },
    unselectArr: function() {
      let index = 0;
      let arr = [];

      if (
        this.trueSelectYear === this.limit.minYear &&
        this.trueSelectMonth === this.limit.minMonth
      ) {
        for (; index < this.firstDayInWeek + this.limit.minDay - 1; index++) {
          arr.push(index);
        }
      } else {
        for (; index < this.firstDayInWeek; index++) {
          arr.push(index);
        }
      }

      if (
        this.trueSelectYear === this.limit.maxYear &&
        this.trueSelectMonth === this.limit.maxMonth
      ) {
        index = this.firstDayInWeek + this.limit.maxDay;
        for (; index < 42; index++) {
          arr.push(index);
        }
      } else {
        index = this.firstDayInWeek + this.dayCount;
        for (; index < 42; index++) {
          arr.push(index);
        }
      }

      return arr;
    },
  },
  watch: {
    selectValue: function(newVal) {
      this.$emit('getValue', newVal);
    },
  },
  mounted() {
    this.$emit('getValue', this.selectValue);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$orange: #ee7419;
$midorange: #f0a54f;
$lightorange: #fcf0e5;

* {
  padding: 0;
  margin: 0;
}
html {
  height: 100%;
  font-size: 62.5%;
}
body {
  height: 100%;
  font-size: 1.4rem;
}
#app {
  height: 100%;
  overflow: auto;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #efefef;
}

.calendar-input-container {
  display: inline-block;
  position: relative;
  padding: 1rem;
  text-align: center;
  font-family: SimHei;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .calendar-input {
    box-sizing: border-box;
    width: 20rem;
    height: 3rem;
    padding: {
      left: 0.5rem;
      right: 0.5rem;
    }
    border: 0.1rem solid #ccc;
    border-radius: 4%;
    background-color: #fff;
    cursor: pointer;
    outline: none;
    transition: all 0.6s;
  }
  #calendar {
    position: absolute;
    width: 20rem;
    height: 24rem;
    box-sizing: border-box;
    border: 0.2rem solid #eee;
    border-radius: 2%;
    background-color: #fff;
    div,
    span {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    div {
      height: 12.5%;
      width: 100%;
    }
    span {
      height: 100%;
      width: 14.2857%;
    }
    #calendar-header {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      span {
        display: flex;
        align-items: center;
      }
      #date-box {
        flex-grow: 2;
      }
    }
    .week {
      box-sizing: border-box;
      padding: 0.5rem;
      font-size: 1.6rem;
      span {
        height: 100%;
      }
    }
    .days {
      box-sizing: border-box;
      height: 75%;
      padding: 0.5rem;
      font-size: 1.4rem;
      span {
        height: 16.666667%;
        cursor: pointer;
        transition: all 0.5s;
      }
      .unselect {
        cursor: default;
      }
    }
  }
}
.orange-theme {
  .focus {
    border-color: $midorange;
    box-shadow: 0 0 0.5rem $midorange;
  }
  .arrow {
    cursor: pointer;
    color: $orange;
    transition: color 0.5s;
    &:hover {
      color: $lightorange;
    }
  }
  .weekend {
    color: $orange;
  }
  .days {
    span {
      &:hover {
        border-radius: 0.2rem;
        background-color: $midorange;
        color: #fff;
      }
    }
    .unselect,
    .unselect:hover {
      border-radius: 0;
      background-color: #fff;
      color: #ccc;
    }
    .select,
    .select:hover {
      border-radius: 0.2rem;
      background-color: $orange;
      color: #fff;
    }
  }
}
</style>
