# Payments

## What I learned

Handling payments is very complex problem cause there are many point of failures. Merchant, payment gateway, db, user, network, sooo much variables we have to deal with. Also in normal applications we mostly think in terms of success and failure but payment integration introduces "unknown" state. 

Imagine this scenario: 
```
User clicks Pay -> Merchant sends payment request -> Payment gateway processes payment -> Gateway sends success response -> Network timeout occurs -> Merchant never receives response

```

Now the merchant server sees: Request timed out

What should the merchant do?  Merchant has to treat payment status as unknown and verify with the payment provider.

There are soo many parties involved:
- Merchant
- Customer
- Payment Gateway
- Payment Processor
- Acquiring Bank
- Issuing Bank
- Card Network (Visa/Mastercard/RuPay)

Once user clicks make payment, the funds are not instantly transferred to the other party. Its first reserved by the payment aggregator, and it verifies if merchant is able to process it once it gets green flag then only payment aggregator releases the funds.

Now who is responsible for confirming that payment is successfull? For this payment aggregrator provides webhook which the backend hits to check the payment status.

But again what if goes down when the webhook for our payment is available. Then our system will not know the status of the payment. So waht we do is reconcilde the payment records when our backend is back again. We check and compare against the payments records from the payment gateway and our records and then reconcile appropriately. Most common way is to check the payment with status pending, unresolved in our db and then compare it with the records of the payment gateway. 

Payment Architechture till now is this

Frontend -> hits payment route
   ↓
Backend -> /pay
   ↓
Create Payment Intent / Order -> create payment object
   ↓
Gateway -> gateway creates payment request

User Pays

Gateway -> gateway recieves payment
   ↓
Webhook -> creates hook for backend to hit to get status
   ↓
Backend 

Backend
   ↓
Update Payment State
   ↓
Create Order / Unlock Service

Scheduled Reconciliation Job
   ↓
Fix Missed Payments

The payment related data is usually stored as event happened like payment initiated, payment captures,... with related metadata and also as final state of payment in the db. the first part allows us to know exactly what happened during the lifecycle of the payment and the second part allows us to perform read query fast. 

## Key concepts
- Payment states
- Webhooks
- Idempotency

## Questions

## References
