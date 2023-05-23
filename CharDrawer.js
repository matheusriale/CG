/**
 * @type {{stroke: Number font_size: Number spacing: Number}}
 */
class CharDrawer {
    /**
     * Desenha números
     * @param {Number} stroke Intensidade (0 a 255) - padrão: 255
     * @param {Number} font_size tamanho das fontes dos algarismos 
     * @param {Number} spacing Espaço entre os dígitos de cada algarismo
     */
    constructor(stroke, font_size, spacing) {
        this.stroke = stroke || 255
        this.font_size = font_size || 20
        this.spacing = spacing || 10
    }

    /**
     * Desenha um número na tela
     * @param {String} num número a ser desenhado
     * @param {Pixel} pos posição inicial do número
     * @returns {Array<Figure>} Figuras a serem desenhadas
     */
    get_number(num, pos) {
        let points = []
        let digits = num.split("")
        let drawing_functions = [
            this.zero, this.one, this.two, this.three, this.four,
            this.five, this.six, this.seven, this.eight, this.nine
        ]

        for (let i = 0; i < digits.length; i++) {
            const d = Number(digits[i]);
            let curr_pos = new Pixel(pos.x + this.spacing * i, pos.y)
            let figure = drawing_functions[d].call(this, curr_pos)
            points.push(...figure)
        }

        return points
    }



    /**
     * Obtém os vértices para o dígito `0`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    zero(pos) {
        return [Polygon.rect(pos, new Pixel(pos.x + this.font_size / 3, pos.y + this.font_size), this.stroke)]
    }

    /**
     * Obtém os vértices para o dígito `1`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    one(pos) {
        let head = this.font_size / 4
        let v = [new Pixel(pos.x, pos.y + head),
        new Pixel(pos.x + head, pos.y),
        new Pixel(pos.x + head, pos.y + this.font_size)]

        return [new Figure(this.stroke, v)]
    }

    /**
     * Obtém os vértices para o dígito `2`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    two(pos) {
        let w = this.font_size / 3
        let h_2 = this.font_size / 2
        let v = [
            pos,
            new Pixel(pos.x + w, pos.y),
            new Pixel(pos.x + w, pos.y + h_2),
            new Pixel(pos.x, pos.y + h_2),
            new Pixel(pos.x, pos.y + this.font_size),
            new Pixel(pos.x + w, pos.y + this.font_size),
        ]
        return [new Figure(this.stroke, v)]
    }

    /**
     * Obtém os vértices para o dígito `3`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    three(pos) {
        let w = this.font_size / 3

        let body = new Figure(this.stroke, [pos,
            new Pixel(pos.x + w, pos.y),
            new Pixel(pos.x + w, pos.y + this.font_size),
            new Pixel(pos.x, pos.y + this.font_size)])

        let middle = new Line(
            new Pixel(pos.x + w, pos.y + this.font_size / 2),
            new Pixel(pos.x, pos.y + this.font_size / 2))

        return [body, middle]
    }

    /**
     * Obtém os vértices para o dígito `4`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    four(pos) {
        let left = new Figure(this.stroke, [
            pos,
            new Pixel(pos.x, pos.y + this.font_size / 2),
            new Pixel(pos.x + this.font_size / 3, pos.y + this.font_size / 2)])

        let right = new Line(
            new Pixel(pos.x + this.font_size / 3, pos.y),
            new Pixel(pos.x + this.font_size / 3, pos.y + this.font_size),
            this.stroke)

        return [left, right]
    }

    /**
     * Obtém os vértices para o dígito `5`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    five(pos) {
        let w = this.font_size / 3
        let h_2 = this.font_size / 2
        let v = [
            new Pixel(pos.x + w, pos.y),
            pos,
            new Pixel(pos.x, pos.y + h_2),
            new Pixel(pos.x + w, pos.y + h_2),
            new Pixel(pos.x + w, pos.y + this.font_size),
            new Pixel(pos.x, pos.y + this.font_size),
        ]
        return [new Figure(this.stroke, v)]
    }

    /**
     * Obtém os vértices para o dígito `6`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    six(pos) {
        let size = this.font_size / 2

        return [new Figure(this.stroke, [
            pos,
            new Pixel(pos.x, pos.y + size)]),
        Polygon.square(new Pixel(pos.x, pos.y + size), size, this.stroke)]
    }

    /**
     * Obtém os vértices para o dígito `7`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    seven(pos) {
        let w = this.font_size / 3
        let v = [pos,
            new Pixel(pos.x + w, pos.y),
            new Pixel(pos.x + w / 2, pos.y + this.font_size)]
        return [new Figure(this.stroke, v)]
    }

    /**
     * Obtém os vértices para o dígito `8`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    eight(pos) {
        let w = this.font_size / 3
        let edges = Polygon.rect(pos, new Pixel(pos.x + w, pos.y + this.font_size), this.stroke)
        return [edges,
            new Line(new Pixel(pos.x, pos.y + this.font_size / 2),
                new Pixel(pos.x + w, pos.y + this.font_size / 2))
        ]
    }

    /**
     * Obtém os vértices para o dígito `9`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    nine(pos) {
        let size = this.font_size / 2.5

        return [Polygon.square(pos, size, this.stroke),
        new Figure(this.stroke, [
            new Pixel(pos.x + size, pos.y + size),
            new Pixel(pos.x + size, pos.y + this.font_size)])]
    }
    /**
     * Obtém os vértices para o dígito `C`
     * @param {Pixel} pos Posição inicial da letra
     * @param {Number} weight Se a letra deve ser em negrito ou não
     * @returns {Figure | Polygon} Vértices obtidos
     */
    letter_C(pos, weight) {
        let p1 = new Pixel(pos.x + this.font_size, pos.y)
        let p2 = pos
        let p3 = new Pixel(pos.x, pos.y + this.font_size)
        let p4 = pos.copy().add(new Pixel(this.font_size))
        let vertices = [
            p1, p2, p3, p4
        ]

        if (weight) {
            let c = new Polygon(this.font_color, vertices)
            c.add_vertex([p4.copy().sub(new Pixel(0, weight)),
            p3.copy().add(new Pixel(weight, -weight)),
            p2.copy().add(new Pixel(weight)),
            p1.copy().add(new Pixel(0, weight))
            ]
            )
            return c
        }
        else {
            return new Figure(this.font_color, vertices)
        }
    }

    letter_G(pos, weight) {
        let p1 = new Pixel(pos.x + this.font_size, pos.y)
        let p2 = pos
        let p3 = new Pixel(pos.x, pos.y + this.font_size)
        let p4 = pos.copy().add(new Pixel(this.font_size))
        let p5 = p4.copy().sub(new Pixel(0, this.font_size / 2))
        let p6 = p5.copy().sub(new Pixel(this.font_size / 2, 0))
        let vertices = [
            p1, p2, p3, p4, p5, p6
        ]

        if (weight) {
            let c = new Polygon(this.font_color, vertices)
            let p6_bold = p6.copy().add(new Pixel(0, weight))
            let p5_bold = p5.copy().add(new Pixel(-weight, weight))
            let p4_bold = new Pixel(p5_bold.x, p4.y - weight)
            let p3_bold = p3.copy().add(new Pixel(weight, -weight))
            let p2_bold = p2.copy().add(new Pixel(weight))
            let p1_bold = p1.copy().add(new Pixel(0, weight))

            c.add_vertex([
                p6_bold, p5_bold, p4_bold, p3_bold, p2_bold, p1_bold
            ])
            return c
        }
        else {
            return new Figure(this.font_color, vertices)
        }
    }
}
