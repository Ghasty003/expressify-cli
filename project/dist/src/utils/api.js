export async function getDependenciesVersion() {
    const controller = new AbortController();
    const signal = controller.signal;
    const versions = [];
    try {
        const dependenciesUrl = [
            "https://registry.npmjs.org/dotenv",
            "https://registry.npmjs.org/express",
            "https://registry.npmjs.org/mongoose",
        ];
        const requests = dependenciesUrl.map(url => fetch(url, { signal }));
        const responses = await Promise.all(requests);
        const data = await Promise.all(responses.map(response => response.json()));
        data.forEach(d => versions.push(d["dist-tags"].latest));
    }
    catch (error) {
        const e = error;
        controller.abort();
        throw new Error(e.message);
    }
    return versions;
}
