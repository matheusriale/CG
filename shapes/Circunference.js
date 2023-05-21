/**
 * Cria um polígono
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {Pixel} center
 * @param {Number} radius 
 * @type {{vertices: Array<Pixel> stroke_intensity: Number center:Pixel radius:Number}}
 * @extends Figure
 */
function Circumference(stroke, center, radius) {
    this.center = center
    this.radius = radius
    Polygon.prototype.constructor.call(this, stroke, [])


    this._load_vertices = () => {
        // this.add_vertex([this.center])
        let radius_line = new Line(center, new Pixel(center.x + radius, center.y))

        for (let i = 0; i <= 100; i++) {
            this.add_vertex([radius_line.pf])
            radius_line = radius_line.rotate(i)
        }
    }

    this._load_vertices()

}