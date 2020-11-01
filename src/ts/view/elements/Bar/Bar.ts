export class Bar {
    constructor(container: HTMLElement, options: sliderOptions) {
        const $slider = container.querySelector('.slider')
        const html = (
            `<div class="slider-bar" max-val="${options.max}" min-val="${options.min}">
                <div class="slider-progress"></div>
            </div>`
        )

        $slider.insertAdjacentHTML('afterbegin', html)

        const $progress: HTMLElement = $slider.querySelector('.slider-progress')

        $progress.style.setProperty('background', `${options.barColor}`)
        $progress.style.setProperty('width', `${50}%`)
    }
}