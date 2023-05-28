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
            color: new Color(100, 100, 255),
            arrow: new Polygon(),
            background: new Figure()
        }

        this.init_animation = {
            figure: null,
            direction: 1,
            size: 5,
            start: new Pixel(1, 85),
        }

        this.arrow_anim = {
            start: new Pixel(2, this.button.center.y),
            body_size: new Pixel(10, 0),
            head_size: new Pixel(5),
            figure: new Figure(),
            grow_rate: new Pixel(1.5, 1),
            scale: new Pixel(1.5, 1),
            reduce_rate: new Pixel(0.5, 1),
            count: 1
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

    update_arrow() {
        let anim = this.arrow_anim
        if (anim.count > 2) {
            this.arrow_anim.count = 0
            this.arrow_anim.scale = anim.scale.x == anim.grow_rate ? anim.reduce_rate : anim.grow_rate
        }
        console.log(anim)
        this.arrow_anim.figure.scale(anim.scale)
        let [start, end] = anim.figure.get_area()

        this.screen.clear_area(start, end)
        this.arrow_anim.figure.draw_on_screen(this.screen)
        this.arrow_anim.count++
    }

    update() {

        this.update_animation()
        // this.update_arrow()
        let is_hover = this.is_hover_button()

        if (is_hover && !this._last_hover) {
            console.log("Hover")
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
        this.button.background = new Circumference(this._border_color, this.button.center, this.button.radius)
        this.screen.set_pixels(this.button.background)
        this.screen.floodFill(this.button.center, this.button.color)

        this.button.arrow = Polygon.triangle(this.button.center, 5, 255)
        this.screen.draw_figure(this.button.arrow)

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

    draw_arrow() {
        this.arrow_anim.figure = new Arrow(this.arrow_anim.start,
            this.arrow_anim.body_size,
            this.arrow_anim.head_size)
        this.arrow_anim.figure.draw_on_screen(this.screen)
    }
}