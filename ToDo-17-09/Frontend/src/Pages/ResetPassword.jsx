
/*
useState → guardar o que a pessoa digitar.
useNavigate → mandar a pessoa para outra página depois.
useSearchParams → pegar o token que está na URL.
reset → é a função que já temos no Todo.jsx e faz o POST /resetPassword.
*/ 

import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { reset } from "../api/Todo.jsx";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [novaSenha, setNovaSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await reset({
                token,
                novaSenha
            });

            alert("Senha redefinida com sucesso!");
            navigate("/login");

        } catch (error) {
            alert(
                "Erro ao redefinir senha: " +
                (error.response?.data?.message || error.message || error)
            );
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">

        <div className="text-center mb-7">
            <div className="text-4xl mb-3">
                🔐
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
                Crie uma nova senha
            </h2>

            <p className="text-sm text-gray-500 mt-2">
                Escolha uma nova senha para acessar sua conta.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nova senha
                </label>

                <input
                    type="password"
                    required
                    disabled={loading}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Salvando..." : "Salvar nova senha"}
            </button>

        </form>

        <div className="mt-6 text-center">
            <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
                ← Voltar para Login
            </Link>
        </div>

    </div>
);
}