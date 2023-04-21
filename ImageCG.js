class ImageCG {
    /**
     * Cria uma nova imagem
     * @param {Number} width Largura
     * @param {Number} height Altura
     * @param {Number} background Intensidade do fundo da nova Imagem (padrão: 255)
     */
    constructor(width, height, background = 255) {
        this.width = width
        this.height = height
        this.background = background
    }

    init() {
        createCanvas(this.width, this.height)
        console.log(`Canvas ${this.width} x ${this.height} created`)

        loadPixels()
        pixels.fill(this.background)
        this.pixels = pixels
        updatePixels()
    }

    update() {
        pixels = this.pixels
        updatePixels()
    }

    set_pixel(x, y) {
        console.log(pixels.length / 4, x, y)
    }

}