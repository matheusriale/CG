/**
 * 
 * @param {Pixel} pos Posição inicial
 * @param {Pixel} body_size Tamanho do corpo da seta
 * @param {Pixel} head_size Tamanho da ponta da seta
 * @param {number} stroke Cor
 */
function Arrow(pos, body_size, head_size, stroke = 255) {
    this.head_size = head_size
    this.body_size = body_size
    this.body = new Line(pos, pos.copy().add(body_size))
    this.stroke = stroke

    this.get_elements = () => {
        return [this.body, this.head1, this.head2]
    }
    this._make_heads = () => {
        this.head1 = new Line(this.body.pf, this.body.pf.copy().sub(this.head_size))
        this.head2 = new Line(this.body.pf, this.body.pf.copy().add(new Pixel(-this.head_size.x, this.head_size.y)))
    }
    /**
     * Desenha a seta na tela passada nos parâmetros
     * @param {ImageCG} screen Tela para desenhar
     */
    this.draw_on_screen = (screen) => {
        this.get_elements().forEach(e => {
            screen.draw_figure(e, this.stroke)
        })
    }

    this.scale = (body_scale, head_scale) => {
        this.body.scale(body_scale)
        this._make_heads()

        if (head_scale) {
            this.head1.scale(head_scale)
            this.head2.scale(head_scale)
        }
    }
    this.get_area = () => {
        let vertices = this.get_elements().map(e => e.vertices).flat(1)
        console.log(vertices)
        let xs = vertices.map(e => e.x)
        let ys = vertices.map(e => e.y)

        let start = new Pixel(Math.min(...xs), Math.min(...ys))
        let end = new Pixel(Math.max(...xs), Math.max(...ys))

        return [start, end]
    }
    this._make_heads()
}