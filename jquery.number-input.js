(function($){
    $.fn.numberInput = function(options){
        options = $.extend($.fn.numberInput.defaults, options);
        function init(obj){
            var $inputObj;
            if(options.main_cell) {
                $inputObj = $(options.main_cell, $(obj));
            } else {
                $inputObj = $(obj);
            }
            var max = $inputObj.attr(options.max_attr);
            var min = $inputObj.attr(options.min_attr);
            initInput($inputObj, max, min);
            if(options.minus_cell) {
                var $minusBtn = $(options.minus_cell, $(obj));
                $minusBtn.click(function(){
                    var val = parseInt($inputObj.val()) - options.step;
                    if($.isNumeric(min) && val >= min) {
                        $inputObj.val(val);
                        if(options.callback) {
                            options.callback($inputObj, val);
                        }
                    }
                    return false;
                });
            }
            if(options.incr_cell) {
                var $incrBtn = $(options.incr_cell, $(obj));
                $incrBtn.click(function(){
                    var val = parseInt($inputObj.val()) + options.step;
                    if($.isNumeric(max) && val <= max) {
                        $inputObj.val(val);
                        if(options.callback) {
                            options.callback($inputObj, val);
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
                if($.isNumeric(max) && val > max) {
                    val = max;
                } else if($.isNumeric(min) && val < min) {
                    val = min;
                }
                $(this).val(val);
                if(options.callback) {
                    options.callback($obj, $(this).val());
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