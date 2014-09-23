
// render function
// render(template, a1, a2, a3)
module.exports = function (template) {
    return template.apply(elements, slice(arguments, 1))
}

var elements = {}

// from Mozilla website
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list

// root element
;['html'

// document metadata
, 'head title base link meta style'

// scripting
, 'script noscript template'

// sections
, 'body section nav article aside'
, 'h1 h2 h3 h4 h5 h6 header footer address main'

// grouping content
, 'p hr pre blockquote ol ul li dl dt dd figure figcaption div'

// text-level semantics
, 'a em strong small s cite q dfn abbr data time code var'
, 'samp kbd sub sup i b u mark ruby rp bdi bdo span br wbr'

// edits
, 'ins del'

// embedded content
, 'img iframe embed object param video audio'
, 'source track canvas map area svg math'

// tabular data
, 'table caption colgroup col tbody thead tfoot tr td th'

// forms
, 'form fieldset legend label input button select datalist'
, 'optgroup option textarea keygen output progress meter'

// interactive elements
, 'details summary menuitem menu'

].join(' ').split(' ').forEach(function (name) {
    elements[name] = function () {
        var args = slice(arguments)
        var res = '<' + name

        if (isObject(args[0])) {
            var attr = args.shift()
            Object.keys(attr).forEach(function (key) {
                res += ' ' + key + '="' + attr[key] + '"'
            })
        }
        res += '>'
        args.forEach(function (x) {
            res += x
        })
        return res + '</' + name + '>'
    }
})

// override self-closing tag
;('area base br col command embed hr img input \
   keygen link meta param source track wbr'    )
.split(' ').forEach(function (name) {
    elements[name] = function (attr) {
        var res = '<' + name
        if (isObject(attr)) {
            Object.keys(attr).forEach(function (key) {
                res =+ ' ' + key + '="' + attr[key] + '"'
            })
        }
        return res + '/>'
    }
})

elements._each = function (obj, fn) {
    var ret = ''
    if (obj == null) return ret
    var i, len = obj.length
    if (len === +len) {
        for (i = 0; i < len; i++) {
            ret += fn.call(elements, obj[i], i, obj)
        }
    } else {
        var keys = Object.keys(obj)
        for (i = 0, len = keys.length; i < len; i++) {
            ret += fn.call(elements, obj[keys[i]], keys[i], obj)
        }
    }
    return ret
}

// escape everything
elements._escape = function () {
    return slice(arguments).map(function (arg) {
        return arg
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
    }).join('')
}

function slice(obj, s, e) {
    return [].slice.call(obj, s, e);
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
