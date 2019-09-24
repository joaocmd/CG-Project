class Input {

    constructor() {
        this.KeyCode = {
            81: 0, //Q
            87: 1, //W
            65: 2, //A
            83: 3, //S
        }

        let nKeys = Object.keys(this.KeyCode).length;
        this.keyDown = new Array(nKeys).fill(false);

        var onKeyDown = (function(e) {
            if (e.keyCode >= 97 && e.keyCode <= 122) {
                e.keyCode -= 32;
            }
            if (e.keyCode in this.KeyCode) {
                this.keyDown[e.KeyCode] = true;                    
            }
        });

        var onKeyUp = (function(e) {
            if (e.keyCode >= 97 && e.keyCode <= 122) {
                e.keyCode -= 32;
            }
            if (e.keyCode in this.KeyCode) {
                this.keyDown[e.keyCode] = false;
            }
        });


        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    }

    keyDown(keyCode) {
        return this.onKeyDown[keyCode.charCodeAt(0)];
    }
}