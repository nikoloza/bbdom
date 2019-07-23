# DOMQL
DOM rendering Javascript framework at the early stage.

- [x] error reporting
- [x] virtual DOM tree
- [x] create
  - [x] create using prototype class
- [ ] binding *- in progress*
- [ ] update
- [ ] events

### Getting started

To install all dependencies and run dev server, run:

```shell
yarn && yarn start
```

### Reserved keywords

```
key
tag
node
proto
on
class
text
data
style
attr
```

### Example 

```
var link = {
  tag: 'a',
  class: 'menu link',
  attr: {
    href: '#'
  }
}
```

```
var img = {
  tag: 'img',
  class: 'avatar',
  attr: {
    src: '...'
  }
}
```