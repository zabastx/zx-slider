import {View} from './view/view'

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
            value: (this.max - this.min) / 2,
            showValue: true
        }
        const opts = $.extend(defaultSettings, options)

        return this.each(function() {
            const input = new View(opts, this)
            input.init()
        })
    }
})(jQuery)
