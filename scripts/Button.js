function Button(pos, size, image_name, screen) {
    this.pos = pos
    this.size = size
    this.image = image_name
    this.screen = screen
    this.activated = false
    this._last_hover = false

    this.draw = () => {
        this.polygon = this.screen.draw_image(this.image, this.pos, this.size)
        this.activated = true
    }

    this.is_hover = () => {
        return mouseX <= (this.pos.x + this.size.x) &&
            mouseX >= (this.pos.x) &&
            mouseY <= this.pos.y + this.size.y &&
            mouseY >= this.pos.y
    }

    this.update = () => {
        if (this.is_hover() && !this._last_hover) {
            cursor(HAND)
            this._last_hover = true
            this.screen.draw_figure(this.polygon)
        }
        else if (!this.is_hover() && this._last_hover) {
            cursor(ARROW)
            this._last_hover = false
            this.clear_area()
            this.draw()
        }
    }
    this.clear_area = () => {
        let margin = new Pixel(2)
        this.screen.clear_area(this.polygon.vertices[0].sub(margin), this.polygon.vertices[3].add(margin))
    }
}