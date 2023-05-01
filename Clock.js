/**
 * @type {{num_drawer: NumberDrawer center: Pixel radius: Number}}
 */
class Clock {
    /**
     * Constrói um relógio
     * @param {NumberDrawer} num_drawer 
     * @param {Pixel} center Coordenadas do centro do relógio
     * @param {Number} radius Tamanho do raio
     */
    constructor(num_drawer, center, radius) {
        this.num_drawer = num_drawer
        this.center = center
        this.radius = radius
    }
}