# COVID-19 News Crawler using Puppeteer

This is a simple project for crawling COVID-19 news from [PolitiFact](https://www.politifact.com) using [Puppeteer](https://pptr.dev).

## Requirement
* Node.js
* Puppeteer

You can install Puppeteer using npm:

```bash
$ npm install puppeteer
```

## Data Format

```json
{
    "date": "July 20, 2021"
    "label": "...",
    "source": "...",
    "text": "...",
    "verify_date": "...",
    "verify_url": "..."
}
...
```

## Usage

1. Install the dependencies:
```bash
$ npm install
```

2. Run the script:
```bash
$ node index.js
```

3. The script will start crawling the news data and store the data in a JSON file name `simple-data.json` in the `data` directory.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).