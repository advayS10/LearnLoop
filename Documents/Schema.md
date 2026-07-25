## Problem Table Schema

# Columns

- id
- Problem Name
- Problem Link
- Topic
- Created_date
- Revision id
- Difficulty
- Revision_date

# schema

```
create table problems (
	id serial primary key,
	problem_name varchar(255) not null,
	problem_link text unique not null,
	topic varchar(100)  not null,
	difficulty varchar(20) not null,
	revision_id int default 1,
	created_date DATE CURRENT_DATE
	revision_date DATE not null
);
```
