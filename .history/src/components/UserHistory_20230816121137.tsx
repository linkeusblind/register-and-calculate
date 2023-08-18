import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { ListItem, List, ListItemText, Typography, Container } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

interface UserHistoryItem {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
    timestamp: string;
}
interface UserId {
    uid?: string;
    // other properties
}

const UserHistory: React.FC = () => {
    const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                if (user !== null) {
                    const userId = (user as UserId).uid;
                    const userDocRef = doc(db, `users/${userId}`);

                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        const historyData: UserHistoryItem[] = userData?.history || [];
                        setUserHistory(historyData);
                    }
                }
            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };

        fetchUserHistory();
    }, [user]);

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
                            secondary={`Numbers: ${historyItem.num1} ${historyItem.operator} ${historyItem.num2}, Result: ${historyItem.result}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UserHistory;
