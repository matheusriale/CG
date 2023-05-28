/**
 * Obtém a parte decimal de um número
 * @param {Number} num 
 * @returns {Number}
 */
function decimal_part(num) {
    return num - Math.floor(num)
}

function getArcCoordinate(radius1, radius2, coord) {
    let r1_2 = Math.pow(radius1, 2)
    let r2_2 = Math.pow(radius2, 2)
    return Math.sqrt((r1_2 - (r1_2 / r2_2) * Math.pow(coord, 2)))
}


function make_translation(x, y, m) {
    let translation = [[1, 0, x], [0, 1, y], [0, 0, 1]]
    return m ? math.multiply(translation, m) : translation
}

function make_scale(x, y, m) {
    let scale = [[x, 0, 0], [0, y, 0], [0, 0, 1]]
    return m ? math.multiply(scale, m) : scale
}

function make_transformation() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}