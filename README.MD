# v-tag

vue-infinite-scroll is an infinite scroll directive for vue.js.

# Install

```Bash
npm install v-tag --save
```

### CommonJS

You can use any build tool which supports `commonjs`:

```JavaScript
// register globally
var vueTag =  require('v-tag');
Vue.use(vueTag)

// or for a single instance
var vueTag = require('v-tag');
new Vue({
  directives: {vueTag}
})

```

Or in ES2015:

```JavaScript
// register globally
import vueTag from 'v-tag'
Vue.use(vueTag)

// or for a single instance
import vueTag from 'v-tag'
new Vue({
  directives: {vueTag}
})

```