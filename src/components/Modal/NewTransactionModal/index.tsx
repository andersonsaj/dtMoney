import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

import imgClose from '../../../assets/close.svg';
import imgEntrada from '../../../assets/entrada.svg';
import imgSaida from '../../../assets/outcome.svg';
import { useTransactions } from '../../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const {createTransaction} = useTransactions();
    
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setType('deposit');
        setTitle('');
        setAmount(0);
        setCategory('');
    
        onRequestClose();
    }
    return (
        <Modal  
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        > 
            <button 
                type="button" 
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={imgClose} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input 
                    placeholder="Título" 
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Valor" 
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        onClick={() => {setType('deposit');}}
                        isActive={type === 'deposit'}
                       activeColor="green"
                    >
                        <img src={imgEntrada} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        onClick={() => {setType('withdraw');}}
                        isActive={type === 'withdraw'}
                       activeColor="red"
                    >
                        <img src={imgSaida} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder="Categoria" 
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                
                />
                
                <button type="submit"> 
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}