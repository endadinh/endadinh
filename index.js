require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");



async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const quote = await (
        await fetch("https://api.quotable.io/random")
    ).json();

    const readme = readmeTemplate
        .replace("{__quote}", `" ${quote?.content} "`)
        .replace("{__character}", `___ ${quote?.author ? quote?.author : "0xEnda"} ___`)
    await fs.writeFile("README.md", readme);
}
main();

