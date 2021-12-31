// A Rough javascript version of what we want to achieve in React.
const drawWindow = document.getElementById('application');

const app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);

app.stage.x = 0;
app.stage.y = 0;
window.addEventListener('resize', resize);

function resize(){
    location.reload()
}

const graphics = new PIXI.Graphics();
// Rectangle
graphics.beginFill('0xfffff');
graphics.drawRect(0, 0, screen.width - 20, screen.height - 20);
graphics.endFill();
app.stage.addChild(graphics);

const stage = app.stage;
stage.interactive = true;
stage.buttonMode = true;
stage.on('pointerdown', onClick);

const sign = document.getElementById("sign");
const text = document.getElementById("text");
let Iedit = false;
let signCount = 0;
let textCount = 0;
sign.addEventListener('click',onClickSign);
text.addEventListener('click',onClickText);
let Icolor = null;
let Itype = null;
let Iheight = 50;
let Iwidth = 100;
let Icount = 0;

function onClickSign(){
    Iedit = true;
    Icolor = '0xABABAB';
    Itype = 'sign';
    Icount = Icount + 1;
}

function onClickText(){
    Iedit = true;
    Icolor = '0xDFDFDF';
    Itype = 'text';
    Icount = Icount + 1;
}

function textFn(x, y, type, count){
    const basicText = new PIXI.Text(`${type}:${count}`)
    basicText.x = x + 0.2*Iwidth;
    basicText.y = y+0.2*Iheight;
    return(app.stage.addChild(basicText));
}

function onClick(e, edit = Iedit, type = Itype, color = Icolor, height = Iheight, width = Iwidth, count = Icount){
    
    if(edit){
        const x = e.data.originalEvent.clientX - (2.5*width);
        const y = e.data.originalEvent.clientY+1.75*height;
        graphics.beginFill(color);
        graphics.drawRoundedRect(x, y, width, height,8);
        graphics.endFill();
        app.stage.addChild(graphics);
        textFn(x, y, type,count);
        Iedit = false;
    }
}