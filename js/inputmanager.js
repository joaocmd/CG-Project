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
     
var _key;
var _keyDown;

async function _input_onKeyDown(e) {
    let keyCode = e.keyCode;
    _key[keyCode] = true;
    _keyDown[keyCode] = true;
    //Key is considered pressed down for the next 100ms
    await sleep(100);
    _keyDown[keyCode] = false;

}

function _input_onKeyUp(e) {
    let keyCode = e.keyCode;
    _key[keyCode] = false;
}

function input_init() {
    _key = new Array(256).fill(false);
    _keyDown = new Array(256).fill(false);
    window.addEventListener("keydown", _input_onKeyDown);
    window.addEventListener("keyup", _input_onKeyUp);
}

function input_getKey(keyCode) {
    return (typeof keyCode == "string") ? _key[keyCode.charCodeAt(0)] : _key[keyCode];
}

function input_getKeyDown(keyCode) {
    let keyVal = (typeof keyCode == "string") ? keyCode.charCodeAt(0) : keyCode;
    if (_keyDown[keyVal]) {
        _keyDown[keyVal] = false;
        return true;
    }
    return false;
}
