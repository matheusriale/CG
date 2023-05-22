/**
 * Cria um polígono
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {Pixel} center
 * @param {Number} radius 
 * @type {{vertices: Array<Pixel> stroke_intensity: Number center:Pixel radius:Number}}
 * @extends Figure
 */
function Circumference(stroke, center, radius, draw_step = 1) {
    this.center = center
    this.radius = radius
    this.draw_step = draw_step
    Polygon.prototype.constructor.call(this, stroke, [])


    this._load_vertices = (draw_step) => {
        this._x_y = []
        this._y_x = []
        this._y_negx = []
        this._x_negy = []
        this._negx_negy = []
        this._negy_negx = []
        this._negy_x = []
        this._negx_y = []
        let radius_line = new Line(center, new Pixel(center.x + radius, center.y))

        for (let i = draw_step; i < 45; i += draw_step) {
            let p = radius_line.rotate(i).pf
            let neg_x = center.x - (p.x - center.x)
            let neg_y = center.y - (p.y - center.y)
            let neg_p = new Pixel(neg_x, neg_y)

            this._x_y.push(p)
            this._y_x.push(p.invert())

            this._negy_x.push(new Pixel(neg_y, p.x))
            this._negx_y.push(new Pixel(neg_x, p.y))

            this._negx_negy.push(neg_p)
            this._negy_negx.push(neg_p.invert())

            this._y_negx.push(new Pixel(p.y, neg_x))
            this._x_negy.push(new Pixel(p.x, neg_y))
        }
    }



    this.get_vertices = () => {
        if (!this._x_y) {
            this._load_vertices(this.draw_step)
        }

        return [...this._x_y, ...this._y_x,
        ...this._negy_x, ...this._negx_y,
        ...this._negx_negy, ...this._negy_negx,
        ...this._y_negx, ...this._x_negy, this._x_y[0]]

    }

}