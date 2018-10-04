
// Note: to get image => d.game.canvas.toDataURL()

var d = {}
d.WORLD_SIZE = 600;
d.degree = 2;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.CANVAS, 'd012',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    d.game.load.path = "../assets/";
    d.game.load.image('img', 'image.jpg');
}

function create() {
    // d.game.stage.backgroundColor = '#545659';
    d.colors = Phaser.Color.HSVColorWheel();

    // For ploting
    d.bmd = d.game.add.bitmapData(d.game.width, d.game.height);
    d.bmd.load('img');
    d.bmd.addToWorld();

    d.timer = d.game.time.create(false);
    d.timer.loop(500, updateAll, this);
    d.timer.start();

    document.getElementById('save').onclick = function() {
        location.href=get_image();
    };
};

function update() {};

function updateAll() {
    d.bmd.processPixelRGB(forEachPixel, this, 1, 1, d.game.width - 1, d.game.height - 1);
    d.timer.stop();
};

function range(max, steps, value)
{
    var step = Math.floor(max / steps);
    var offset = step / 2; // compensate shift to dark
    return Math.floor(value / step) * step + offset;
}

function forEachPixel(pixel, x, y) {
    pixel.r = range(255, d.degree, pixel.r);
    pixel.g = range(255, d.degree, pixel.g);
    pixel.b = range(255, d.degree, pixel.b);

    return pixel;
};

function get_image() {
    return d.game.canvas.toDataURL();
}

function render() {};
