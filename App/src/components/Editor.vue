<script setup>
import ExampleTheme from '../themes/ExampleTheme';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import {
  LexicalLinkPlugin,
  LexicalListPlugin,
  LexicalMarkdownShortcutPlugin,
  LexicalAutoFocusPlugin,
  LexicalHistoryPlugin,
  LexicalContentEditable,
  LexicalRichTextPlugin,
  LexicalComposer,
} from 'lexical-vue';
import { TRANSFORMERS } from '@lexical/markdown';

import ListMaxIndentLevelPlugin from '../plugins/ListMaxIndentLevelPlugin.vue';
import CodeHighlightPlugin from '../plugins/CodeHighlightPlugin.vue';
import AutoLinkPlugin from '../plugins/AutoLinkPlugin.vue';

const editorConfig = {
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};
</script>

<template>
  <LexicalComposer :initial-config="editorConfig">
    <div class="editor-container">
      <div class="editor-inner">
        <LexicalRichTextPlugin>
          <template #contentEditable>
            <LexicalContentEditable class="dark:text-slate-100 text-slate-800 focus:outline-none" id="editor"/>
          </template>
          <template #placeholder>
            <div class="dark:text-slate-100 text-slate-800"></div>
          </template>
        </LexicalRichTextPlugin>
        <LexicalHistoryPlugin />
        <LexicalAutoFocusPlugin />
        <CodeHighlightPlugin />
        <LexicalListPlugin />
        <LexicalLinkPlugin />
        <AutoLinkPlugin />
        <ListMaxIndentLevelPlugin :max-depth="7" />
        <LexicalMarkdownShortcutPlugin :transformers="TRANSFORMERS" />
      </div>
    </div>
  </LexicalComposer>
</template>

<style>
  .editor-heading-h1 {
    font-size: 1.875rem;
    line-height: 3.275rem;
    font-weight: bold;
  }

  .editor-heading-h2 {
    font-size: 1.6rem;
    line-height: 3.1rem;
    font-weight: bold;
  }

  .editor-list-ul {
    list-style-type: disc;
  }

  .editor-list-ol {
    list-style-type: decimal;
  }
</style>