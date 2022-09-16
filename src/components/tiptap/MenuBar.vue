<template>
  <div>
    <Modal ref="modal" @onConfirm="addImage"/>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`"/>
      <MenuItem v-else :key="index" v-bind="item"/>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import MenuItem from './MenuItem'
import Modal from './Modal'

export default {
  components: {
    MenuItem,
    Modal,
  },

  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const modal = ref(null)
    const items = [
      {
        icon: 'bold',
        title: 'Bold',
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive('bold'),
      },
      {
        icon: 'italic',
        title: 'Italic',
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive('italic'),
      },
      {
        icon: 'strikethrough',
        title: 'Strike',
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive('strike'),
      },
      {
        icon: 'code-view',
        title: 'Code',
        action: () => props.editor.chain().focus().toggleCode().run(),
        isActive: () => props.editor.isActive('code'),
      },
      {
        icon: 'mark-pen-line',
        title: 'Highlight',
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive('highlight'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'h-1',
        title: 'Heading 1',
        action: () => props.editor.chain().focus().toggleHeading({level: 1}).run(),
        isActive: () => props.editor.isActive('heading', {level: 1}),
      },
      {
        icon: 'h-2',
        title: 'Heading 2',
        action: () => props.editor.chain().focus().toggleHeading({level: 2}).run(),
        isActive: () => props.editor.isActive('heading', {level: 2}),
      },
      {
        icon: 'paragraph',
        title: 'Paragraph',
        action: () => props.editor.chain().focus().setParagraph().run(),
        isActive: () => props.editor.isActive('paragraph'),
      },
      {
        icon: 'list-unordered',
        title: 'Bullet List',
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive('bulletList'),
      },
      {
        icon: 'list-ordered',
        title: 'Ordered List',
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive('orderedList'),
      },
      {
        icon: 'list-check-2',
        title: 'Task List',
        action: () => props.editor.chain().focus().toggleTaskList().run(),
        isActive: () => props.editor.isActive('taskList'),
      },
      {
        icon: 'code-box-line',
        title: 'Code Block',
        action: () => props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => props.editor.isActive('codeBlock'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'double-quotes-l',
        title: 'Blockquote',
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive('blockquote'),
      },
      {
        icon: 'separator',
        title: 'Horizontal Rule',
        action: () => props.editor.chain().focus().setHorizontalRule().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'text-wrap',
        title: 'Hard Break',
        action: () => props.editor.chain().focus().setHardBreak().run(),
      },
      {
        icon: 'format-clear',
        title: 'Clear Format',
        action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'image-add-line',
        title: 'Add Image',
        action: () => modal.value.showModal(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'arrow-go-back-line',
        title: 'Undo',
        action: () => props.editor.chain().focus().undo().run(),
      },
      {
        icon: 'arrow-go-forward-line',
        title: 'Redo',
        action: () => props.editor.chain().focus().redo().run(),
      },
    ]

    /**
     * Inserts an image in the editor.
     * @todo Delete see tag later
     * @param { { src: string, alt?: string, title?: string } } data src: URL string
     * @see https://codesandbox.io/s/j3p0z44155?file=/src/components/Editor.vue
     */
    const addImage = (data) => {
      props.editor.chain().focus().setImage(data).run()
    }

    return {
      modal,
      items,
      addImage,
    }
  },
}
</script>

<style lang="scss">
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>