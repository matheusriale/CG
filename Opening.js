/**
 * @type {{screen:ImageCG}}
 */
class Opening {
    /**
     * 
     * @param {ImageCG} screen 
     * @param {CharDrawer} char_drawer
     */
    constructor(screen, char_drawer) {
        this.screen = screen
        this.is_runing = false
        this._char_drawer = char_drawer
        this.init_pixel = new Pixel(20, 20)
        this._elipse_color = 0
        this.font_size = this._char_drawer.font_size
        this.padding = 10
    }

    start() {
        this.is_runing = true
        this._draw_elipse()
        this._draw_C()
        this._draw_G()
    }

    _draw_C() {
        let c_init = this.init_pixel
        this.screen.draw_figure(this._char_drawer.letter_C(c_init, 3))
        this.screen.floodFill(c_init.copy().add(new Pixel(2)), this._elipse_color)
    }
    _draw_G() {
        let g_init = this.init_pixel.copy().add(new Pixel(this.font_size + this.padding, 0))
        this.screen.draw_figure(this._char_drawer.letter_G(g_init, 3))
        this.screen.floodFill(g_init.copy().add(new Pixel(2)), this._elipse_color)
    }

    _draw_elipse() {
        let center = this.init_pixel.copy().add(new Pixel(this.font_size + this.padding / 2, this.font_size / 2))
        this.screen.ellipse(center, this.font_size * 2, 20, this._elipse_color)
        this.screen.floodFill(center, this._elipse_color)
    }

    stop() {
        this.is_runing = false
        this.screen.clear()
    }
}