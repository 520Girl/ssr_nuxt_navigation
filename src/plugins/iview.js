//需要在服务端的

import Vue from 'vue';
import 'iview/dist/styles/iview.css';
import {
  Page,
  Row,
  Col,
  Input,
  Button,
  ButtonGroup,
  Icon,
  Select,
  Option,
  Collapse,
  Badge,
  Panel,
  Carousel,
  CarouselItem,
  Breadcrumb,
  Form,
  FormItem,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Tooltip,
  Time,
  Rate,
  Message,
  Notice,
  Spin,
  Card,
  Tag
} from 'iview';
const components = {
  Page,
  Row,
  Col,
  Input,
  Button,
  ButtonGroup,
  Icon,
  Select,
  Option,
  Collapse,
  Badge,
  Panel,
  Carousel,
  CarouselItem,
  Breadcrumb,
  Form,
  FormItem,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Tooltip,
  Time,
  Rate,
  Message,
  Notice,
  Spin,
  Card,
  Tag
}

// 循环注册全局组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

//https://www.jianshu.com/p/d0aadf5cdf57
