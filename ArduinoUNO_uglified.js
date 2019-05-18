! function (n) {
    for (var o = 244, t = 208, a = 192, l = 144, d = 240, u = 247, s = 121, p = 249, h = 224, r = 105, i = 106, m = 107, c = 108, v = 128, g = !1, A = 0, w = 0, D = 0, b = 0, B = new Uint8Array(4096), f = new Uint8Array(16), C = new Uint8Array(16), k = new Uint16Array(16), E = new Uint8Array(v), I = [], e = 0; e < 13; e++) I[e] = [];
    var L = !1,
        S = !1,
        R = null,
        W = !1,
        y = 0,
        z = null,
        O = new function () {
            this.devices = [], this.add = function (n, e) {
                var t = this.search(n);
                t ? (t.pin = e, t.val = 0) : (t = {
                    name: n,
                    pin: e,
                    val: 0
                }, this.devices.push(t))
            }, this.search = function (n) {
                for (var e = 0; e < this.devices.length; e++)
                    if (this.devices[e].name === n) return this.devices[e];
                return null
            }
        };

    function H() {
        for (var n = 0; n < 16; n++) {
            var e = new Uint8Array([t | n, 1]);
            R.send(e.buffer)
        }! function () {
            console.log("Querying " + R.id + " capabilities");
            var n = new Uint8Array([d, m, u]);
            R.send(n.buffer)
        }(), z = setInterval(function () {
            if (W) {
                if (6 < ++y) return clearInterval(z), z = null, L = !1, R && R.close(), void(R = null)
            } else {
                if (!R) return clearInterval(z), void(z = null);
                j(), W = !0
            }
        }, 100)
    }
    
    function P(n, e) {
        return -1 < I[e].indexOf(n)
    }

    function j() {
        var n = new Uint8Array([d, s, u]);
        R.send(n.buffer)
    }

    function T() {
        switch (B[0]) {
        case c:
            for (var n = 1, e = 0; e < v; e++) {
                for (; 127 != B[n++];) I[B[n - 1]].push(e), n++;
                if (n == b) break
            }! function () {
                console.log("Querying " + R.id + " analog mapping");
                var n = new Uint8Array([d, r, u]);
                R.send(n.buffer)
            }();
            break;
        case i:
            for (e = 0; e < E.length; e++) E[e] = 127;
            for (n = 1; n < b; n++) E[n - 1] = B[n];
            for (e = 0; e < E.length; e++)
                if (127 != E[e]) {
                    var t = new Uint8Array([a | E[e], 1]);
                    R.send(t.buffer)
                }
            S = !0, setTimeout(function () {
                S = !1
            }, 100);
            break;
        case s:
            L || (clearInterval(F), F = null, clearTimeout(G), L = !(G = null), setTimeout(H, 200)), W = !1, y = 0
        }
    }
    function M(n) {
        for (var e = 0; e < n.length; e++)
            if (g) n[e] == u ? (g = !1, T()) : B[b++] = n[e];
            else if (0 < A && n[e] < 128) {
            if (B[--A] = n[e], 0 !== w && 0 === A) switch (w) {
            case l:
                r = D, i = (B[0] << 7) + B[1], C[r] = i;
                break;
            case h:
                a = D, s = (B[0] << 7) + B[1], k[a] = s;
                break;
            case p:
                t = B[1], o = B[0], t, o
            }
        } else switch (n[e] < 240 ? (command = 240 & n[e], D = 15 & n[e]) : command = n[e], command) {
        case l:
        case h:
        case p:
            A = 2, w = command;
            break;
        case d:
            g = !0, b = 0
        }
        var t, o, a, s, r, i
    }

    function V(n, e) {
        var t = new Uint8Array([o, n, e]);
        R.send(t.buffer)
    }

    function U(n) {
        if (0 <= n && n < I[2].length) return Math.round(100 * k[n] / 1023);
        for (var e = [], t = 0; t < I[2].length; t++) e.push(t);
        console.log("ERROR: valid analog pins are " + e.join(", "))
    }

    function q(n) {
        if (P(n, 0)) return V(n, 0), C[n >> 3] >> (7 & n) & 1;
        console.log("ERROR: valid input pins are " + I[0].join(", "))
    }

    function Q(n, e) {
        if (P(n, 3)) {
            e < 0 ? e = 0 : 100 < e && (e = 100), e = Math.round(e / 100 * 255), V(n, 3);
            var t = new Uint8Array([h | 15 & n, 127 & e, e >> 7]);
            R.send(t.buffer)
        } else console.log("ERROR: valid PWM pins are " + I[3].join(", "))
    }

    function _(n, e) {
        if (P(n, 1)) {
            var t = n >> 3 & 15;
            0 == e ? f[t] &= ~(1 << (7 & n)) : f[t] |= 1 << (7 & n), V(n, 1);
            var o = new Uint8Array([l | t, 127 & f[t], f[t] >> 7]);
            R.send(o.buffer)
        } else console.log("ERROR: valid output pins are " + I[1].join(", "))
    }

    function N(n, e) {
        if (P(n, 4)) {
            V(n, 4);
            var t = new Uint8Array([h | 15 & n, 127 & e, e >> 7]);
            R.send(t.buffer)
        } else console.log("ERROR: valid servo pins are " + I[4].join(", "))
    }
    n.whenConnected = function () {
        return !!S
    }, n.analogWrite = function (n, e) {
        Q(n, e)
    }, n.digitalWrite = function (n, e) {
        e == X[J].outputs[0] ? _(n, 1) : e == X[J].outputs[1] && _(n, 0)
    }, n.analogRead = function (n) {
        return U(n)
    }, n.digitalRead = function (n) {
        return q(n)
    }, n.whenAnalogRead = function (n, e, t) {
        if (0 <= n && n < I[2].length) return ">" == e ? U(n) > t : "<" == e ? U(n) < t : "=" == e && U(n) == t
    }, n.whenDigitalRead = function (n, e) {
        if (P(n, 0)) {
            if (e == X[J].outputs[0]) return q(n);
            if (e == X[J].outputs[1]) return !1 === q(n)
        }
    }, n.connectHW = function (n, e) {
        O.add(n, e)
    }, n.rotateServo = function (n, e) {
        var t = O.search(n);
        t && (e < 0 ? e = 0 : 180 < e && (e = 180), N(t.pin, e), t.val = e)
    }, n.changeServo = function (n, e) {
        var t = O.search(n);
        if (t) {
            var o = t.val + e;
            o < 0 ? o = 0 : 180 < o && (o = 180), N(t.pin, o), t.val = o
        }
    }, n.setLED = function (n, e) {
        var t = O.search(n);
        t && (Q(t.pin, e), t.val = e)
    }, n.changeLED = function (n, e) {
        var t = O.search(n);
        if (t) {
            var o = t.val + e;
            o < 0 ? o = 0 : 100 < o && (o = 100), Q(t.pin, o), t.val = o
        }
    }, n.digitalLED = function (n, e) {
        var t = O.search(n);
        t && ("on" == e ? (_(t.pin, 1), t.val = 255) : "off" == e && (_(t.pin, 0), t.val = 0))
    }, n.readInput = function (n) {
        var e = O.search(n);
        if (e) return U(e.pin)
    }, n.whenButton = function (n, e) {
        var t = O.search(n);
        if (t) return "pressed" === e ? q(t.pin) : "released" === e ? !q(t.pin) : void 0
    }, n.isButtonPressed = function (n) {
        var e = O.search(n);
        if (e) return q(e.pin)
    }, n.whenInput = function (n, e, t) {
        var o = O.search(n);
        if (o) return ">" == e ? U(o.pin) > t : "<" == e ? U(o.pin) < t : "=" == e && U(o.pin) == t
    }, n.mapValues = function (n, e, t, o, a) {
        var s = (a - o) * (n - e) / (t - e) + o;
        return Math.round(s)
    }, n._getStatus = function () {
        return L ? {
            status: 2,
            msg: "Connected"
        } : {
            status: 1,
            msg: "Disconnected"
        }
    }, n._deviceRemoved = function (n) {
        console.log("Device removed")
    };
    var x = [];
    n._deviceConnected = function (n) {
        x.push(n), R || function n() {
            R = x.shift();
            if (!R) return;
            R.open({
                stopBits: 0,
                bitRate: 57600,
                ctsFlowControl: 0
            });
            console.log("Attempting connection with " + R.id);
            R.set_receive_handler(function (n) {
                var e = new Uint8Array(n);
                M(e)
            });
            F = setInterval(function () {
                j()
            }, 1e3);
            G = setTimeout(function () {
                clearInterval(F), F = null, R.set_receive_handler(null), R.close(), R = null, n()
            }, 5e3)
        }()
    };
    var F = null,
        G = null;
    n._shutdown = function () {
        R && R.close(), F && clearInterval(F), R = null
    };
    var $ = window.location.search.replace(/^\?|\/$/g, "").split("&"),
        J = "en";
    for (e = 0; e < $.length; e++) {
        var K = $[e].split("=");
        1 < K.length && "lang" == K[0] && (J = K[1])
    }
    var X = {
            en: {
                buttons: ["button A", "button B", "button C", "button D"],
                btnStates: ["pressed", "released"],
                hwIn: ["rotation knob", "light sensor", "temperature sensor"],
                hwOut: ["led A", "led B", "led C", "led D", "button A", "button B", "button C", "button D", "servo A", "servo B", "servo C", "servo D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["on", "off"],
                ops: [">", "=", "<"],
                servos: ["servo A", "servo B", "servo C", "servo D"]
            },
            de: {
                buttons: ["Taste A", "Taste B", "Taste C", "Taste D"],
                btnStates: ["gedrückt", "losgelassen"],
                hwIn: ["Drehknopf", "Lichtsensor", "Temperatursensor"],
                hwOut: ["LED A", "LED B", "LED C", "LED D", "Taste A", "Taste B", "Taste C", "Taste D", "Servo A", "Servo B", "Servo C", "Servo D"],
                leds: ["LED A", "LED B", "LED C", "LED D"],
                outputs: ["Ein", "Aus"],
                ops: [">", "=", "<"],
                servos: ["Servo A", "Servo B", "Servo C", "Servo D"]
            },
            fr: {
                buttons: ["Bouton A", "Bouton B", "Bouton C", "Bouton D"],
                btnStates: ["Appuyé", "Relâché"],
                hwIn: ["Potentiomètre", "Capteur de Lumière", "Capteur de Temperature"],
                hwOut: ["LED A", "LED B", "LED C", "LED D", "Bouton A", "Bouton B", "Bouton C", "Bouton D", "Servo Moteur A", "Servo Moteur B", "Servo Moteur C", "Servo Moteur D"],
                leds: ["LED A", "LED B", "LED C", "LED D"],
                outputs: ["ON", "OFF"],
                ops: [">", "=", "<"],
                servos: ["Servo Moteur A", "Servo Moteur B", "Servo Moteur C", "Servo Moteur D"]
            },
            it: {
                buttons: ["pulsante A", "pulsante B", "pulsante C", "pulsante D"],
                btnStates: ["premuto", "rilasciato"],
                hwIn: ["potenziometro", "sensore di luce", "sensore di temperatura"],
                hwOut: ["led A", "led B", "led C", "led D", "pulsante A", "pulsante B", "pulsante C", "pulsante D", "servo A", "servo B", "servo C", "servo D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["acceso", "spento"],
                ops: [">", "=", "<"],
                servos: ["servo A", "servo B", "servo C", "servo D"]
            },
            ja: {
                buttons: ["ボタン A", "ボタン B", "ボタン C", "ボタン D"],
                btnStates: ["押された", "放された"],
                hwIn: ["回転つまみ", "光センサー", "温度センサー"],
                hwOut: ["led A", "led B", "led C", "led D", "ボタン A", "ボタン B", "ボタン C", "ボタン D", "サーボ A", "サーボ B", "サーボ C", "サーボ D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["オン", "オフ"],
                ops: [">", "=", "<"],
                servos: ["サーボ A", "サーボ B", "サーボ C", "サーボ D"]
            },
            ko: {
                buttons: ["버튼 A", "버튼 B", "버튼 C", "버튼 D"],
                btnStates: ["눌림", "떼짐"],
                hwIn: ["회전 손잡이", "조도 센서", "온도 센서"],
                hwOut: ["led A", "led B", "led C", "led D", "버튼 A", "버튼 B", "버튼 C", "버튼 D", "서보모터 A", "서보모터 B", "서보모터 C", "서보모터 D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["켜기", "끄기"],
                ops: [">", "=", "<"],
                servos: ["서보모터 A", "서보모터 B", "서보모터 C", "서보모터 D"]
            },
            nb: {
                buttons: ["knapp A", "knapp B", "knapp C", "knapp D"],
                btnStates: ["trykkes", "slippes"],
                hwIn: ["dreieknapp", "lyssensor", "temperatursensor"],
                hwOut: ["LED A", "LED B", "LED C", "LED D", "knapp A", "knapp B", "knapp C", "knapp D", "servo A", "servo B", "servo C", "servo D"],
                leds: ["LED A", "LED B", "LED C", "LED D"],
                outputs: ["på", "av"],
                ops: [">", "=", "<"],
                servos: ["servo A", "servo B", "servo C", "servo D"]
            },
            nl: {
                buttons: ["knop A", "knop B", "knop C", "knop D"],
                btnStates: ["ingedrukt", "losgelaten"],
                hwIn: ["draaiknop", "licht sensor", "temperatuur sensor"],
                hwOut: ["led A", "led B", "led C", "led D", "knop A", "knop B", "knop C", "knop D", "servo A", "servo B", "servo C", "servo D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["aan", "uit"],
                ops: [">", "=", "<"],
                servos: ["servo A", "servo B", "servo C", "servo D"]
            },
            pl: {
                buttons: ["przycisk A", "przycisk B", "przycisk C", "przycisk D"],
                btnStates: ["wciśnięty", "zwolniony"],
                hwIn: ["pokrętło", "czujnik światła", "czujnik temperatury"],
                hwOut: ["led A", "led B", "led C", "led D", "przycisk A", "przycisk B", "przycisk C", "przycisk D", "serwo A", "serwo B", "serwo C", "serwo D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["włączony", "wyłączony"],
                ops: [">", "=", "<"],
                servos: ["serwo A", "serwo B", "serwo C", "serwo D"]
            },
            pt: {
                buttons: ["botao A", "botao B", "botao C", "botao D"],
                btnStates: ["pressionado", "solto"],
                hwIn: ["potenciometro", "sensor de luz", "sensor de temperatura"],
                hwOut: ["led A", "led B", "led C", "led D", "botao A", "botao B", "botao C", "botao D", "servo A", "servo B", "servo C", "servo D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["ligado", "desligado"],
                ops: [">", "=", "<"],
                servos: ["servo A", "servo B", "servo C", "servo D"]
            },
            ru: {
                buttons: ["кнопка A", "кнопка B", "кнопка C", "кнопка D"],
                btnStates: ["нажата", "отпущена"],
                hwIn: ["потенциометр", "датчик света", "датчик температуры"],
                hwOut: ["светодиод A", "светодиод B", "светодиод C", "светодиод D", "кнопка A", "кнопка B", "кнопка C", "кнопка D", "серво A", "серво B", "серво C", "серво D"],
                leds: ["светодиод A", "светодиод B", "светодиод C", "светодиод D"],
                outputs: ["включен", "выключен"],
                ops: [">", "=", "<"],
                servos: ["серво A", "серво B", "серво C", "серво D"]
            },
            el: {
                buttons: ["κουμπί A", "κουμπί B", "κουμπί C", "κουμπί D"],
                btnStates: ["πατημένο", "ελεύθερο"],
                hwIn: ["ποντεσιόμετρο", "φωτοαισθητήρα", "θερμοαισθητήρα"],
                hwOut: ["led A", "led B", "led C", "led D", "κουμπί A", "κουμπί B", "κουμπί C", "κουμπί D", "servo A", "servo B", "servo C", "servo D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["ενεργοποιημένο", "απενεργοποιημένο"],
                ops: [">", "=", "<"],
                servos: ["servo A", "servo B", "servo C", "servo D"]
            },
            es: {
                buttons: ["botón A", "botón B", "botón C", "botón D"],
                btnStates: ["pulsado", "liberado"],
                hwIn: ["potenciómetro", "sensor de luz", "sensor de temperatura"],
                hwOut: ["led A", "led B", "led C", "led D", "botón A", "botón B", "botón C", "botón D", "servo A", "servo B", "servo C", "servo D"],
                leds: ["led A", "led B", "led C", "led D"],
                outputs: ["on", "off"],
                ops: [">", "=", "<"],
                servos: ["servo A", "servo B", "servo C", "servo D"]
            },
            zh: {
                buttons: ["按鈕 A", "按鈕 B", "按鈕 C", "按鈕 D"],
                btnStates: ["按下", "放開"],
                hwIn: ["旋鈕", "光感應器", "溫度感應器"],
                hwOut: ["發光二極體 A", "發光二極體 B", "發光二極體 C", "發光二極體 D", "按鈕 A", "按鈕 B", "按鈕 C", "按鈕 D", "伺服馬達 A", "伺服馬達 B", "伺服馬達 C", "伺服馬達 D"],
                leds: ["發光二極體 A", "發光二極體 B", "發光二極體 C", "發光二極體 D"],
                outputs: ["開", "關"],
                ops: [">", "=", "<"],
                servos: ["伺服馬達 A", "伺服馬達 B", "伺服馬達 C", "伺服馬達 D"]
            }
        },
        Y = {
            blocks: {
                en: [
                    ["h", "when device is connected", "whenConnected"],
                    [" ", "connect %m.hwOut to pin %n", "connectHW", "led A", 3],
                    [" ", "connect %m.hwIn to analog %n", "connectHW", "rotation knob", 0],
                    ["-"],
                    [" ", "set %m.leds %m.outputs", "digitalLED", "led A", "on"],
                    [" ", "set %m.leds brightness to %n%", "setLED", "led A", 100],
                    [" ", "change %m.leds brightness by %n%", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "rotate %m.servos to %n degrees", "rotateServo", "servo A", 180],
                    [" ", "rotate %m.servos by %n degrees", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "when %m.buttons is %m.btnStates", "whenButton", "button A", "pressed"],
                    ["b", "%m.buttons pressed?", "isButtonPressed", "button A"],
                    ["-"],
                    ["h", "when %m.hwIn %m.ops %n%", "whenInput", "rotation knob", ">", 50],
                    ["r", "read %m.hwIn", "readInput", "rotation knob"],
                    ["-"],
                    [" ", "set pin %n %m.outputs", "digitalWrite", 1, "on"],
                    [" ", "set pin %n to %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "when pin %n is %m.outputs", "whenDigitalRead", 1, "on"],
                    ["b", "pin %n on?", "digitalRead", 1],
                    ["-"],
                    ["h", "when analog %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "read analog %n", "analogRead", 0],
                    ["-"],
                    ["r", "map %n from %n %n to %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                de: [
                    ["h", "Wenn Arduino verbunden ist", "whenConnected"],
                    [" ", "Verbinde %m.hwOut mit Pin %n", "connectHW", "LED A", 3],
                    [" ", "Verbinde %m.hwIn mit Analog %n", "connectHW", "Drehknopf", 0],
                    ["-"],
                    [" ", "Schalte %m.leds %m.outputs", "digitalLED", "LED A", "Ein"],
                    [" ", "Setze %m.leds Helligkeit auf %n%", "setLED", "LED A", 100],
                    [" ", "Ändere %m.leds Helligkeit um %n%", "changeLED", "LED A", 20],
                    ["-"],
                    [" ", "Drehe %m.servos auf %n Grad", "rotateServo", "Servo A", 180],
                    [" ", "Drehe %m.servos um %n Grad", "changeServo", "Servo A", 20],
                    ["-"],
                    ["h", "Wenn %m.buttons ist %m.btnStates", "whenButton", "Taste A", "gedrückt"],
                    ["b", "%m.buttons gedrückt?", "isButtonPressed", "Taste A"],
                    ["-"],
                    ["h", "Wenn %m.hwIn %m.ops %n%", "whenInput", "Drehknopf", ">", 50],
                    ["r", "Wert von %m.hwIn", "readInput", "Drehknopf"],
                    ["-"],
                    [" ", "Schalte Pin %n %m.outputs", "digitalWrite", 1, "Ein"],
                    [" ", "Setze Pin %n auf %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "Wenn Pin %n ist %m.outputs", "whenDigitalRead", 1, "Ein"],
                    ["b", "Pin %n ein?", "digitalRead", 1],
                    ["-"],
                    ["h", "Wenn Analog %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "Wert von Analog %n", "analogRead", 0],
                    ["-"],
                    ["r", "Setze %n von %n %n auf %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                fr: [
                    ["h", "Quand l'appareil est connecté", "whenConnected"],
                    [" ", "Connecté %m.hwOut au pin %n", "connectHW", "LED A", 3],
                    [" ", "Connecté %m.hwIn au pin analogue %n", "connectHW", "Potentiomètre", 0],
                    ["-"],
                    [" ", "Régler %m.leds LED %m.output Sortie", "digitalLED", "LED A", "ON"],
                    [" ", "Régler %m.leds Luminosité de la LED à %n%", "setLED", "LED A", 100],
                    [" ", "Changer %m.leds Luminosité de la LED de %n%", "changeLED", "LED A", 20],
                    ["-"],
                    [" ", "Tourner %m.servos Servo Moteur à %n degrés", "rotateServo", "Servo Moteur A", 180],
                    [" ", "Tourner %m.servos Servo Moteur de %n degrés", "changeServo", "Servo Moteur A", 20],
                    ["-"],
                    ["h", "Quand %m.buttons Bouton est %m.btnStates", "whenButton", "Bouton A", "Appuyé"],
                    ["b", "Le %m.buttons est-il pressé?", "isButtonPressed", "Bouton A"],
                    ["-"],
                    ["h", "Quand %m.hwIn %m.ops %n%", "whenInput", "Potentiomètre", ">", 50],
                    ["r", "Lire %m.hwIn", "readInput", "Potentiomètre"],
                    ["-"],
                    [" ", "Régler le Pin %n %m.outputs Sortie", "digitalWrite", 1, "ON"],
                    [" ", "Régler le Pin %n à %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "Quand le Pin %n est %m.outputs Sortie", "whenDigitalRead", 1, "ON"],
                    ["b", "Le Pin %n est-il démarré?", "digitalRead", 1],
                    ["-"],
                    ["h", "Quand le Pin analogique est %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "Lire le Pin Analogique %n", "analogRead", 0],
                    ["-"],
                    ["r", "Mapper %n de %n %n à %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                it: [
                    ["h", "quando Arduino è connesso", "whenConnected"],
                    [" ", "connetti il %m.hwOut al pin %n", "connectHW", "led A", 3],
                    [" ", "connetti il %m.hwIn ad analog %n", "connectHW", "potenziometro", 0],
                    ["-"],
                    [" ", "imposta %m.leds a %m.outputs", "digitalLED", "led A", "acceso"],
                    [" ", "porta luminosità di %m.leds a %n%", "setLED", "led A", 100],
                    [" ", "cambia luminosità di %m.leds a %n%", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "ruota %m.servos fino a %n gradi", "rotateServo", "servo A", 180],
                    [" ", "ruota %m.servos di %n gradi", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "quando tasto %m.buttons è %m.btnStates", "whenButton", "pulsante A", "premuto"],
                    ["b", "%m.buttons premuto?", "isButtonPressed", "pulsante A"],
                    ["-"],
                    ["h", "quando %m.hwIn %m.ops %n%", "whenInput", "potenziometro", ">", 50],
                    ["r", "leggi %m.hwIn", "readInput", "potenziometro"],
                    ["-"],
                    [" ", "imposta pin %n a %m.outputs", "digitalWrite", 1, "acceso"],
                    [" ", "porta pin %n al %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "quando pin %n è %m.outputs", "whenDigitalRead", 1, "acceso"],
                    ["b", "pin %n acceso?", "digitalRead", 1],
                    ["-"],
                    ["h", "quando analog %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "leggi analog %n", "analogRead", 0],
                    ["-"],
                    ["r", "porta %n da %n %n a %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                ja: [
                    ["h", "デバイスがつながったとき", "whenConnected"],
                    [" ", "%m.hwOut を %n ピンへつなぐ", "connectHW", "led A", 3],
                    [" ", "%m.hwIn をアナログ入力 %n ピンへつなぐ", "connectHW", "rotation knob", 0],
                    ["-"],
                    [" ", "%m.leds を %m.outputs にする", "digitalLED", "led A", "on"],
                    [" ", "%m.leds の明るさを %n% にする", "setLED", "led A", 100],
                    [" ", "%m.leds の明るさを %n% ずつ変える", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "%m.servos を %n 度へ向ける", "rotateServo", "servo A", 180],
                    [" ", "%m.servos を %n 度ずつ回す", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "%m.buttons が %m.btnStates とき", "whenButton", "ボタン A", "押された"],
                    ["b", "%m.buttons 押された", "isButtonPressed", "ボタン A"],
                    ["-"],
                    ["h", "%m.hwIn が %m.ops %n% になったとき", "whenInput", "回転つまみ", ">", 50],
                    ["r", "%m.hwIn の値", "readInput", "回転つまみ"],
                    ["-"],
                    [" ", "デジタル出力 %n を %m.outputs にする", "digitalWrite", 1, "on"],
                    [" ", "アナログ出力 %n を %n% にする", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "デジタル入力 %n が %m.outputs になったとき", "whenDigitalRead", 1, "on"],
                    ["b", "デジタル入力 %n はオン", "digitalRead", 1],
                    ["-"],
                    ["h", "アナログ入力 %n が %m.ops %n% になったとき", "whenAnalogRead", 1, ">", 50],
                    ["r", "アナログ入力 %n の値", "analogRead", 0],
                    ["-"],
                    ["r", "%n を %n ... %n から %n ... %n へ変換", "mapValues", 50, 0, 100, -240, 240]
                ],
                ko: [
                    ["h", "아두이노가 연결됐을 때", "whenConnected"],
                    [" ", "%m.hwOut 를 %n 번 핀에 연결하기", "connectHW", "led A", 3],
                    [" ", "%m.hwIn 를 아날로그 %n 번 핀에 연결하기", "connectHW", "회전 손잡이", 0],
                    ["-"],
                    [" ", "%m.leds 를 %m.outputs", "digitalLED", "led A", "켜기"],
                    [" ", "%m.leds 의 밝기를 %n% 로 설정하기", "setLED", "led A", 100],
                    [" ", "%m.leds 의 밝기를 %n% 만큼 바꾸기", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "%m.servos 를 %n 도로 회전하기", "rotateServo", "서보모터 A", 180],
                    [" ", "%m.servos 를 %n 도 만큼 회전하기", "changeServo", "서보모터 A", 20],
                    ["-"],
                    ["h", "%m.buttons 의 상태가 %m.btnStates 일 때", "whenButton", "버튼 A", "눌림"],
                    ["b", "%m.buttons 가 눌려져 있는가?", "isButtonPressed", "버튼 A"],
                    ["-"],
                    ["h", "%m.hwIn 의 값이 %m.ops %n% 일 때", "whenInput", "회전 손잡이", ">", 50],
                    ["r", "%m.hwIn 의 값", "readInput", "회전 손잡이"],
                    ["-"],
                    [" ", "%n 번 핀을 %m.outputs", "digitalWrite", 1, "켜기"],
                    [" ", "%n 번 핀의 값을 %n% 로 설정하기", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "%n 번 핀의 상태가 %m.outputs 일 때", "whenDigitalRead", 1, "켜기"],
                    ["b", "%n 번 핀이 켜져있는가?", "digitalRead", 1],
                    ["-"],
                    ["h", "아날로그 %n 번 핀의 값이 %m.ops %n% 일 때", "whenAnalogRead", 1, ">", 50],
                    ["r", "아날로그 %n 번 핀의 값", "analogRead", 0],
                    ["-"],
                    ["r", "%n 을(를) %n ~ %n 에서 %n ~ %n 의 범위로 바꾸기", "mapValues", 50, 0, 100, -240, 240]
                ],
                nb: [
                    ["h", "når enheten tilkobles", "whenConnected"],
                    [" ", "koble %m.hwOut til digital %n", "connectHW", "LED A", 3],
                    [" ", "koble %m.hwIn til analog %n", "connectHW", "dreieknapp", 0],
                    ["-"],
                    [" ", "sett %m.leds %m.outputs", "digitalLED", "LED A", "på"],
                    [" ", "sett %m.leds styrke til %n%", "setLED", "LED A", 100],
                    [" ", "endre %m.leds styrke med %n%", "changeLED", "LED A", 20],
                    ["-"],
                    [" ", "rotér %m.servos til %n grader", "rotateServo", "servo A", 180],
                    [" ", "rotér %m.servos med %n grader", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "når %m.buttons %m.btnStates", "whenButton", "knapp A", "trykkes"],
                    ["b", "%m.buttons trykket?", "isButtonPressed", "knapp A"],
                    ["-"],
                    ["h", "når %m.hwIn %m.ops %n%", "whenInput", "dreieknapp", ">", 50],
                    ["r", "%m.hwIn verdi", "readInput", "dreieknapp"],
                    ["-"],
                    [" ", "sett digital %n %m.outputs", "digitalWrite", 1, "på"],
                    [" ", "set utgang %n til %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "når digital %n er %m.outputs", "whenDigitalRead", 1, "på"],
                    ["b", "digital %n på?", "digitalRead", 1],
                    ["-"],
                    ["h", "når analog %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "analog %n verdi", "analogRead", 0],
                    ["-"],
                    ["r", "skalér %n fra %n %n til %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                nl: [
                    ["h", "als het apparaat verbonden is", "whenConnected"],
                    [" ", "verbind %m.hwOut met pin %n", "connectHW", "led A", 3],
                    [" ", "verbind %m.hwIn met analoog %n", "connectHW", "draaiknop", 0],
                    ["-"],
                    [" ", "schakel %m.leds %m.outputs", "digitalLED", "led A", "on"],
                    [" ", "schakel %m.leds helderheid tot %n%", "setLED", "led A", 100],
                    [" ", "verander %m.leds helderheid met %n%", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "draai %m.servos tot %n graden", "rotateServo", "servo A", 180],
                    [" ", "draai %m.servos met %n graden", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "wanneer %m.buttons is %m.btnStates", "whenButton", "knop A", "in gedrukt"],
                    ["b", "%m.buttons ingedrukt?", "isButtonPressed", "knop A"],
                    ["-"],
                    ["h", "wanneer%m.hwIn %m.ops %n%", "whenInput", "draaiknop", ">", 50],
                    ["r", "read %m.hwIn", "readInput", "draaiknop"],
                    ["-"],
                    [" ", "schakel pin %n %m.outputs", "digitalWrite", 1, "on"],
                    [" ", "schakel pin %n tot %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "wanneer pin %n is %m.outputs", "whenDigitalRead", 1, "on"],
                    ["b", "pin %n aan?", "digitalRead", 1],
                    ["-"],
                    ["h", "wanneer analoge %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "lees analoge %n", "analogRead", 0],
                    ["-"],
                    ["r", "zet %n van %n %n tot %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                pl: [
                    ["h", "kiedy urządzenie jest podłączone", "whenConnected"],
                    [" ", "podłącz %m.hwOut do pinu %n", "connectHW", "led A", 3],
                    [" ", "podłącz %m.hwIn do we analogowego %n", "connectHW", "pokrętło", 0],
                    ["-"],
                    [" ", "ustaw %m.leds na %m.outputs", "digitalLED", "led A", "włączony"],
                    [" ", "ustaw jasność %m.leds na %n%", "setLED", "led A", 100],
                    [" ", "zmień jasność %m.leds o %n%", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "obróć %m.servos w położenie %n degrees", "rotateServo", "serwo A", 180],
                    [" ", "obróć %m.servos o %n degrees", "changeServo", "serwo A", 20],
                    ["-"],
                    ["h", "kiedy %m.buttons jest %m.btnStates", "whenButton", "przycisk A", "wciśnięty"],
                    ["b", "czy %m.buttons jest wciśnięty?", "isButtonPressed", "przycisk A"],
                    ["-"],
                    ["h", "kiedy %m.hwIn jest w położeniu %m.ops %n%", "whenInput", "pokrętło", ">", 50],
                    ["r", "odczytaj ustawienie %m.hwIn", "readInput", "pokrętła"],
                    ["-"],
                    [" ", "ustaw pin %n jako %m.outputs", "digitalWrite", 1, "włączony"],
                    [" ", "ustaw pin %n na %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "kiedy pin %n jest %m.outputs", "whenDigitalRead", 1, "włączony"],
                    ["b", "czy pin %n jest włączony?", "digitalRead", 1],
                    ["-"],
                    ["h", "kiedy we analogowe %n jest w położeniu %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "odczytaj we analogowe %n", "analogRead", 0],
                    ["-"],
                    ["r", "przekształć wartość %n z zakresu %n %n na %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                pt: [
                    ["h", "Quando dispositivo estiver conectado", "whenConnected"],
                    [" ", "conectar%m.hwOut para pino %n", "connectHW", "led A", 3],
                    [" ", "conectar %m.hwIn para analogico %n", "connectHW", "potenciometro", 0],
                    ["-"],
                    [" ", "estado %m.leds %m.outputs", "digitalLED", "led A", "ligado"],
                    [" ", "estado %m.leds brilho to %n%", "setLED", "led A", 100],
                    [" ", "mudar %m.leds brilho em %n%", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "girar %m.servos para %n graus", "rotateServo", "servo A", 180],
                    [" ", "girar %m.servos em %n graus", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "quando %m.buttons is %m.btnStates", "whenButton", "botao A", "pressionado"],
                    ["b", "%m.buttons pressionado?", "isButtonPressed", "botao A"],
                    ["-"],
                    ["h", "quando %m.hwIn %m.ops %n%", "whenInput", "potenciometro", ">", 50],
                    ["r", "read %m.hwIn", "readInput", "potenciometro"],
                    ["-"],
                    [" ", "estado digital pino %n %m.outputs", "digitalWrite", 1, "ligado"],
                    [" ", "estado analogico pino %n to %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "quando pino %n is %m.outputs", "whenDigitalRead", 1, "ligado"],
                    ["b", "pino %n ligado?", "digitalRead", 1],
                    ["-"],
                    ["h", "quando valor analogico %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "ler valor analogico %n", "analogRead", 0],
                    ["-"],
                    ["r", "mapear %n from %n %n to %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                ru: [
                    ["h", "когда устройство подключено", "whenConnected"],
                    [" ", "подключить %m.hwOut к выводу %n", "connectHW", "светодиод A", 3],
                    [" ", "подключить %m.hwIn к ан. входу %n", "connectHW", "потенциометр", 0],
                    ["-"],
                    [" ", "установить %m.leds в %m.outputs", "digitalLED", "светодиод A", "включен"],
                    [" ", "установить яркость %m.leds в %n%", "setLED", "светодиод A", 100],
                    [" ", "изменить яркость %m.leds на %n%", "changeLED", "светодиод A", 20],
                    ["-"],
                    [" ", "установить %m.servos в позицию %n °", "rotateServo", "серво A", 180],
                    [" ", "повернуть %m.servos на %n °", "changeServo", "серво A", 20],
                    ["-"],
                    ["h", "когда %m.buttons %m.btnStates", "whenButton", "кнопка A", "нажата"],
                    ["b", "%m.buttons нажата?", "isButtonPressed", "кнопка A"],
                    ["-"],
                    ["h", "когда %m.hwIn %m.ops %n%", "whenInput", "потенциометр", ">", 50],
                    ["r", "значение %m.hwIn", "readInput", "потенциометр"],
                    ["-"],
                    [" ", "установить выход %n в %m.outputs", "digitalWrite", 1, "включен"],
                    [" ", "установить ан. выход %n в %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "когда вход %n %m.outputs", "whenDigitalRead", 1, "включен"],
                    ["b", "вход %n вкл?", "digitalRead", 1],
                    ["-"],
                    ["h", "когда ан. вход %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "значение ан. входа %n", "analogRead", 0],
                    ["-"],
                    ["r", "отобразить %n из %n %n в %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                el: [
                    ["h", "Όταν η συσκευή είναι συνδεδεμένη", "whenConnected"],
                    [" ", "σύνδεσε το %m.hwOut στο pin %n", "connectHW", "led A", 3],
                    [" ", "σύνδεσε το %m.hwIn στο αναλογικό %n", "connectHW", "ποντεσιόμετρο", 0],
                    ["-"],
                    [" ", "άλλαξε το %m.leds σε %m.outputs", "digitalLED", "led A", "ενεργοποιημένο"],
                    [" ", "όρισε στο %m.leds τη φωτεινότητα ίση με %n%", "setLED", "led A", 100],
                    [" ", "άλλαξε στο %m.leds τη φωτεινότητα κατά %n%", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "στρίψε το %m.servos στις %n μοίρες", "rotateServo", "servo A", 180],
                    [" ", "στρίψε το %m.servos κατά %n μοίρες", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "Όταν το %m.buttons είναι %m.btnStates", "whenButton", "κουμπί A", "πατημένο"],
                    ["b", "το %m.buttons πατήθηκε;", "isButtonPressed", "κουμπί A"],
                    ["-"],
                    ["h", "Όταν το %m.hwIn %m.ops %n%", "whenInput", "ποντεσιόμετρο", ">", 50],
                    ["r", "διάβασε %m.hwIn", "readInput", "ποντεσιόμετρο"],
                    ["-"],
                    [" ", "άλλαξε το pin %n σε %m.outputs", "digitalWrite", 1, "ενεργοποιημένο"],
                    [" ", "όρισε το pin %n σε %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "Όταν το pin %n είναι %m.outputs", "whenDigitalRead", 1, "ενεργοποιημένο"],
                    ["b", "το pin %n είναι ενεργοποιημένο;", "digitalRead", 1],
                    ["-"],
                    ["h", "Όταν το αναλογικό %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "διάβασε το αναλογικό %n", "analogRead", 0],
                    ["-"],
                    ["r", "συσχέτισε %n από %n %n έως %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                es: [
                    ["h", "al conectar el dispositivo", "whenConnected"],
                    [" ", "conectar %m.hwOut al pin %n", "connectHW", "led A", 3],
                    [" ", "conectar %m.hwIn al pin analógico %n", "connectHW", "potenciómetro", 0],
                    ["-"],
                    [" ", "fijar estado de %m.leds a %m.outputs", "digitalLED", "led A", "on"],
                    [" ", "fijar brillo de %m.leds a %n%", "setLED", "led A", 100],
                    [" ", "cambiar brillo de %m.leds por %n%", "changeLED", "led A", 20],
                    ["-"],
                    [" ", "apuntar %m.servos en dirección %n grados", "rotateServo", "servo A", 180],
                    [" ", "girar %m.servos %n grados", "changeServo", "servo A", 20],
                    ["-"],
                    ["h", "cuando el %m.buttons esté %m.btnStates", "whenButton", "botón A", "presionado"],
                    ["b", "¿%m.buttons presionado?", "isButtonPressed", "botón A"],
                    ["-"],
                    ["h", "cuando %m.hwIn %m.ops %n%", "whenInput", "potenciómetro", ">", 50],
                    ["r", "leer %m.hwIn", "readInput", "potenciómetro"],
                    ["-"],
                    [" ", "fijar estado de pin %n a %m.outputs", "digitalWrite", 1, "on"],
                    [" ", "fijar pin analógico %n al %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "cuando el pin %n esté %m.outputs", "whenDigitalRead", 1, "on"],
                    ["b", "¿pin %n on?", "digitalRead", 1],
                    ["-"],
                    ["h", "cuando pin analógico %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "leer analógico %n", "analogRead", 0],
                    ["-"],
                    ["r", "convertir %n de %n %n a %n %n", "mapValues", 50, 0, 100, -240, 240]
                ],
                zh: [
                    ["h", "當裝置連接時", "whenConnected"],
                    [" ", "連接 %m.hwOut 到腳位 %n", "connectHW", "發光二極體 A", 3],
                    [" ", "連接 %m.hwIn 到類比 %n", "connectHW", "旋鈕", 0],
                    ["-"],
                    [" ", "設定 %m.leds %m.outputs", "digitalLED", "發光二極體 A", "on"],
                    [" ", "設定 %m.leds 亮度為 %n%", "setLED", "發光二極體 A", 100],
                    [" ", "改變 %m.leds 亮度 %n%", "changeLED", "發光二極體 A", 20],
                    ["-"],
                    [" ", "旋轉 %m.servos 到 %n 度", "rotateServo", "伺服馬達 A", 180],
                    [" ", "旋轉 %m.servos %n 度", "changeServo", "伺服馬達 A", 20],
                    ["-"],
                    ["h", "當 %m.buttons 為 %m.btnStates", "whenButton", "按鈕 A", "按下"],
                    ["b", "%m.buttons 按下?", "isButtonPressed", "按鈕 A"],
                    ["-"],
                    ["h", "當 %m.hwIn %m.ops %n%", "whenInput", "旋鈕", ">", 50],
                    ["r", "讀取 %m.hwIn", "readInput", "旋鈕"],
                    ["-"],
                    [" ", "設定腳位 %n %m.outputs", "digitalWrite", 1, "開"],
                    [" ", "設定腳位 %n 為 %n%", "analogWrite", 3, 100],
                    ["-"],
                    ["h", "當腳位 %n 為 %m.outputs", "whenDigitalRead", 1, "開"],
                    ["b", "腳位 %n 開?", "digitalRead", 1],
                    ["-"],
                    ["h", "當類比 %n %m.ops %n%", "whenAnalogRead", 1, ">", 50],
                    ["r", "讀取類比 %n", "analogRead", 0],
                    ["-"],
                    ["r", "對應 %n 由 %n %n 為 %n %n", "mapValues", 50, 0, 100, -240, 240]
                ]
            }[J],
            menus: X[J],
            url: "http://khanning.github.io/scratch-arduino-extension"
        };
    ScratchExtensions.register("Arduino", Y, n, {
        type: "serial"
    })
}({});