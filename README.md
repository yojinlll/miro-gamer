# miro-gamer

> A Vue.js project

## 结构

```$xslt
├─components
│    miro
│    miro-header.vue
│  
├─modules
│  ├─css
│  │     common.css
│  │     reset.css
│  │
│  └─js 
│        mixin.js
│        store.js
│
└─pages
    ├─cart
    │  │  cart.html
    │  │  cart.js
    │  │  cart.scss
    │  │  goods-list.vue
    │  │
    │  └─router-components
    │          goods-paid.vue
    │          goods-unpaid.vue
    │          router.js
    │
    ├─category
    │  │  category.html
    │  │  category.js
    │  │  category.scss
    │  │
    │  └─router-components
    │          gamer-loading.vue
    │          gamer-product.vue
    │          product-list.vue
    │          router.js
    │
    ├─login
    │      login.html
    │      login.js
    │      login.scss
    │
    └─member
            member.html
            member.js
            member.scss
```
<br>
 
## 小结

1. 没有很复杂的逻辑，靠 log 大法可以一步步解决；
2. 常见 bug 解决思路：
    1. log 数据；
    2. log this；
    3. 通过 setTimeout log 以上两个，查看是否是异步问题；
    
3. 重构代码用去较长时间；
4. 由于页面结构和组件都是一步步思考如何实现，所以对组件化与方法封装的理解加深了不少；
5. 增加了Vue的熟练度；
