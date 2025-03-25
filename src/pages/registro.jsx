import React, { useState } from 'react';
import './style.css';

const CreateAccountModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        window.location.href = 'login.html';
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <>
            <button onClick={handleShow} className="btn btn-primary">
                Criar Conta
            </button>

            {showModal && (
                <div className="modal fade show" id="createAccountModal" tabIndex="-1" aria-labelledby="createAccountModalLabel" aria-hidden="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="mb-4">Criar Conta</h1>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control mb-3" placeholder=" Nome" />
                                <input type="text" className="form-control mb-3" placeholder=" Sobrenome" />
                                <input type="email" className="form-control mb-3" placeholder=" Email" />
                                <input type="tel" className="form-control mb-3" placeholder=" Telefone" />
                                <input type="password" className="form-control mb-1" placeholder=" Senha" />
                                <input type="password" className="form-control mb-3" placeholder=" Confirmar Senha" />
                                <button type="button" className="btn btn-primary">
                                    Criar Conta
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateAccountModal;