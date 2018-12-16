export function fetchGistContent(gistId: string) {
    const API_ENDPOINT = `https://api.github.com/gists/${gistId}`;
    return fetch(API_ENDPOINT)
        .then(response => {
            return response.json();
        })
        .then(json => {
            const files: { [index: string]: { language: string; content: string } } = json.files;
            const fileNames = Object.keys(files);
            if (fileNames.length === 1) {
                return files[fileNames[0]].content;
            } else if (fileNames.length > 1) {
                const jsonFile = fileNames.find(fileName => files[fileName].language === "json");
                if (!jsonFile) {
                    throw new Error("Does not found json file");
                }
                return files[jsonFile].content;
            }
            throw new Error("The gist does not have a file");
        });
}
