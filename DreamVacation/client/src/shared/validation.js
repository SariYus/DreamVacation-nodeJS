
export function is_value_exist(value) {
    return (value.length >= 2);
}

export function is_number_exist(num) {
    if (num.length < 1) return false;
    return (/^\d+$/.test(num));
}

export function is_phone_valid(phone) {
    if (!is_value_exist(phone)) return false;
    if (!(/^\d+$/.test(phone))) return false;
    return ( phone.length === 9) || ( phone.length === 10);
}

export function is_email_valid(email) {
    if (!is_value_exist(email)) return false;
    return(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}/.test(email));
}

export function are_values_valid(values) {
    let err = 0;
    if (!is_value_exist(values.location)) err = 1; 
    if (!is_number_exist(values.price_per_night)) err = 2;
    if (!is_number_exist(values.price_per_shabat)) err = 3;
    if (!is_number_exist(values.beds_num)) err = 4;
    if (!is_phone_valid(values.phone)) err = 5;
    if (!is_email_valid(values.email)) err = 6;
    if (!is_value_exist(values.img)) err = 7;
    switch (err) {
        case 1:
            alert ("הכנס ערך חוקי לשדה 'יישוב'");
            return false;
        case 2:
            alert ("הכנס ערך חוקי לשדה 'מחיר ללילה'");
            return false;
        case 3:
            alert ("הכנס ערך חוקי לשדה 'מחיר לסוף שבוע'");
            return false;
        case 4:
            alert ("הכנס ערך חוקי לשדה 'מספר המיטות'");
            return false;
        case 5:
            alert ("הכנס מספר טלפון חוקי");
            return false;
        case 6:
            alert ("הכנס כתובת דואר אלקטרוני חוקית");
            return false;
        case 7:
            alert ("יש להעלות תמונה של דירת הנופש");
            return false;
        case 0:
            return true;
        default:
            return false; 
    }
}