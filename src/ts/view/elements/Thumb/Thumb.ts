export class Thumb {
    constructor(container: HTMLElement, options: sliderOptions) {
        const $slider = container.querySelector('.slider')
        const html = '<div class="slider-thumb"></div>'
        
        $slider.insertAdjacentHTML('beforeend', html)

        const $thumb: HTMLElement = $slider.querySelector('.slider-thumb')
        $thumb.style.setProperty('background', `${options.thumbColor}`)
        $thumb.style.setProperty('left', `calc(${options.value}% - ${options.thumbWidth/2}px)`)
    }
}