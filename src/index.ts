import express, {Request, Response } from 'express';
import requestLogger from './middleware/requestLogger';

const app = express();

app.use(requestLogger);

app.get('/validate/:cardNumber', (req: Request, res: Response): void => {
    const cardNumber: string = req.params.cardNumber;

    if (!cardNumber) {
        res.status(400).json({
            error: 'Missing card number to validate.'
        });
        return;
    }

    const isValid:boolean = isValidCardNumber(cardNumber);

    res.status(200).json({
        isValid,
        message: `Credit Card is ${isValid ? "Valid!" : "Invalid!"}`
    });
});

app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ status: 'Credit Card Validator is running!' });
});

const isValidCardNumber = (cardNumber: string): boolean => {    

    if (!/^\d+$/.test(cardNumber)) {
        return false;
    }
    
    const cleanCardNumber = cardNumber.replace(/\D/g, '');

    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanCardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

const timestamp = new Date().toISOString();
console.log(`[${timestamp}] - ${cardNumber} - ${sum}`);

return sum % 10 === 0;
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
