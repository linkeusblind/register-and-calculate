import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from '../config/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';


interface User {
    displayName?: string;
}
interface UserId {
    uid?: string;
}
const CalculateItem: React.FC = () => {
    const [operator, setOperator] = useState<string>('+');
    const [result, setResult] = useState<number | string>('');
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [userName, setUserName] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const num1Ref = useRef<HTMLInputElement | null>(null);
    const num2Ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const loadUserName = async () => {
            if (user !== null) {
                const displayName = (user as User).displayName;
                const userId = (user as UserId).uid
                if (displayName) {
                    const firstName = displayName.split(" ")[0];
                    setUserName(firstName);
                    setUserId(userId || null);
                }
            }

        };
        loadUserName();
    }, [user]);



    const calculateHandler = async () => {
        if (!num1Ref.current || !num2Ref.current) {
            setResult('Invalid input');
            return;
        }

        const parsedNum1 = parseFloat(num1Ref.current.value);
        const parsedNum2 = parseFloat(num2Ref.current.value);

        let calculatedResult: number | string = 0;
        switch (operator) {
            case '+':
                calculatedResult = parsedNum1 + parsedNum2;
                break;
            case '-':
                calculatedResult = parsedNum1 - parsedNum2;
                break;
            case '*':
                calculatedResult = parsedNum1 * parsedNum2;
                break;
            case '/':
                calculatedResult = parsedNum1 / parsedNum2;
                break;
            default:
                calculatedResult = 'Wrong operator';
        }
        setResult(calculatedResult);

        try {
            if (userId !== null) {
                const userIdAsString = userId.toString();

                const userDocRef = doc(db, 'users', userIdAsString);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userDocData = userDocSnapshot.data();
                    const updatedHistory = [
                        ...(userDocData?.history || []),
                        {
                            userName,
                            num1: parsedNum1,
                            num2: parsedNum2,
                            operator,
                            result: calculatedResult.toString(),
                        },
                    ];

                    await setDoc(userDocRef, { history: updatedHistory }, { merge: true });

                    console.log('Data saved to the Firestore database.');
                } else {
                    console.error('User document does not exist.');
                }
            } else {
                console.error('userId is null');
            }
        } catch (error) {
            console.error('An error occurred while saving data:', error);
        }
    };

    return (
        < div style={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Number 1"
                        variant="outlined"
                        fullWidth
                        inputRef={num1Ref}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Number 2"
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
                            <MenuItem value="+">Addition</MenuItem>
                            <MenuItem value="-">Subtraction</MenuItem>
                            <MenuItem value="*">Multiplication</MenuItem>
                            <MenuItem value="/">Division</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="success" onClick={calculateHandler}>Calculate</Button>
                </Grid>
                <Grid item xs={6}>
                    <p>Result: {result}</p>
                </Grid>
            </Grid>
        </ div>
    );
};

export default CalculateItem;
