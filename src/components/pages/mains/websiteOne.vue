<template>
  <div class="website-one">
    <div class="website-one-list" v-for="(item,index) in websiteData" :key="index" v-if="websiteData.length>0">
      <div class="tool-header auto-line-between">
        <div class="left">
          <div class="heade-icon" v-if="item.icon">
            <!--            <img :src="require(`../../../assets/images/web/${data.icon}`)" :alt="data.title" height="28" width="28">-->
          </div>
          <h5 class="fontSize-text-mains" :style="'color:'+item.bcColor+'!important'">{{item.title}}</h5>
        </div>
        <div class="right auto-line-between">
          <div class="number fontSize-text">
            当前数量<span class='nums'>{{item.allNum}}</span>个
          </div>
          <span class="line"></span>
          <div
            :class="form_onlyRead ? 'more fontSize-text refresh-icon form-onlyRead' :'more fontSize-text refresh-icon'"
            @click="refresh(item.belong,item.allNum,index)">
            换一换
            <Icon type="md-refresh refresh" :class="{refresh_quan:quan}" />
          </div>
          <span class="line"></span>
          <div class="more fontSize-text" @click="moreContent(item.belong)">
            更多
            <Icon type="ios-arrow-forward" />
          </div>
        </div>
      </div>
      <!--      :style="'color:'+item.bcColor+'!important'"-->
      <div class="tool-info overflow-eclipse fontColor-t-d" v-html="$common.cruxText(item.explain)">
      </div>
      <Row type='flex' justify="start" align="middle" class-name="mains-menu hotWeb mx-2">
        <Col :xxl="{span:3}" :xl="{ span: 4 }" :md="{span:6}" :sm="{ span:8}" :xs="{ span: 12 }"
          class-name="hotWeb-item " v-for="(item1,index1) in item.content" :key="index1" v-if="item1.state">
        <Tooltip :content="item1.explain">
          <a :href="item1.hrefUrl" target="_blank" class="item-content auto-line-start applyBck">
            <!--              <img :src="require(`../../../assets/images/web/${data.language}/${data.belong}/${item1.belong}/favicons.png`)" :alt="item1.title" height="40" width="40">-->
            <div class="text">
              <h5 class="fontSize-text overflow-eclipse">{{item1.title}}</h5>
              <small class="fontColor-t-d overflow-eclipse">{{item1.hrefUrl}}</small>
            </div>
          </a>
        </Tooltip>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>

  export default {
    name: "websiteOne",
    props: ['websiteData', 'spinShow'],
    data() {
      return {
        params: { page: 1, per_size: 8, belong: '' },
        form_onlyRead: false,//禁止点击
        clickNum: 0,
        quan: false,
      }
    },
    mounted() {
      // this.getWebsite()
    },
    methods: {
      getWebsite(belong, address) {
        this.params.belong = belong
        this.quan = true
        this.$api.webSite.getWebsite(this.params).then(res => {
          if (res.status === 1) {

            this.websiteData[address].content = [...this.websiteData[address].content, ...res.website.content]
            console.log(this.websiteData2)
            this.$forceUpdate()
            this.quan = false
          }
        })
      },
      moreContent() {
        this.$Notice.warning({ title: '更多', desc: '还在开发中哦,敬请期待...', })
      },
      refresh(belong, allNum, address) {
        console.log(belong, allNum, address)
        if (parseInt(allNum) <= (this.params.page * this.params.per_size)) {
          if (this.clickNum === 1) return false
          this.$Notice.warning({ title: '刷新', desc: '没有给多了,求求你别刷了...', })
          this.form_onlyRead = true
          this.clickNum++
        } else {
          this.params.page++
          this.getWebsite(belong, address)
        }
      }
    },
    computed: {
      // websiteData2:{
      //   get:function (){
      //     console.log("====================")
      //     return this.websiteData2
      //   },
      //   set:function (newValue){
      //     this.websiteData2 = newValue
      //     console.log(this.websiteData2)
      //   }
      // }
      // websiteData:{
      //   get:function (){
      //     console.log('---------------------')
      //     console.log(this.websiteData)
      //     return this.websiteData
      //   },
      //   set:function (newValue){
      //     this.websiteData = [...newValue]
      //   }
      // }
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/css/commonmMixin.scss"; //公共样式分享 相关内容栏 tool-header

  .website-one {
    //min-height:648px ;
    position: relative;
    overflow: hidden;

    .website-one-list {
      margin-top: 0.2rem;
      min-height: 142px;
      @include tool-header;

      .mains-menu {
        .one-item {
          min-width: 300px;
          height: 100%;
          margin-bottom: 0.2rem;

          .ivu-tooltip {
            height: 100%;
            margin: auto;
            width: 100%;

            >>>.ivu-tooltip-rel {
              height: 100%;
              margin: auto;
              width: 100%;
            }
          }

          .item-content {
            padding: $padding15 $padding20;
            position: relative;
            align-items: flex-start !important;
            margin: 0 .1rem;
            justify-content: flex-start;
            padding-left: .05rem;
            border-radius: 5px;

            &:hover {
              .item-characteristic {
                i {
                  &:first-child {
                    color: #ff5b56;
                  }

                  &:nth-child(2) {
                    color: #52ff24;
                  }

                  &:nth-child(3) {
                    color: #27fffc;
                  }

                  &:last-child {
                    color: #363cff;
                  }
                }

              }

              .cloud-download {
                i {
                  color: #c000ff;
                }
              }

            }

            .item-left {
              max-height: 70px;
              width: 70px;
              max-width: 30%;
              border-radius: 15%;
              display: inline-block;
              background: red;

              img {
                width: 100% !important;
                height: 100% !important;
              }
            }

            .item-right {
              max-width: 70%;
              height: 100%;
              display: flex;
              flex-direction: column;
              flex: 0 0 auto;
              padding-left: $padding15;

              .title {
                margin-bottom: 8px;

                .new {
                  background-color: red;
                  padding: 3px;
                  color: #ffffff;
                  border-radius: 5px;
                  font-size: 12px;
                  margin-right: 4px;
                }
              }

              .info {
                font-size: 0.12rem;
                color: #6c757d;
              }

              .app-like {
                margin-top: 5px;
                display: flex;
                justify-content: flex-start;
                position: relative;

                a {
                  font-size: 0.12rem;
                  color: #6c757d;
                  padding: 2px;
                  background: rgba(134, 134, 134, 0.1);
                  color: #888;
                  border-radius: 15px;
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: normal;
                }

              }
            }

            .item-characteristic {
              position: absolute;
              top: 2px;
              right: 2px;

              i {
                &:first-child {
                  transition: color 0.5s;
                }

                &:nth-child(2) {
                  transition: color 1s;
                }

                &:nth-child(3) {
                  transition: color 1.5s;
                }

                &:last-child {
                  transition: color 2s;
                }
              }

            }

            .cloud-download {
              position: absolute;
              bottom: 23px;
              font-size: 39px;
              right: 3px;
              color: #000000;

              i {
                transition: color 3s;
              }
            }

            .like {
              position: absolute;
              right: 5px;
              bottom: 5px;
              // background: white;
              overflow: hidden;
              text-align: right;
              width: 70%;
              white-space: nowrap;

              span {
                display: inline-block;
                font-size: 0.12rem;
                color: #6c757d;
              }
            }
          }
        }
      }

      .hotWeb {

        .hotWeb-item {
          box-sizing: border-box;
          height: 70px;
          margin-bottom: $margin10;
          vertical-align: middle;

          //min-width:294px;
          .ivu-tooltip {
            height: 100%;
            margin: auto;
            width: 100%;

            >>>.ivu-tooltip-rel {
              height: 100%;
              margin: auto;
              width: 100%;

              .item-content {
                align-items: center;
                height: 70px;
                margin: 0 $margin10 ;
                background: #ffffff;
                border-radius: 5px;
                padding-left: $padding15;
                box-sizing: content-box;

                &:hover {
                  .item-characteristic {
                    i {
                      &:first-child {
                        color: #ff5b56;
                      }

                      &:nth-child(2) {
                        color: #52ff24;
                      }

                      &:nth-child(3) {
                        color: #27fffc;
                      }

                      &:last-child {
                        color: #363cff;
                      }
                    }
                  }

                  .cloud-download {
                    i {
                      color: #c000ff;
                    }
                  }

                }

                img {
                  height: 40px;
                  width: 40px;
                }

                .text {
                  padding-left: $padding10;
                  overflow: hidden;

                  h5 {
                    font-weight: bolder;
                    font-size: 14px;
                  }

                  small {
                    font-size: 12px;
                    margin-top: 0.05rem;
                    margin-left: 0.05rem;
                    display: block;
                  }
                }

              }
            }
          }

        }
      }
    }
  }
</style>