
Menus = {
    create : function() {
        var char_size = 34;
        var texts = [{text: 'Play', callback: function() { d.fries.forEach(f => f.visible = true)}},
                     {text: 'Don\'t play', callback: function() { d.fries.forEach(f => f.visible = false)}}];
        var y_start = d.game.height / 3;
        var y_space = d.game.height / 10;

        texts.forEach(t => {
            t.text_object = Menus.print_center(t.text, y_start, char_size);
            t.text_object.inputEnabled = true;
            t.text_object.events.onInputDown.add(t.callback);
            y_start += y_space;
        });

        this.texts = texts;
    },

    print_center : function(text, y, char_size) {
         return d.game.add.bitmapText(d.game.width / 2 - ((text.length + 1) * char_size) / 2,
             y,
            'carrier_command',
            text,
            char_size);
    }
};
