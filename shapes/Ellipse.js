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

            let pixels = [new Pixel(px, py, null, null, this.stroke_intensity).add(this.center),
            new Pixel(-px, py, null, null, this.stroke_intensity).add(this.center),
            new Pixel(-px, -py, null, null, this.stroke_intensity).add(this.center),
            new Pixel(px, -py, null, null, this.stroke_intensity).add(this.center)
            ]

            this.vertices.push(...pixels)

        }

        for (let y2 = 0; y2 < this.radiusY; y2 += draw_step) {
            let x2 = getArcCoordinate(this.radiusX, this.radiusY, y2)

            let px = x2
            let py = y2
            let pixels = [new Pixel(px, py, null, null, this.stroke_intensity).add(this.center),
            new Pixel(-px, py, null, null, this.stroke_intensity).add(this.center),
            new Pixel(-px, -py, null, null, this.stroke_intensity).add(this.center),
            new Pixel(px, -py, null, null, this.stroke_intensity).add(this.center),]

            this.vertices.push(...pixels)
        }

    }
    this._load_vertices(this.draw_step)
}