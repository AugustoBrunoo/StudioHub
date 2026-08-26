import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import ComoFunciona from "../pages/ComoFunciona"
import Planos from "../pages/Planos"

export const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/como-funciona" element={<ComoFunciona />} />
                <Route path="/planos" element={<Planos />} />
            </Routes>
        </HashRouter>
    )
}
