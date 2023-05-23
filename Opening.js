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
        this.screen.draw_figure(this._char_drawer.letter_C(new Pixel(10)))
    }

    stop() {
        this.is_runing = false
    }
}