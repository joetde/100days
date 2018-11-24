
d.menus = {
    DEFAULT_COLOR  : 0xffffff,
    SELECTED_COLOR : 0x00ff00,
    PRESSED_COLOR  : 0xff0000,

    hide : function() {
        this.texts.forEach(t => t.text_object.visible = false);
    },

    show : function() {
        this.texts.forEach(t => t.text_object.visible = true);
    },

    create : function() {
        var char_size = 34;
        var texts = [{text: 'Play', callback: function() { d.engine.start(); d.menus.hide(); }},
                     {text: 'Don\'t play', callback: function() { d.engine.stop(); }}];
        var y_start = d.game.height / 3;
        var y_space = d.game.height / 10;

        texts.forEach(t => {
            t.text_object = this.print_center(t.text, y_start, char_size);
            t.text_object.inputEnabled = true;
            t.text_object.events.onInputDown.add(t.callback);
            t.text_object.events.onInputDown.add(function() {t.text_object.tint = this.PRESSED_COLOR});
            t.text_object.events.onInputUp.add(function()   {t.text_object.tint = this.DEFAULT_COLOR});
            y_start += y_space;
        });

        this.cursor = 0;
        texts[this.cursor].text_object.tint = this.SELECTED_COLOR;

        this.texts = texts;
    },

    print_center : function(text, y, char_size) {
         return d.game.add.bitmapText(d.game.width / 2 - ((text.length + 1) * char_size) / 2,
             y,
            'carrier_command',
            text,
            char_size);
    },

    on_key_down : function(key) {
        this.texts.forEach(t => t.text_object.tint = this.DEFAULT_COLOR);
        
        if (key.keyCode == Phaser.Keyboard.UP) {
            if (this.cursor == 0) { this.cursor = this.texts.length - 1; }
            else { this.cursor -= 1; }
        } else if (key.keyCode == Phaser.Keyboard.DOWN) {
            this.cursor += 1;
            this.cursor %= this.texts.length;
        } else if (key.keyCode == Phaser.Keyboard.ENTER) {
            this.texts[this.cursor].callback();
        } else if (key.keyCode == Phaser.Keyboard.ESC) {
            if (d.engine.is_paused) { this.show(); }
            else { this.hide(); }
        }

        this.texts[this.cursor].text_object.tint = this.SELECTED_COLOR;
    }
};
