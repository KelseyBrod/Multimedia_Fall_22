const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const month = document.querySelector("p")
const navOne = document.getElementById("navOne")
const navTwo = document.getElementById("navTwo")
const navThree = document.getElementById("navThree")
const startGame = document.getElementById("startGame")
const reStartGame = document.getElementById("reStartGame")
const reTryGame = document.getElementById("reTryGame")

navTwo.style.display = "none"
navThree.style.display = "none"

class Player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 20
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        c.fillStyle = "white"
        c.fill()
        c.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// Enemy generation and collision inspired by Chris Courses: https://www.youtube.com/c/ChrisCourses/videos
//thanks for citing!
class Enemy {
    constructor({position, radius, color, velocity}){
        this.position = position
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        c.fillStyle = this.color
        c.fill()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

let player = new Player({
    position: {
        x: window.innerWidth/2,
        y: window.innerHeight/2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

let enemies = []

let timeCount = 20
let gameTimer
let gameSpeed
function gameCount() {
    gameTimer = setInterval(()=>{
        if (timeCount <= 16 && timeCount > 12){
            month.textContent = "October"
            gameSpeed = 2
            clearInterval(enemyTimer)
            generateEnemy()
        } else if(timeCount <= 12 && timeCount > 8){
            month.textContent = "November"
            gameSpeed = 3
            clearInterval(enemyTimer)
            generateEnemy()
        }else if(timeCount <= 8 && timeCount > 4){
            month.textContent = "December"
            gameSpeed = 4
            clearInterval(enemyTimer)
            generateEnemy()
        }else if(timeCount <= 4 && timeCount > 0){
            month.textContent = "Final!!!"
            gameSpeed = 5
            clearInterval(enemyTimer)
            generateEnemy()
        }else if(timeCount <= 0){
          clearInterval(gameTimer);
          cancelAnimationFrame(animationId)
          navThree.style.display = "grid"
        } 
        timeCount -= 1
    }, 1000)
}

function initialization(){
    player = new Player({
        position: {
            x: window.innerWidth/2,
            y: window.innerHeight/2
        },
        velocity: {
            x: 0,
            y: 0
        }
    })
    
    enemies = []
    clearInterval(enemyTimer)
    timeCount = 20
    month.textContent = "September"
    gameSpeed = 1
}

let enemyTimer
function generateEnemy(){
    let time = 500/gameSpeed
    enemyTimer = setInterval(()=>{
        const radiusCircle = Math.random () * (60 - 10) + 10

        let positionX
        let positionY

        let speed = Math.random() * (gameSpeed - 1) + 1

        if (Math.random() < 0.5){
            positionX = Math.random() < 0.5 ? 0 - radiusCircle : canvas.width + radiusCircle
            positionY = Math.random() * canvas.height
        } else {
            positionX = Math.random() * canvas.width
            positionY = Math.random() < 0.5 ? 0 - radiusCircle : canvas.height + radiusCircle
        }

        const angle = Math.atan2(canvas.height/2 - positionY, canvas.width/2 - positionX)
        
        enemies.push(new Enemy({
            position: {
                x: positionX,
                y: positionY
            },
            radius: radiusCircle,
            color: `hsl(${Math.random() * 360}, 50%, 50%)`,
            velocity: {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            }
        }))
        console.log(enemies)
    }, time)
}

let animationId
function animate(){
    animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    enemies.forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(player.position.x - enemy.position.x, player.position.y - enemy.position.y)
        if (dist - enemy.radius - player.radius < 1){
            clearInterval(gameTimer)
            cancelAnimationFrame(animationId)
            navTwo.style.display = "grid"
        }

        if (enemy.position.x + enemy.radius * 2 < 0 ||
            enemy.position.x - enemy.radius * 2 > canvas.width ||
            enemy.position.y + enemy.radius *2 < 0 ||
            enemy.position.y - enemy.radius * 2 > canvas.height
         ){
            setTimeout(() => {
                enemies.splice(index, 1)
            }, 0)
            }
    })
}

addEventListener("keydown", ({key}) => {
    switch (key) {
        case "w": 
        player.velocity.y = -2
        break
        case "s":
        player.velocity.y = 2
        break
        case "a":
        player.velocity.x = -2
        break
        case "d":
        player.velocity.x = 2
        break
    }
})


addEventListener("keyup", ({key}) => {
    switch (key) {
        case "w": 
        player.velocity.y = 0
        break
        case "s":
        player.velocity.y = 0
        break
        case "a":
        player.velocity.x = 0
        break
        case "d":
        player.velocity.x = 0
        break
    }
})

startGame.addEventListener("click", () => {
    month.textContent = "September"
    gameSpeed = 1
    gameCount()
    animate()
    generateEnemy()
    navOne.style.display = "none"
})

reStartGame.addEventListener("click", () => {
    initialization()
    gameCount()
    animate()
    generateEnemy()
    navTwo.style.display = "none"
})

reTryGame.addEventListener("click", () => {
    initialization()
    gameCount()
    animate()
    generateEnemy()
    navThree.style.display = "none"
})