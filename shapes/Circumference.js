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
        this._x_y = []
        this._y_x = []
        this._y_negx = []
        this._x_negy = []
        this._negx_negy = []
        this._negy_negx = []
        this._negy_x = []
        this._negx_y = []

        let square_radius = Math.pow(this.radius, 2)

        for (let x = 1; x <= this.radius; x += draw_step) {
            let y = Math.sqrt(square_radius - Math.pow(x, 2))

            this._x_y.push(new Pixel(y, x).add(center))
            this._y_x.push(new Pixel(x, y).add(center))

            this._negx_y.push(new Pixel(-y, x).add(center))
            this._negy_x.push(new Pixel(-x, y).add(center))

            this._negx_negy.push(new Pixel(-x, -y).add(center))
            this._negy_negx.push(new Pixel(-y, -x).add(center))

            this._y_negx.push(new Pixel(y, -x).add(center))
            this._x_negy.push(new Pixel(x, -y).add(center))
        }
    }


    /**
     * Trata e retorna os vértices
     * @returns {Array<Pixel>} vértices
     */
    this.get_vertices = () => {
        if (!this._x_y) {
            this._load_vertices(this.draw_step)
        }

        return [...this._x_y, ...this._y_x,
        ...this._negy_x, ...this._negx_y,
        ...this._negy_negx, ...this._negx_negy,
        ...this._x_negy, ...this._y_negx,
        this._x_y[0]]

    }

}