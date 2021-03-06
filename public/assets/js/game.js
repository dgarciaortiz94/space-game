window.onload = () => 
{
    let targetUserId = 2;
    let play = false;

    canvas = document.getElementById("canvas");

    windowWidth = document.body.clientWidth;
    windowHeight = document.body.clientHeight;

    var conn = "";

    /**
     * JAVASCRIPT CLASSES FROM HERE
     * --------------------------------------------------------------------------------->
     */
    class Canvas 
    {
        constructor(canvasElement, windowWidth, windowHeight) {
            this.canvas = canvasElement;
            this.width = windowWidth;
            this.height = windowHeight;
        }

        start() { 
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.context = this.canvas.getContext("2d");

            document.body.insertBefore(this.canvas, document.body.childNodes[0]);

            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 20);

            conn = new WebSocket('ws://localhost:8080/game');


            // SOCKETS
            conn.onopen = function(e) { 
                console.log("conection stablished!");

                conn.send(JSON.stringify({
                    "action": "waiting",
                    "session": {
                        id: sessionStorage.getItem("id"),
                        username: sessionStorage.getItem("username"),
                        state: sessionStorage.getItem("state"),
                    },
                    "player2": targetUserId,
                }));
            };

            conn.onmessage = e => { 
                let msg = JSON.parse(e.data);

                console.log(msg);
    
                switch (msg["action"]) {
                    case 'ready':
                        play = true;

                        conn.send(JSON.stringify({
                            "action": "reply",
                            "session": {
                                id: sessionStorage.getItem("id"),
                                username: sessionStorage.getItem("username"),
                                state: sessionStorage.getItem("state"),
                            },
                            "player2": targetUserId,
                        }));

                        break;

                    case 'reply':
                        play = true;

                        break;

                    case 'frame':
                        player2.x = msg["player"]["x"];
                        player2.y = msg["player"]["y"];
                        player2.angle = msg["player"]["angle"];

                        break;
                    
                    default:
                        console.log("No se recibió acción");
                        break;
                }
            };


            // EVENT LISTENERS
            window.addEventListener('keydown', function (e) {
                e.preventDefault();

                gameArea.keys = (gameArea.keys || []);
                gameArea.keys[e.key] = (e.type == "keydown");
            });

            window.addEventListener('keyup', function (e) {
                gameArea.keys[e.key] = (e.type == "keydown");
            });
        }

        stop() {
            clearInterval(this.interval);
        }

        clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    

    class Ship
    {
        constructor(imagePath, width, height, x, y, type) 
        {
            this.img = new Image();
            this.img.src = imagePath;

            this.type = type;
            this.width = width;
            this.height = height;
            this.speed = 0;
            this.angle = 0;
            this.moveAngle = 0;
            this.x = x;
            this.y = y;

            this.projectiles = [];
        }

        shoot = () => {
            this.projectiles.push(new Projectile(this.x, this.y, this.angle));

            this.projectiles.forEach(projectile => {
                projectile.newPos();
                projectile.update(this.ctx);
            });
        }
 
        update(ctx) {
            this.ctx = ctx;
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(this.angle);
            this.ctx.drawImage(this.img, this.width / -2, this.height / -2, this.width, this.height);
            this.ctx.restore();
        }

        newPos() {
            this.angle += this.moveAngle * Math.PI / 180;
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);
        }
    }


    class Projectile {
        constructor(x, y, angle)
        {
            this.speed = 30;
            this.x = x;
            this.y = y;
            this.width = 2;
            this.height = 15;
            this.angle = angle;
        }

        update(ctx, shootInterval) {
            this.ctx = ctx;

            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(this.angle);
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            this.ctx.restore();

            if ((this.y >= (player2.y - player2.width / 2) && this.y <= (player2.y + player2.width / 2)) && (this.x >= (player2.x - player2.width / 2) && this.x < (player2.x + player2.width / 2))) {
                clearInterval(shootInterval);
            }
        }

        newPos() {
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);
        }
    }
    


    /**
     * JAVASCRIPT CODE FROM HERE
     * --------------------------------------------------------------------------------->
     */
    let player1;
    let gameArea;

    function startGame() {
        player1 = new Ship("../../media/images/ship1/ship1.png", 60, 60, 225, 225, "");
        player2 = new Ship("../../media/images/ship2/ship2.png", 60, 60, 425, 425, "");

        gameArea = new Canvas(canvas, windowWidth, windowHeight);
        gameArea.start();
    }

    function updateGameArea() {
        gameArea.clear();
        player1.moveAngle = 0;
        player1.speed = 0;

        // if(rightPressed && player1.posX < getPageSize()[0] - player1.size) player1.move(+speedMoving, 0);
        // else if(leftPressed && player1.posX > 0) player1.move(-speedMoving, 0);

        if (gameArea.keys && gameArea.keys["ArrowLeft"]) player1.moveAngle = -5;
        if (gameArea.keys && gameArea.keys["ArrowRight"]) player1.moveAngle = 5;

        if (gameArea.keys && gameArea.keys["ArrowUp"]) {
            if ( !(player1.x <= 0 + player1.width/2) && !(player1.x >= gameArea.width - player1.width/2) 
                && !(player1.y <= 0 + player1.width/2) && !(player1.y >= gameArea.height - player1.width/2) ) { 
                player1.speed = 10;
            }
            else player1.speed = 1;
        }

        if (gameArea.keys && gameArea.keys["ArrowDown"]) {
            player1.speed= -10; 
        }

        if (gameArea.keys && gameArea.keys[" "]) {
            player1.shoot();
        }

        player1.newPos();
        player1.update(gameArea.context);

        player2.newPos();
        player2.update(gameArea.context);


        if (play == true) {
            conn.send(JSON.stringify({
                "action": "frame",
                "session": {
                    id: sessionStorage.getItem("id"),
                    username: sessionStorage.getItem("username"),
                    state: sessionStorage.getItem("state"),
                },
                "player": {
                    "x": player1.x,
                    "y": player1.y,
                    "angle": player1.angle,
                }
            }))   
        }
    }

    startGame();



    /**
     * RESIZE CANVAS WHEN RESIZE WINDOW
     */
    window.addEventListener("resize", () => {
        gameArea.width = document.body.clientWidth;
        gameArea.height = document.body.clientHeight;
    });
}