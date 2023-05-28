/**
 * Cria um polígono
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {Pixel} center Centro da circunferência
 * @param {Number} radius Tamanho do raio
 * @type {{vertices: Array<Pixel> stroke_intensity: Number center:Pixel radius:Number}}
 * @extends Figure
 */
function Circumference(stroke, center, radius, draw_step = 1) {
    this.center = center
    this.radius = radius
    this.draw_step = draw_step
    Polygon.prototype.constructor.call(this, stroke, [])

    /**
     * Carrega os vértices da circunferência
     * @param {Number} draw_step Passo de desenho do algoritmo
     */
    this._load_vertices = (draw_step) => {

        let square_radius = Math.pow(this.radius, 2)

        for (let x = 1; x <= this.radius; x += draw_step) {
            let y = Math.sqrt(square_radius - Math.pow(x, 2))
            let pixels = [
                new Pixel(x, y, null, null, this.stroke_intensity).add(this.center),
                new Pixel(y, x, null, null, this.stroke_intensity).add(this.center),

                new Pixel(-y, x, null, null, this.stroke_intensity).add(this.center),
                new Pixel(-x, y, null, null, this.stroke_intensity).add(this.center),

                new Pixel(-x, -y, null, null, this.stroke_intensity).add(this.center),
                new Pixel(-y, -x, null, null, this.stroke_intensity).add(this.center),

                new Pixel(y, -x, null, null, this.stroke_intensity).add(this.center),
                new Pixel(x, -y, null, null, this.stroke_intensity).add(this.center),

            ]

            this.vertices.push(...pixels)
        }

    }
    this._load_vertices(this.draw_step)

    /**
     * Modifica o tamanho da figura e mantém a posição do centro
     * @param {Pixel} scale 
     */
    this.scale_keep_center = (scale) => {
        return this.scale(scale, this.center)
    }

    this.move_center = (new_pos) => {
        let [dx, dy] = Pixel.distance(this.center, new_pos)
        this.translate(new Pixel(dx, dy))
        return this
    }


    /**
    * Faz uma cópia da figura atual
    * @returns {Circumference}
    */
    this.copy = () => {
        return new Circumference(this.stroke, this.center.copy(), this.radius, this.draw_step)
    }
}