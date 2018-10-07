
var d = {}
d.graphics = {};
d.graphics.transform = {};
d.engine = {};
d.engine.maze = {};

d.RESOLUTION_DIVIDER = 1;

d.PRESENT = 1;
d.ABSENT = 0;

d.ROOT = {parent: undefined};

d.UP = 0;
d.RIGHT = 1;
d.DOWN = 2;
d.LEFT = 3;

d.color_map = {}
d.color_map[d.ABSENT] = {r: 255, g: 255, b: 255};
d.color_map[d.PRESENT] = {r: 0, g: 0, b: 0};

d.ITERATIONS_PER_UPDATE = 10000;

d.started = false;

d.game = new Phaser.Game(10, 10, Phaser.CANVAS, 'd016',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {}

function create() {
    document.getElementById('save').onclick = function() {
        location.href = get_image();
    };

    d.game.load.onLoadComplete.add(load_complete, this);

    d.game.input.onDown.add(x => start_generate(d.game.input.activePointer.x, d.game.input.activePointer.y));
};

function load_complete() {
    console.log("Load complete");

    var loaded_image = d.game.cache.getImage('img');

    d.game.scale.setGameSize(loaded_image.width, loaded_image.height);
    d.bmd = d.game.add.bitmapData(loaded_image.width, loaded_image.height);
    d.bmd.load('img');
    d.bmd.addToWorld();

    d.bmd.processPixelRGB(d.graphics.transform.bw, this, 0, 0, d.game.width, d.game.height);
};

function input_image(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        d.game.load.image('img', dataURL);
        d.game.load.start();
    };

    reader.readAsDataURL(input.files[0]);
};

function start_generate(x, y) {
    // Get color (B vs W)
    var present_color = d.bmd.getPixelRGB(x, y).r;

    // Fill up the grid
    d.grid = new Array(d.game.width / d.RESOLUTION_DIVIDER + 1);
    for (var i=0; i<d.game.width / d.RESOLUTION_DIVIDER + 1; i++) {
        d.grid[i] = new Array(d.game.height / d.RESOLUTION_DIVIDER + 1);
        for (var j=0; j<d.game.height / d.RESOLUTION_DIVIDER + 1; j++) {
            d.grid[i][j] = d.bmd.getPixelRGB(i * d.RESOLUTION_DIVIDER, j * d.RESOLUTION_DIVIDER).r == present_color ? d.PRESENT : d.ABSENT;
        }
    }

    // Start algo
    d.current_node = d.engine.maze.new_node(d.ROOT,
        Math.floor(x / d.RESOLUTION_DIVIDER),
        Math.floor(y / d.RESOLUTION_DIVIDER));

    if (d.timer != undefined) { d.timer.stop(); }
    d.timer = d.game.time.create(false);
    d.timer.loop(100, refresh_map_grid, this);
    d.timer.start();

    d.started = true;
}

d.engine.maze.get_free_surroundings = function(point) {
    var x = point.x;
    var y = point.y;

    var array = [];

    if (x + 2 < d.game.width / d.RESOLUTION_DIVIDER && d.grid[x + 2][y] == d.ABSENT) {
        array.push(d.RIGHT);
    }

    if (x - 2 > 0 && d.grid[x - 2][y] == d.ABSENT) {
        array.push(d.LEFT);
    }

    if (y - 2 > 0 && d.grid[x][y - 2] == d.ABSENT) {
        array.push(d.UP);
    }

    if (y + 2 < d.game.height / d.RESOLUTION_DIVIDER && d.grid[x][y + 2] == d.ABSENT) {
        array.push(d.DOWN);
    }

    return array;
};

d.engine.maze.new_node = function(parent, x, y)
{
    d.grid[x][y] = d.PRESENT;

    return {parent: parent, x: x, y: y};
};

d.engine.maze.next_step = function() {
    var current_node = d.current_node;
    var x = Math.floor(current_node.x);
    var y = Math.floor(current_node.y);

    var surroundings = d.engine.maze.get_free_surroundings(current_node);

    // No space, going to parent node
    if (surroundings.length == 0) {
        d.current_node = d.current_node.parent;
        return;
    }

    // Pick one at random
    var direction = pick_one(surroundings);

    if (direction == d.UP) {
        d.grid[x][y - 1] = d.PRESENT;
        d.current_node = d.engine.maze.new_node(current_node, x, y - 2);
    } else if (direction == d.RIGHT) {
        d.grid[x + 1][y] = d.PRESENT;
        d.current_node = d.engine.maze.new_node(current_node, x + 2, y);
    } else if (direction == d.DOWN) {
        d.grid[x][y + 1] = d.PRESENT;
        d.current_node = d.engine.maze.new_node(current_node, x, y + 2);
    } else {
        d.grid[x - 1][y] = d.PRESENT;
        d.current_node = d.engine.maze.new_node(current_node, x - 2, y);
    }
};

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
};

function pick_one(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function update() {
    if (d.started) {
        for (var i = 0; i < d.ITERATIONS_PER_UPDATE && d.current_node != d.ROOT; i++) {
            d.engine.maze.next_step();
        }
    }
};

function refresh_map_grid() {
    d.bmd.processPixelRGB(d.graphics.transform.map_grid, this, 0, 0, d.game.width, d.game.height);
};

d.graphics.transform.map_grid = function(pixel, x, y) {
    var presence = d.grid[Math.floor(x / d.RESOLUTION_DIVIDER)][Math.floor(y / d.RESOLUTION_DIVIDER)];
    var color = d.color_map[presence];

    pixel.r = color.r;
    pixel.g = color.g;
    pixel.b = color.b;

    return pixel;
};

d.graphics.transform.bw = function(pixel, x, y) {
    var sum = pixel.r + pixel.g + pixel.b;
    var c = 0;
    if (sum > ((255) * 3) / 2) {
        c = 255;
    }

    pixel.r = c;
    pixel.g = c;
    pixel.b = c;

    return pixel;
}

function get_image() {
    return d.game.canvas.toDataURL();
};

function render() {};
