
var grain = {
    init: function () {
        var _this = this;
        _this.patternSize = 400, _this.patternScaleX = .3, _this.patternScaleY = .3, _this.patternRefreshInterval = 6, _this.patternAlpha = 20, _this.canvas = document.querySelector(".grain"), _this.ctx = _this.canvas.getContext("2d"), _this.ctx.scale(_this.patternScaleX, _this.patternScaleY), _this.patternCanvas = document.createElement("canvas"), _this.patternCanvas.width = _this.patternSize, _this.patternCanvas.height = _this.patternSize, _this.patternCtx = _this.patternCanvas.getContext("2d"), _this.patternData = _this.patternCtx.createImageData(_this.patternSize, _this.patternSize), _this.patternPixelDataLength = _this.patternSize * _this.patternSize * 4, _this.resize = _this.resize.bind(_this), _this.loop = _this.loop.bind(_this), _this.frame = 0, window.addEventListener("resize", _this.resize), _this.resize(), window.requestAnimationFrame(_this.loop)
    },
    resize: function () {
        var _this = this;
        _this.canvas.width = window.innerWidth * devicePixelRatio, _this.canvas.height = window.innerHeight * devicePixelRatio
    },
    update: function () {
        var _this = this;
        for (var t = _this.patternPixelDataLength, e = _this.patternData, i = _this.patternAlpha, n = _this.patternCtx, s = 0; s < t; s += 4) {
            var r = 255 * Math.random();
            e.data[s] = r, e.data[s + 1] = r, e.data[s + 2] = r, e.data[s + 3] = i
        }
        n.putImageData(e, 0, 0)
    },
    draw: function () {
        var _this = this;
        var t = _this.ctx,
            e = _this.patternCanvas,
            i = _this.canvas,
            n = (_this.viewHeight, i.width),
            s = i.height;
        t.clearRect(0, 0, n, s), t.fillStyle = t.createPattern(e, "repeat"), t.fillRect(0, 0, n, s)
    },
    loop: function () {
        var _this = this;
        var t = ++_this.frame % _this.patternRefreshInterval == 0;
        t && (_this.update(), _this.draw()), window.requestAnimationFrame(_this.loop)
    }
};