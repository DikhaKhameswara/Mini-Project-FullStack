
export function toRupiah(harga) {
    let uang = harga;
    let u2 = harga.toString();

    let huruf = "";
    let count = u2.length;
    for (let index = 0; index < u2.length; index++) {

        huruf += u2[index];

        if (index + 1 == u2.length) {
            break
        }
        if ((count - index - 1) % 3 == 0) {
            huruf += ".";
        }
    }
    return `Rp.${huruf}`
}