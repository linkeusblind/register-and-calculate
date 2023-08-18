import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, DocumentData, doc, setDoc, Firestore } from 'firebase/firestore';
import { db } from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

interface User {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
    timestamp: string;
}

const History: React.FC = () => {
    const [userHistory, setUserHistory] = useState<User[]>([]);

    useEffect(() => {
        const fetchAndCopyUserData = async () => {
            try {
                const usersCollectionRef = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollectionRef);

                const usersData: User[] = [];
                querySnapshot.forEach((userDoc) => {
                    const userData = userDoc.data() as User;
                    usersData.push(userData);
                });

                const communicationDocRef = doc(db, 'communication', 'communication');
                await setDoc(communicationDocRef, { users: usersData });

                setUserHistory(usersData);
            } catch (error) {
                console.error('Error fetching and copying user data:', error);
            }
        };

        fetchAndCopyUserData();
    }, []);

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                User History
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Number 1</TableCell>
                            <TableCell>Number 2</TableCell>
                            <TableCell>Operator</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userHistory.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.num1}</TableCell>
                                <TableCell>{user.num2}</TableCell>
                                <TableCell>{user.operator}</TableCell>
                                <TableCell>{user.result}</TableCell>
                                <TableCell>{user.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default History;
