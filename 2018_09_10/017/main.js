
// Note: to get image => d.game.canvas.toDataURL()

var d = {}
d.WORLD_SIZE = 600;
d.RESOLUTION_DIVIDER = 10;
d.COLOR_WHEEL_MAX = 359;

d.PRESENT = 1;
d.ABSENT = 0;

d.VISITED_SUCCESSFUL = 2;
d.VISITED = 1;
d.NOT_VISITED = 0;

d.ROOT = {parent: undefined};

d.UP = 0;
d.RIGHT = 1;
d.DOWN = 2;
d.LEFT = 3;

d.color_map = {}
d.color_map[d.ABSENT] = 270;
d.color_map[d.PRESENT] = 200;

d.target = {x: d.WORLD_SIZE / d.RESOLUTION_DIVIDER - 1, y: d.WORLD_SIZE / d.RESOLUTION_DIVIDER - 1};

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.CANVAS, 'd014',
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

    d.grid = new Array(d.game.width / d.RESOLUTION_DIVIDER + 1);
    for (var i=0; i<d.game.width / d.RESOLUTION_DIVIDER + 1; i++) {
        d.grid[i] = new Array(d.game.height / d.RESOLUTION_DIVIDER + 1);
        for (var j=0; j<d.game.height / d.RESOLUTION_DIVIDER + 1; j++) {
            d.grid[i][j] = d.ABSENT;
        }
    }

    d.solve_grid = new Array(d.game.width / d.RESOLUTION_DIVIDER + 1);
    for (var i=0; i<d.game.width / d.RESOLUTION_DIVIDER + 1; i++) {
        d.solve_grid[i] = new Array(d.game.height / d.RESOLUTION_DIVIDER + 1);
        for (var j=0; j<d.game.height / d.RESOLUTION_DIVIDER + 1; j++) {
            d.solve_grid[i][j] = d.NOT_VISITED;
        }
    }

    d.timer = d.game.time.create(false);
    d.timer.loop(100, updateAll, this);
    d.timer.start();

    document.getElementById('save').onclick = function() {
        location.href = get_image();
    };

    d.current_node = generate_new_node(d.ROOT, 1, 1);
    d.solve_current_nodes = [solve_new_node(d.ROOT, 1, 1, 0)];

    while (d.current_node != d.ROOT) {
        generate_next_step();
    }

    for (var i = 0; i < 100; i++) {
        d.grid[rand_btw(0, d.grid.length - 1)][rand_btw(0, d.grid.length - 1)] = d.PRESENT;
    }
};

function generate_get_free_surroundings(point) {
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

function solve_get_free_surroundings(point) {
    var x = point.x;
    var y = point.y;

    var array = [];

    if (x + 1 < d.game.width / d.RESOLUTION_DIVIDER &&
        d.grid[x + 1][y] == d.PRESENT &&
        d.solve_grid[x + 1][y] == d.NOT_VISITED) {
        array.push(d.RIGHT);
    }

    if (x - 1 > 0 &&
        d.grid[x - 1][y] == d.PRESENT &&
        d.solve_grid[x - 1][y] == d.NOT_VISITED) {
        array.push(d.LEFT);
    }

    if (y - 1 > 0 &&
        d.grid[x][y - 1] == d.PRESENT &&
        d.solve_grid[x][y - 1] == d.NOT_VISITED) {
        array.push(d.UP);
    }

    if (y + 1 < d.game.height / d.RESOLUTION_DIVIDER &&
        d.grid[x][y + 1] == d.PRESENT &&
        d.solve_grid[x][y + 1] == d.NOT_VISITED) {
        array.push(d.DOWN);
    }

    return array;
};

function generate_new_node(parent, x, y)
{
    d.grid[x][y] = d.PRESENT;

    return {parent: parent, x: x, y: y};
};

function solve_new_node(parent, x, y, cost)
{
    d.solve_grid[x][y] = d.VISITED;

    return {parent: parent, x: x, y: y, cost: cost};
};

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
};

function pick_one(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function generate_next_step() {
    var current_node = d.current_node;
    var x = current_node.x;
    var y = current_node.y;

    var surroundings = generate_get_free_surroundings(current_node);

    // No space, going to parent node
    if (surroundings.length == 0) {
        d.current_node = d.current_node.parent;
        return;
    }

    // Pick one at random
    var direction = pick_one(surroundings);

    if (direction == d.UP) {
        d.grid[x][y - 1] = d.PRESENT;
        d.current_node = generate_new_node(current_node, x, y - 2);
    } else if (direction == d.RIGHT) {
        d.grid[x + 1][y] = d.PRESENT;
        d.current_node = generate_new_node(current_node, x + 2, y);
    } else if (direction == d.DOWN) {
        d.grid[x][y + 1] = d.PRESENT;
        d.current_node = generate_new_node(current_node, x, y + 2);
    } else {
        d.grid[x - 1][y] = d.PRESENT;
        d.current_node = generate_new_node(current_node, x - 2, y);
    }
};

function distance(a, b) {
    // return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

function solve_pick_closest(node_list) {
    var index_closest = 0;
    var cost_closest = 99999;
    var closest_node = undefined;

    for (var i = 0; i < node_list.length; i++) {
        var node = node_list[i];
        var cost = node.cost + distance(node, d.target);
        if (cost < cost_closest) {
            index_closest = i;
            cost_closest = cost;
            closest_node = node;
        }
    }

    node_list.splice(index_closest, 1);

    return closest_node;
};

function solve_next_step() {
    var node = solve_pick_closest(d.solve_current_nodes); // pick and remove from list
    if (node == undefined) { return; }

    // Found target?
    if (node.x == d.target.x &&
        node.y == d.target.y) {
        d.solve_current_nodes = [];
        while (node != d.ROOT) {
            d.solve_grid[node.x][node.y] = d.VISITED_SUCCESSFUL;
            node = node.parent;
        }
    }

    solve_get_free_surroundings(node).forEach(dir => {
        if (dir == d.UP) {
            d.solve_current_nodes.push(solve_new_node(node, node.x, node.y - 1, node.cost + 1));
        } else if (dir == d.RIGHT) {
            d.solve_current_nodes.push(solve_new_node(node, node.x + 1, node.y, node.cost + 1));
        } else if (dir == d.DOWN) {
            d.solve_current_nodes.push(solve_new_node(node, node.x, node.y + 1, node.cost + 1));
        } else {
            d.solve_current_nodes.push(solve_new_node(node, node.x - 1, node.y, node.cost + 1));
        }
    });
};

function update() {
    for (var i = 0; i < 10; i++) {
        solve_next_step();
    }
};

function updateAll() {
    d.bmd.processPixelRGB(for_each_pixel, this, 0, 0, d.game.width, d.game.height);
};

function for_each_pixel(pixel, x, y) {
    var presence = d.grid[Math.floor(x / d.RESOLUTION_DIVIDER)][Math.floor(y / d.RESOLUTION_DIVIDER)];
    var color = d.colors[d.color_map[presence]];

    if (d.solve_grid[Math.floor(x / d.RESOLUTION_DIVIDER)][Math.floor(y / d.RESOLUTION_DIVIDER)] == d.VISITED) { color = d.colors[150]; }
    if (d.solve_grid[Math.floor(x / d.RESOLUTION_DIVIDER)][Math.floor(y / d.RESOLUTION_DIVIDER)] == d.VISITED_SUCCESSFUL) { color = d.colors[0]; }

    pixel.r = color.r;
    pixel.g = color.g;
    pixel.b = color.b;

    return pixel;
};

function get_image() {
    return d.game.canvas.toDataURL();
};

function render() {};
