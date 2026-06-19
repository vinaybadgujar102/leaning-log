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

## Time-Series Data and TimescaleDB

**Time-series data** is data that arrives continuously over time and has a **timestamp** associated with each record. Examples include:

- Sensor readings (temperature, humidity, pressure, etc.)
    
- Stock or cryptocurrency trades
    
- Server metrics (CPU, memory usage)
    
- IoT device telemetry
    

The timestamp allows us to analyze how values change over a period of time and perform historical analysis.

### How TimescaleDB Stores Time-Series Data

Time-series workloads are typically **append-only**, meaning new records are continuously added while existing records are rarely modified.

To handle large volumes of data efficiently, TimescaleDB automatically partitions data into **chunks** based on time ranges. This enables efficient querying because only the relevant chunks need to be scanned.

For example:

- Querying data from last year only requires scanning last year's chunks.
    
- Querying data from the last hour only touches recent chunks.
    

This significantly reduces query time and storage overhead.

### Time Bucketing

A common requirement is to aggregate data over fixed time intervals.

TimescaleDB provides **time buckets**, which group records into intervals such as:

- 1 minute
    
- 5 minutes
    
- 1 hour
    
- 1 day
    

For example, to calculate the average sensor value every minute:

```sql
SELECT
  time_bucket('1 minute', ts) AS bucket,
  AVG(value)
FROM sensor_data
GROUP BY bucket;
```

### Building OHLC Data

The same time-bucketing concept is used to generate financial candlestick data:

- Open
    
- High
    
- Low
    
- Close
    

For example, trades can be grouped into 1-minute buckets to create 1-minute candles.

### Continuous Aggregations

Aggregations on large datasets can be computationally expensive if calculated repeatedly.

Instead of recomputing aggregates every time a query is executed, TimescaleDB provides **Continuous Aggregations**.

Continuous Aggregations:

1. Aggregate raw data into predefined time buckets.
    
2. Store the aggregated results in a materialized view.
    
3. Periodically refresh the materialized view as new data arrives.
    

This allows queries to read precomputed results rather than scanning and aggregating raw data every time.

### Retention Policies

As time-series data grows rapidly, storing all historical data forever can become expensive.

TimescaleDB provides **Retention Policies**, which automatically delete data older than a specified period.

Examples:

- Keep raw sensor data for 30 days.
    
- Keep trade data for 1 year.
    
- Delete anything older automatically.
    

This helps control storage costs while retaining only the data that is still valuable.

### Summary

- Time-series data = timestamped data collected over time.
    
- TimescaleDB stores data in time-based **chunks** for efficient querying.
    
- **Time buckets** group data into fixed intervals for aggregation.
    
- **OHLC candles** are built using time-bucketed trade data.
    
- **Continuous Aggregations** store precomputed aggregates in materialized views and keep them updated automatically.
    
- **Retention Policies** automatically remove old data to manage storage efficiently.

## Key concepts

- Index
- Composite Index
- Analyze 
- Explain Analyze
- Data Anamolies (Dirty Read, Phantom Read, Write Skew, Non repeatable read)
- Isolation Levels

- Time series data
- Time scale db
- Chunking 
- Hypertable
- Time bucket
- Aggregation
- Continous Aggregation
- Retention Policy

## References
