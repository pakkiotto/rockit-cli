For first install node application run the command
# Foobar

Rockit is a node based cli for book ingress in a climbing gym

## Installation

Use the package manager npm to install the cli.

```bash
npm install -g .
```

## Usage

Commands available slots and book

example of book:

* -d or --data: date expressend in format YYYY/MM/DD for booking request
* -t or --time: time for booking request in format hh:mm
* -u or --users: users to book in

```bash
node ./bin/index.js book -d 2022/03/28 -t 18:15 -u saiello parisi
```

example of slots:

* -d or --data: date expressend in format YYYY/MM/DD for booking request

```bash
node ./bin/index.js slots -d 2022/03/28
```

## License
[MIT](https://choosealicense.com/licenses/mit/)