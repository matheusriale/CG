class NumberDrawer {
    /**
     * Desenha números
     * @param {Number} font_size tamanho das fontes dos algarismos 
     * @param {Number} spacing Espaço entre os dígitos de cada algarismo
     */
    constructor(font_size, spacing) {
        this.font_size = font_size || 20
        this.spacing = spacing || 5
    }

    /**
     * Desenha um número na tela
     * @param {Number} num número a ser desenhado
     * @param {Pixel} pos posição inicial do número
     * @returns {Array<Array<Pixel>>} Figuras a serem desenhadas (uma para cada dígito)
     */
    get_number(num, pos) {
        let points = []
        switch (num) {
            case 1:
                points.push(this.one(pos))
                break;

            default:
                break;
        }
        return points
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

    two() {

    }


    three() {

    }


    four() {

    }


    five() {

    }

    six() {

    }

    seven() {

    }

    eight() {

    }
}