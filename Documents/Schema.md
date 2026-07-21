## Problem Table Schema

# Columns

- id
- Problem Name
- Problem Link
- Topic
- Date
- Revision id
- Difficulty

# schema

```
create table problems (
	id serial primary key,
	problem_name varchar(255) not null,
	problem_link text unique not null,
	topic varchar(100)  not null,
	difficulty varchar(20) not null,
	revision_id int default 1,
	date DATE not null
);
```
