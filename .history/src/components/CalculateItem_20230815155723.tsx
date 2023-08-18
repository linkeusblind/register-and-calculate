import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { db } from '../config/config';
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';

const CalculateItem: React.FC = () => {
    const [num1, setNum1] = useState<number | ''>('');
    const [num2, setNum2] = useState<number | ''>('');
    const [operator, setOperator] = useState<string>('+');
    const [result, setResult] = useState<number | string>('');

    const num1Ref = useRef<HTMLInputElement | null>(null);
    const num2Ref = useRef<HTMLInputElement | null>(null);

    const calculate = async () => {
        if (!num1Ref.current || !num2Ref.current) return;

        const parsedNum1 = parseFloat(num1Ref.current.value);
        const parsedNum2 = parseFloat(num2Ref.current.value);

        let calculatedResult: number | string = '';

        switch (operator) {
            case '+':
                calculatedResult(parsedNum1 + parsedNum2);
                break;
            case '-':
                calculatedResult(parsedNum1 - parsedNum2);
                break;
            case '*':
                calculatedResult(parsedNum1 * parsedNum2);
                break;
            case '/':
                calculatedResult(parsedNum1 / parsedNum2);
                break;
            default:
                calculatedResult('Błędny operator');
        }
        setResult(calculatedResult);

        try {
            // Dodaj dane do bazy Firestore za pomocą funkcji addDoc i zaimportowanej konfiguracji db
            await addDoc(collection(db, 'calculations'), {
                num1: parsedNum1,
                num2: parsedNum2,
                operator,
                result: calculatedResult.toString(),
                timestamp: new Date(),
            });
            console.log('Dane zapisane do bazy Firestore.');
        } catch (error) {
            console.error('Wystąpił błąd podczas zapisywania danych:', error);
        }


    };

    return (
        <div style={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Liczba 1"
                        variant="outlined"
                        fullWidth
                        inputRef={num1Ref}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Liczba 2"
                        variant="outlined"
                        fullWidth
                        inputRef={num2Ref}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Operator</InputLabel>
                        <Select
                            value={operator}
                            onChange={(e) => setOperator(e.target.value as string)}
                            label="Operator"
                        >
                            <MenuItem value="+">Dodawanie</MenuItem>
                            <MenuItem value="-">Odejmowanie</MenuItem>
                            <MenuItem value="*">Mnożenie</MenuItem>
                            <MenuItem value="/">Dzielenie</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="success" onClick={calculate}>Oblicz</Button>
                </Grid>
                <Grid item xs={12}>
                    <p>Wynik: {result}</p>
                </Grid>
            </Grid>
        </div>
    );
};

export default CalculateItem;
