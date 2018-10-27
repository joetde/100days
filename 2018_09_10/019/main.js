
var d = {}

d.game = new Phaser.Game(600, 600, Phaser.CANVAS, 'd016',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    d.game.load.path = '../assets/images/';
    d.game.load.spritesheet('fry', 'fry_spritesheet.png', 60, 60, 4);
}

function create() {
    d.game.stage.backgroundColor = '#545659';
    
    d.fry = d.game.add.sprite(100, 100, 'fry');
    d.fry.animations.add('move_left');
    d.fry.animations.play('move_left', 10, true);
};

function update() {};

function render() {};
