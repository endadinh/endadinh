require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");



async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const quote = await (
        await fetch("https://quotes-api-self.vercel.app/quote")
    ).json();

    const readme = readmeTemplate
        .replace("{__quote}", `" ${quote?.quote} "`)
        .replace("{__character}", `___ ${quote?.author ? quote?.author : "0xEnda"} ___`)
    await fs.writeFile("README.md", readme);
}
main();

