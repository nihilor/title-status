/*

Title Status - Webcomponent to set different attracting indicators in the titlebar of a browser tab.

MIT License

Copyright (c) 2022 Mark Lubkowitz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

class TitleStatus extends HTMLElement {
    indicators = {
        hearts: ['❤️', '💛', '💚'],
        squares: ['🟥', '🟨', '🟩'],
        clock: ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'],
        moon: ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'],
        weather: ['🌨','🌦','⛅','🌞'],
        circles: ['🔴', '🟡', '🟢'],
        contrast: ['◾','🔳'],
        hands: ['', '👉','👉👉','👉👉👉']

    }
    indicator = 'circles'
    interval = 250
    currentIndex = 0
    intervalId = null
    caption = ''

    constructor () {
        super()
    }

    static get observedAttributes () {
        return ['indicator', 'playback', 'interval', 'caption']
    }

    setTitle (indicator, title) {
        document.title = `${indicator} ${title}`
    }

    startPlayback () {
        this.stopPlayblack()

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.currentIndex++
                if (this.currentIndex >= this.indicators[this.indicator].length) {
                    this.currentIndex = 0
                }
                this.setTitle(this.indicators[this.indicator][this.currentIndex], this.caption)
            }, this.interval)
        }
        
    }

    stopPlayblack () {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if (name === 'indicator') {
            if (!Object.keys(this.indicators).includes(newValue)) {
                this.indicator = 'circles'
                this.removeAttribute(name)
            }
            else {
                this.indicator = newValue
            }
        }

        if (name === 'interval') {
            if (isNaN(parseInt(newValue))) {
                this.interval = 250
                this.removeAttribute(name)
            }
            else {
                this.interval = newValue
            }
        }

        if (name === 'playback')
            if (newValue !== 'playback') {
                this.stopPlayblack()
                this.removeAttribute(name)
            }
            else {
                this.startPlayback()
            }

        if (name === 'caption')
            if (!newValue) {
                this.caption = ''
                this.removeAttribute(name)
            }
            else {
                this.caption = newValue
            }
    }

    connectedCallback () {}
}
customElements.define('title-status', TitleStatus)