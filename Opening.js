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
        this.is_running = false
        this._char_drawer = char_drawer
        this.init_pixel = new Pixel(20)
        this._elipse_color = new Color(100, 100, 255)
        this._button_color = new Color(100, 100, 255)
        this._border_color = new Color(255, 255, 0)
        this.font_size = this._char_drawer.font_size
        this.padding = 10
    }

    start() {
        this.is_running = true
        this._draw_elipse()
        this._draw_C()
        this._draw_G()
        this._draw_start_button()
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
        this.screen.ellipse(center, this.font_size * 2, 20, this._border_color)
        this.screen.floodFill(center, this._elipse_color)
    }

    stop() {
        this.is_running = false
        this.screen.clear()
    }

    _draw_start_button() {
        let center = new Pixel(45, 70)
        this.screen.circumference(center, 10, this._border_color)
        this.screen.floodFill(center, this._button_color)

        let triangle = Polygon.triangle(center, 5, 255)
        this.screen.draw_figure(triangle)
        this.screen.floodFill(center.copy().sub(new Pixel(3)), 255, this._elipse_color)
    }
}