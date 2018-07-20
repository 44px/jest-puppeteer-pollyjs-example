import {Frame} from 'puppeteer';
import PollyServer from '../polly-server';

describe('suite one', () => {
    let serverInstance = null;

    // Start Polly proxy server
    beforeAll(() => {
        serverInstance = PollyServer.listen();
    });

    // Stop Polly proxy server
    afterAll(() => {
        serverInstance && serverInstance.close();
        serverInstance = null;
    });

    // Inject Polly client
    beforeEach(async () => {
        await page.goto('http://localhost:3000/');
        const frame = page.mainFrame().childFrames()[0] as Frame;
        await frame.addScriptTag({
            url: 'https://unpkg.com/@pollyjs/core@0.5.0/dist/umd/pollyjs-core.js'
        });
        await frame.evaluate(() => {
            window['polly'] = new window['@pollyjs/core'].Polly('NAME_UNSET', {
                adapters: ['xhr'],
                persisterOptions: {
                    host: 'http://localhost:3002'
                }
            });
        });
    });

    // Stop recording
    afterEach(async () => {
        const frame = page.mainFrame().childFrames()[0] as Frame;
        await frame.evaluate(() => {
            return window['polly'].stop();
        });
    });

    it('should get initial title', async () => {
        await setRecordingName(page, 'should get initial title');

        const postTitleAfterLoad = await getTextContent('#postTitle');
        expect(postTitleAfterLoad).toBe('–');

        const fetchButton = await page.$('#fetchData');
        await fetchButton.click();
        await page.waitFor(200);

        // Check requested data
        const postTitleAfterFetch = await getTextContent('#postTitle');
        expect(postTitleAfterFetch).toBe('OldTitle');
    });

    it('should update title', async () => {
        await setRecordingName(page, 'should update title');

        // Update and check data
        const updateButton = await page.$('#updateData');
        await updateButton.click();
        await page.waitFor(200);

        const fetchButton = await page.$('#fetchData');
        await fetchButton.click();
        await page.waitFor(200);

        // check updated data
        const postTitle = await getTextContent('#postTitle');
        expect(postTitle).toBe('NewTitle');
    });
});

function getTextContent(selector) {
    return page.$eval(selector, (node) => node.textContent);
}

async function setRecordingName(page, name) {
    const frame = page.mainFrame().childFrames()[0] as Frame;
    await frame.evaluate((recordingName) => {
        window['polly'].recordingName = recordingName;
    }, name);
}
