const { ipcRenderer } = require("electron");

class Controller {

    static do(channel) {
        let state = ipcRenderer.sendSync(channel);
        document.getElementById('output-b').innerText = state.bottom;
        document.getElementById('output-t').innerText = state.top;
    }

    static doEx(channel, arg) {
        let state = ipcRenderer.sendSync(channel, arg);
        document.getElementById('output-b').innerText = state.bottom;
        document.getElementById('output-t').innerText = state.top;
    }

    static switchSystem() {
        let system = document.getElementById('system').value;

        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        for (let i in numbers) {
            if (Number(system) > numbers.indexOf(i)) { document.getElementById(`button-${i}`).disabled = false; }
            else { document.getElementById(`button-${i}`).disabled = true; }
        }

        let state = ipcRenderer.sendSync('sys', system);
        document.getElementById('output-b').innerText = state.bottom;
        document.getElementById('output-t').innerText = state.top;
    }

}