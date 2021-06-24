const { app, BrowserWindow, Menu, ipcMain, shell, appWindow } = require('electron');
const path = require('path');
const { State } = require('./State.js');

let state = new State;

ipcMain.on('add', (event, arg) => {
  state.addSymbol(arg);
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('clear', event => {
  state.clearCurrent();
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('clear-all', event => {
  state.clearAll();
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('backspace', event => {
  state.delSymbol();
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('exec', event => {
  state.calculate();
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('mem', (event, arg) => {
  state.memoryAction(arg);
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('sys', (event, arg) => {
  state.changeSystem(arg);
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('paste', (event, arg) => {
  state.paste(arg);
  let out = {
    top: state.getSubString(),
    bottom: state.getMainString()
  }
  event.returnValue = out;
});

ipcMain.on('hist', (event) => {
  let out = state.getHistory();
  event.returnValue = out;
});

ipcMain.on('clrHist', (event) => {
  let out = state.clearHistory();
});

if (require('electron-squirrel-startup')) { 
  app.quit();
}

const createWindow = () => {
  
  const mainWindow = new BrowserWindow({
    width: 348,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true
    }
  });
  
  function appMenu(app, appWindow) {
    return ([
      {
        label: "Калькулятор",
        click() {
          mainWindow.loadFile(path.join(__dirname, 'index.html'));
        }
      },
      {
        label: "История",
        click() {
          mainWindow.loadFile(path.join(__dirname, 'history.html'));
        }
      },
      {
        label: "Справка",
        click() {
          mainWindow.loadFile(path.join(__dirname, 'reference.html'));
        }
      }
    ]);
  }
  
  const template = appMenu(app, mainWindow);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // mainWindow.webContents.openDevTools();

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};



app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
