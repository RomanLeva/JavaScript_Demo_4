// ECMA SCRIPT 6
// класс Клеточка с именем и индексом строки и столбца, а также с указателями на соседние клеточки
class Square {
    name;
    idx;
    idx_ltr;
    ltr;
    up;
    down;
    left;
    right;
}

// Инициализируем массив клеточек изначальными именами и назначим индексы (цифры и буквы).
let squaresArr = [];
let t = 0;
let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
for (let i = 1; i <= 8; i++) {
    for (let ltr in letters) {
        let s = new Square();
        s.name = letters[ltr] + i;
        s.ltr = letters[ltr];
        s.idx = i;
        s.idx_ltr = ltr;
        squaresArr[t] = s;
        t++;
    }
}
/*
Далее надо перебрать каждый объект Square из массива и изходя из его индексов буквы и цифры
назначить каждой square ссылки на верхний, нижний, левый и правый объекты.
То есть каждая клеточка имеет ссылку на обьект соседней клеточки. Получется
некоторый связанный двумерный массив клеточек по которому алгоритмом можно шагать куда угодно!
(Скорость алгоритма N^2 делить на 2)
 */
for (let s in squaresArr) {
    let square = squaresArr[s];
    if (square.idx < 8) { //set UP link
        let n = square.ltr + (square.idx + 1);
        for (let i_s in squaresArr) {
            let i_sq = squaresArr[i_s];
            if (i_sq.name === n) {
                square.up = i_sq;
                break;
            }
        }
    }
    if (square.idx > 1) { //set DOWN link
        let n = square.ltr + (square.idx - 1);
        for (let i_s in squaresArr) {
            let i_sq = squaresArr[i_s];
            if (i_sq.name === n) {
                square.down = i_sq;
                break;
            }
        }
    }
    if (square.idx_ltr < 7) { //set RIGHT link
        let i = parseInt(square.idx_ltr) + 1;
        let n = letters[i] + square.idx;
        for (let i_s in squaresArr) {
            let i_sq = squaresArr[i_s];
            if (i_sq.name === n) {
                square.right = i_sq;
                break;
            }
        }
    }
    if (square.idx_ltr > 0) { //set LEFT link
        let i = parseInt(square.idx_ltr) - 1;
        let n = letters[i] + square.idx;
        for (let i_s in squaresArr) {
            let i_sq = squaresArr[i_s];
            if (i_sq.name === n) {
                square.left = i_sq;
                break;
            }
        }
    }
}


//Вызывается при нажатии на клеточку
function clickN(pos) {
    let board = document.getElementsByClassName("chessboard");
    board[0].innerHTML = tbody_standard; // обновим шахматное поле до отрисовки возможных ходов (удаляем предыдущие отрисовки)
    document.getElementById(pos).setAttribute("class", "green");
    let varsArr = calcRoute(pos); // Находим возможные варианты куда походить.
    for (let va in varsArr) {
        let v = varsArr[va];
        let color = document.getElementById(v).getAttribute("class");
        document.getElementById(v).setAttribute("class", "blue");
    }
}

function calcRoute(p) {
    let v;
    for (let s in squaresArr) { // В массиве клеточек находим по имени ту, на которую нажал пользователь
        let square = squaresArr[s];
        if (square.name === p) {
            v = square;
            break;
        }
    }
    // Найдя клетку где стоит конь, находим все возможные варианты, результат записываем в variantsArr и возвращаем
    let variantsArr = [];
    let m = 0;
    //Походить вверх
    if (v.up !== undefined && v.up.up !== undefined) {
        let vu = v.up.up;
        if (vu.left !== undefined) {
            variantsArr[m] = vu.left.name;
            m++;
        }
        if (vu.right !== undefined) {
            variantsArr[m] = vu.right.name;
            m++;
        }
    }
    //Походить вниз
    if (v.down !== undefined && v.down.down !== undefined) {
        let vu = v.down.down;
        if (vu.left !== undefined) {
            variantsArr[m] = vu.left.name;
            m++;
        }
        if (vu.right !== undefined) {
            variantsArr[m] = vu.right.name;
            m++;
        }
    }
    //Походить влево
    if (v.left !== undefined && v.left.left !== undefined) {
        let vu = v.left.left;
        if (vu.up !== undefined) {
            variantsArr[m] = vu.up.name;
            m++;
        }
        if (vu.down !== undefined) {
            variantsArr[m] = vu.down.name;
            m++;
        }
    }
    //Походить вправо
    if (v.right !== undefined && v.right.right !== undefined) {
        let vu = v.right.right;
        if (vu.up !== undefined) {
            variantsArr[m] = vu.up.name;
            m++;
        }
        if (vu.down !== undefined) {
            variantsArr[m] = vu.down.name;
            m++;
        }
    }
    return variantsArr;
}

// Служит для обновления шахматной доски перед отрисовкой ходов
let tbody_standard = "<tbody>\n" +
    "    <tr>\n" +
    "        <th>8</th>\n" +
    "        <td class=\"white\" onclick=\"clickN('A8')\" id=\"A8\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('B8')\" id=\"B8\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('C8')\" id=\"C8\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('D8')\" id=\"D8\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('E8')\" id=\"E8\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('F8')\" id=\"F8\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('G8')\" id=\"G8\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('H8')\" id=\"H8\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th>7</th>\n" +
    "        <td class=\"black\" onclick=\"clickN('A7')\" id=\"A7\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('B7')\" id=\"B7\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('C7')\" id=\"C7\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('D7')\" id=\"D7\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('E7')\" id=\"E7\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('F7')\" id=\"F7\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('G7')\" id=\"G7\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('H7')\" id=\"H7\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th>6</th>\n" +
    "        <td class=\"white\" onclick=\"clickN('A6')\" id=\"A6\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('B6')\" id=\"B6\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('C6')\" id=\"C6\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('D6')\" id=\"D6\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('E6')\" id=\"E6\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('F6')\" id=\"F6\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('G6')\" id=\"G6\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('H6')\" id=\"H6\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th>5</th>\n" +
    "        <td class=\"black\" onclick=\"clickN('A5')\" id=\"A5\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('B5')\" id=\"B5\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('C5')\" id=\"C5\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('D5')\" id=\"D5\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('E5')\" id=\"E5\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('F5')\" id=\"F5\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('G5')\" id=\"G5\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('H5')\" id=\"H5\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th>4</th>\n" +
    "        <td class=\"white\" onclick=\"clickN('A4')\" id=\"A4\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('B4')\" id=\"B4\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('C4')\" id=\"C4\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('D4')\" id=\"D4\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('E4')\" id=\"E4\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('F4')\" id=\"F4\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('G4')\" id=\"G4\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('H4')\" id=\"H4\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th>3</th>\n" +
    "        <td class=\"black\" onclick=\"clickN('A3')\" id=\"A3\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('B3')\" id=\"B3\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('C3')\" id=\"C3\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('D3')\" id=\"D3\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('E3')\" id=\"E3\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('F3')\" id=\"F3\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('G3')\" id=\"G3\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('H3')\" id=\"H3\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th>2</th>\n" +
    "        <td class=\"white\" onclick=\"clickN('A2')\" id=\"A2\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('B2')\" id=\"B2\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('C2')\" id=\"C2\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('D2')\" id=\"D2\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('E2')\" id=\"E2\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('F2')\" id=\"F2\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('G2')\" id=\"G2\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('H2')\" id=\"H2\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th>1</th>\n" +
    "        <td class=\"black\" onclick=\"clickN('A1')\" id=\"A1\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('B1')\" id=\"B1\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('C1')\" id=\"C1\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('D1')\" id=\"D1\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('E1')\" id=\"E1\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('F1')\" id=\"F1\"></td>\n" +
    "        <td class=\"black\" onclick=\"clickN('G1')\" id=\"G1\"></td>\n" +
    "        <td class=\"white\" onclick=\"clickN('H1')\" id=\"H1\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th>\n" +
    "    </tr>\n" +
    "    </tbody>";

