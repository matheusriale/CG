class NumberDrawer {
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
        return []
    }

    /**
     * Obtém os vértices para o dígito `3`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    three(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `4`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    four(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `5`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    five(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `6`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Figure>} Vértices obtidos
     */
    six(pos) {
        return []
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
        return []
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
}