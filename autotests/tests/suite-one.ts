import {Frame} from "puppeteer";

describe('app', () => {
    beforeEach(async () => {
        await page.goto('http://localhost:3000/');
    });

    it('should handle requests', async () => {
        const frame = page.mainFrame().childFrames()[0] as Frame;
        frame.addScriptTag({content: `
            const title = document.querySelector('#frameTitle');
            title.textContent = 'test';
        `});
        const frameTitle = await frame.$eval('#frameTitle', (node) => node.textContent);
        expect(frameTitle).toBe('test');

        const initialTitle = await page.$eval('#postTitle', (node) => node.textContent);
        //expect(initialTitle).toBe('–');

        const fetchButton = await page.$('#fetchData');
        await fetchButton.click();

        // TODO: fn here
        await page.waitFor(500);

        // Check requested data
        const requestedTitle = await page.$eval('#postTitle', (node) => node.textContent);
        //expect(requestedTitle).toBe('OldTitle');

        // Update and check data
        const updateButton = await page.$('#updateData');
        await updateButton.click();
        await page.waitFor(500);
        await fetchButton.click();
        await page.waitFor(500);

        // check updated data
        const updatedTitle = await page.$eval('#postTitle', (node) => node.textContent);
        //expect(updatedTitle).toBe('NewTitle');
    });
});
