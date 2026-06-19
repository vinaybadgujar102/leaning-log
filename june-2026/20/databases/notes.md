# Databases

## What I learned

### Indexes
Indexes help in efficient searching of the required data from the db. If we add the index on the key 

```sql
CREATE INDEX idx_userid
ON trades (user_id)
```

this is stored as this user id is present in this - this rows. This is stored in sorted manner. So that using B-Trees we can easily lookup and update the indexes. Creating indexes for every column is not a best decision cause it add storage and maintainance overhead. 

#### Composite Key
Suppose we have common query in our db like
```sql
SELECT * FROM users 
WHERE age > 18 AND
city = "New York"
```

here if we lot of entries for this what we can use is create composite index

```sql
CREATE INDEX idx_user_age_location
on users (user_id, age, city)
```

| Indexed Column 1: `user_id`  <br>_(Primary Sort)_  | Indexed Column 2: `age`  <br>_(Secondary Sort)_ | Indexed Column 3: `city`  <br>_(Tertiary Sort)_ | Pointer  <br>_(Row ID)_ |
| -------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------- |
| **12**                                             | 34                                              | New York                                        | `#102`                  |
| **12**                                             | 34                                              | New York                                        | `#105`                  |
| **45**                                             | 19                                              | Tokyo                                           | `#104`                  |
| **45**                                             | 28                                              | London                                          | `#101`                  |
| **45**                                             | 28                                              | Paris                                           | `#103`                  |
### ANALYZE AND EXPLAIN ANALYZE

Suppose we are running a query which select 999999 rows from the stored 1000000 rows meaning just 1 row is not selected. So it doesnt make sense to checm index then find the stored position of the required row and fetch it. Instead here linear selection is optimal. So thats what the wuery does it anaylzes the db stats the data distribtuion, selectivity and based on it decided which strategy to run. It keeps getting stats of the db in bg time to time. Its stat may also get stale which may force it too rely on wrong strategy. ANAZLY and EXPLAIN ANALYZE helps us to anazlyze how the query is being executed.

### Data Errors 
- Dirty Read - When one transaction reads the changed data which is not yet commited by another transaction
- Phantom Read - When same query return different list of data when called multiple times cause some other query change's , added some data
- re read -> same query returs different data for same row.
- Lost update -> when two transactions modify data concurrently ultimately overriding one transaction's update.
- Write skew -> two transactions **read the same data, but update different rows** in a way that violates a business rule

#### ISOLATION LEVELS
- READ COMMITED -> only read the commited changes, solves the dirty read problem
- REPEATABLE READ -> before transaction starts take snapshot of the data of row and read from it in the transaction, solves pahntom read, re read
- SERIALIZABLE -> if transaction relies on mutliple row and has to follow some business logic then the db should treat each transaction as serializable only allowing one transaction at a time on the data. avoids write skew

## Key concepts

- Index
- Composite Index
- Analyze 
- Explain Analyze
- Data Anamolies (Dirty Read, Phantom Read, Write Skew, Non repeatable read)
- Isolation Levels

## References
