import { createApp } from "vue";
import { createPinia } from "pinia";
import "vant/lib/index.css";

import {
  Button,
  NavBar,
  Search,
  TextEllipsis,
  BackTop,
  Col,
  Row,
  Space,
  Toast,
} from "vant";

import App from "./App.vue";
import router from "./router";

import svgIcon from "@/components/SvgIcon/index.vue";

import "amfe-flexible/index.js";
import "./assets/styles/index.scss";

import "./permission";
import directive from "./directive";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(NavBar);
app.use(Button);
app.use(Search);
app.use(TextEllipsis);
app.use(BackTop);
app.use(Col);
app.use(Row);
app.use(Space);
app.use(Toast);

directive(app);

app.component("svg-icon", svgIcon);

app.mount("#app");
