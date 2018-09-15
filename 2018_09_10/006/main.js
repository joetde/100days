
var d = {}
d.WORLD_SIZE = 400;
d.COLOR_WHEEL_MAX = 359;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.AUTO, 'd006',
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

    d.plot_point = new Phaser.Point();
};

function draw(func) {
    for (var a = 0; a < 100; a++) {
        d.rect.random(d.plot_point);
        d.plot_point.floor();

        var idx;
        var diff = func(d.plot_point.x) - d.plot_point.y;
        var dist = Math.abs(diff);
        var coef = Math.floor(dist) == 0 ? 0 : d.COLOR_WHEEL_MAX / (2 * dist);

        if (diff > 0) {
            idx = Math.floor(d.game.math.random(d.COLOR_WHEEL_MAX / 2) + coef);
        } else {
            idx = Math.floor(d.game.math.random(d.COLOR_WHEEL_MAX / 2) + d.COLOR_WHEEL_MAX / 2 - coef);
        }

        // console.log(diff);
        // console.log(dist);
        // console.log(coef);
        // console.log(idx);
        
        d.bmd.setPixel(d.plot_point.x, d.plot_point.y, d.colors[idx].r, d.colors[idx].g, d.colors[idx].b);
    }
}

function update() {
    draw(x => d.WORLD_SIZE / 2 + (d.WORLD_SIZE / 3) * Math.sin(x / 30));
};

function render() {};
