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
        var options = $.extend({}, $.fn.numberInput.defaults, options);
        function init(obj){
            var $obj = $(obj);
            var opts = $.metadata ? $.extend({}, options, $obj.metadata()) : options;
            var $inputObj;
            if(opts.main_cell) {
                $inputObj = $(opts.main_cell, $obj);
            } else {
                $inputObj = $obj;
            }
            var max = $inputObj.attr(opts.max_attr);
            var min = $inputObj.attr(opts.min_attr);
            var val = parseInt($inputObj.val());
            initInput($obj, $inputObj, max, min);
            changeVal($obj, $inputObj, val, max, min);
            if(opts.minus_cell) {
                var $minusBtn = $(opts.minus_cell, $obj);
                $minusBtn.click(function(){
                    var val = parseInt($inputObj.val()) - opts.step;
                    if(!$.isNumeric(min) || val >= min) {
                        $inputObj.val(val);
                        changeVal($obj, $inputObj, val, max, min);
                    }
                    return false;
                });
            }
            if(opts.incr_cell) {
                var $incrBtn = $(opts.incr_cell, $obj);
                $incrBtn.click(function(){
                    var val = parseInt($inputObj.val()) + opts.step;
                    if(!$.isNumeric(max) || val <= max) {
                        $inputObj.val(val);
                        changeVal($obj, $inputObj, val, max, min);
                    }
                    return false;
                });
            }
            
        };
        function initInput($obj, $inputObj, max, min) {
            $inputObj.keydown(function(e){
                var code = parseInt(e.keyCode);
                if (code >= 96 && code <= 105 || code >= 48 && code <= 57 || code == 8) {
                    return true;
                } else {
                    return false;
                }
            }).bind("paste",function(){
            	var val = $(this).val();
            	if(val != '0') {
					$(this).val(val.replace(/\D|^0/g,''));
            	}
            }).blur(function(){
                var val = $(this).val();
                if(val != '0') {
              	    val = parseInt(val.replace(/\D|^0/g,''));
            	} else {
            		val = 0;
            	}
                if($.isNumeric(max) && val > max) {
                    val = max;
                } else if($.isNumeric(min) && val < min) {
                    val = min;
                }
                $(this).val(val);
                changeVal($obj, $inputObj, val, max, min);
            }).css('imeMode', 'disabled').attr('autocomplete', 'off');
            if($.isNumeric(max) && max.length > 0) {
                $inputObj.attr('maxlength', max.length);
            }
        }

        function changeVal($obj, $inputObj, val, max, min) {
            if($opts.minus_cell) {
                var $minusBtn = $($opts.minus_cell, $obj);
                if ($.isNumeric(min) && val <= min) {
                    $minusBtn.addClass($opts.disable_calss);
                }
                if ($.isNumeric(min) && val > min) {
                    $minusBtn.removeClass($opts.disable_calss);
                }
            }
            if($opts.incr_cell) {
                var $incrBtn = $($opts.incr_cell, $obj);
                if ($.isNumeric(max) && val >= max) {
                    $incrBtn.addClass($opts.disable_calss);
                }
                if ($.isNumeric(max) && val < max) {
                    $incrBtn.removeClass($opts.disable_calss);
                }
            }
            if($opts.callback) {
                $opts.callback($inputObj, val);
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
        disable_calss: 'disabled',
        callback: 0,
        step: 1
    };
})(jQuery);
