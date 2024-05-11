const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

var points = []
var lines = []

function clearAndRender() {
    ctx.clearRect(0 , 0 , innerWidth , innerHeight)
    addLines()
    showPoints()
}

function addLines() {
    const linesX = 5
    const linesY = 7
    const lineWidth = 1
    for (let i = 1; i <= linesX ; i++) {
        ctx.strokeStyle = '#333'
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(0 , i * innerHeight / linesX + lineWidth )
        ctx.lineTo(innerWidth , i * innerHeight / linesX - lineWidth)
        ctx.stroke()
    }
    for (let i = 1; i <= linesY ; i++) {
        ctx.strokeStyle = '#333'
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(i * innerWidth / linesY , 0)
        ctx.lineTo(i * innerWidth / linesY + lineWidth , innerHeight)
        ctx.stroke()
    }
}

const colors = ['#24eeee','#01786f','#7289da','#2c2f33','#de8b66','#fea993','#ff91a4','#e3e4e6','#00cc99']
const {random , floor , sqrt , pow} = Math

function generatePoints() {
    points = []
    for (let i = 0; i < 70; i++) {
        const size  = floor(random() * 3 + 5)
        const x = Math.random() * innerWidth 
        const y = Math.random() * innerHeight 
        const color = colors[floor(random() * colors.length)]
        points.push({x,y,size,color})
    }
    
}

const showPoints = () => {
    points.forEach(point => {
        ctx.beginPath()
        ctx.fillStyle = point.color
        ctx.arc(point.x,point.y,point.size,0,Math.PI * 2)
        ctx.fill()
    })
    
}


function initialize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.backgroundColor = "#24233E";
    generatePoints()
    clearAndRender()
}
  initialize()

  
window.addEventListener('mousemove',e => {
    const x = e.clientX
    const y = e.clientY
    clearAndRender()
    points.forEach(point => {
        const px = point.x
        const py = point.y
        const distance = sqrt(pow(x - px , 2) + pow(y - py , 2))
        if (distance < 220) {
           ctx.strokeStyle = point.color
           ctx.lineWidth = 2
           ctx.beginPath()
           ctx.moveTo(px , py)
           ctx.lineTo(x,y)
           ctx.stroke()
        }
    })
})


document.addEventListener('mouseleave', () => {
    clearAndRender()
})

window.addEventListener('resize',initialize)
