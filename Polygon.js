/**
 * Cria uma figura
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {?Array<Pixel>} vertices 
 * @type {{vertices: Array<Pixel> stroke_intensity: Number}}
 */
function Figure(stroke, vertices) {
    this.vertices = vertices || []
    this.stroke_intensity = stroke || 255

    /**
     * Adiciona vértices ao polígono
     * @param {Array<Pixel>} vertex 
     */
    this.add_vertex = (vertex) => {
        this.vertices.push(...vertex)
    }
    /**
     * Trata e retorna os vértices
     * @returns {Array<Pixel>} vértices
     */
    this.get_vertices = () => {
        return this.vertices
    }
}

/**
 * Cria um polígono
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {?Array<Pixel>} vertices 
 * @type {{vertices: Array<Pixel> stroke_intensity: Number}}
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
        let v = this.vertices
        v.push(this.vertices[0])
        return v
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
    let v = [top_left,
        new Pixel(bottom_right.x, top_left.y),
        bottom_right,
        new Pixel(top_left.x, bottom_right.y)]
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
        new Pixel(top_left.x + size, top_left.y),
        new Pixel(top_left.x + size, top_left.y + size),
        new Pixel(top_left.x, top_left.y + size)]

    return new Polygon(stroke, v)
}