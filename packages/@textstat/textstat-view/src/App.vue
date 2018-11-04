<template>
    <div id="app">
        <DocumentDependencyView v-bind:stat="stat"/>
    </div>
</template>

<script>
    import DocumentDependencyView from "./components/view/DocumentDependencyView.vue";
    import outcome from "./assets/out.json";

    function resultsToMessages(results) {
        const messages = [];
        results.forEach(result => {
            const filePath = result.filePath;
            result.messages.forEach(message => {
                messages.push({
                    ...message,
                    filePath
                });
            });
        });
        return messages;
    }

    export default {
        name: "app",
        components: {
            DocumentDependencyView
        },
        data() {
            return {
                stat: outcome
            }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
