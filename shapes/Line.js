/**
 * Cria uma linha
 * @param {Pixel} pi Ponto inicial
 * @param {Pixel} pf Ponto final
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @extends Figure
 * @type {{pi:Pixel pf:Pixel vertices: Array<Pixel> stroke_intensity: Number}}
 */
function Line(pi, pf, stroke = 255) {
    Figure.prototype.constructor.call(this, stroke, [pi, pf])
    this.pi = pi;
    this.pf = pf;

    this.rotate = (ang) => { //TODO: gambiarra
        ang += 90
        let pf = this.pf.rotate(ang)
        pf.add(pi)
        return new Line(this.pi, pf, this.stroke_intensity)
    }
}