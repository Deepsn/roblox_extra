<script
    setup
    lang="tsx"
>

import "@/utils/explorer/vscode-extensions"

import { initUserConfiguration } from "@codingame/monaco-vscode-configuration-service-override";

import type * as monaco from 'monaco-editor';

import userConfiguration from "@/assets/vscode/configuration.json?raw";
import { initializeMonacoEnvironment } from "@/utils/explorer/initialize-monaco-env";
import { initializeMonacoServices } from "@/utils/explorer/initialize-monaco-services";
import { loadFileSystem } from "@/utils/explorer/load-file-system";
import type { RegisteredFileSystemProvider } from "vscode/service-override/files";
import type { IStandaloneCodeEditor } from "vscode/vscode/vs/editor/standalone/browser/standaloneCodeEditor";

const editorElRef = useTemplateRef("editor-ref");
const editorRef = ref<monaco.editor.IStandaloneCodeEditor>();

const filesystem = ref<RegisteredFileSystemProvider>();

onMounted(async () => {
    if (!editorElRef.value) return;

    filesystem.value = loadFileSystem();

    initializeMonacoEnvironment();
    await initUserConfiguration(userConfiguration)
    await initializeMonacoServices(editorElRef.value);

    editorRef.value = true as unknown as IStandaloneCodeEditor;
})

onUnmounted(() => {
    if (editorRef.value) {
        window.location.reload();
    }
    filesystem.value?.dispose();
})
</script>

<template>
    <div
        class="w-full h-full"
        ref="editor-ref"
    />
</template>