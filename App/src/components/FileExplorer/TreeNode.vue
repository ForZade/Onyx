<template>
    <div>
        <span @click="handleNodeClick(node)" @contextmenu.prevent="handleContextMenu($event, node)" class="py-0.5 px-2 dark:text-od-icon text-ol-icon flex items-center select-none cursor-pointer dark:hover:bg-od-hover-1">
            <Icon v-if="node.type === 'dir'" icon="tabler:chevron-right" class="w-4 h-4 transition-transform duration-200" :class="expanded ? 'rotate-90' : 'rotate-0'"/>
            <span v-if="!editing">{{ node.name }}</span>
            <input v-else ref="input" type="text" v-model="title" class="w-full h-4 bg-transparent outline-none dark:text-od-icon text-ol-icon focus:outline-none focus:border-none rounded-md px-0 border-none">
        </span>
        <ul v-show="expanded">
            <tree-node v-for="child in node.children" :key="child.id" :node="child" class="pl-4" ></tree-node>
        </ul>
    </div>
</template>
  
<script lang="ts">
import { Icon } from '@iconify/vue';
import ContextMenu from '../ContextMenu.vue';
import { ipcRenderer } from 'electron'

  export default {
    components: {
        Icon,
        ContextMenu,
    },
    props: {
      node: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        path: '',
        editing: false,
        title: '',
        expanded: false,
        contextDir: [
          {
            category: "create-notes",
            items: [
              {
                name: 'New note',
                icon: 'file-text',
                onClick: () => {
                  console.log('New Note Creating');
                }
              },
              {
                name: 'New folder',
                icon: 'folder',
                onClick: () => {
                  console.log('New Folder Creating');
                }
              },
              {
                name: 'Rename',
                icon: 'pencil',
                onClick: () => {
                    console.log('rename')
                }
              },
              {
                name: 'Delete',
                icon: 'trash',
                onClick: () => {
                  console.log('delete')
                }
              }
            ]
          }
        ],
        contextJson: [
        {
            category: "edit-items",
            items: [
              {
                name: 'Rename',
                icon: 'pencil',
                onClick: () => {
                    console.log('Rename');
                }
              },
              {
                name: 'Delete',
                icon: 'trash',
                onClick: () => {
                  console.log('delete')
                }
              }
            ]
          }
        ]
      }
    },
    methods: {
      renameFunction() {
        ipcRenderer.send('start-renaming-item');
        ipcRenderer.on('start-renaming-item', (_, data: boolean) =>{
          console.log('editing file name now');

          this.editing = data;
          this.$refs.input?.value.focus();
        })
      },
      renameClickOff() {

      },
      handleNodeClick(node: any) {
        if (node.type === 'dir') {
          this.expanded = !this.expanded;
        }
        if (node.type === '.json') {
          ipcRenderer.send('open-file', (node.path));
        }
      },
      handleContextMenu(event: MouseEvent, node: any) {
        event.preventDefault();
        if(node.type === 'dir') {
          this.path = node.path
          this.$emit('context-menu', event, this.contextDir, event.clientX, event.clientY, false);
        }
        else if (node.type === '.json') {
          this.path = node.path
          this.$emit('context-menu', event, this.contextJson, event.clientX, event.clientY, false);
        }
      }
    }
  }
  </script>