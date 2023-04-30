/**
 * 
 * @param {?Array<Pixel>} vertices 
 */
function Polygon(vertices) {
    this.vertices = vertices || []

    this.add_vertex = (vertex) => {
        this.vertices.append(vertex)
    }
}