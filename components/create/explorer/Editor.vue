<script
    setup
    lang="tsx"
>

import "@/assets/vscode/extensions/luau.vsix";

import "@codingame/monaco-vscode-json-default-extension";
import "@codingame/monaco-vscode-json-language-features-default-extension";
import "@codingame/monaco-vscode-theme-defaults-default-extension";
import "@codingame/monaco-vscode-theme-seti-default-extension";

import getConfigurationServiceOverride, { initUserConfiguration } from "@codingame/monaco-vscode-configuration-service-override";
import getLanguagesServiceOverride from '@codingame/monaco-vscode-languages-service-override';
import getTextMateServiceOverride from "@codingame/monaco-vscode-textmate-service-override";
import getThemeServiceOverride from "@codingame/monaco-vscode-theme-service-override";

import getExtensionGalleryServiceOverride from "@codingame/monaco-vscode-extension-gallery-service-override";

import getExplorerServiceOverride from "@codingame/monaco-vscode-explorer-service-override";
import getWorkbenchServiceOverride from '@codingame/monaco-vscode-workbench-service-override';

import textMateWorker from '@codingame/monaco-vscode-textmate-service-override/worker?worker';
import testEditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

import type * as monaco from 'monaco-editor';
import * as vscode from "vscode";

import { initialize as initializeServices } from 'vscode/services';

import userConfiguration from "@/assets/vscode/configuration.json?raw";
import { constructOptions } from "@/utils/explorer/construct-options";
import { loadFileSystem } from "@/utils/explorer/load-file-system";
import type { IStandaloneCodeEditor } from "vscode/vscode/vs/editor/standalone/browser/standaloneCodeEditor";

const editorElRef = useTemplateRef("editor-ref");
const editorRef = ref<monaco.editor.IStandaloneCodeEditor>();

onMounted(async () => {
    if (!editorElRef.value) return;

    self.MonacoEnvironment = {
        getWorker(_workerId: string, label: string) {
            if (label === "TextMateWorker") {
                return new textMateWorker()
            }

            return new testEditorWorker();
        }
    };

    const services: monaco.editor.IEditorOverrideServices = {
        ...getTextMateServiceOverride(),
        ...getThemeServiceOverride(),
        ...getConfigurationServiceOverride(),

        ...getLanguagesServiceOverride(),

        ...getExplorerServiceOverride(),
        ...getExtensionGalleryServiceOverride(),

        ...getWorkbenchServiceOverride(),
    };

    console.log("loading file system");

    loadFileSystem();

    console.log("initializing user config", userConfiguration);

    await initUserConfiguration(userConfiguration)

    console.log("initializing services");

    await initializeServices(services, editorElRef.value, constructOptions, {
        userHome: vscode.Uri.file('/')
    })

    editorRef.value = true as unknown as IStandaloneCodeEditor;
})

onUnmounted(() => {
    if (editorRef.value) {
        window.location.reload();
    }
})
</script>

<template>
    <div
        class="w-full h-full"
        ref="editor-ref"
    />
</template>