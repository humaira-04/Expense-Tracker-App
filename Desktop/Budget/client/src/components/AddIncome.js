import React, { useState } from "react";
import { TextField, Button, InputLabel, Card, Grid, Select, CardContent, MenuItem, Typography } from "@mui/material";
function AddIncome() {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({ description: '', amount: '' });
    const [transactionType, setTransactionType] = useState('Expense'); // Default to 'expense'
    const [expenseCategory, setexpenseCategory] = useState('Needs');
    const [balance, setBalance] = useState(0);
    const addTransaction = () => {
        if (newTransaction.amount !== 0 && newTransaction.description !== '') {
            // Check if amount is not zero and description is not empty
            const updatedTransactions = [
                ...transactions,
                { ...newTransaction, type: transactionType },
            ];

            // Calculate the balance based on updatedTransactions
            let totalIncome = 0;
            let totalExpense = 0;

            updatedTransactions.forEach((transaction) => {
                if (transaction.type === 'Income') {
                    totalIncome += transaction.amount;
                } else {
                    totalExpense += transaction.amount;
                }
            });

            const calculatedBalance = totalIncome - totalExpense;

            // Update state with the new transaction and calculated balance
            setTransactions(updatedTransactions);
            setNewTransaction({ description: '', amount: '' });
            setBalance(calculatedBalance);
        }
    };
    document.body.style.backgroundColor = '#B0C4DE';
    return (
        <div>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Kaplan%2C_Inc._logo.svg" // Replace with the actual path to your image
                alt="Description of the image"
                width="200" // Set the width of the image
                height="100" // Set the height of the image
            />
            <Typography variant="h1" textAlign="end" justifyContent="normal" position="absolute" top='0' right='0'>
                SmartSplit
            </Typography>
            <br /><br /><br /><br /><br /><br /><br /><br />

            <Grid container spacing={2} justifyContent="space-around">
                <Grid item>
                    <TextField variant="filled" margin="dense"
                        type="search"
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChange={(e) => {
                            // Use a regular expression to allow only numeric input
                            const numericValue = e.target.value.replace(/[^0-9]/g, '');
                            setNewTransaction({ ...newTransaction, amount: parseFloat(numericValue) || 0 });
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField variant="filled" margin="dense"
                        type="text"
                        placeholder="Description"
                        value={newTransaction.description}
                        onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    />
                </Grid>
                <Grid item>
                    <Select variant="filled" margin="dense"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <MenuItem value="Expense">Expense</MenuItem>
                        <MenuItem value="Income">Income</MenuItem>
                    </Select>
                </Grid>
                <Grid item>
                    <Select variant="filled" margin="dense"
                        value={expenseCategory}
                        onChange={(e) => setexpenseCategory(e.target.value)}
                    >
                        <MenuItem value="Needs">Needs</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Tax">Tax</MenuItem>
                        <MenuItem value="Luxury">Luxury</MenuItem>
                        <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                    </Select>
                    <InputLabel htmlFor="expense-category-select">If an Expense, Add Category</InputLabel>
                </Grid>
            </Grid>
            <br />
            <Grid container spacing={2} justifyContent="space-around">
                <Grid item>
                    <Button variant="contained" onClick={addTransaction}>Add Transaction</Button>
                </Grid>
            </Grid>
            <br />
            <Typography variant="h4" textAlign="center">Balance: ₹{balance}</Typography>
            <div>
                {transactions.map((transaction, index) => (
                    <Card key={index} variant="outlined" style={{ marginBottom: '10px', maxWidth: "400px", marginLeft: "35vw" }}>
                        <CardContent>
                            <Typography variant="h6" component="div" align="center">
                                {transaction.description} | ₹{transaction.amount}
                            </Typography>
                            <Typography color="textSecondary" align="center">
                                Type: {transaction.type}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
export default AddIncome;