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
        this._border_color = new Color(255, 255, 0)
        this.font_size = this._char_drawer.font_size
        this.padding = 10
        this.font_weight = 3.5
        this.font_color = new Color(255)

        this.button = {
            center: new Pixel(45, 70),
            radius: 10,
            color: new Color(100, 100, 255)
        }

        this.init_animation = {
            figure: null,
            direction: 1,
            size: 5,
            start: new Pixel(10, 85),
        }

        this.title = {
            C: null,
            G: null,
            background: null
        }


        this._last_hover = false
    }

    start() {
        console.log("Iniciando tela de abertura...")
        this.is_running = true
        this.draw_all()
    }

    draw_all() {
        this._draw_elipse()
        this._draw_C(this.init_pixel.copy())
        this._draw_G(this.init_pixel.copy())
        this._draw_start_button()
        this.create_animation()
    }
    is_hover_button() {
        return mouseX <= (this.button.center.x + this.button.radius) &&
            mouseX >= (this.button.center.x - this.button.radius) &&
            mouseY <= this.button.center.y + this.button.radius &&
            mouseY >= this.button.center.y - this.button.radius
    }

    update() {

        this.update_animation()
        let is_hover = this.is_hover_button()

        if (is_hover && !this._last_hover) {
            cursor(HAND)
            this.screen.floodFill(this.button.center.copy(), this.font_color, this._elipse_color)
            this._last_hover = true
        }

        if (!is_hover && this._last_hover) {
            cursor(ARROW)
            this.screen.clear_area(
                this.button.center.copy().sub(new Pixel(this.button.radius + 1)),
                this.button.center.copy().add(new Pixel(this.button.radius + 1)))
            this._draw_start_button()
            this._last_hover = false
        }
    }

    _draw_C(init_pos) {
        this.title.C = this._char_drawer.letter_C(init_pos, this.font_weight)
        this.screen.draw_figure(this.title.C)

        let flood_init = init_pos.add(new Pixel(this.font_weight - 1))
        this.screen.floodFill(flood_init, this.font_color, this._elipse_color, true)
    }

    _draw_G(init_pos) {
        let g_init = init_pos.add(new Pixel(this.font_size + this.padding, 0))
        this.title.G = this._char_drawer.letter_G(g_init, this.font_weight)
        this.screen.draw_figure(this.title.G)

        let flood_init = g_init.add(new Pixel(this.font_weight - 1))
        this.screen.floodFill(flood_init, this.font_color, this._elipse_color)
    }

    _draw_elipse() {
        console.log("Elipse")
        let center = this.init_pixel.copy().add(new Pixel(this.font_size + this.padding / 2, this.font_size / 2))
        this.title.background = this.screen.ellipse(center, this.font_size * 2, 20, this._border_color)
        this.screen.floodFill(center, this._elipse_color)
    }

    stop() {
        console.log("Encerrando tela inicial...")
        cursor(ARROW)
        this.is_running = false
        this.screen.clear()
    }

    _draw_start_button() {
        console.log("Botão")
        this.screen.circumference(this.button.center, this.button.radius, this._border_color)
        this.screen.floodFill(this.button.center, this.button.color)

        let triangle = Polygon.triangle(this.button.center, 5, 255)
        this.screen.draw_figure(triangle)

    }

    update_animation() {
        let vertices = this.init_animation.figure.vertices

        if (vertices[3].x >= width - this.init_animation.size - 10) {
            this.init_animation.direction = -1
        } else if (vertices[0].x <= 1) {
            this.init_animation.direction = 1
        }

        const pace = new Pixel(this.init_animation.direction, 0)
        this.init_animation.figure.translate(pace)

        let clean_margin = new Pixel(this.init_animation.size * 2, 4)
        this.screen.clear_area(
            vertices[0].copy().sub(clean_margin),
            vertices[3].copy().add(clean_margin))

        this.screen.draw_figure(this.init_animation.figure)
    }
    create_animation() {
        this.init_animation.figure = Polygon.square(this.init_animation.start, this.init_animation.size)
        this.screen.draw_figure(this.init_animation.figure)
    }
}