import Tag from './directive.js'

const install = function(Vue) {
  Vue.directive('Tag', Tag);
};

if (window.Vue) {
  window.tag = Tag;
  window.Vue.use(install);
}

Tag.install = install;
export default Tag;