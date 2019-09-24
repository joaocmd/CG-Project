// class InputManager {

//     constructor() {
        // this.keyCodes = new Array(256).fill();
        // this.keyCodes[81] = 0;
        // this.KeyCode = {
        //     81: 0, //Q
        //     87: 1, //W
        //     65: 2, //A
        //     83: 3, //S
        // }

        //let nKeys = Object.keys(this.KeyCode).length;

        // var onKeyDown = (function(e) {
        //     let keyCode = e.keyCode;
        //     if (keyCode >= 97 && keyCode <= 122) {
        //         keyCode -= 32;
        //     }
        //     // if (e.keyCode in this.KeyCode) {
        //         this.keyDown[e.KeyCode] = true;                    
        //     // }
        // });

        // var onKeyUp = (function(e) {
        //     let keyCode = e.keyCode;
        //     if (keyCode >= 97 && keyCode <= 122) {
        //         keyCode -= 32;
        //     }
        //     // if (e.keyCode in this.KeyCode) {
        //         this.keyDown[keyCode] = false;
        //     // }
        // });
     
var _keyDown;

function _input_onKeyDown(e) {
    let keyCode = e.keyCode;
    _keyDown[keyCode] = true;
}

function _input_onKeyUp(e) {
    let keyCode = e.keyCode;
    _keyDown[keyCode] = false;
}

function input_init() {
    _keyDown = new Array(256).fill(false);
    window.addEventListener("keydown", _input_onKeyDown);
    window.addEventListener("keyup", _input_onKeyUp);
}

function input_getKey(keyCode) {
    return (typeof keyCode == "string") ? _keyDown[keyCode.charCodeAt(0)] : _keyDown[keyCode];
}
