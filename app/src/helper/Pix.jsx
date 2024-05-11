const Pix = {
    dollar: function (amount, dec) {
        let dml;
        amount = Number(amount);
        if (isNaN(amount)) {
            amount = 0;
        }
        amount = amount.toFixed(2).split('.');
        dml = amount[1];
        amount = Number(amount[0]).toLocaleString();
        if (dec !== 0) {
            if (
                (!dec && dml !== '00') ||
                dec === 1
            ) {
                amount += '.' + dml;
            }
        }
        // amount = amount.toLocaleString();
        return '$' + amount;
    }
}

export default Pix;