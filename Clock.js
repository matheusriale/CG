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
        let height = this.radius * 2
        let init_pos = new Pixel(this.center.x, this.center.y - this.radius)


        for (let i = 1; i <= 3; i++) {
            let pos = new Pixel(
                init_pos.x + this.radius * i / 4,
                init_pos.y + height * i / 8)
            nums.push(...this.num_drawer.get_number(i.toString(), pos))
        }
        for (let i = 4; i <= 6; i++) {
            let pos = new Pixel(
                init_pos.x + this.radius * (7 - i) / 4,
                init_pos.y + height * (i) / 8)
            nums.push(...this.num_drawer.get_number(i.toString(), pos))
        }

        for (let i = 7; i <= 9; i++) {
            let pos = new Pixel(
                init_pos.x + this.radius * (7 - i) / 4,
                init_pos.y + height * (13 - i) / 8)
            nums.push(...this.num_drawer.get_number(i.toString(), pos))
        }

        for (let i = 10; i <= 12; i++) {
            let pos = new Pixel(
                init_pos.x + this.radius * (13 - i) / 4,
                init_pos.y + height * (12 - i) / 8)
            nums.push(...this.num_drawer.get_number(i.toString(), pos))
        }
        return nums
    }
}