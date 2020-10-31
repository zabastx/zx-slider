import { Thumb } from './elements/Thumb'
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
        let newPos = (event.originalEvent.layerX - this.options.thumbWidth / 2) / event.currentTarget.offsetWidth * 100
        const step = this.options.step / this.options.max * 100
        const $thumb = event.currentTarget.nextElementSibling as HTMLElement
        const $bar = event.currentTarget.firstElementChild as HTMLElement

        if (newPos % step !== 0) {
            newPos = this.values.reduce((a, b) => {
                return Math.abs(b - newPos) < Math.abs(a - newPos) ? b : a;
            });
        }
        
        $thumb.style.left = `calc(${newPos}% - ${this.options.thumbWidth / 2}px)`
        $bar.style.width = `calc(${newPos}% - ${this.options.thumbWidth / 2}px)`
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
                let newPos = event.clientX - shiftX - $('.slider').offset().left
                const maxPos = target.parentElement.offsetWidth
                const step = this.options.step / this.options.max * 100
                const $thumb = target.parentElement.parentElement.querySelector('.slider-thumb') as HTMLElement
                const $progress = target.parentElement.parentElement.querySelector('.slider-progress') as HTMLElement

                if (newPos < 0) newPos = 0
                if (maxPos <= newPos) newPos = maxPos

                newPos = newPos / maxPos * 100

                if (newPos % step !== 0) {
                    newPos = this.values.reduce((a, b) => {
                        return Math.abs(b - newPos) < Math.abs(a - newPos) ? b : a;
                    });
                }

                $thumb.style.left = `calc(${newPos}% - ${this.options.thumbWidth / 2}px)`
                $progress.style.width = `calc(${newPos}% - ${this.options.thumbWidth / 2}px)`
            }
            
        }

        function onMouseUp(): void {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', handleMove);
        }

    }

    init(): void {
        const rootStyles =  document.documentElement.style
        rootStyles.setProperty('--thumbWidth', `${this.options.thumbWidth}px`)
        rootStyles.setProperty('--barHeight', `${this.options.barHeight}px`)

        this.container.insertAdjacentHTML('beforeend', `
            <div class="slider-wrapper">
                <div class="slider slider-${this.orientation}">
                    <div class="slider-bar" max-val="${this.options.max}" min-val="${this.options.min}">
                        <div class="slider-progress"></div>
                    </div>
                </div>
            </div>
        `)
        new Thumb(this.container, this.options.isSingle)
        this.container.querySelector('.slider-thumb').addEventListener('mousedown', this.handleChange)
        $('.slider-progress').css('width', '50%')
        $('.slider-bar').click(this.handleClick)
    }
}