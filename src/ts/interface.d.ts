interface JQuery {
    zxSlider: any
}

interface sliderOptions {
    min?: number
    max?: number
    step?: number
    value?: number
    isVertical?: boolean
    isSingle?: boolean
    thumbWidth?: number
    barHeight?: number
    showValue?: boolean
}

interface ViewType {
    options: sliderOptions
}