/**
 * @type {{
 * center: Pixel radius: Number date:Date 
 * second_hand:Line minute_hand:Line hour_hand:Line screen:ImageCG}}
 */
class Clock {
    /**
     * Constrói um relógio
     * @param {Pixel} center Coordenadas do centro do relógio
     * @param {Number} radius Tamanho do raio
     * @param {ImageCG} screen
     */
    constructor(center, radius, screen, border = 0, image, timezone = 0, image2) {
        this.center = center
        this.radius = radius
        this.timezone = timezone
        this.date = change_timezone(new Date(), this.timezone)
        console.log(this.date, this.timezone)

        this.screen = screen
        this._last_hover = false
        this.zoomed_in = false
        this.image = image
        this.image2 = image2

        this.reset_hands()

        this.border = new Circumference(border, this.center.copy(), this.radius)
        this.top = this.center.sub(new Pixel(this.radius))
        this.bottom = this.center.add(new Pixel(this.radius))
        this.p = Polygon.rect(this.top.copy(), this.bottom.copy())
        this.p2 = Polygon.rect(this.center.copy().add(new Pixel(-this.radius*0.9,-this.radius*1.8)),this.center.copy().add(new Pixel(this.radius*0.8,-this.radius)))
        console.log(this.p2)}   

    /**
     * Volta os ponteiros para o início
     */
    reset_hands() {
        let size1 = this.center.y - this.radius * 0.9
        let size2 = this.center.y - this.radius * 0.7
        this.second_hand = new Line(this.center.copy(), new Pixel(this.center.x, size2), 255)
        this.minute_hand = new Line(this.center.copy(), new Pixel(this.center.x, size2), 50)
        this.hour_hand = new Line(this.center.copy(), new Pixel(this.center.x, size1), 100)
    }

    is_hover() {
        return mouseX <= (this.center.x + this.radius) &&
            mouseX >= (this.center.x - this.radius) &&
            mouseY <= this.center.y + this.radius &&
            mouseY >= this.center.y - this.radius
    }

    update_hovering() {
        let is_hover = this.is_hover()

        if (is_hover) {
            cursor(HAND)
            this._last_hover = true
        }

        if (!is_hover && this._last_hover) {
            cursor(ARROW)
            this.screen.clear_area(this.top.add(new Pixel(5)), this.bottom.add(new Pixel(5)))
            this._last_hover = false
        }
        return is_hover
    }

    /**
     * Atualiza a hora e, consequentemente, todos os ponteiros.
     */
    update() {
        this.screen.clear_area(this.top, this.bottom)
        if (!this.zoomed_in) var is_hover = this.update_hovering()

        if (is_hover && !this.zoomed_in) this.screen.set_pixels(this.border)

        this.date = change_timezone(new Date(), this.timezone)
        this.reset_hands()
        this._update_second_hand()
        this._update_minute_hand()
        this._update_hour_hand()

        for (const hand of this.get_hands()) {
            this.screen.draw_figure(hand)
        }

        this.screen.scanline_tex(this.p, this.image)
        this.screen.scanline_tex(this.p2,this.image2)
    }

    scale(scale) {
        cursor(ARROW)
        this.zoomed_in = !this.zoomed_in
        this.second_hand = this.second_hand.scale(scale)
        this.minute_hand = this.minute_hand.scale(scale)
        this.hour_hand = this.hour_hand.scale(scale)

        this.border = this.border.scale(scale)
        this.center = this.center.mult(scale)

        this.top = this.top.mult(scale)
        this.bottom = this.bottom.mult(scale)

    }

    map_elements(viewport, win) {
        this.center = this.center.map_window(viewport, win)

        this.second_hand = this.second_hand.map_window(viewport, win)
        this.minute_hand = this.minute_hand.map_window(viewport, win)
        this.hour_hand = this.hour_hand.map_window(viewport, win)

        this.top = this.top.map_window(viewport, win)
        this.bottom = this.bottom.map_window(viewport, win)
        this.p = this.p.map_window(viewport, win)
        this.p2 = this.p2.map_window(viewport, win)
    }

    get_all_elements() {
        return [
            this.second_hand,
            this.minute_hand,
            this.hour_hand,

            this.border,
            this.center,

            this.top,
            this.bottom
        ]
    }

    /**
     * Lista com todos os ponteiros
     * @returns {Array<Line>} ponteiros
     */
    get_hands() {
        return [this.second_hand, this.minute_hand, this.hour_hand]
    }

    /**
     * Atualiza o ponteiro dos segundos
     */
    _update_second_hand() {
        let secs = this.date.getSeconds()
        let ang = 360 / 60 * secs
        this.second_hand = this.second_hand.rotate(ang)
    }

    /**
     * Atualiza o ponteiro dos minutos
     */
    _update_minute_hand() {
        let mins = this.date.getMinutes()
        let ang = 360 / 60 * mins
        this.minute_hand = this.minute_hand.rotate(ang)
    }

    /**
     * Atualiza o ponteiro das horas
     */
    _update_hour_hand() {
        let hour = this.date.getHours()
        let mins = this.date.getMinutes()
        hour = (hour > 12) ? hour - 12 : hour

        let hour_ang = (360 / 12)
        let min_ang = (hour_ang / 60)
        this.hour_hand = this.hour_hand.rotate(hour_ang * hour + min_ang * mins)
    }
}