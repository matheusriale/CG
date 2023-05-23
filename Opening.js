/**
 * @type {{screen:ImageCG}}
 */
class Opening {
    /**
     * 
     * @param {ImageCG} screen 
     */
    constructor(screen) {
        this.screen = screen
        this.is_runing = false
        this.font_size = 10
        this.font_color = 100
    }

    start() {
        this.is_runing = true

        this.screen.draw_figure(this.get_letter_C())
    }

    stop() {
        this.is_runing = false
    }


    get_letter_C() {
        let init = new Pixel(10)
        let c = new Figure(this.font_color, [
            new Pixel(init.x + this.font_size, init.y),
            init,
            new Pixel(init.x, init.y + this.font_size),
            init.copy().add(new Pixel(this.font_size))])

        return c
    }
}