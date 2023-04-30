class Clock {
    /**
     * Constrói um relógio
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
    number(num, pos) {
        let points = []
        switch (num) {
            case 1:
                let head = this.font_size / 4
                points.push([pos, new Pixel(pos.x + head, pos.y - head), new Pixel(pos.x + head, pos.y + this.font_size)])
                break;

            default:
                break;
        }
        console.log(points)
        return points
    }
}