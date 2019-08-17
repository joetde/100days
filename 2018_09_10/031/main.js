
d.game = new Phaser.Game(600, 300, Phaser.CANVAS, 'd031',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    d.game.load.path = '../assets/';

    d.game.load.bitmapFont('carrier_command',
        'fonts/carrier_command.png',
        'fonts/carrier_command.xml');
}

function rand_btw(a, b) {
    return Math.floor((Math.random() * (b-a)) + a);
};

function create() {
    d.game.stage.backgroundColor = '#545659';

    d.menus.create();
    d.a = rand_btw(10, 99);
    d.b = rand_btw(10, 99);
    d.menus.new_puzzle(d.a, d.b);
    d.current_input = '';
    d.game.input.keyboard.onDownCallback = key_down_dispatch;
};

function key_down_dispatch(key) {
    if (key.key >= 0 && key.key <= 9) {
        d.current_input = d.menus.append_input_text(key.key);
    } else if (key.keyCode == Phaser.Keyboard.BACKSPACE) {
        d.menus.clear_input_text();
    }

    if (d.current_input == d.a * d.b) {
        d.a = rand_btw(10, 99);
        d.b = rand_btw(10, 99);
        d.menus.new_puzzle(d.a, d.b);
    }
}

function update() {};

function render() {};
