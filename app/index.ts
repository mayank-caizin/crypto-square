document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();

    let inputString: string | null = "";
    let key: string | null = "";

    function getInput(): void{
        let userInput: HTMLInputElement = <HTMLInputElement>document.getElementById('inputString');
        let userKey: HTMLInputElement = <HTMLInputElement>document.getElementById('key');

        if(userInput.value !== "" || userKey.value !== "") {
            localStorage.setItem("input", userInput.value);
            localStorage.setItem("key", userKey.value);
        }

        userInput.value = "";
        userKey.value = "";

        inputString = localStorage.getItem('input');
        key = localStorage.getItem('key');
    }

    let encryptButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById('encrypt');
    let decryptButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById('decrypt');

    encryptButton.addEventListener('click', () => {
        getInput();
        
        if(!inputString || !key)
            return;
        
        let output: string = encryptString(inputString, parseInt(key));
        console.log(output);
    });

    decryptButton.addEventListener('click', () => {
        getInput();
        
        if(!inputString || !key)
            return;
        
        let output: string = decryptString(inputString, parseInt(key));
        console.log(output);
    });

    function encryptString(input: string, key: number): string {
        return "hello";
    }

    function decryptString(input: string, key: number): string {
        return "dello";
    }
});