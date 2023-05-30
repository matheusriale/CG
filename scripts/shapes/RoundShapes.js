
/**
 * Cria um polígono
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {Pixel} center Centro da circunferência
 * @param {Number} radius Tamanho do raio
 * @type {{vertices: Array<Pixel> stroke: Number center:Pixel radius:Number}}
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
                new Pixel(x, y, null, null, this.stroke).add(this.center),
                new Pixel(y, x, null, null, this.stroke).add(this.center),

                new Pixel(-y, x, null, null, this.stroke).add(this.center),
                new Pixel(-x, y, null, null, this.stroke).add(this.center),

                new Pixel(-x, -y, null, null, this.stroke).add(this.center),
                new Pixel(-y, -x, null, null, this.stroke).add(this.center),

                new Pixel(y, -x, null, null, this.stroke).add(this.center),
                new Pixel(x, -y, null, null, this.stroke).add(this.center),

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
        let older_center = this.center.copy()
        this.scale(scale)
        this.radius *= scale
        this.center = this.center.mult(scale)
        return this.move_center(older_center)
    }

    this.move_center = (new_pos) => {
        let [dx, dy] = Pixel.distance(this.center, new_pos)
        this.translate(new Pixel(dx, dy))
        this.center = new_pos
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

/**
 * Cria uma elipse (pixel a pixel)
 * @param {Pixel} center Centro da elipse
 * @param {Number} radiusX raio vertical da elipse
 * @param {Number} radiusY raio horizontal da elipse
 * @param {Color} stroke Cor da borda da elipse
 * @param {Number} step Passo do desenho (default: 1)
 * 
 * @returns {Figure} Pixels calculados da elipse
 */
function Ellipse(center, radiusX, radiusY, stroke, draw_step = 1) {
    this.center = center
    this.radiusX = radiusX
    this.radiusY = radiusY
    this.draw_step = draw_step
    Polygon.prototype.constructor.call(this, stroke, [])

    /**
     * Carrega os vértices da elipse
     * @param {Number} draw_step Passo de desenho do algoritmo
     */
    this._load_vertices = (draw_step) => {

        for (let x1 = 0; x1 < this.radiusX; x1 += draw_step) {

            let y1 = getArcCoordinate(this.radiusY, this.radiusX, x1)

            let px = x1
            let py = y1

            let pixels = [new Pixel(px, py, null, null, this.stroke).add(this.center),
            new Pixel(-px, py, null, null, this.stroke).add(this.center),
            new Pixel(-px, -py, null, null, this.stroke).add(this.center),
            new Pixel(px, -py, null, null, this.stroke).add(this.center)
            ]

            this.vertices.push(...pixels)

        }

        for (let y2 = 0; y2 < this.radiusY; y2 += draw_step) {
            let x2 = getArcCoordinate(this.radiusX, this.radiusY, y2)

            let px = x2
            let py = y2
            let pixels = [new Pixel(px, py, null, null, this.stroke).add(this.center),
            new Pixel(-px, py, null, null, this.stroke).add(this.center),
            new Pixel(-px, -py, null, null, this.stroke).add(this.center),
            new Pixel(px, -py, null, null, this.stroke).add(this.center),]

            this.vertices.push(...pixels)
        }

    }
    this._load_vertices(this.draw_step)
}