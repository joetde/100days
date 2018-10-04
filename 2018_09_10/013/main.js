
// Note: to get image => d.game.canvas.toDataURL()

var d = {}
d.WORLD_SIZE = 600;
d.COLOR_WHEEL_MAX = 359;

d.PRESENT = 100;
d.ABSENT = 270;

d.ROOT = {parent: undefined};

d.UP = 0;
d.RIGHT = 1;
d.DOWN = 2;
d.LEFT = 3;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.CANVAS, 'd013',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    d.game.load.path = '../assets/';
    d.game.load.image('background', 'black.png');
}

function create() {
    d.colors = Phaser.Color.HSVColorWheel();

    // For ploting
    d.bmd = d.game.add.bitmapData(d.game.width, d.game.height);
    d.bmd.load('background');
    d.bmd.addToWorld();

    d.rect = new Phaser.Rectangle(0, 0, d.game.width, d.game.height);

    d.grid = new Array(d.game.width+1);
    for (var i=0; i<d.game.width+1; i++) {
        d.grid[i] = new Array(d.game.height+1);
        for (var j=0; j<d.game.height+1; j++) {
            d.grid[i][j] = d.ABSENT;
        }
    }

    d.timer = d.game.time.create(false);
    d.timer.loop(100, updateAll, this);
    d.timer.start();

    document.getElementById('save').onclick = function() {
        location.href=get_image();
    };

    d.current_node = new_node(d.ROOT, 1, 1);
};

function get_free_surroundings(point) {
    var x = point.x;
    var y = point.y;

    var array = [];

    if (x + 2 < d.game.width && d.grid[x + 2][y] == d.ABSENT) {
        array.push(d.RIGHT);
    }

    if (x - 2 > 0 && d.grid[x - 2][y] == d.ABSENT) {
        array.push(d.LEFT);
    }

    if (y - 2 > 0 && d.grid[x][y - 2] == d.ABSENT) {
        array.push(d.UP);
    }

    if (y + 2 < d.game.height && d.grid[x][y + 2] == d.ABSENT) {
        array.push(d.DOWN);
    }

    return array;
};

function new_node(parent, x, y)
{
    d.grid[x][y] = d.PRESENT;

    return {parent: parent, x: x, y: y};
};

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
};

function pick_one(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function new_step() {
    var current_node = d.current_node;
    var x = current_node.x;
    var y = current_node.y;

    if (current_node == d.ROOT) { return; }

    var surroundings = get_free_surroundings(current_node);

    // No space, going to parent node
    if (surroundings.length == 0) {
        d.current_node = d.current_node.parent;
        return;
    }

    // Pick one at random
    var direction = pick_one(surroundings);

    if (direction == d.UP) {
        d.grid[x][y - 1] = d.PRESENT;
        d.current_node = new_node(current_node, x, y - 2);
    } else if (direction == d.RIGHT) {
        d.grid[x + 1][y] = d.PRESENT;
        d.current_node = new_node(current_node, x + 2, y);
    } else if (direction == d.DOWN) {
        d.grid[x][y + 1] = d.PRESENT;
        d.current_node = new_node(current_node, x, y + 2);
    } else {
        d.grid[x - 1][y] = d.PRESENT;
        d.current_node = new_node(current_node, x - 2, y);
    }
};

function update() {
    for (var i=0; i<1000; i++) {
        new_step();
    }
};

function updateAll() {
    d.bmd.processPixelRGB(forEachPixel, this, 0, 0, d.game.width, d.game.height);
};

function forEachPixel(pixel, x, y) {
    var color = d.colors[d.grid[x][y]];

    pixel.r = color.r;
    pixel.g = color.g;
    pixel.b = color.b;

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
