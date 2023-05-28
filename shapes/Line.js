/**
 * Cria uma linha
 * @param {Pixel} pi Ponto inicial
 * @param {Pixel} pf Ponto final
 * @param {?Number} stroke Intensidade da borda (0 a 255) (padrão: 255)
 * @extends Figure
 * @type {{pi:Pixel pf:Pixel vertices: Array<Pixel> stroke: Number}}
 */
function Line(pi, pf, stroke = 255) {
    Figure.prototype.constructor.call(this, stroke, [pi, pf])
    this.pi = pi;
    this.pf = pf;

    this.rotate = (ang) => { //TODO: gambiarra
        // ang += 90

        let new_pf = this.pf.copy()
        new_pf.sub(this.pi)
        new_pf = new_pf.rotate(ang)
        new_pf.add(this.pi)

        return new Line(this.pi, new_pf, this.stroke)
    }
}