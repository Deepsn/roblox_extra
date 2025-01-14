<script
    setup
    lang="tsx"
>

import "@/utils/explorer/vscode-extensions";

import { initUserConfiguration } from "@codingame/monaco-vscode-configuration-service-override";

import type * as monaco from 'monaco-editor';

import userConfiguration from "@/assets/vscode/configuration.json?raw";
import { downloadAsset } from "@/utils/explorer/download-asset";
import { initializeMonacoEnvironment } from "@/utils/explorer/initialize-monaco-env";
import { initializeMonacoServices } from "@/utils/explorer/initialize-monaco-services";
import { loadFileSystem, loadInstancesOnFileSystem } from "@/utils/explorer/file-system";
import type { RegisteredFileSystemProvider } from "@codingame/monaco-vscode-files-service-override";
import * as vscode from "vscode";
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

    const params = new URLSearchParams(window.location.search)
    const assetId = params.get("assetId");

    if (!assetId) {
        console.error("AssetId does not exist")
        return;
    }

    const asset = downloadAsset(assetId);
    loadInstancesOnFileSystem(filesystem.value, asset);
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