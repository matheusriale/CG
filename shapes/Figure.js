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

    /**
     * Move a figura
     * @param {Pixel} coord 
     */
    this.translate = (coord) => {
        this.vertices.map(v => v.add(coord))
    }

    /**
     * Modifica o tamanho da figura
     * @param {Pixel} scale 
     */
    this.scale = (scale) => {
        this.vertices.map(v => v.mult(scale))
    }
}