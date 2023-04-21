class ImageCG {
    /**
     * Cria uma nova imagem
     * @param {Number} width Largura
     * @param {Number} height Altura
     * @param {Number} background Intensidade do fundo da nova Imagem (padrão: 255)
     */
    constructor(width, height, background = 255) {
        // this.pixels = screen_pixels
        this.width = width
        this.height = height
        this.background = background

    }
    init() {
        createCanvas(this.width, this.height)
        console.log(`Canvas ${this.width} x ${this.height} created`)
        loadPixels()
        this.pixels = pixels
    }


}