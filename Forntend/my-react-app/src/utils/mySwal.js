import Swal from "sweetalert2";

export async function swallPopUp(data, message, icon) {
    return await Swal.fire({
        title: data,
        text: message,
        icon: icon
    });
}

export async function swallConfirmation(title) {
    await Swal.fire({
        title: title,
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Ya",
        denyButtonText: "Tidak",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isDenied || result.isDismissed) {
            throw Error;
        }
    }).catch();
}