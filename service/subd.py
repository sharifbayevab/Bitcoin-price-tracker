import psycopg2
import coindesk

# Database connection parameters
dbname = "my_postgres"
user = "username"
password = "password123"
host = "db"

create_table_query = """
CREATE TABLE IF NOT EXISTS bitcoin_prices (
    id SERIAL PRIMARY KEY,
    price NUMERIC,
    date DATE
);
"""

insert_query = """
INSERT INTO bitcoin_prices (date, price) VALUES (%s, %s)
"""


conn = psycopg2.connect(dbname=dbname, user=user,
                        password=password, host=host)
cur = conn.cursor()
cur.execute(create_table_query)

data_list = coindesk.CoinDesk().get_historical_data_as_list(start='2013-09-01', end=None)
for item in data_list:
    cur.execute(insert_query, (item['date'], item['price']))
conn.commit()

# rows = cur.fetchone()

cur.close()
conn.close()

