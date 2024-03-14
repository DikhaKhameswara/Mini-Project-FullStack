import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const cart = useSelector((state) => state.cart);

    if (cart.length != 0) {
        return <Outlet />
    }

    return <Navigate to={"/"} />
}
