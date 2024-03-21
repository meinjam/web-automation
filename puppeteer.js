const { default: puppeteer } = require('puppeteer');
const fs = require('fs');

const getQuotes = async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();
  await page.goto('https://medex.com.bd/brands/', {
    waitUntil: 'domcontentloaded',
  });

  //  Get all links
  // const totalPages = await page.evaluate(() => document.querySelector('.pagination li:nth-last-child(2)').innerText);
  // console.log(totalPages);

  // for (let i = 2; i <= 5; i++) {
  //   console.log(i);
  // }

  let meds = [];

  // Get page data
  const pageMedicines = await page.$$eval('.hoverable-block', (elements) =>
    elements.map((e) => ({
      title: e.querySelector('.data-row-top').innerText,
      generic: e.querySelectorAll('.col-xs-12')[1].innerText,
      strengths: e.querySelector('.data-row-strength .grey-ligten').innerText,
      company: e.querySelector('.data-row-company').innerText,
      link: e.href,
    }))
  );

  console.log(pageMedicines.length, '1');
  meds.push(pageMedicines);

  // await page.click('.pagination .page-item:last-child > a');

  for (let i = 2; i <= 20; i++) {
    await page.click('.pagination .page-item:last-child > a');

    const pageMedicines = await page.$$eval('.hoverable-block', (elements) =>
      elements.map((e) => ({
        title: e.querySelector('.data-row-top').innerText,
        generic: e.querySelectorAll('.col-xs-12')[1].innerText,
        strengths: e.querySelector('.data-row-strength .grey-ligten').innerText,
        company: e.querySelector('.data-row-company').innerText,
        link: e.href,
      }))
    );

    console.log(pageMedicines.length, i);
    meds.push(pageMedicines);
  }

  await browser.close();

  const medicines = await Promise.all(meds);
  console.log(medicines.flat().length, 'medicines');

  fs.writeFile(`medicines.json`, JSON.stringify(medicines.flat()), (err) => {
    if (err) throw err;
    console.log('File saved');
  });
};

getQuotes();
