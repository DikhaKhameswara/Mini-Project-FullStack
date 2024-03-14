import { createSlice } from "@reduxjs/toolkit";


function isIdExist(state, id) {
    for (const item of state) {
        if (item.id == id) {
            return true;
        }
    }
    return false;
}

function add(state, newBarang) {
    let idCheck;
    if (state.length != 0) {
        idCheck = isIdExist(state, newBarang.id);
    } else {
        idCheck = false;
    }

    if (!idCheck) {
        state.push(newBarang);
    }
    return state;
}

function quantity(state, payload) {
    for (const item of state) {
        if (item.id == payload.id) {
            if (payload.increment == true) {
                item.qty += 1;
            } else {
                item.qty = item.qty > 1 ? item.qty -= 1 : item.qty;
            }
            item.subtotal = item.price * item.qty;
        }
    }
    return state;
}

function remove(state, payload) {
    const barang = state.filter((item) => item.id != payload)
    return barang;
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addBarang: (state, action) => {
            const barang = add(state, action.payload);
            return barang;
        },
        setQuantity: (state, action) => {
            const barang = quantity(state, action.payload);
            return barang;
        },
        deleteBarang: (state, action) => {
            const barang = remove(state, action.payload);
            return barang;
        }
    }
})

export const { addBarang, setQuantity, deleteBarang } = cartSlice.actions;

export default cartSlice.reducer;