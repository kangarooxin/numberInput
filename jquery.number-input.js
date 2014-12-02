/*!
 * jQuery Number Input Plugin v0.1.0
 *
 * Copyright 2014
 *
 * @author Pangxin
 * @mail   pangxin001@163.com
 *
 * $('.numberInput').numberInput();
 *
 */
;(function($){
    $.fn.numberInput = function(options){
        var $opts = $.extend({}, $.fn.numberInput.defaults, options);
        function init(obj){
            var $obj = $(obj);
            var opts = $.meta ? $.extend({}, $opts, $obj.data()) : $opts;
            var $inputObj;
            if(opts.main_cell) {
                $inputObj = $(opts.main_cell, $obj);
            } else {
                $inputObj = $obj;
            }
            initInput($inputObj);
            if(opts.minus_cell) {
                var $minusBtn = $(opts.minus_cell, $obj);
                $minusBtn.click(function(){
                    var val = parseInt($inputObj.val()) - opts.step;
                    var min = $inputObj.attr(opts.min_attr);
                    if($.isNumeric(min) && val >= min) {
                        $inputObj.val(val);
                        if(opts.callback) {
                            opts.callback($inputObj, val);
                        }
                    }
                    return false;
                });
            }
            if(opts.incr_cell) {
                var $incrBtn = $(opts.incr_cell, $obj);
                $incrBtn.click(function(){
                    var val = parseInt($inputObj.val()) + opts.step;
                    var max = $inputObj.attr(opts.max_attr);
                    if($.isNumeric(max) && val <= max) {
                        $inputObj.val(val);
                        if(opts.callback) {
                            opts.callback($inputObj, val);
                        }
                    }
                    return false;
                });
            }
            
        };
        function initInput($obj, max, min) {           
            $obj.keydown(function(e){
                var code = parseInt(e.keyCode);
                if (code >= 96 && code <= 105 || code >= 48 && code <= 57 || code == 8) {
                    return true;
                } else {
                    return false;
                }
            }).bind("paste",function(){
                $(this).val($(this).val().replace(/\D|^0/g,''));
            }).blur(function(){
                var val = $(this).val();
                val = val.replace(/\D|^0/g,'');
                var max = $(this).attr(opts.max_attr);
                var min = $(this).attr(opts.min_attr);
                if($.isNumeric(max) && val > max) {
                    val = max;
                } else if($.isNumeric(min) && val < min) {
                    val = min;
                }
                $(this).val(val);
                if(opts.callback) {
                    opts.callback($obj, $(this).val());
                }
            }).css('imeMode', 'disabled').attr('autocomplete', 'off');
            if($.isNumeric(max) && max.length > 0) {
                $obj.attr('maxlength', max.length);
            }
        }

        return this.each(function() {
            init(this);
        });
    };
    $.fn.numberInput.defaults = {
        max_attr: 'max',
        min_attr: 'min',
        main_cell: 'input',
        minus_cell: '.minus',
        incr_cell: '.incr',
        callback: 0,
        step: 1
    };
})(jQuery);