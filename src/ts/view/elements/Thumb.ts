export class Thumb {
    constructor(container: HTMLElement, single: boolean) {
        const slider = container.querySelector('.slider')
        const html = '<div class="slider-thumb"></div>'
        
        slider.insertAdjacentHTML('beforeend', html)
        if (!single) slider.insertAdjacentHTML('beforeend', html)
    }
}