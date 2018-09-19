
// Note: to get image => d.game.canvas.toDataURL()

var d = {}
d.WORLD_SIZE = 600;
d.COLOR_WHEEL_MAX = 359;
loading = true;
y_idx = 0;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.CANVAS, 'd009',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {}

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
}

function create() {
    // d.game.stage.backgroundColor = '#545659';
    d.colors = Phaser.Color.HSVColorWheel();

    // For ploting
    d.bmd = d.game.add.bitmapData(d.game.width, d.game.height);
    d.bmd.addToWorld();

    d.game.load.onLoadStart.add(load_start, this);
    d.game.load.onFileComplete.add(file_complete, this);
    d.game.load.onLoadComplete.add(load_complete, this);


    document.getElementById('save').onclick = function() {
        location.href=get_image();
    };
};

function load_start() {};

function file_complete() {};

function load_complete() {
    console.log("Load complete");
    d.bmd.load('img');
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

var input_image = function(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        d.game.load.image('img', dataURL);
        d.game.load.start();
    };
    reader.readAsDataURL(input.files[0]);
};

function update() {};

function render() {
    d.bmd.processPixelRGB(forEachPixel, this, 1, 1, d.game.width - 1, d.game.height - 1);
};
