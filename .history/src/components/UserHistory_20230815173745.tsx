import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/config';
import { ListItem, List, ListItemText, Typography, Container } from '@mui/material';

interface UserHistoryItem {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
    timestamp: string;
}

const UserHistory: React.FC = () => {
    const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const userHistoryCollection = collection(db, 'users');
                const userHistoryQuery = query(userHistoryCollection, where('userId', '==', userId)); // Adjust the query condition

                const querySnapshot = await getDocs(userHistoryQuery);

                const historyData: UserHistoryItem[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as UserHistoryItem;
                    historyData.push(data);
                });

                setUserHistory(historyData);
            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };

        fetchUserHistory();
    }, []);

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                User History
            </Typography>
            <List>
                {userHistory.map((historyItem, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${historyItem.userName}'s calculation`}
                            secondary={`Numbers: ${historyItem.num1} ${historyItem.operator} ${historyItem.num2}, Result: ${historyItem.result}, Timestamp: ${historyItem.timestamp}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UserHistory;
