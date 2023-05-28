/**
 * Cria uma figura
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @param {?Array<Pixel>} vertices 
 * @type {{vertices: Array<Pixel> stroke_intensity: Number}}
 */
function Figure(stroke, vertices) {
    this.vertices = vertices || []
    this.stroke_intensity = stroke || 255
    this.scale = new Pixel(1)

    /**
     * Adiciona vértices ao polígono
     * @param {Array<Pixel>} vertex 
     */
    this.add_vertex = (vertex) => {
        this.vertices.push(...vertex)
        return this
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
        return this
    }

    /**
     * Modifica o tamanho da figura
     * @param {Pixel} scale 
     * @param {Pixel?} scale_center Para qual direção os pixels devem se mover
     */
    this.scale = (scale, scale_center = null) => {
        this.scale = scale
        this.vertices.map(v => v.mult(scale))

        if (scale_center) this.translate(scale_center.invert())

        return this
    }

    /**
     * Faz uma cópia da figura atual
     * @returns {Figure}
     */
    this.copy = () => {
        return { ...this }
    }
}