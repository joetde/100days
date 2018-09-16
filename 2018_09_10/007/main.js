
// Note: to get image => d.game.canvas.toDataURL()

var d = {}
d.WORLD_SIZE = 400;
d.COLOR_WHEEL_MAX = 359;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.CANVAS, 'd007',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {}

function create() {
    d.game.stage.backgroundColor = '#545659';
    d.colors = Phaser.Color.HSVColorWheel();

    // For ploting
    d.bmd = d.game.add.bitmapData(d.game.width, d.game.height);
    d.bmd.addToWorld();
    d.rect = new Phaser.Rectangle(0, 0, d.game.width, d.game.height);

    d.plot_points = [
        new Phaser.Point(d.game.world.centerX, d.game.world.centerY),
        new Phaser.Point(d.game.world.centerX, d.game.world.centerY),
        new Phaser.Point(d.game.world.centerX, d.game.world.centerY),
        new Phaser.Point(d.game.world.centerX, d.game.world.centerY),
        new Phaser.Point(d.game.world.centerX, d.game.world.centerY),
        new Phaser.Point(d.game.world.centerX, d.game.world.centerY),
        new Phaser.Point(d.game.world.centerX, d.game.world.centerY)
    ];

    d.plot_points[0].custom_color = d.colors[50];
    d.plot_points[1].custom_color = d.colors[100];
    d.plot_points[2].custom_color = d.colors[150];
    d.plot_points[3].custom_color = d.colors[200];
    d.plot_points[4].custom_color = d.colors[250];
    d.plot_points[5].custom_color = d.colors[300];
    d.plot_points[6].custom_color = d.colors[350];

    document.getElementById('save').onclick = function() {
        location.href=get_image();
    };
};

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
}

function update() {
    for (var i=0; i<100; i++) {
        d.plot_points.forEach(p => update_position(p));
    }
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

    d.bmd.setPixel(p.x, p.y, p.custom_color.r, p.custom_color.g, p.custom_color.b);
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
