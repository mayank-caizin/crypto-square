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
        // console.log(output);

        let inputElement: HTMLSpanElement = <HTMLSpanElement> document.getElementById('input');
        let outputElement: HTMLSpanElement = <HTMLSpanElement> document.getElementById('output');
        let resElement: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById('result');

        inputElement.innerHTML = inputString;
        outputElement.innerHTML = output;
        resElement.classList.remove('hide');

        localStorage.setItem("previousString", inputString);
        localStorage.setItem("input", output);
        localStorage.setItem("key", key);
    });

    decryptButton.addEventListener('click', () => {
        getInput();
        
        if(!inputString || !key)
            return;
        
        let output: string = oneTimeDecrypt();
        // let output: string = decryptString(inputString, parseInt(key));
        console.log(output);
        
        let inputElement: HTMLSpanElement = <HTMLSpanElement> document.getElementById('input');
        let outputElement: HTMLSpanElement = <HTMLSpanElement> document.getElementById('output');
        let resElement: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById('result');

        inputElement.innerHTML = inputString;
        outputElement.innerHTML = output;
        resElement.classList.remove('hide');

        localStorage.setItem("input", output);
        localStorage.setItem("key", key);
    });

    function encryptString(input: string, key: number): string {
        input = input.replace(/ /g, '');
        let matrix: string[][] = [];
        let i: number = 0;
        let l: number = input.length;

        while(i < l) {
            let arr: string[] = [];
            for(let j:number = 0; j < key; j++) {
                if(i == l) break;

                arr.push(input.charAt(i));
                i++;
            }
            matrix.push(arr);
        }

        // console.log(matrix);

        let result = "";
        for(let j:number = 0; j < key; j++) {
            for(let i:number = 0; i < matrix.length; i++) {
                if(j >= matrix[i].length) break;
                result += matrix[i][j];
            }
        }

        // result = result.replace(/ /g, '&zwnj;');
        return result;
    }

    function oneTimeDecrypt(): string{
        let result: string | null = localStorage.getItem("previousString");
        if(result == null) return "";
        return result;
    }

    function decryptString(input: string, key: number): string {
        let newkey: number = Math.floor(input.length / key);
        let rem: number = input.length % key;

        let matrix: string[][] = [];
        let i: number = 0;
        let l: number = input.length;
        let x:number = 0;
        if(rem > 0) x = 1;

        console.log(newkey);
        console.log(key);

        while(i < l) {
            let arr: string[] = [];
            for(let j:number = 0; j < newkey + x; j++) {
                if(i == l) break;

                arr.push(input.charAt(i));
                i++;
            }
            if(rem > 0) rem--;
            else x = 0;

            matrix.push(arr);
        }

        console.log(matrix);
        rem = input.length % key;
        x = 0;
        if(rem > 0) x = 1;

        let result: string = "";
        for(let j:number = 0; j < newkey + x; j++) {
            for(let i:number = 0; i < matrix.length; i++) {
                if(j >= matrix[i].length) break;
                result += matrix[i][j];
            }
        }

        result = result.replace(/&zwnj;/g,' ');
        return result;
    }
});