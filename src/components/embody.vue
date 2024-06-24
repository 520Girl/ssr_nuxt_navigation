<template>
  <div class="embody-container">
    <div class="embody-layout  mx-15-2 ">
      <div class="card-body applyBck">
        <div class="panel-header"><h1 class="h3">{{$t('title')}}{{$t('embody.h')}} </h1></div>
        <div class="panel-body mt-2">
          <p style="margin-bottom: 20px;text-align: center;">
            <span style="font-size: 19px;">{{$t('embody.h_s')}}</span>
          </p>
          <p style="font-size: 17px">
            <font style="font-size: 17px">
              {{$t('embody.h_f')}}
            </font>
          </p>
          <p style="font-size: 16px" v-html="$t('embody.h_p')"></p>
          <h2>{{$t('embody.submit_1')}}</h2>
          <ul>
            <li><span class="order-1 fontSize-text-colornoH">1</span><strong>{{$t('embody.s_1_1_t')}}</strong>：{{$t('embody.s_1_1_c')}}
            </li>
            <li><span class="order-2 fontSize-text-colornoH">2</span><strong>{{$t('embody.s_1_2_t')}}</strong>：{{$t('embody.s_1_2_c')}}
            </li>
            <li><span class="order-3 fontSize-text-colornoH">3</span><strong>{{$t('embody.s_1_3_t')}}</strong>：{{$t('embody.s_1_3_c')}}
            </li>
            <li><span class="order-4 fontSize-text-colornoH">4</span><strong>{{$t('embody.s_1_4_t')}}</strong>：{{$t('embody.s_1_4_c')}}<a
              :href="`${setting.website}/go/?url=aHR0cHM6Ly93d3cuZ2VuYWluYXYuY29tLw%3D%3D`" target="_blank"
              rel="nofollow noopener" class="external">{{setting.website}}</a></li>
          </ul>
          <h2>{{$t('embody.submit_2')}}</h2>
          <ul>
            <li>
              <span class="order-1 fontSize-text-colornoH">1</span>
              <strong> {{$t('embody.s_2_1_t')}}</strong>：{{$t('embody.s_2_1_c')}}
            </li>
            <li>
              <span class="order-2 fontSize-text-colornoH">2</span>
              <strong>{{$t('embody.s_2_2_t')}}</strong>：<a :href="setting.website" title="" class="fontSize-text i-f-c"> {{setting.website}}</a>{{$t('embody.s_2_2_c')}}
            </li>
            <li>
              <span class="order-3 fontSize-text-colornoH">3</span>
              <strong>{{$t('embody.s_2_3_t')}}</strong>：<a class="external" :href="`${setting.website}/favorites/ai-writing-tools`" :title="$t('embody.s_2_3_c_5')"
                      target="_blank">{{$t('embody.s_2_3_c_1')}}</a>{{$t('embody.s_2_3_c_2')}}<a class="external"
                                                      :href="`${setting.website}/favorites/ai-writing-tools`"
                                                      :title="$t('embody.s_2_3_c_5')" target="_blank">{{$t('embody.s_2_3_c_3')}}</a>{{$t('embody.s_2_3_c_4')}}
            </li>
            <li><span class="order-4 fontSize-text-colornoH">4</span><strong>{{$t('embody.s_2_4_t')}}</strong>：{{$t('embody.s_2_4_c')}}</li>
            <li><span class="order-5 fontSize-text-colornoH">5</span><strong>{{$t('embody.s_2_5_t')}}</strong>：{{$t('embody.s_2_5_c')}}
            </li>
            <li><span class="order-6 fontSize-text-colornoH">6</span><strong>{{$t('embody.s_2_6_t')}}</strong>：{{$t('embody.s_2_6_c')}}
            </li>
            <li><span class="order-7 fontSize-text-colornoH">7</span><strong>{{$t('embody.s_2_7_t')}}</strong>：{{$t('embody.s_2_7_c')}}</li>
            <li><span class="order-8 fontSize-text-colornoH">8</span><strong>{{$t('embody.s_2_8_t')}}</strong>：{{$t('embody.s_2_8_c')}}</li>
            <li><span class="order-9 fontSize-text-colornoH">9</span><strong>{{$t('embody.s_2_9_t')}}</strong>：{{$t('embody.s_2_9_c')}}</li>
            <li><span class="order-10 fontSize-text-colornoH">10</span><strong>{{$t('embody.s_2_10_t')}}</strong>：{{$t('embody.s_2_10_c')}}</li>
          </ul>
          <h2>{{$t('embody.submit_3')}}</h2>
          <p>{{$t('embody.s_3_1_1')}}</p>
          <p>{{$t('embody.s_3_1_2')}}：<a :href="'mailto:'+setting.email" class="external i-f-a fontSize-text-app" >（{{ setting.email }}）</a>{{$t('embody.s_3_2_3')}}
          </p>
          <p>{{$t('embody.s_3_2_4')}}！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setting from "@/setting.js";
export default {
  name: "Embody",
  data(){
    return {
      setting
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/commonmMixin.scss"; //公共样式分享
.card-body {
  padding: 20px 20px;
  margin: 0px 1rem 0.5rem 1rem;
  border-radius: 10px;

  .panel-header {
    margin-bottom: 35px;

    h1 {
      font-size: 0.28rem;
    }
  }

  .panel-body {
    p {
      margin-bottom: 20px;
      line-height: 30px;
      font-size: 16px;
    }

    h2 {
      font-size: 20px;
      border-left: 3px solid #f1404b;
      margin-left: -23px;
      padding-left: 20px;
      margin-bottom: 20px;
      line-height: 40px;
    }

    ul {
      @include order-sequence;

      li {
        margin: 15px 0px;
        padding-left: 15px;
        line-height: 20px;

        span {
          display: inline-block;
          margin-right: 15px;
          border-radius: 5px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
