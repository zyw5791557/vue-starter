export let findData = (source, id, callback) => {
    if (source && source.length) {
        for (let item of source) {
            if (item.icon_id === id) {
                callback(item);
                return;
            } else if (item.child && item.child.length) {
                findData(item.child, id, callback);
            }
        }
    }
}

export const moneyFormat = (number, decimals, decPoint, thousandsSep) => {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * decPoint：小数点符号
    * thousandsSep：千分位符号
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
        dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };
    
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2');
    }
    
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

export const b64toFile = (b64Data, contentType, fileName, sliceSize) => {
    contentType = contentType || '';
    fileName = fileName || new Date() * 1 + Math.random();
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new File(byteArrays, fileName, { type: contentType });
};
