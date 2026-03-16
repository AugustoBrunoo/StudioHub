import { HashRouter, Route, Routes } from "react-router-dom"
import { DefaultLayout } from "../layouts/DefaultLayout"
import Home from "../pages/Home"
import ComoFunciona from "../pages/ComoFunciona"

export const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>
                {/* Rotas com layout padrão */}
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />

                    <Route path="/como-funciona" element={<ComoFunciona />} />
                </Route>

                {/* Rotas auth */}

                {/* Rotas de Login */}
            </Routes>
        </HashRouter>
    )
}