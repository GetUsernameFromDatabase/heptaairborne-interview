# HeptaAirborne Technical Interview DevTools <!-- omit in toc -->

Development tools for this project.

Developed using `Python 3.11.5`\
You can download python from <https://www.python.org/downloads/>

Table of contents:

- [Generate Liquibase Files](#generate-liquibase-files)
  - [Setup](#setup)
  - [Usage](#usage)

## Generate Liquibase Files

> [python script](generate_liquibase_files.py)

This script fetches images from <https://picsum.photos/v2/list> and generates the liquibase file that can be used to insert them into the database.

### Setup

Install requirements by running

```bash
pip install -r requirements.txt
```

### Usage

You can run the script with the following command:

```bash
python generate_liquibase_files.py --out_file my_output.sql --max_images 10000
```

Arguments:

- `--out_file`: The name of the output file. Default is “00001_insert_images.sql”.
- `--max_images`: The maximum number of images to fetch. Default is 15000.

---
To see the manual for the script run:

```bash
python generate_liquibase_files.py --help
```
