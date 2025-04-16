### Purpose

Enable users to create, share, and permanently store PD2 builds. Similar to Path of Building and pobb.in scombined.

### Core features

#### Build upload

Input: JSON from the frontend state
Processing: Store in a database

### Problems to overcome

- Generating build code (stringify JSON -> compress -> Base62 encode)
- Generating unique slug from build code (hash and slice)
- Database backups
- Uptime and consistency
- Cost effectiveness

### How to implement

- Transform build data to build code
- Hash build code to a slug
- Persisst slug and build codes in db/redis
- Endpoint for retrieving build code by slug