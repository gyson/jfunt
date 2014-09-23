
# jfunt

Javascript's FUNction as Template

## install

```
npm install jfunt
```

## example

```js
var render = require('jfunt')
var beautify = require('js-beautify').html

function $index($title, $content) {with(this){
    return html(
        $head.call(this, $title),
        body(
            h1('Welcome to my little example'),
            p($content),
            $foot.call(this)
        )
    )
}}

function $head($title) {with(this){
    return head(
        title($title),
        script({ src: '/javascript/jquery.js' }),
        script({ scr: '/javascript/ng.js' })
    )
}}

function $foot() {with(this){
    return div({ id: 'footer' },
        p('Copyright (c) anonymous')
    )
}}

var page = render($index, 'home', 'Hello!')

console.log(beautify(page))
```

then you will get following output:

```
<html>

<head>
    <title>home</title>
    <script src="/javascript/jquery.js"></script>
    <script scr="/javascript/ng.js"></script>
</head>

<body>
    <h1>Welcome to my little example</h1>
    <p>Hello!</p>
    <div id="footer">
        <p>Copyright (c) anonymous</p>
    </div>
</body>

</html>
```
