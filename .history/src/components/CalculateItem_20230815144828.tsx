import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Calculator: React.FC = () => {
    const [num1, setNum1] = useState<number | ''>('');
    const [num2, setNum2] = useState<number | ''>('');
    const [operator, setOperator] = useState<string>('+');
    const [result, setResult] = useState<number | string>('');

    const calculate = () => {
        if (num1 === '' || num2 === '') {
            setResult('Wprowadź obie liczby');
            return;
        }

        const parsedNum1 = parseFloat(num1 as string);
        const parsedNum2 = parseFloat(num2 as string);

        switch (operator) {
            case '+':
                setResult(parsedNum1 + parsedNum2);
                break;
            case '-':
                setResult(parsedNum1 - parsedNum2);
                break;
            case '*':
                setResult(parsedNum1 * parsedNum2);
                break;
            case '/':
                setResult(parsedNum1 / parsedNum2);
                break;
            default:
                setResult('Błędny operator');
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
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Liczba 2"
                        variant="outlined"
                        fullWidth
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
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
                    <Button onClick={calculate}>Oblicz</Button>
                </Grid>
                <Grid item xs={12}>
                    <p>Wynik: {result}</p>
                </Grid>
            </Grid>
        </div>
    );
};

export default Calculator;
