import { Bar } from './elements/Bar/Bar'
import { Thumb } from './elements/Thumb/Thumb'
import './slider.scss'

export class View implements ViewType {
    options: sliderOptions
    container: HTMLElement
    orientation: 'vertical' | 'horizontal'

    constructor(options: sliderOptions, container: HTMLElement) {
        this.options = options
        this.container = container
        this.orientation = options.isVertical ? 'vertical': 'horizontal'
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    get values(): number[] {
        const values: number[] = []
        const step = this.options.step / this.options.max * 100
        for (let i = 0; i<=100; i+=step) {
            values.push(i)
        }
        return values
    }

    handleClick(event): void {
        let newPos: number = (event.layerX - this.options.thumbWidth / 2) / event.target.offsetParent.offsetWidth * 100        
        const step = this.options.step / this.options.max * 100
        const $thumb: HTMLElement = event.currentTarget.nextElementSibling
        const $bar: HTMLElement = event.currentTarget.firstElementChild

        if (newPos % step !== 0) {
            newPos = this.values.reduce((a, b) => {
                return Math.abs(b - newPos) < Math.abs(a - newPos) ? b : a;
            });
        }
        
        $thumb.style.left = `calc(${newPos}% - ${this.options.thumbWidth / 2}px)`
        $bar.style.width = `${newPos}%`
    }

    handleChange(event: MouseEvent): void {
        event.preventDefault()
        const target = event.currentTarget as HTMLElement
        const classes: string[] = ['slider-bar', 'slider-thumb', 'slider-progress']
        const shiftX = event.clientX - target.getBoundingClientRect().left
        const handleMove = onMouseMove.bind(this)
        
        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', onMouseUp)
        
        function onMouseMove(event: MouseEvent): void {
            if (classes.includes(target.className)) {
                let newPos = event.clientX - shiftX - this.container.querySelector('.slider').offsetLeft
                const maxPos = target.parentElement.offsetWidth
                const step = this.options.step / this.options.max * 100
                const $thumb: HTMLElement = target.parentElement.parentElement.querySelector('.slider-thumb')
                const $progress: HTMLElement = target.parentElement.parentElement.querySelector('.slider-progress')

                if (newPos < 0) newPos = 0
                if (maxPos <= newPos) newPos = maxPos

                newPos = newPos / maxPos * 100

                if (newPos % step !== 0) {
                    newPos = this.values.reduce((a, b) => {
                        return Math.abs(b - newPos) < Math.abs(a - newPos) ? b : a;
                    });
                }

                $thumb.style.left = `calc(${newPos}% - ${this.options.thumbWidth / 2}px)`
                $progress.style.width = `${newPos}%`
            }
            
        }

        function onMouseUp(): void {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', handleMove);
        }

    }

    init(): void {
        this.container.insertAdjacentHTML('beforeend', `
            <div class="slider-wrapper">
                <div class="slider slider-${this.orientation}">
                </div>
            </div>
        `)

        new Bar(this.container, this.options)
        new Thumb(this.container, this.options)

        const $slider: HTMLElement = this.container.querySelector('.slider')
        const $thumb: HTMLElement = this.container.querySelector('.slider-thumb')
        const $bar: HTMLElement = this.container.querySelector('.slider-bar')

        // CSS variables
        $slider.style.setProperty('--thumbWidth', `${this.options.thumbWidth}px`)
        $slider.style.setProperty('--barHeight', `${this.options.barHeight}px`)
        $slider.style.setProperty('--posY', `${this.options.barHeight - this.options.thumbWidth}px`)

        $thumb.addEventListener('mousedown', this.handleChange)
        $bar.addEventListener('click', this.handleClick)
    }
}