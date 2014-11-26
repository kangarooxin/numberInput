numberInput
===========

init a text as a number input, with minus and increment button

For **demo**, usage, and examples, see:
http://kangarooxin.github.io/numberInput/


### Useage:
```html
<style>
    .numberInput {
        width: 132px;
        height: 28px;
        float: left;
        border: 1px solid #dfdfdf;
    }
    .numberInput a {
        text-decoration: none;
        display: inline-block;
        float: left;
        width: 28px;
        height: 28px;
        line-height: 28px;
        color: #6d6d6d;
        background: #fafafa;
        text-align: center;
    }
    .numberInput a:hover {
        background: #d7d7d7;
    }
    .numberInput input {
        float: left;
        width: 74px;
        height: 28px;
        line-height: 28px;
        padding: 0;
        border: none;
        border-left: 1px solid #dfdfdf;
        border-right: 1px solid #dfdfdf;
        text-align: center;
        color: #333;
    }
</style>
<div class="numberInput">
    <a href="javascript:void(0)" class="minus">-</a>
    <input type="text" value="1" min="1" max="99"/>
    <a href="javascript:void(0)" class="incr">+</a>
</div>
```
```javascript
$('.numberInput').numberInput();
```

### Options:

```javascript
$('.numberInput:eq(1)').numberInput({
    max_attr: 'max', //最大值属性名
    min_attr: 'min', //最小值属性名
    main_cell: 'input', //输入框
    minus_cell: '.minus',//减少按钮
    incr_cell: '.incr', //增加按钮
    callback: function($ele, val) { //回调函数
       $('#number').text(val);
    },
    step: 2  // 梯级，每次点击增加或者减少的数量
});
```