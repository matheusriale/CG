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
        this.font_weight = 3.5
        this.font_color = new Color(255)
    }

    start() {
        console.log("Iniciando tela de abertura...")
        this.is_running = true
        this._draw_elipse()
        this._draw_C()
        this._draw_G()
        this._draw_start_button()
    }

    _draw_C() {
        console.log("C")
        let c_init = this.init_pixel
        this.screen.draw_figure(this._char_drawer.letter_C(c_init, this.font_weight))
        let flood_init = c_init.copy().add(new Pixel(this.font_weight - 1))
        this.screen.floodFill(flood_init, this.font_color, this._elipse_color, true)
    }
    _draw_G() {
        console.log("G")
        let g_init = this.init_pixel.copy().add(new Pixel(this.font_size + this.padding, 0))
        this.screen.draw_figure(this._char_drawer.letter_G(g_init, this.font_weight))
        let flood_init = g_init.copy().add(new Pixel(this.font_weight - 1))
        this.screen.floodFill(flood_init, this.font_color, this._elipse_color)
    }

    _draw_elipse() {
        console.log("Elipse")
        let center = this.init_pixel.copy().add(new Pixel(this.font_size + this.padding / 2, this.font_size / 2))
        this.screen.ellipse(center, this.font_size * 2, 20, this._border_color)
        this.screen.floodFill(center, this._elipse_color)
    }

    stop() {
        console.log("Encerrando tela inicial...")
        this.is_running = false
        this.screen.clear()
    }

    _draw_start_button() {
        console.log("Botão")
        let center = new Pixel(45, 70)
        this.screen.circumference(center, 10, this._border_color)
        this.screen.floodFill(center, this._button_color)

        let triangle = Polygon.triangle(center, 5, 255)
        this.screen.draw_figure(triangle)
        this.screen.floodFill(center.copy(), new Color(255), this._elipse_color)
    }
}