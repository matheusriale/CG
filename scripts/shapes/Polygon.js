/**
 * Cria um polígono
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {?Array<Pixel>} vertices 
 * @type {{vertices: Array<Pixel> stroke: Number}}
 * @extends Figure
 */
function Polygon(stroke, vertices) {
    Figure.prototype.constructor.call(this, stroke, vertices)

    /**
     * Trata e retorna os vértices
     * @returns {Array<Pixel>} vértices
     */
    this.get_vertices = () => {
        if (this.vertices.length < 3) {
            throw RangeError("A polygon must have at least 3 vertices")
        }
        return [...this.vertices, this.vertices[0]]
    }

}

/**
 * Cria um retângulo
 * @param {Pixel} top_left Vértice esquerda em cima
 * @param {Pixel} bottom_right Vértice direita embaixo
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @returns {Polygon} Retângulo
 */

Polygon.rect = (top_left, bottom_right, stroke = 255) => {
    bottom_right.xtex = 1
    bottom_right.ytex = 1

    let v = [top_left,
        new Pixel(bottom_right.x, top_left.y, 1, 0),
        bottom_right,
        new Pixel(top_left.x, bottom_right.y, 0, 1)
    ]
    return new Polygon(stroke, v)
}

/**
 * Cria um quadrado
 * @param {Pixel} top_left Vértice esquerda em cima
 * @param {Number} size Tamanho da aresta
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @returns {Polygon} Quadrado
 */
Polygon.square = (top_left, size, stroke = 255) => {
    let v = [top_left,
        new Pixel(top_left.x + size, top_left.y, 1, 0),
        new Pixel(top_left.x + size, top_left.y + size, 1, 1),
        new Pixel(top_left.x, top_left.y + size, 0, 1)]

    return new Polygon(stroke, v)
}

Polygon.triangle = (center, radius, stroke = 255) => {
    let v = [
        center.copy().sub(new Pixel(radius)),
        center.copy().add(new Pixel(-radius, radius)),
        center.copy().add(new Pixel(radius, 0))
    ]

    return new Polygon(stroke, v)
}