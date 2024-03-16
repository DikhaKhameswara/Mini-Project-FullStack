import Swal from "sweetalert2";

export function swallPopUp(data, message, icon) {
    return Swal.fire({
        title: data,
        text: message,
        icon: icon
    });
}

export async function swallConfirmation() {
    await Swal.fire({
        title: "Do you want to save the changes?",
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't Save`
    }).then((result) => {
        if (result.isDenied || result.isDismissed) {
            throw Error;
        }
    }).catch();
}