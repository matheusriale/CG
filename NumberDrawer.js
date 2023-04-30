class NumberDrawer {
    /**
     * Desenha números
     * @param {Number} font_size tamanho das fontes dos algarismos 
     * @param {Number} spacing Espaço entre os dígitos de cada algarismo
     */
    constructor(font_size, spacing) {
        this.font_size = font_size || 20
        this.spacing = spacing || 10
    }

    /**
     * Desenha um número na tela
     * @param {String} num número a ser desenhado
     * @param {Pixel} pos posição inicial do número
     * @returns {Array<Array<Pixel>>} Figuras a serem desenhadas (uma para cada dígito)
     */
    get_number(num, pos) {
        let points = []
        let digits = num.split("")
        let drawing_functions = [this.zero,
        this.one, this.two, this.three, this.four, this.five, this.six, this.seven, this.eight, this.nine]

        for (let i = 0; i < digits.length; i++) {
            const d = Number(digits[i]);
            let curr_pos = new Pixel(pos.x + this.spacing * i, pos.y)
            let vertices = drawing_functions[d].call(this, curr_pos)
            points.push(vertices)
        }
        console.log(points)
        return points
    }



    /**
     * Obtém os vértices para o dígito `0`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    zero(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `1`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    one(pos) {
        let head = this.font_size / 4
        return [pos, new Pixel(pos.x + head, pos.y - head), new Pixel(pos.x + head, pos.y + this.font_size)]
    }

    /**
     * Obtém os vértices para o dígito `2`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    two(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `3`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    three(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `4`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    four(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `5`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    five(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `6`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    six(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `7`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    seven(pos) {
        let w = this.font_size / 2
        return [pos, new Pixel(pos.x + w, pos.y), new Pixel(pos.x + w / 2, pos.y + this.font_size)]
    }

    /**
     * Obtém os vértices para o dígito `8`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    eight(pos) {
        return []
    }

    /**
     * Obtém os vértices para o dígito `9`
     * @param {Pixel} pos Posição inicial do número
     * @returns {Array<Pixel>} Vértices obtidos
     */
    nine(pos) {
        return []
    }
}