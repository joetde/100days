
var d001 = {}
d001.MARGIN = 20;
d001.BOX_SIZE = 400;
d001.REPULSE = 500;

d001.game = new Phaser.Game(d001.BOX_SIZE, d001.BOX_SIZE, Phaser.AUTO, 'ssc',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {};

function create() {
    d001.game.stage.backgroundColor = '#2d2d2d';

    d001.circle = d001.game.add.graphics(0,0);
    d001.circle.beginFill(0xFF0000, 1);
    d001.circle.drawCircle(0, 0, d001.MARGIN * 2);
};

function update() {
    var mx = d001.game.input.mousePointer.x;
    var my = d001.game.input.mousePointer.y;
    var cx = d001.circle.x;
    var cy = d001.circle.y;

    var dist = Math.sqrt(Math.pow(cx - mx, 2) + Math.pow(cy - my, 2));
    var dist_sq = Math.pow(dist, 2);
    var dx = (d001.REPULSE * (cx - mx)) / dist_sq;
    var dy = (d001.REPULSE * (cy - my)) / dist_sq;

    d001.circle.x += dx;
    d001.circle.y += dy;

    check_in_box();
};

function check_in_box() {
    if (d001.circle.x < d001.MARGIN) {
        d001.circle.x = d001.MARGIN;
    }
    if (d001.circle.x > d001.BOX_SIZE - d001.MARGIN) {
        d001.circle.x = d001.BOX_SIZE - d001.MARGIN;
    }

    if (d001.circle.y < d001.MARGIN) {
        d001.circle.y = d001.MARGIN;
    }
    if (d001.circle.y > d001.BOX_SIZE - d001.MARGIN) {
        d001.circle.y = d001.BOX_SIZE - d001.MARGIN;
    }
}

function render() {};
