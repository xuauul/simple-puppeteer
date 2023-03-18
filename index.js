const fs = require('fs');
const puppeteer = require("puppeteer");

class PolitifactNewsSpider {
    constructor(category) {
        this.category = category;
        this.url = (category, page) => `https://www.politifact.com/factchecks/list/?category=${category}&page=${page}`;
    }

    async run() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        for (let currpage = 1; currpage <= 5; currpage++) {
            await page.goto(this.url(this.category, currpage));

            const data = await page.$$eval("li.o-listicle__item", items => items.map(item => ({
                date: item.querySelector(".m-statement__desc").textContent.trim().split(" ").slice(2, 5).join(" "),
                label: item.querySelector(".m-statement__meter .c-image__original").getAttribute("alt"),
                source: item.querySelector(".m-statement__name").textContent.trim(),
                text: item.querySelector(".m-statement__content a").textContent.trim(),
                verify_date: item.querySelector("footer").textContent.split("•")[1].trim(),
                verify_url: "https://politifact.com" + item.querySelector(".m-statement__content a").getAttribute("href"),
            })));

            data.forEach((item) => {
                fs.appendFile("data/simple-data.json", `${JSON.stringify(item)}\n`, (err) => { if (err) throw err; });
            });
        }

        await browser.close();
    }
}

spider = new PolitifactNewsSpider(category = "coronavirus");
spider.run();