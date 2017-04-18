exports.getElement = () => {
    var div = $('<li>').css("padding", 0);
    var btn = $('<a href="#">').appendTo(div);
    btn.html("<i class='fa fa-arrows-v'></i>&nbsp;Flip Vertical")
    btn.on('click', (e) => {
        btn.trigger('runOperation');
    });
    return div;
}

/**
 * @description Takes pixelData object (data:byteArray, width:number, height:number)
 */
exports.runOperation = (pixelData) => {
    let e = $.Deferred();

    var n = new Uint8ClampedArray(pixelData.data.length);
    var d = pixelData.data;

    for (var row = 0; row < pixelData.height; row++) {
        for (var col = 0; col < pixelData.width; col++) {
            var sPiIndex, dPiIndex, sourcePix, destPix;
            sourcePix = (pixelData.width * row) + col;
            destPix = (pixelData.width * ((pixelData.height - 1) - row)) + col;

            sPiIndex = sourcePix * 4;
            dPiIndex = destPix * 4;

            n[dPiIndex] = d[sPiIndex];
            n[dPiIndex + 1] = d[sPiIndex + 1];
            n[dPiIndex + 2] = d[sPiIndex + 2];
            n[dPiIndex + 3] = d[sPiIndex + 3];
        }
    }

    let flippedData = new ImageData(n, pixelData.width, pixelData.height);

    e.resolve(flippedData);
    return e.promise();
}