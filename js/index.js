document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    let inputString = "";
    let key = "";
    function getInput() {
        let userInput = document.getElementById('inputString');
        let userKey = document.getElementById('key');
        if (userInput.value !== "" || userKey.value !== "") {
            localStorage.setItem("input", userInput.value);
            localStorage.setItem("key", userKey.value);
        }
        userInput.value = "";
        userKey.value = "";
        inputString = localStorage.getItem('input');
        key = localStorage.getItem('key');
    }
    let encryptButton = document.getElementById('encrypt');
    let decryptButton = document.getElementById('decrypt');
    encryptButton.addEventListener('click', () => {
        getInput();
        if (!inputString || !key)
            return;
        let output = encryptString(inputString, parseInt(key));
        console.log(output);
    });
    decryptButton.addEventListener('click', () => {
        getInput();
        if (!inputString || !key)
            return;
        let output = decryptString(inputString, parseInt(key));
        console.log(output);
    });
    function encryptString(input, key) {
        return "hello";
    }
    function decryptString(input, key) {
        return "dello";
    }
});
//# sourceMappingURL=index.js.map