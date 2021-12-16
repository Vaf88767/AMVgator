const five = require("johnny-five")
const board = new five.Board()
const axios = require("axios")
const sdactivy = require("sdactivity")
const sd = new sdactivy({
  path: "/AMCv"
})
const fs = require("fs")
board.on("ready", () => {
    const led = new five.Led(12)
    const lcd = new five.LCD({
        controller: "PCF8574"
    })
    const joystick = new five.Joystick({
        pins: [A0, A1]
    })
    let talkof = 0
    let p = ""
    const keypad = new five.Keypad({
        controller: "4X4_I2C_NANO_BACKPACK",
        key: ["1","2","3","A",
              "4","5","6","B",
              "7","8","9","C",
              "E","F","G","D",
            ]
    })
    
    lcd.on()
    led.on()
    lcd.blink()
    lcd.print("iniciando...")
    sd.on("mount", function() {
      setTimeout(() => {
        
        lcd.noBlink()
        lcd.clear()
        lcd.cursor(124,64)
        lcd.useChar("fbox")
        lcd.useChar("arrownw")
        lcd.print(":arrownw:")
        joystick.on("data", () => {
            lcd.clear()
          lcd.cursor(this.x,this.y)
          lcd.print(":arrownw:")
                    if(this.x == 124 && this.y == 64){

             
              lcd.cursor(100,64)
              lcd.print(`
                 _____________
                |             |
                |AMVgator § 1 |
                |AMCnal   § 2 |
                |PIPES    $ 3 |
                |             |
                |_____________|
                 
              `)
              ["change", "press", "hold", "release"].forEach(eventtype => {
                keypad.on(eventtype, (data) => {
                          if(data.which == "1") {talkof = 1}
                          if(data.which == "2") {talkof = 2}
                          if(data.which == "3") {talkof = 3}
                          

                           if(talkof == 3) {
                             lcd.print(`
                             
                             `)
                           }
                           if(talkof == 2) {
                            p = ""
                            p = p + data.which
                            lcd.clear()
                            lcd.cursor(50,32)
                            lcd.print(`
                             _________________________
                            |${p}                     |
                            |                         |
                            |                         |
                            |                         |
                            |                         |
                            |_________________________|

                            `)
                            if(p == "shutdown"){
                              lcd.clear()
                              lcd.off()
                            }

                            if(p == "help"){
                              lcd.print("Comandos: help - mostra isso, shutdown -  desliga o AMC, reset - reseta o AMC para as configurações de fabrica")
                            }

                            if(p == "reset"){
                              insiracomandodedeletarinformaçãodousuarioouresetarsla
                            }
                            if(p.startsWith("nav")){
                              let a = p.split(" ")
                              lcd.print(a[2])
                              
                            }
                            
                          }
                          if(p == "version"){
                            lcd.print("v1")
                            
                          }
                          if(p == "clear"){
                            p = ""
                          }
                          if(p == "time"){
                            lcd.print(`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`)
                          }
                          if(p.startsWith("remove")){
                            let a = p.split(" ")
                            fs.unlink(a[1], (err) => {
                              if(err) { console.log("não encontrado")}
                              else{
                                console.log("Arquivo excluido")
                              } 
                            })
                          }
                          if(p.startsWith("create")){
                            let a = p.split(" ")
                           fs.writeFile(a[1], "", (err) => {
                             if(err) throw err
                          
                             lcd.print("arquivo criado")
                           })
                          }
                          if(p == "calc"){
                            let a = p.split("")

                          }
                          






                          if(talkof == 1) {
                            p = ""
                            lcd.clear()
                            lcd.cursor(62,32)
                            lcd.bgColor("yellow")
                            p = p + data.which
                            lcd.print(`
                             ________________________________________
                            |(X)                                     | 
                            |Digite a pesquisa                       |
                            |   A:para pesquisa no AMVGATOR          |
                            |   Em breve: Google                     |
                            |[${data.which}]|                        | 
                            |    (pesquisar)                         |
                            |________________________________________|
                            `)
                          if(this.x == 34) {
                            talkof = false
                          }
                          if(this.x == 40 ){

axios.post("http://localhost:8080/fetchforAMVGATOR", {pesquisa:p}).then((res) => {
       console.log(res.data)                           
}).catch((err) => {
  console.log(err)
})
                          }
                          }
                              
                          
                })
            });
                  
          }
        })







    }, 1000);




    });
    
})