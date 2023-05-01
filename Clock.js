/**
 * @type {{num_drawer: NumberDrawer center: Pixel radius: Number}}
 */
class Clock {
    /**
     * Constrói um relógio
     * @param {NumberDrawer} num_drawer 
     * @param {Pixel} center Coordenadas do centro do relógio
     * @param {Number} radius Tamanho do raio
     */
    constructor(num_drawer, center, radius) {
        this.num_drawer = num_drawer
        this.center = center
        this.radius = radius
    }

    get_hour_numbers() { //TODO: gambiarra
        let nums = []
        let pos_3 = new Pixel(this.center.x + this.radius, this.center.y - this.num_drawer.font_size / 2)
        let pos_6 = new Pixel(this.center.x, this.center.y + this.radius - this.num_drawer.font_size * 1.5)
        let pos_9 = new Pixel(this.center.x - this.radius + this.num_drawer.font_size * 3 / 4, this.center.y - this.num_drawer.font_size / 2)
        let pos_12 = new Pixel(this.center.x, this.center.y - this.radius)

        nums.push(...this.num_drawer.get_number("12", pos_12))
        nums.push(...this.num_drawer.get_number("3", pos_3))
        nums.push(...this.num_drawer.get_number("6", pos_6))
        nums.push(...this.num_drawer.get_number("9", pos_9))

        return nums
    }
}