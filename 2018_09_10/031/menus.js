
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
        this.char_size = 50;
        var texts = [{text: '34 x 39'},
                     {text: ''}];
        this.texts = texts;
        this.refresh();


        texts[0].text_object.tint = this.SELECTED_COLOR;
    },

    print_center : function(text, y, char_size) {
         return d.game.add.bitmapText(d.game.width / 2 - ((text.length + 1) * char_size) / 2,
             y,
            'carrier_command',
            text,
            char_size);
    },

    refresh : function() {
        var y_start = d.game.height / 4;
        var y_space = d.game.height / 3;

        this.texts.forEach(t => {
            t.text_object = this.print_center(t.text, y_start, this.char_size);
            t.text_object.inputEnabled = true;
            y_start += y_space;
        });
    },

    new_puzzle : function(a, b) {
        var curr_obj = this.texts[0].text_object;
        curr_obj.text = a + ' x ' + b;
        this.clear_input_text();
    },

    clear_input_text : function() {
        var curr_obj = this.texts[1].text_object;
        curr_obj.text = '';
        curr_obj.x = d.game.width / 2 - ((curr_obj.text.length + 1) * this.char_size) / 2;
    },

    append_input_text : function(char) {
        var curr_obj = this.texts[1].text_object;
        curr_obj.text = char + curr_obj.text;
        curr_obj.x -= this.char_size / 2;
        return curr_obj.text;
    }
};
