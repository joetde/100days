
// Note: to get image => d.game.canvas.toDataURL()

var d = {}
d.WORLD_SIZE = 600;
d.COLOR_WHEEL_MAX = 359;
d.NB_IMAGES = 50;
d.counter = 0;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.CANVAS, 'd010',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    d.game.load.image('img', 'image.jpg');
}

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
}

function create() {
    // d.game.stage.backgroundColor = '#545659';
    d.colors = Phaser.Color.HSVColorWheel();

    // For ploting
    d.bmd = d.game.add.bitmapData(d.game.width, d.game.height);
    d.bmd.load('img');
    d.bmd.addToWorld();
    
    document.getElementById('save').onclick = function() {
        location.href=get_image();
    };

    d.gif = new GIF({
        workers: 5,
        quality: 10
    });
};

function update() {
    updateAll();
};

function updateAll() {
    if (d.counter < d.NB_IMAGES) {
        d.bmd.processPixelRGB(forEachPixel, this, 1, 1, d.game.width - 1, d.game.height - 1);

        var canvas = document.getElementsByTagName('canvas')[0];
        d.gif.addFrame(canvas, {copy: true, delay: 100});
    } else if (d.counter == d.NB_IMAGES) {
        d.gif.on('finished', gif_finished);
        d.gif.render();
    }

    d.counter++;
};

function gif_finished(blob) {
    window.open(URL.createObjectURL(blob));
};

function forEachPixel(pixel, x, y) {
    var up_color = d.bmd.getPixelRGB(x, y - rand_btw(0, 4));
    pixel.r = up_color.r;
    pixel.g = up_color.g;
    pixel.b = up_color.b;

    return pixel;
};

function get_image() {
    return d.game.canvas.toDataURL();
}

function render() {};
