/// <reference types="@types/office-js" />
import { appRouter } from '#/consts'
import App from '#/widgets/app.vue'

import { createApp } from 'vue'
import './registerServiceWorker'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.use(appRouter).use(Antd).mount('#app')

// app.config['productionTip'] = false
