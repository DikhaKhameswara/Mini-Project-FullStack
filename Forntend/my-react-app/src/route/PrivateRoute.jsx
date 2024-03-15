import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function PrivateRoute() {
    const cart = useSelector((state) => state.cart);

    if (cart.length != 0) {
        return <Outlet />
    }

    Swal.fire({
        title: "Akses Ditolak",
        text: "Cart Masih Kosong",
        icon: "error"
    });

    return <Navigate to={"/"} />
}
