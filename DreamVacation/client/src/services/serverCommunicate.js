
export const get = async (url) => {
    let response = await fetch("http://localhost:27017/" + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    let data = await response.json();
    return data;
}

export const getItem = async (id) => {

    const response = await fetch("http://localhost:27017/apartments/getone", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Content": id
        }
    });
    const data = await response.json();
    return data;
}

const addItem = async (obj, url) => {
    let res2 = "";
    while (res2 != "success") {
        let res = await fetch("http://localhost:27017/" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        res2 = await res.text();
    }
    return res2
};

export const insert = async (values) => {

    let data = await get("apartments");

    let id = data[data.length - 1].id + 1;

    let obj = {
        id: id,
        location: values.location,
        price_per_night: values.price_per_night,
        price_per_shabat: values.price_per_shabat,
        beds_num: values.beds_num,
        additions: values.additions,
        phone: values.phone,
        email: values.email,
        recommendations: [],
        img: values.img
    }

    await addItem(obj, "apartments");
}

export const update = async (id, value) => {

    const changeItem = async (itemUpdate) => {
        let res2 = "";
        while (res2 != "success") {
            let res = await fetch("http://localhost:27017/apartments/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemUpdate)
            });
            res2 = await res.text();
        }
    }

    let newObj = await getItem(id);
    newObj.recommendations.push(value);
    await changeItem(newObj);
}

export const insertTip = async (value) => {

    let data = await get("tips");

    let id = data[data.length - 1].id + 1;

    let obj = {
        id: id,
        value: value
    }

    await addItem(obj, "tips");
}
