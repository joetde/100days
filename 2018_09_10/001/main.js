
var d001 = {}

d001.game = new Phaser.Game(800, 600, Phaser.AUTO, 'ssc',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {};

function create() {
    d001.game.stage.backgroundColor = '#2d2d2d';
};

function update() {};

function render() {};
