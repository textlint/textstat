<template>
    <div>
        <label>BasePath:
            <input class="BasePath-input" v-model="basePath" type="text"/>
        </label>
        <ul class="filePath-list">
            <li v-for="result in results">
                <h2>{{result.filePath}}</h2>
                <h3>← From Links</h3>
                <ul class="message-list">
                    <li v-for="link in result.fromLinks">
                        <p>{{link}}</p>
                    </li>
                </ul>
                <h3>→ To Links</h3>
                <ul class="message-list">
                    <li v-for="link in result.toLinks">
                        <p>{{link}}</p>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "DocumentDependencyView",
        props: ["stat"],
        data() {
            return {
                basePath: ""
            }
        },
        computed: {
            results: function() {
                return this.stat.reduce((collection, result) => {
                    const messages = result.messages.filter(message => {
                        return message.ruleId === "textstat-rule-document-dependency"
                    });
                    const pickToMessages = (messages, filterPredicator) => {
                        return messages.reduce((links, message) => {
                            const linkNodes = message.data.details.filter(filterPredicator);
                            const urls = linkNodes.reduce((urls, node) => {
                                const pathList = node.value.filter(item => item.type === "document").map(item => {
                                    return item.path.replace(this.basePath, "");
                                });
                                return urls.concat(pathList);
                            }, []);
                            return links.concat(urls);
                        }, []);
                    };
                    const toLinks = pickToMessages(messages, (detail) => detail.name === "To Links");
                    const fromLinks = pickToMessages(messages, (detail) => detail.name === "From Links");
                    return collection.concat({
                        filePath: result.filePath.replace(this.basePath, ""),
                        toLinks: toLinks,
                        fromLinks: fromLinks
                    })
                }, []);
            }
        }
    }
</script>

<style scoped>
    .BasePath-input {
        width: 50em;
    }
</style>
