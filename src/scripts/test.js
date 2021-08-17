let x = { a: 0 };


const frame = x => {
    if (x.a === 10) {
        clearInterval(id);
    } else {
        x.a += 1;
        console.log(x.a);
    }
}
let id = setInterval(frame, 500, x);