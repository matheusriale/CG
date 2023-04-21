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

    /**
     * Muda a cor de um pixel.
     * @param {*} x Coordenada X do pixel
     * @param {*} y Coordenada Y do pixel
     * @param {*} intensity Intensidade
     * @returns Índice do pixel no array de pixels do P5.js
     */
    set_pixel(x, y, intensity = 255) {
        let idx = 4 * (y * width + x);

        loadPixels()
        pixels[idx] = intensity; //red
        pixels[idx + 1] = intensity; //green
        pixels[idx + 2] = intensity; //blue
        pixels[idx + 3] = 1; //alpha
        this.pixels = pixels
        updatePixels()

        return idx
    }

}