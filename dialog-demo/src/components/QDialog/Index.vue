
<script>

export default {
  name: "QDialog",
  render() {
    return (
      <div class="q-dialog">
        <div
          class="q-dialog-background"
          v-show={this.show}
          onClick={this.doBackgroundClick}
        />
        <div class="q-dialog-core" v-show={this.show}>
          {this.title && <div class="q-dialog-core__title">{this.title}</div>}
          {this.details && (
            <div class="q-dialog-core__details">{this.details}</div>
          )}
          {this.$slots.details && (
            <div class="q-dialog-core__details">{this.$slots.details}</div>
          )}
          <div class="q-dialog-core-btns">
            {this.btnsTrans.map((v, i, arr) => {
              const type =
                arr.length === 2 ? (i === 0 ? "cancel" : "confirm") : "confirm";
              let className = "q-dialog-core-btns-chunk";
              className += ` q-dialog-core-btns-chunk--${type}`;

              if (arr.length === 2 && type === "confirm") {
                className += ` q-dialog-core-btns-chunk--confirm--line`;
              }

              return (
                <div
                  class={className}
                  style={v.color}
                  onClick={this.doBtnClick.bind(this,v,type)}
                >
                  {!v.loading && (<div>{v.value}</div>)}
                  {v.loading && (
                      <svg
                      class="q-dialog-core-btns-chunk-loading"
                      viewBox="25 25 50 50"
                      >
                      <circle
                        class="q-dialog-core-btns-chunk-loading__circle"
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  model: {
    prop: "show"
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    details: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "alert"
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    confirmTextColor: {
      type: String,
      default: "#40A1FF"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    cancelTextColor: {
      type: String,
      default: "#999999"
    },
    btns: {
      type: Array,
      default: () => []
    },
    beforeClose: {
       type: Function,
    }
  },
  watch: {
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    btns: {
      handler() {
        this.generateBtnsTrans();
      },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    type: {
      handler() {
        this.generateBtnsTrans();
      },
      immediate: true
    }
  },
  methods: {
    done(v,type) {
      if (this.$parent) {
        this.$emit("input", false);
      } else {
        this._doPromiseInstanceClose(type, v);
      }
    },
    generateBtnsTrans() {
      if (this.btns && this.btns.length) {
        this.btnsTrans = this.btns;
        this.btnsTrans.forEach(v => {
          v.loading = false
        });
      } else if (this.type === "alert") {
        this.btnsTrans = [
          {
            value: this.confirmText,
            color: this.confirmTextColor,
            loading: false
          }
        ];
      } else if (this.type === "confirm") {
        this.btnsTrans = [
          {
            value: this.cancelText,
            color: this.cancelTextColor,
            loading: false
          },
          {
            value: this.confirmText,
            color: this.confirmTextColor,
            loading: false
          }
        ];
      }
    },
    doBackgroundClick() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose('background',this.done)
        return;
      }
      this.done('background',null)
    },
    doBtnClick(v,type) {
      if (typeof this.beforeClose === 'function') {
        v.loading = true
        this.$forceUpdate()
        this.beforeClose(type,this.done)
        return;
      }
      this.done(type,v)
    },
  }
};
</script>

<style lang="scss" scoped>
.q-dialog {
  &-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.3;
    z-index: 5;
  }
  &-core {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 590px;
    background-color: #fff;
    z-index: 6;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 8px;
    font-size: 28px;

    &__title {
      color: #333;
      line-height: 40px;
      font-size: 40px;
      text-align: center;
      padding: 50px 30px 30px 30px;
      font-weight: 500;
    }
    &__details {
      color: #666666;
      padding: 0 40px 40px 40px;
      text-align: center;
      max-height: 350px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    &-btns {
      position: relative;
      display: flex;

      &-chunk {
        height: 90px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        line-height: 32px;
        font-weight: 400;

        &--cancel {
          color: #999;
        }
        &--confirm {
          color: #40a1ff;
          &--line {
            position: relative;
            /** 弹窗按钮中间的横线采用1px伪元素解决方案  **/
            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 20%;
              height: 120%;
              width: 1px;
              transform-origin: top left;
              transform: scaleY(0.5);
              background-color: #eeeeee;
            }
          }
        }

        &-loading {
            height: 40px;
            width: 40px;
            animation: loading-rotate 2s linear infinite;
            margin-right: 20px;
            &__circle {
              animation: loading-dash 1.5s ease-in-out infinite;
              stroke-dasharray: 90, 150;
              stroke-dashoffset: 0;
              stroke-width: 2;
              stroke-linecap: round;
              stroke: #40a1ff;
           }
        }

      }

  @keyframes loading-rotate {
      100% {
        transform: rotate(360deg);
      }
  }
  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
}

    }
    /** 弹窗按钮上面的横线采用1px伪元素解决方案  **/
    &-btns::before {
      content: "";
      position: absolute;
      height: 1px;
      width: 100%;
      transform-origin: top left;
      transform: scaleY(0.5);
      border-top: 1px solid #eeeeee;
    }
  }
}
</style>
