import {View} from './View/View'

(function($){
    $.fn.zxSlider = function(options: sliderOptions): JQuery {
        const defaultSettings: sliderOptions = {
            min: 0,
            max: 100,
            step: 10,
            isVertical: false,
            isSingle: true,
            thumbWidth: 16,
            barHeight: 8,
            value: 50,
            showValue: true,
            barColor: '#00bb00',
            thumbColor: '#fff'
        }
        const opts = $.extend(defaultSettings, options)

        return this.each(function() {
            new View(opts, this)
        })
    }
})(jQuery)
