
// Note: to get image => d.game.canvas.toDataURL()

var d = {}
d.WORLD_SIZE = 600;
d.COLOR_WHEEL_MAX = 359;
loading = true;
y_idx = 0;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.CANVAS, 'd008',
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

    d.timer = d.game.time.create(false);
    d.timer.loop(200, updateAll, this);
    d.timer.start();

    document.getElementById('save').onclick = function() {
        location.href=get_image();
    };
};

function update() {};

function updateAll() {
    d.bmd.processPixelRGB(forEachPixel, this, 1, 1, d.game.width - 1, d.game.height - 1);
};

function forEachPixel(pixel, x, y) {

    var up_color = d.bmd.getPixelRGB(x, y - rand_btw(0, 2));
    pixel.r = up_color.r;
    pixel.g = up_color.g;
    pixel.b = up_color.b;

    return pixel;
};

function update_position(p) {
    var sign=1;
    if (rand_btw(0, 2) == 0) {
        sign = -1;
    }

    if (rand_btw(0, 2) == 0) {
        p.x += sign;
    } else {
        p.y += sign;
    }

    check_point_in_box(p);

    // var c_idx = Math.min(p.custom_color + rand_btw(-50, 50), d.COLOR_WHEEL_MAX);
    d.grid[p.x][p.y] = p.custom_color;
    // d.bmd.setPixel(p.x, p.y, d.colors[c_idx].r, d.colors[c_idx].g, d.colors[c_idx].b);
}

function check_point_in_box(p) {
    if (p.x > d.game.width) {
        p.x = d.game.width;
    } else if (p.x < 0) {
        p.x = 0;
    }

    if (p.y > d.game.height) {
        p.y = d.game.height;
    } else if (p.y < 0) {
        p.y = 0;
    }
}

function get_image() {
    return d.game.canvas.toDataURL();
}

function render() {};
