import puppeteer from "puppeteer"

async function searchAmazon(word) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.in/s?k=${word}`, {
        waitUntil: "load",
    });
    await page.waitForFunction(
        'window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500'
    );
    await page.content();

    // Stores products that matches with the class
    const products = await page.$$('[class="a-section a-spacing-small puis-padding-left-micro puis-padding-right-micro"]');

    // Initialize the JSON
    var json = {}

    // Iterate the first 4 products
    for (let i = 0; i < products.length && i != 4; i++) {
        // Initialize the JSON for each product
        json[i] = {}

        const product = products[i];
        // Get the product name
        const productNameClass = '[class= "a-section a-spacing-none a-spacing-top-small s-title-instructions-style"]';
        const productName = (await product.$$(productNameClass))[0].evaluate(x => x.textContent).then((data) => { json[i].productName = data; });

        // Get the product price
        const productPriceClass = '[class="a-price-whole"]'
        const productPrice = (await product.$$(productPriceClass))[0].evaluate(x => x.textContent).then((data) => { json[i].productPrice = data; });

        // Get the product review count
        const productReviewCountClass = '[class="a-size-base s-underline-text"]';
        const reviewCount = (await product.$$(productReviewCountClass))[0].evaluate(x => x.textContent).then((data) => { json[i].reviewCount = data; });

        await products[i].evaluate(x => x.textContent);
    }
    await page.close();
    await browser.close();
    return json;
}

export default searchAmazon; 