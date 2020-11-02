export class Scale {
    constructor(container: HTMLElement, options) {
        const html = `<div class="slider-scale"></div>`
        const $slider = container.querySelector('.slider')
        const values: number[] = []
        const step = options.step / options.max * 100
        for (let i = 0; i<=100; i+=step) {
            values.push(i)
        }

        $slider.insertAdjacentHTML('beforeend', html)
        const $scale = $slider.querySelector('.slider-scale')

        values.forEach((val, i) => {
            $scale.insertAdjacentHTML('beforeend', `<div class="scale-value">${val}</div>`)
            const $scaleVal: NodeListOf<HTMLElement> = $scale.querySelectorAll('.scale-value')
            if (options.isVertical) $scaleVal[i].style.bottom = `${val}%`;
            else $scaleVal[i].style.left = `${val}%`
        })
    }
}