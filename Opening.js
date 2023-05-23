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
    }

    start() {
        this.is_runing = true
        this._draw_C()
        this._draw_G()
    }

    _draw_C() {
        let c_init = new Pixel(10)
        this.screen.draw_figure(this._char_drawer.letter_C(c_init, 3))
        this.screen.floodFill(c_init.copy().add(new Pixel(2)), this._char_drawer.stroke)
    }
    _draw_G() {
        let g_init = new Pixel(40, 10)
        this.screen.draw_figure(this._char_drawer.letter_G(g_init, 3))
        this.screen.floodFill(g_init.copy().add(new Pixel(2)), this._char_drawer.stroke)
    }

    stop() {
        this.is_runing = false
        this.screen.clear()
    }
}