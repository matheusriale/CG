/**
 * @type {{
 * num_drawer: NumberDrawer center: Pixel radius: Number date:Date 
 * second_hand:Line minute_hand:Line hour_hand:Line}}
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
        this.date = new Date(2023, 5, 15, 10, 30, 30)

        this.reset_hands()
    }

    reset_hands() {
        let size1 = this.center.y - this.radius
        let size2 = this.center.y - this.radius * 0.9
        this.second_hand = new Line(this.center, new Pixel(this.center.x, size2), 255)
        this.minute_hand = new Line(this.center, new Pixel(this.center.x, size2), 50)
        this.hour_hand = new Line(this.center, new Pixel(this.center.x, size1), 100)
    }

    update() {
        this.date = new Date()
        this.reset_hands()
        this._update_second_hand()
        this._update_minute_hand()
        this._update_hour_hand()
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

    get_hands() {
        return [this.second_hand, this.minute_hand, this.hour_hand]
    }


    _update_second_hand() {
        let secs = this.date.getSeconds()
        let ang = 360 / 60 * secs
        this.second_hand = this.second_hand.rotate(ang)
    }

    _update_minute_hand() {
        let mins = this.date.getMinutes()
        let ang = 360 / 60 * mins
        this.minute_hand = this.minute_hand.rotate(ang)
    }

    _update_hour_hand() {
        let hour = this.date.getHours()
        let mins = this.date.getMinutes()
        hour = (hour > 12) ? hour - 12 : hour

        let hour_ang = (360 / 12)
        let min_ang = (hour_ang / 60)
        this.hour_hand = this.hour_hand.rotate(hour_ang * hour + min_ang * mins)
    }
}