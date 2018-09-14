
var d = {}
var MODE_AUTO = 0;
var MODE_PLAY = 1;
d.WORLD_SIZE = 400;
d.MARGIN = 20;
d.BOX_SIZE = (d.WORLD_SIZE / 2) - (2 * d.MARGIN);
d.MODE = MODE_AUTO;

var i = 0;

d.game = new Phaser.Game(d.WORLD_SIZE, d.WORLD_SIZE, Phaser.AUTO, 'd004',
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

    // Add two additional multitouch possibility (2 + 2)
    d.game.input.addPointer();
    d.game.input.addPointer();

    d.plot_point = new Phaser.Point();
};

function onInput() {
    var x = d.game.world.centerX;
    var y = d.game.world.centerY;
    circle = new Phaser.Circle(x, y, 100);
    point = new Phaser.Point();
    circle.random(point);
    point.floor();
    
    i = d.game.math.wrapValue(i, 1, 359);
    d.bmd.setPixel(point.x, point.y, d.colors[i].r, d.colors[i].g, d.colors[i].b);
}

function update() {
    onInput();
};

function render() {};
