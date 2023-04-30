/**
 * @param {?Number} stroke Stroke intensity (0 to 255)
 * @param {?Array<Pixel>} vertices 
 * @type {{vertices: Array<Pixel> stroke_intensity: Number}}
 */
function Polygon(stroke, vertices) {
    this.vertices = vertices || []
    this.stroke_intensity = stroke || 255

    this.add_vertex = (vertex) => {
        this.vertices.append(vertex)
    }
}